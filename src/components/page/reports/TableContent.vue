<template>
  <b-card :header="caption">
    <template v-slot:header>
      <p class="my-0 pull-left align-middle report-list-title">
        <i class="icons icon-tag font-weight-bold"></i>
        <strong> {{ caption }}</strong>
      </p>
      <div v-if="getPermissions.module_enabled && getPermissions.permissions.braman" class="pull-right align-middle">
        <b-button-group>
          <router-link :to="{ name: 'MWAddReports', params: { client_id: nav.clientId } }" tag="button" class="btn btn-primary btn-sm">
            <i class="icons icon-plus"></i> Add
          </router-link>
        </b-button-group>
      </div>
    </template>
    <b-row>
      <b-col md="4" offset-md="4" class="my-0 mb-4">
        <b-form-group class="mb-0">
          <b-input-group class="search cancel-action">
            <b-form-input
              placeholder="Enter report name"
              ref="inputSearch"
              v-model.trim="params.s"
              @keyup.enter="
                params.page = 1
                paramsChange()
              "
            ></b-form-input>
            <i
              v-show="params.s"
              @click="
                params.s = ''
                params.page = 1
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
      :striped="striped"
      :bordered="bordered"
      :small="small"
      outlined
      responsive="sm"
      :items="dataSet.items"
      :fields="captions"
      show-empty
      thead-class="thead-light"
      :no-local-sorting="true"
      @sort-changed="sortChange($event)"
    >
      <template v-slot:empty>
        <div class="empty">There is no data</div>
      </template>
      <template v-slot:cell(name_in_dashboard)="data">
        <p class="mb-0">{{ data.item.name_in_dashboard }}</p>
        <p class="mb-0">True MAP:
          <i :class="data.item.true_map_report ? 'text-success' : 'text-secondary' " class="icon-check icons rounded-circle icon_true_map"></i>
        </p>
        <!--        <p v-show="data.item.marketplace_amazon_com.name" class="mb-0 small">Report: {{data.item.marketplace_amazon_com.name}}</p>-->
        <!--        <p v-show="data.item.marketplace_amazon_ca.name" class="mb-0 small">Amazon.ca: {{data.item.marketplace_amazon_ca.name}}</p>-->
        <!--        <p v-show="data.item.marketplace_google_shopping.name" class="mb-0 small">Google Shopping: {{data.item.marketplace_google_shopping.name}}</p>-->
      </template>
      <template v-slot:cell(active)="row">
        <b-form-checkbox v-model="row.item.active" :disabled="true" switch></b-form-checkbox>
      </template>
      <template v-slot:cell(updated)="row">
        <div class="d-flex flex-column d-flex justify-content-center">
          <span>{{ row.item.updated | formatTime | moment('from') }}</span>
        </div>
      </template>
      <template v-slot:cell(actions)="row" v-if="getPermissions.module_enabled && getPermissions.permissions.braman">
        <b-dropdown id="manage-dropdown" variant="primary" size="sm">
          <template v-slot:button-content> <i class="icon-settings"></i> Manage </template>
          <b-dropdown-item-button @click="handleEditReport(row.item)"> <i class="icon-note "></i> Edit </b-dropdown-item-button>
          <b-dropdown-item-button variant="danger" @click="handleRemoveItems(row.item)"> <i class="icon-close "></i> Remove </b-dropdown-item-button>
        </b-dropdown>
      </template>
      <template v-slot:cell(status)="row">
        <div v-if="row.item.active">
          <div class="alert-primary p-2 mt-2 mb-2" v-for="(item, indexActiveMarketplaces) in row.item.activeMarketplaces" :key="item.key">
            <h6 class="report-marketplace-header">
              {{ item.label }}
            </h6>
            <div data-v-30d88980="" class="d-flex justify-content-between align-items-center">
              <div data-v-30d88980="" role="group" class="btn-group">
                <button
                  :variant="item.info.latest_job && item.info.latest_job.status !== 'running' ? 'warning' : 'secondary'"
                  :disabled="(item.info.latest_job && item.info.latest_job.status === 'running') || !getPermissions.module_enabled || !getPermissions.permissions.braexe || isExceeded(row.item, item.key)"
                  @click="showModalRunJob(row.item, item.value)"
                  data-v-30d88980=""
                  type="button"
                  class="btn btn-warning btn-sm"
                >
                  <i data-v-30d88980="" class="icon-control-play icons"></i> Run
                </button>
              </div>
              <div class="d-flex align-items-center" v-if="item.info.last_job_created && item.info.latest_job && item.info.latest_job.status === 'running'">
                <b-spinner small class="custom_icon"></b-spinner>
                <span class="job-progress badge badge-secondary ml-1">{{ item.info.latest_job.progress }}%</span>
              </div>
              <div class="d-flex align-items-center" v-else>
                <i class="icon-info icons custom_icon" v-if="item.info.last_job_created && item.info.latest_job && item.info.latest_job.status === ''"></i>
                <i class="icon-check icons rounded-circle bg-success custom_icon" v-if="item.info.last_job_created && item.info.latest_job && item.info.latest_job.status === 'success'"></i>
                <i class="icon-close icons text-danger custom_icon" v-if="item.info.last_job_created && item.info.latest_job && item.info.latest_job.status === 'cancelled'"></i>
                <i class="icon-ghost icons text-danger custom_icon" v-if="item.info.last_job_created && item.info.latest_job && item.info.latest_job.status === 'dead'"></i>
                <i class="fa fa-frown-o text-danger custom_icon" v-if="item.info.last_job_created && item.info.latest_job && item.info.latest_job.status === 'error'"></i>
                <span data-v-30d88980="" class="ml-2 small">
                  {{ !item.info.latest_job || !item.info.last_job_created ? 'No report' : capitalize(item.info.latest_job.status) }}
                </span>
              </div>
              <div class="small" v-if="item.info.last_job_created && item.info.latest_job && typeof item.info.number_processed_map === 'number'">
                {{ item.info.number_processed_map }} / {{ item.info.number_total_map }}
              </div>
              <div class="small" v-else>
                N/A
              </div>
              <b-button-group >
                <button
                        :variant="'primary'"
                        @click="handleExportForJob(row.item, row.index, item.value, indexActiveMarketplaces)"
                        :disabled="row.item.activeMarketplaces[indexActiveMarketplaces].info.isLoad"
                        v-if="item.info.last_job_created && item.info.latest_job && item.info.latest_job.status !== 'running' && item.info.number_processed_map === item.info.number_total_map && (!item.info.all_seller_mode || item.info.all_seller_mode === AllSellerMode.NONE)"
                        data-v-30d88980=""
                        type="button"
                        class="btn btn-primary btn-sm"
                >
                  <i v-if="!row.item.activeMarketplaces[indexActiveMarketplaces].info.isLoad" class="icon-cloud-download icons"></i>
                  <b-spinner v-if="row.item.activeMarketplaces[indexActiveMarketplaces].info.isLoad" label="Spinning" class="icon- btn-loader">{{row.item.activeMarketplaces[indexActiveMarketplaces].info.isLoad}}</b-spinner>
                  Download
                </button>
                <b-dropdown :disabled="row.item.activeMarketplaces[indexActiveMarketplaces].info.isLoad" v-if="item.info.last_job_created && item.info.latest_job && item.info.latest_job.status !== 'running' && item.info.number_processed_map === item.info.number_total_map && (item.info.all_seller_mode && item.info.all_seller_mode !== AllSellerMode.NONE)" id="manage-dropdown" variant="primary" size="sm">
                  <template v-slot:button-content>
                    <i v-if="!row.item.activeMarketplaces[indexActiveMarketplaces].info.isLoad" class="icon-cloud-download icons"></i>
                    <b-spinner v-if="row.item.activeMarketplaces[indexActiveMarketplaces].info.isLoad" label="Spinning" class="icon- btn-loader"></b-spinner>
                    Download
                  </template>
                  <b-dropdown-item-button :disabled="row.item.activeMarketplaces[indexActiveMarketplaces].info.isLoad" @click="handleExportForJob(row.item, row.index, item.value, indexActiveMarketplaces, DashboardFilterSourceType.VIOLATIONS)">
                    Download Violations
                  </b-dropdown-item-button>
                  <b-dropdown-item-button :disabled="row.item.activeMarketplaces[indexActiveMarketplaces].info.isLoad" @click="handleExportForJob(row.item, row.index, item.value, indexActiveMarketplaces, DashboardFilterSourceType.ALL_SELLERS)">
                    Download All Items
                  </b-dropdown-item-button>
                </b-dropdown>
                <button
                        v-if="item.info.last_job_created"
                        type="button"
                        :disabled="isExceeded(row.item, item.key)"
                        @click="handleNavToHistoryMarketplacePage(row.item._id, item.value, row.item.name_in_dashboard)"
                        class="btn btn-secondary btn-sm"
                >
                  <i class="icon-clock icons rounded-circle"></i><div class="ml-1 d-inline">History</div>
                </button>
              </b-button-group>
            </div>
          </div>
        </div>
      </template>
    </b-table>
    <nav class="d-flex justify-content-center" v-if="dataSet.total > dataSet.page_size && dataSet.items.length > 0">
      <b-pagination
        :total-rows="dataSet.total"
        :per-page="params.limit"
        v-model="params.page"
        prev-text="Prev"
        next-text="Next"
        hide-goto-end-buttons
        @change="
          params.page = $event
          paramsChange()
        "
        hide-ellipsis
      />
    </nav>
    <b-modal title="Please confirm" centered v-model="dialog.run" @ok="handleRunJob(selected.run)">
      Are you sure you want to start running the job to get a report?
      <br />
      <br />
      <b-form-checkbox v-model="dialog.force_run" @checked="dialog.force_run">
        Force re-run all MAP (cleanup all today violations and run again)
      </b-form-checkbox>
      <br />
      <b-form-checkbox v-model="dialog.ignore_cache" @checked="dialog.ignore_cache">
        Ignore cache (use the latest marketplace listing)
      </b-form-checkbox>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button size="md" variant="warning" @click="ok()"> <i class="icon-check icons"></i> Yes, I understand &amp; confirm! </b-button>
        <b-button size="md" variant="secondary" @click="cancel()"> <i class="icon-close icons"></i> No </b-button>
      </template>
    </b-modal>
    <b-modal title="Please confirm" centered v-model="dialog.remove" @ok="removeReports(selected.remove)" ok-variant="danger">
      Are you sure you want to delete this report?
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button variant="warning" @click="ok()"> <i class="icon-check"></i> Yes, I understand &amp; confirm! </b-button>
        <b-button variant @click="cancel()"> <i class="icon-close"></i> No </b-button>
      </template>
    </b-modal>
    <b-modal title modal-class="modal-primary mw-modal-custom" ok-title="YES" cancel-title="NO" v-model="dialog.cancel" @ok="handleRun(selected.run)" ok-variant="primary"
      >Are you sure you want to run data processing for this report?</b-modal
    >
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { GET_PERMISSIONS, GET_DEFAULT_PARAMS } from '@/actionTypes.js'
import moment from 'moment'
import _nav from '@/_nav'
import { MarketPlacesResult, DashboardFilterSourceType, AllSellerMode } from '@/constants/Report'
import { get } from 'lodash'

export default {
  name: 'c-table',
  inheritAttrs: false,
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
    removeReports: {
      type: [Function]
    },
    handleEditReport: {
      type: [Function]
    },
    handleRun: {
      type: [Function]
    },
    totalRows: {
      type: Number,
      default: 0
    },
    dataSet: {
      type: [Array, Object]
    },
    handleExportForJob: {
      type: [Function]
    },
    currentPage: {
      type: Number
    }
  },
  data: () => {
    return {
      MarketPlacesResult,
      DashboardFilterSourceType,
      AllSellerMode,
      dialog: {
        remove: false,
        run: false,
        cancel: false,
        ignore_cache: false,
        force_run: false,
        marketplace: ''
      },
      selected: {
        remove: null,
        run: null
      },
      nav: _nav
    }
  },
  computed: {
    ...mapGetters({ getPermissions: `mw/${GET_PERMISSIONS}`, defaultParams: `mw/reports/${GET_DEFAULT_PARAMS}` }),
    captions: function() {
      const { getPermissions, fields } = this
      if (getPermissions.module_enabled && getPermissions.permissions.braman && getPermissions.module_enabled && getPermissions.permissions.braexe) {
        return fields
      } else if (getPermissions.module_enabled && getPermissions.permissions.braman && getPermissions.module_enabled && !getPermissions.permissions.braexe) {
        return fields.filter((f) => f.key !== 'status')
      } else if (getPermissions.module_enabled && !getPermissions.permissions.braman && getPermissions.module_enabled && getPermissions.permissions.braexe) {
        return fields.filter((f) => f.key !== 'actions')
      } else {
        return fields.filter((f) => f.key !== 'actions' && f.key !== 'status')
      }
    },
    capitalize: function() {
      return (str) => str[0].toUpperCase() + str.slice(1)
    },
    params: function() {
      return { ...this.defaultParams } || {}
    }
  },
  methods: {
    handleRemoveItems(item) {
      this.dialog.remove = true
      this.selected.remove = {
        id: item._id,
        name: item.name_in_dashboard
      }
    },
    paramsChange() {
      this.$emit('paramsChange', this.params)
    },
    handleNavToHistoryMarketplacePage(reportId, marketplace, name) {
      this.$router.push({
        name: 'MWReportMarketplaceHistory',
        params: { client_id: this.nav.clientId },
        query: {
          report_id: reportId,
          marketplace: marketplace,
          name: name
        }
      })
    },
    sortChange(event) {
      this.params.sort_by = event.sortBy
      if (event.sortBy) {
        this.params.sort_dir = event.sortDesc ? 'desc' : 'asc'
      } else {
        this.params.sort_dir = null
      }
      this.paramsChange()
    },
    showModalRunJob(item, marketplace) {
      this.dialog.run = true
      this.selected.run = item
      this.dialog.marketplace = marketplace
    },
    handleRunJob(selectedItem) {
      this.handleRun(selectedItem, { ignore_cache: this.dialog.ignore_cache, force_run: this.dialog.force_run, marketplace: this.dialog.marketplace })
      this.dialog.ignore_cache = false
      this.dialog.force_run = false
    },
    isExceeded(item, key) {
      if (key.includes('amazon')) {
        return !get(item, 'ready_for_amazon_scraping', true)
      } else {
        return !get(item, 'ready_for_google_scraping', true)
      }
    }
  },
  filters: {
    formatTime: function(time) {
      return moment(time).format()
    }
  },
  mounted() {
    this.params.page = this.$route.query.page ? this.$route.query.page : 1
  }
}
</script>

<style lang="scss" scoped>
.report-list-title {
  position: relative;
  top: 4px;
}
.report-marketplace-header {
  padding: 0;
  margin: 0;
  text-align: left;
  margin-bottom: 5px;
}
#manage-dropdown /deep/ ul {
  min-width: 50px;
}
::v-deep .col-manage {
  width: 50px;
}
::v-deep .custom_icon {
  border-width: 1px;
}
::v-deep .icon_true_map {
  margin-top: 1px;
  position: absolute;
  margin-left: 5px;
  font-size: 17px;
}
::v-deep .job-progress {
  font-weight: normal;
}
</style>
