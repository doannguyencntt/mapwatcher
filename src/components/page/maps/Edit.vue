<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6" lg="6" sm="12">
        <b-card footer-tag="footer">
          <template v-slot:header>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <p class="mx-0 my-0"><strong>EDIT MAP</strong></p>
                <div class="card-header-actions ml-2">
                  <b-button
                    size="sm"
                    class="mr-1"
                    variant="success"
                    :disabled="check"
                    @click="handlePasteRecord"
                  >
                    Paste
                  </b-button>
                  <b-button
                    size="sm"
                    class="ml-2"
                    variant="secondary"
                    :disabled="!isCopySupport"
                    @click="handleCopyRecord"
                  >
                    Copy
                  </b-button>
                </div>
              </div>
              <div class="card-header-actions">
                <div class="btn-close">
                  <b-button
                    variant="secondary"
                    class="btn btn-block"
                    size="sm"
                    @click="backToListMaps()"
                  >
                    <i class="icon-arrow-left-circle icons"></i> Back
                  </b-button>
                </div>
              </div>
            </div>
          </template>
          <b-form>
            <b-form-group>
              <label>
                <b>Report</b>
              </label>
              <b-form-select
                v-model="mapData.report_id"
                :options="reportOptions"
              >
                <template v-slot:first>
                  <option :value="null" disabled>All Reports</option>
                </template>
              </b-form-select>
            </b-form-group>
            <b-form-group>
              <label>
                <b>Marketplace</b>
              </label>
              <b-form-select
                v-model="mapData.marketplace"
                :options="marketplaceOptions"
              >
                <template v-slot:first>
                  <option :value="null" disabled>All Marketplaces</option>
                </template>
              </b-form-select>
            </b-form-group>
            <b-form-group>
              <label>
                <b>Brand Name</b>
              </label>
              <b-form-input
                type="text"
                v-model.trim="mapData.brand_name"
              />
            </b-form-group>
            <b-form-group>
              <label>
                <b>SKU</b>
              </label>
              <b-form-input
                type="text"
                @input="$v.mapData.sku.$touch()"
                :class="{
                  'is-invalid': $v.mapData.sku.$dirty && $v.mapData.sku.$error
                }"
                v-model.trim="mapData.sku"
              ></b-form-input>
              <div
                class="mw-error invalid-feedback"
                v-if="!$v.mapData.sku.required && $v.mapData.sku.$dirty"
              >
                SKU is required.
              </div>
            </b-form-group>
            <b-form-group>
              <label>
                <b>ASIN</b>
              </label>
              <b-form-input
                type="text"
                :class="{ 'is-invalid': !$v.mapData.isValidAsin || !$v.mapData.asin.isRequiredAsin}"
                v-model.trim="mapData.asin"
              ></b-form-input>
              <div
                class="mw-error invalid-feedback"
                v-if="!$v.mapData.isValidAsin"
              >
                ASIN is invalid.
              </div>
              <div
                class="mw-error invalid-feedback"
                v-if="!$v.mapData.asin.isRequiredAsin"
              >
                Asin is required.
              </div>
            </b-form-group>
            <b-form-group>
              <label>
                <b>UPC/EAN</b>
              </label>
              <b-form-input
                type="text"
                @input="$v.mapData.upc.$touch()"
                :class="{
                  'is-invalid':
                    $v.mapData.upc.$dirty && !$v.mapData.upc.isUpcOrEan
                }"
                v-model.trim="mapData.upc"
              ></b-form-input>
              <div
                class="mw-error invalid-feedback"
                v-if="!$v.mapData.upc.isUpcOrEan && $v.mapData.upc.$dirty"
              >
                UPC/EAN is invalid.
              </div>
            </b-form-group>
            <b-form-group>
              <label>
                <b>Price</b>
              </label>
              <b-form-input
                type="number"
                @input="$v.mapData.price.$touch()"
                :class="{ 'is-invalid': !$v.mapData.isValidPrice }"
                v-model.trim="mapData.price"
              ></b-form-input>
              <div
                class="mw-error invalid-feedback"
                v-if="!$v.mapData.isValidPrice"
              >
                Price is required.
              </div>
            </b-form-group>
            <b-form-group>
              <label>
                <b>Type</b>
              </label>
              <b-form-select v-model="mapData.type" :options="mapTypeList">
              </b-form-select>
            </b-form-group>
          </b-form>
          <template v-slot:footer>
            <div class="d-flex justify-content-between">
              <div class="footer__btns">
                <b-button
                  class="mr-1"
                  variant="primary"
                  size="sm"
                  @click="handleEditMap"
                  :disabled="isLoading"
                >
                  <i class="fa fa-dot-circle-o"></i> Update
                </b-button>
                <b-button size="sm" class="ml-2" @click="backToListMaps()">
                  <i class="icon-arrow-left-circle"></i> Cancel
                </b-button>
              </div>
            </div>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { ClipboardUtil } from 'plat-sdk/dist/clipboard'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import * as TYPE from '@/actionTypes.js'
import { required } from 'vuelidate/lib/validators'
import vToasted from '@/shared/notification'
import { isAsin, isUpcOrEan } from '@/shared/utils'
import { MapType } from '@/constants/Map'
import _nav from '@/_nav'
import _ from 'lodash'
import { FormType } from '@/constants/Form.js'

export default {
  name: 'MWEditMaps',
  data() {
    return {
      MapType,
      nav: _nav,
      mapTypeList: [
        { value: MapType.MAP, text: 'MAP' },
        { value: MapType.NON_MAP, text: 'NON MAP' }
      ],
      check: true,
      isLoading: false
    }
  },
  mixins: [vToasted],
  computed: {
    ...mapGetters({
      mapData: `mw/maps/${TYPE.GET_ONE_MAP}`,
      planConfig: `mw/${TYPE.GET_PLAN_CONFIG}`,
      listAmazonReports: `mw/reports/${TYPE.GET_AMAZON_LIST_REPORTS}`
    }),
    sharableRoute() {
      const routeRegrex = /\/share\//
      return routeRegrex.test(this.$route.path) ? 'Share' : ''
    },
    isCopySupport() {
      return ClipboardUtil.isCopySupported()
    },
    reportOptions() {
      return this.listAmazonReports.map((item) => ({
        value: item._id,
        text: item.name_in_dashboard
      }))
    },
    marketplaceOptions() {
      const selectedReports = this.mapData.report_id
        ? [_.find(this.listAmazonReports, { _id: this.mapData.report_id })]
        : this.listAmazonReports
      let supportedMarkets = []
      _.forEach(selectedReports, (report) => {
        const markets = _.get(report, 'marketplaces')
        _.forEach(_.keys(markets), (marketKey) => {
          const marketplace = marketKey.replaceAll('_', '.')
          markets[marketKey] &&
            !supportedMarkets.includes(marketplace) &&
            supportedMarkets.push(marketplace)
        })
      })
      return _.isEmpty(this.planConfig)
        ? supportedMarkets
          .map((market) => ({ value: market, text: _.upperFirst(market) }))
        : this.planConfig.allowed_amazon_marketplaces
          .filter((market) => supportedMarkets.includes(market))
          .map((market) => ({ value: market, text: _.upperFirst(market) }))
    }
  },
  methods: {
    ...mapMutations({
      setMapData: `mw/maps/${TYPE.SET_ONE_MAP}`
    }),
    ...mapActions({
      fetchMap: `mw/maps/${TYPE.FETCH_ONE_MAP}`,
      updateMap: `mw/maps/${TYPE.UPDATE_MAP}`,
      fetchListReports: `mw/reports/${TYPE.FETCH_IMPORT_REPORTS}`
    }),
    backToListMaps() {
      this.$router.push({
        name: `MW${this.sharableRoute}ListMaps`,
        params: { client_id: this.nav.clientId },
        query: { ...this.$router.history.current.query }
      })
    },
    async getMapById() {
      const {
        params: { id }
      } = this.$route
      this.isLoading = true
      try {
        await this.fetchMap(id)
      } catch (error) {
        this.vToasted('error', error.message)
      }
      this.isLoading = false
    },
    async handleEditMap() {
      this.$v.$touch()
      if (this.$v.$error) {
        console.log('error')
        return
      }
      this.isLoading = true
      try {
        const { id } = this.$route.params
        await this.updateMap({ id, data: this.mapData })
        this.vToasted('success', 'This MAP has been updated successfully.')
      } catch (error) {
        console.log(error)
        this.vToasted('error', error.data.message)
      }
      this.isLoading = false
    },

    handleCopyRecord() {
      ClipboardUtil.copy(_.cloneDeep(this.mapData), FormType.MAP)
      this.vToasted('success', 'Copied to clipboard')
      this.checkKey()
    },

    async handlePasteRecord() {
      try {
        const pasteData = await ClipboardUtil.paste(
          _.cloneDeep(this.mapData),
          FormType.MAP
        )
        if (!pasteData) {
          this.vToasted('error', 'You need to enable copy to clipboard')
          return
        }
        this.setMapData(pasteData)
        this.vToasted('success', 'Paste successfully')
      } catch (e) {
        this.vToasted('error', 'Your copy is not valid')
      }
    },
    async checkKey() {
      const result = await ClipboardUtil.check(FormType.MAP)
      this.check = !result
    }
  },
  created() {
    this.getMapById()
    this.checkKey()
    window.addEventListener('focus', this.checkKey)
    this.fetchListReports()
  },
  destroyed() {
    window.removeEventListener('focus', this.checkKey)
  },
  validations: {
    mapData: {
      upc: {
        isUpcOrEan: isUpcOrEan
      },
      isValidAsin(value) {
        return (
          (this.mapData.type === MapType.MAP && isAsin(this.mapData.asin)) ||
          (this.mapData.type === MapType.NON_MAP &&
            !_.isEmpty(this.mapData.asin) &&
            isAsin(this.mapData.asin)) ||
          _.isEmpty(this.mapData.asin)
        )
      },
      sku: {
        required
      },
      asin: {
        isRequiredAsin(value) {
          if (_.isEmpty(value) && this.mapData.type === MapType.MAP) {
            return false
          }
          return true
        }
      },
      isValidPrice(value) {
        const { type, price } = this.mapData
        if (type === MapType.NON_MAP) {
          return true
        }
        return type === MapType.MAP && price
      }
    }
  }
}
</script>
