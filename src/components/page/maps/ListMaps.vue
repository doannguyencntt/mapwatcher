<template>
  <div class="animated fadeIn">
    <b-card :header="caption">
      <template v-slot:header>
        <p class="po-list-title my-0 pull-left align-middle map-list-title">
          <strong><i class="icon-book-open icons"></i> {{ caption }}</strong>
          <span v-if="listMaps && listMaps.total">
            (Total:
            {{ new Number(listMaps.total || 0).toLocaleString('en') }})</span
          >
          <span v-else> (Total: 0)</span>
        </p>
        <div class="pull-right">
          <b-button-group>
            <router-link
              v-if="
                getPermissions.module_enabled &&
                getPermissions.permissions.mapman &&
                !params.share_token
              "
              :to="{
                name: `MWImportAmazonMaps`,
                params: { client_id: nav.clientId }
              }"
              tag="button"
              class="btn btn-primary btn-sm"
            >
              <i class="icons icon-cloud-upload"></i> Import
            </router-link>
            <b-button
              variant="primary"
              size="sm"
              @click="
                () => {
                  handleOpenModelDownload()
                }
              "
            >
              <i class="icons icon-cloud-download"></i> Export
              <b-spinner
                v-if="$store.state.mw.maps.loadingDownload"
                label="Spinning"
                class="icon- btn-loader"
              ></b-spinner>
            </b-button>
          </b-button-group>
        </div>
      </template>
      <b-row>
        <b-col class="mb-4 col-1">
          <b-dropdown
            v-if="selectedMaps.length"
            text="Actions"
            class="dropdown-action"
          >
            <b-dropdown-item-button
              :disabled="
                !getPermissions.module_enabled &&
                !getPermissions.permissions.mapman
              "
              @click="$bvModal.show('modal-confirm-remove-multi')"
            >
              <i class="icon-close"></i> Remove
            </b-dropdown-item-button>
          </b-dropdown>
        </b-col>
        <b-col class="mb-4 col-11">
          <b-form-group class="mb-0">
            <b-input-group class="search cancel-action align-items-center">
              <!-- Report -->
              <label class="d-inline mb-0 pr-2">Report:</label>
              <b-form-select
                @change="
                  params.page = 1
                  reportChange()
                "
                v-model="params.report_id"
                :options="reportOptions"
              >
                <template v-slot:first>
                  <option :value="null">All Reports</option>
                </template>
              </b-form-select>
              <!-- Marketplace -->
              <label class="d-inline ml-5 mb-0 pr-2">Marketplace:</label>
              <b-form-select
                @change="
                  params.page = 1
                  marketplaceChange()
                "
                v-model="params.marketplace"
                :options="marketplaceOptions"
              >
                <template v-slot:first>
                  <option :value="null">All Marketplace</option>
                </template>
              </b-form-select>
              <!-- Brand -->
              <label class="d-inline ml-5 mb-0 pr-2">Brand:</label>
              <b-form-select
                @change="
                  params.page = 1
                  paramsChange()
                "
                v-model="params.brand_name"
                :options="brandOptions"
              >
                <template v-slot:first>
                  <option :value="null">All Brands</option>
                </template>
              </b-form-select>
              <!-- Search -->
              <label class="d-inline mb-0 pr-2 pl-2 ml-5">Search:</label>
              <b-form-input
                @keyup.enter="
                  params.page = 1
                  paramsChange()
                "
                placeholder="Enter keyword"
                ref="inputSearch"
                v-model.trim="params.search"
              ></b-form-input>
              <i
                v-show="params.search"
                @click="
                  params.page = 1
                  params.search = ''
                  paramsChange()
                "
                class="icon-close cancel-icon"
              ></i>
              <b-input-group-append>
                <b-button
                  @click="
                    params.page = 1
                    paramsChange()
                  "
                >
                  <i class="icons icon-magnifier"></i>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        :dark="dark"
        :hover="hover"
        striped
        :small="small"
        outlined
        responsive="sm"
        thead-class="thead-light"
        :items="getItems"
        :fields="captions"
        show-empty
        class="overflow-auto"
      >
        <template v-slot:empty>
          <LoadingSpinner :isLoading="mapPricingLoading" v-if="mapPricingLoading"/>
          <div class="align-middle d-flex justify-content-center align-items-center" v-else>No MAP</div>
        </template>
        <template v-slot:head(selected)>
          <b-form-checkbox v-model="allSelected" />
        </template>
        <template v-slot:cell(selected)="row">
          <b-form-checkbox
            :key="row.index"
            :value="row.item.id"
            v-model="selectedMaps"
          />
        </template>
        <template class="align-items-baseline" v-slot:cell(asin)="data">
          <span class="mr-1">{{ data.item.asin }}</span>
          <a
            class="text-decoration-none text-wrap d-inline-block"
            target="_blank"
            :href="generateAmazonLink(data.item.marketplace, data.item.asin)"
            v-if="data.item.asin"
            >A<i class="fa fa-link" aria-hidden="true"></i
          ></a>
        </template>
        <template class="align-items-baseline" v-slot:cell(price)="data"
          >{{ data.item.price ? currency(data.item.marketplace) : '' }}
          {{ data.item.price | formatNumber }}</template
        >
        <template v-slot:cell(active)="row">
          <b-form-checkbox
            v-model="row.item.active"
            :disabled="true"
          ></b-form-checkbox>
        </template>
        <template v-slot:cell(last_violation_checked)="data">
          <div class="float-left" v-if="data.item.has_processed">
            {{ data.item.last_violation_checked | moment('MM/DD/YYYY') }}
          </div>
          <div class="float-left" v-else>N/A</div>
          <i
            v-if="data.item.has_processed"
            class="
              icon-check
              icons
              rounded-circle
              bg-success
              custom_icon
              float-left
              ml-2
            "
          ></i>
          <i
            v-if="!data.item.has_processed"
            class="
              icon-clock
              icons
              rounded-circle
              bg-secondary
              custom_icon
              float-left
              ml-2
            "
          ></i>
        </template>
        <template v-slot:cell(type)="data">
          <span class="badge badge-secondary">{{
            convertToUpperCase(data.item.type)
          }}</span>
        </template>
        <template v-slot:cell(discovered_asins)="row">
          <ul
            class="mb-0 w-100 p-0"
            v-for="(itemAsin, index) in row.item.discovered_asins"
            :key="index"
            style="list-style-position: inside; list-style-type: none"
          >
            <li class="text-truncate max-width-300">
              {{ itemAsin.asin }} on ({{ itemAsin.date | moment('MM/DD/YYYY') }})
            </li>
          </ul>
        </template>
        <template
          v-slot:cell(actions)="row"
          v-if="getPermissions.module_enabled && getPermissions.permissions.mapman"
        >
          <div>
            <b-dropdown variant="primary" size="sm" split text="Edit" @click="handleEditMap(row.item.id)" class="drp-actions">
              <b-dropdown-item variant="danger" @click="$bvModal.show('modal-confirm-delete-map'), mapId = row.item.id">
                <i class="icon-trash cls-icon-trash"></i>Remove
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </template>
        <template v-slot:view>
          <b-button class="mr-1 my-1" variant="primary">
            <i class="fa fa-window-restore fa-lg"></i> Revision
          </b-button>
        </template>
      </b-table>
      <b-modal
        title="Please confirm"
        centered
        id="modal-confirm-delete-map"
        @ok="handleRemoveMap(mapId)"
        ok-variant="danger"
      >
        Are you sure you want to remove this MAP?
        <template v-slot:modal-footer="{ ok, cancel }">
          <b-button variant="warning" @click="ok()">
            <i class="icon-check"></i> Yes, I understand &amp; confirm!
          </b-button>
          <b-button variant @click="cancel()">
            <i class="icon-close"></i> No
          </b-button>
        </template>
      </b-modal>
      <b-modal
        title="Please confirm"
        centered
        id="modal-confirm-remove-multi"
        @ok="handleRemoveMulti"
      >
        Are you sure you want to remove all selected MAPs?
        <template v-slot:modal-footer="{ ok, cancel }">
          <b-button variant="danger" @click="ok()">
            <i class="icon-check"></i> Yes, I understand &amp; confirm!
          </b-button>
          <b-button variant @click="cancel()">
            <i class="icon-close"></i> No
          </b-button>
        </template>
      </b-modal>
      <nav
        class="d-flex justify-content-center"
        v-if="listMaps.total > listMaps.page_size && listMaps.items.length > 0"
      >
        <b-pagination
          :total-rows="listMaps.total"
          :per-page="params.limit"
          v-model="params.page"
          prev-text="Prev"
          next-text="Next"
          hide-goto-end-buttons
          @change=";(params.page = $event), paramsChange()"
          limit="10"
          hide-ellipsis
        />
      </nav>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vToasted from '@/shared/notification'
import * as TYPE from '@/actionTypes.js'
import _ from 'lodash'
import _nav from '@/_nav'
import { MarketPlacesCurrency } from '@/constants/Report'
import LoadingSpinner from '@/components/common/LoadingSpinner'

export default {
  name: 'c-table',
  inheritAttrs: false,
  mixins: [vToasted],
  props: {
    caption: {
      type: String,
      default: 'Table'
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: [Array, Function],
      default: () => []
    },
    fields: {
      type: [Array, Object],
      default: () => []
    },
    dark: {
      type: Boolean,
      default: false
    },
    totalRows: {
      type: Number,
      default: 0
    },
    handleChangePage: {
      type: [Function]
    }
  },
  data: () => {
    return {
      MarketPlacesCurrency,
      params: null,
      validReports: [],
      brandNames: [],
      nav: _nav,
      mapId: null,
      selectedMaps: []
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: `mw/${TYPE.GET_PERMISSIONS}`,
      planConfig: `mw/${TYPE.GET_PLAN_CONFIG}`,
      organizationStats: `mw/${TYPE.GET_ORGANIZATION_STATS}`,
      defaultParams: `mw/maps/${TYPE.GET_DEFAULT_AMAZON_MAP_PARAMS}`,
      reportList: `mw/reports/${TYPE.GET_LIST_REPORTS}`,
      listMaps: `mw/maps/${TYPE.GET_MAPS}`,
      mapPricingLoading: `mw/maps/${TYPE.GET_MAP_PRICING_LOADING}`
    }),
    captions: function () {
      const { fields } = this
      return this.params.marketplace
        ? fields
        : fields.filter((f) => f.key !== 'name')
    },
    getItems: function () {
      return this.listMaps.items
    },
    allSelected: {
      get: function () {
        let items = this.getItems
        return !_.isEmpty(items) && items.length === this.selectedMaps.length
      },
      set: function (newValue) {
        let items = this.getItems
        this.selectedMaps = newValue ? items.map((item) => item.id) : items.length === this.selectedMaps.length ? [] : this.selectedMaps
      }
    },
    sharableRoute() {
      const routeRegrex = /\/share\//
      return routeRegrex.test(this.$route.path) ? 'Share' : ''
    },
    reportOptions() {
      return this.validReports.map((item) => ({
        value: item._id,
        text: item.name_in_dashboard
      }))
    },
    marketplaceOptions() {
      const selectedReports = this.params.report_id
        ? [_.find(this.validReports, { _id: this.params.report_id })]
        : this.validReports
      let supportedMarkets = []
      _.forEach(selectedReports, (report) => {
        const markets = _.get(report, 'marketplaces')
        _.forEach(_.keys(markets), (marketKey) => {
          const marketplace = marketKey.replaceAll('_', '.') // amazon.com
          markets[marketKey] &&
            !supportedMarkets.includes(marketplace) &&
            supportedMarkets.push(marketplace)
        })
      })
      return _.isEmpty(this.planConfig)
        ? supportedMarkets
          .map((market) => ({ value: market, text: _.upperFirst(market) })) // not sort marketplaces
        : this.planConfig.allowed_amazon_marketplaces
          .filter((market) => supportedMarkets.includes(market))
          .map((market) => ({ value: market, text: _.upperFirst(market) })) // sorted marketplaces
    },
    brandOptions() {
      return this.brandNames.map((name) => ({
        value: name === '' ? -1 : name,
        text: name
      }))
    },
    currency() {
      // TODO later on, currency needs to be supported from backend.
      return (marketplace) => MarketPlacesCurrency[marketplace]
    }
  },
  components: {
    LoadingSpinner
  },
  methods: {
    ...mapActions({
      fetchMaps: `mw/maps/${TYPE.FETCH_LIST_MAPS}`,
      fetchReports: `mw/reports/${TYPE.FETCH_LIST_REPORTS}`,
      fetchValidAmazonReport: `mw/reports/${TYPE.GET_VALID_AMAZON_REPORTS}`,
      removeMap: `mw/maps/${TYPE.REMOVE_MAP}`,
      fetchUrlDownload: `mw/maps/${TYPE.FETCH_URL_EXPORT}`,
      updateTotalGSMap: `mw/maps/${TYPE.UPDATE_TOTAL_GS_MAP}`,
      fetchBrandNames: `mw/maps/${TYPE.GET_BRAND_NAMES}`,
      fetchPermissions: `mw/${TYPE.FETCH_PERMISSIONS}`
    }),
    convertToUpperCase: function (str) {
      return _.upperCase(str)
    },
    sortChange(event) {
      this.params.searchort_by = event.sortBy
      if (event.sortBy) {
        this.params.searchort_dir = event.sortDesc ? 'desc' : 'asc'
      } else {
        this.params.searchort_dir = null
      }
      this.paramsChange()
    },
    syncParams() {
      this.paramsChange()
    },
    async paramsChange() {
      await this.fetchMaps(this.params)
      this.$router.push(
        {
          params: {
            client_id: this.nav.clientId
          },
          query: this.keepShareTokenForQuery({
            search: this.params.search,
            report_id: this.params.report_id,
            limit: this.params.limit ? this.params.limit : 100,
            page: this.params.page ? this.params.page : 1,
            marketplace: this.params.marketplace,
            brand_name: this.params.brand_name
          })
        },
        () => {}
      )
    },
    async reportChange() {
      this.params.marketplace = null
      this.params.brand_name = null
      await this.reloadBrandNames()
      await this.paramsChange()
    },
    async marketplaceChange() {
      this.params.brand_name = null
      await this.reloadBrandNames()
      await this.paramsChange()
    },
    keepShareTokenForQuery(query) {
      if (this.$route.query.share_token) {
        _.assign(query, { share_token: this.$route.query.share_token })
      }
      return query
    },
    async fetchUniqAmazonReport() {
      this.validReports = await this.fetchValidAmazonReport(
        this.keepShareTokenForQuery({})
      )
      this.reloadBrandNames()
    },
    async reloadBrandNames() {
      this.brandNames = await this.fetchBrandNames({
        report_id: this.params.report_id,
        marketplace: this.params.marketplace
      })
    },
    async handleOpenModelDownload() {
      try {
        const res = await this.fetchUrlDownload(this.keepShareTokenForQuery({
          report_id: this.$route.query.report_id,
          marketplace: this.$route.query.marketplace,
          brand_name: this.$route.query.brand_name,
          search: this.$route.query.search
        }))
        window.location.href = res.url
      } catch (error) {
        this.vToasted('error', error.message)
      }
    },
    handleEditMap(mapId) {
      this.$router.push({
        name: `MW${this.sharableRoute}EditMaps`,
        params: { client_id: this.nav.clientId, id: mapId },
        query: { ...this.$route.query }
      })
    },
    async handleRemoveMap(mapId) {
      try {
        await this.removeMap(mapId)
        this.vToasted('success', `This MAP has been removed successfully.`)
        await this.fetchPermissions()
      } catch (error) {
        this.vToasted('error', error.data.message)
      }
    },
    handleRemoveMulti() {
      let allRemove = this.selectedMaps.map((mapId) => this.removeMap(mapId))
      Promise.all(allRemove)
        .then((values) => {
          const newTotalGSmaps = this.listMaps.total - this.selectedMaps.length
          this.updateTotalGSMap(newTotalGSmaps)
          this.vToasted(
            'success',
            `All selected MAPs have been removed successfully.`
          )
          this.selectedMaps = []
        })
        .catch((error) => {
          this.vToasted('error', error.data.message)
        })
    },
    generateAmazonLink(marketplace, asin) {
      return 'https://www.' + marketplace + '/gp/offer-listing/' + asin
    }
  },
  created() {
    this.params = _.defaultsDeep(this.$route.query, this.defaultParams)
    this.syncParams()
    this.fetchUniqAmazonReport()
  }
}
</script>

<style lang="scss" scoped>
.map-list-title {
  position: relative;
  top: 4px;
}
.dropdown-action {
  margin: 0 !important;
}
.btn-loader {
  width: 12px !important;
  height: 12px !important;
  border-width: 1px !important;
}
.drp-actions ::v-deep {
  .dropdown-menu {
    min-width: 50%;
    height: auto;
    .cls-icon-trash {
      color: #DC3545;
      margin-right: 5px;
    }
    .dropdown-item {
      padding: 6px 15px;
      font-size: 12px;
    }
  }
}
</style>
