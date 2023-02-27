<template>
  <b-card :header="caption">
    <template v-slot:header>
      <p class="po-list-title my-0 pull-left align-middle map-list-title">
        <strong><i class="icon-book-open icons"></i>
        {{ caption }}</strong>
      </p>
      <div class="card-header-actions">
        <div class="btn-close">
          <b-button variant="secondary" class="btn btn-block" size="sm" @click="backToListReports()"> <i class="icon-arrow-left-circle icons"></i> Back </b-button>
        </div>
      </div>
    </template>
    <b-table
      :dark="dark"
      :hover="hover"
      striped
      :small="small"
      outlined
      responsive="sm"
      thead-class="thead-light text-nowrap"
      :items="getItems"
      :fields="captions"
      show-empty
      class="overflow-auto"
    >
      <template v-slot:empty>
        <LoadingSpinner :isLoading="historyLoading" v-if="historyLoading"/>
        <div class="align-middle d-flex justify-content-center align-items-center" v-else>No History</div>
      </template>
      <template v-slot:head(date)="data">
        <span>
          <i class="icon-clock icons rounded-circle"></i> <span class="ml-2">{{ data.label }}</span>
        </span>
      </template>
      <template v-slot:cell(date)="data">
        <div>
          {{ [ data.item.date_string, "YYYYMMDD" ] | moment('MM/DD/YYYY') }}
        </div>
      </template>
      <template v-slot:cell(total)="data">
        <div>
          {{ data.item.number_total_map  }}
        </div>
      </template>
      <template v-slot:cell(completed)="data">
        <div>
          {{ data.item.number_completed_map  }} ({{ data.item.percent_completed_map }}%)
        </div>
      </template>
      <template v-slot:cell(download)="data">
        <b-dropdown text="Actions" variant="primary" size="sm" v-if="data.item.percent_completed_map < 100">
          <b-dropdown-item-button  v-for="item in data.item.source_types" v-bind:key="item.source_type" @click="handleDownloadViolations(data.item, item.source_type)">
            <i class="icons icon-cloud-download"></i> {{upperText(item.source_type)}}
          </b-dropdown-item-button>
        </b-dropdown>
        <b-dropdown text="Actions" variant="primary" size="sm" v-else-if="data.item.source_types.length > 0">
          <b-dropdown-item v-for="item in data.item.source_types" v-bind:key="item.source_type" :href="item.link" target="_self">
            <i class="icons icon-cloud-download"></i> {{upperText(item.source_type)}}
          </b-dropdown-item>
        </b-dropdown>
        <div v-else>No violations</div>
      </template>
    </b-table>
    <nav
      class="d-flex justify-content-center"
      v-if="listHistories.total > listHistories.page_size && listHistories.items.length > 0"
    >
      <b-pagination
              :total-rows="listHistories.total"
              :per-page="params.limit"
              v-model="params.page"
              prev-text="Prev"
              next-text="Next"
              hide-goto-end-buttons
              @change="params.page = $event, paramsChange()"
              hide-ellipsis
      />
    </nav>
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vToasted from '@/shared/notification'
import * as TYPE from '@/actionTypes.js'
import { GoogleShoppingGPIDStatus } from '@/constants/Map'
import _ from 'lodash'
import _nav from '@/_nav'
import { MW_API } from '@/service/'
import * as utils from '@/shared/utils'
import * as URL from '@/service/_constant'
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
    },
    historyLoading: {
      type: Boolean
    }
  },
  data: () => {
    return {
      GoogleShoppingMapStatus: GoogleShoppingGPIDStatus,
      listUniqReportId: [],
      nav: _nav,
      mapId: null,
      currentItem: {
        currentMapItem: null,
        currentDiscoveredGpidItem: null
      },
      selectedMaps: []
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: `mw/${TYPE.GET_PERMISSIONS}`,
      defaultParams: `mw/reports/${TYPE.GET_REPORT_MARKETPLACE_HISTORY_DEFAULT_PARAMS}`,
      defaultAmazonMapParams: `mw/maps/${TYPE.GET_DEFAULT_AMAZON_MAP_PARAMS}`,
      reportList: `mw/reports/${TYPE.GET_LIST_REPORTS}`,
      gsReportList: `mw/reports/${TYPE.GET_VALID_GS_REPORTS}`,
      listHistories: `mw/reports/${TYPE.GET_REPORT_MARKETPLACE_HISTORY}`
    }),
    params: function() {
      console.log(this.defaultParams)
      return { ...this.defaultParams } || {}
    },
    getItems: function() {
      return this.listHistories.items
    },
    captions: function() {
      const { fields } = this
      return fields
    }
  },
  components: {
    LoadingSpinner
  },
  methods: {
    ...mapActions({
    }),
    upperText(text) {
      console.log(text)
      if (!_.isEmpty(text)) {
        return _.upperCase(text)
      }
      return ''
    },
    paramsChange() {
      this.$emit('paramsChange', this.params)
    },
    async handleDownloadViolations(report, source) {
      let toast = this.$toasted.show('Downloading...', {
        theme: 'outline',
        position: 'top-center',
        iconPack: 'custom-class',
        className: 'cpbo-toast-export',
        icon: {
          name: 'fa fa-spinner fa-spin fa-fw',
          after: false
        },
        duration: null
      })
      try {
        const payload = {
          report_id: report.report_id,
          marketplace: report.marketplace,
          date: report.date,
          source
        }
        const fileUri = await MW_API.get(`${URL.GET_VIOLATION_MARKETPLACE_HISTORY()}?${utils.buildUrlQueryString(payload)}`)
        toast.goAway(1500)
        window.location.href = fileUri.data
      } catch (e) {
        toast.goAway(1500)
        this.vToasted('error', e)
      }
    },
    backToListReports() {
      if (window.history.length > 1) {
        this.$router.back()
      } else {
        this.$router.push({ name: 'MWListReports', params: { client_id: this.nav.clientId } })
      }
    }
  }
}
</script>

<style lang="scss">
  .map-list-title{
    position: relative;
    top: 4px;
  }
  .dropdown-action {
    margin: 0 !important;
  }
  .max-width-300{
    max-width: 300px;
  }
  .card-header-actions {
    margin-right: 0 !important
  }
</style>
