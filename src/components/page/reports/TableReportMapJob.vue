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
              v-model.trim="inputSearch"
              @keyup.enter="
                params.page = 1
                paramsChange()
              "
            ></b-form-input>
            <i
              v-show="inputSearch"
              @click="
                inputSearch = ''
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
        <LoadingSpinner :isLoading="reportLoading" v-if="reportLoading"/>
        <div class="align-middle d-flex justify-content-center align-items-center" v-else>There is no data</div>
      </template>
      <template v-slot:cell(name_in_dashboard)="data">
        <p class="mb-3 font-weight-bold">{{ data.item.name_in_dashboard }}</p>
        <p class="mb-0 d-flex align-items-center">True MAP:
          <i :class="data.item.true_map_report ? 'text-success' : 'text-secondary' " class="icon-check icons rounded-circle icon_true_map"></i>
        </p>
        <p class="mb-0 d-flex align-items-center">Screenshot:
          <i :class="!data.item.ignore_screenshot ? 'text-success' : 'text-secondary' " class="icon-check icons rounded-circle icon_true_map"></i>
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
        <!-- <b-dropdown id="manage-dropdown" variant="primary" size="sm">
          <template v-slot:button-content> <i class="icon-settings"></i> Manage </template>
          <b-dropdown-item-button @click="handleEditReport(row.item)"> <i class="icon-note "></i> Edit </b-dropdown-item-button>
          <b-dropdown-item-button variant="danger" @click="handleRemoveItems(row.item)"> <i class="icon-close "></i> Remove </b-dropdown-item-button>
        </b-dropdown> -->
        <b-dropdown variant="primary" size="sm" split text="Edit" @click="handleEditReport(row.item)" class="drp-actions">
          <b-dropdown-item variant="danger" @click="handleRemoveItems(row.item)">
            <i class="icon-trash cls-icon-trash"></i>Remove
          </b-dropdown-item>
        </b-dropdown>
      </template>
      <template v-slot:cell(status)="row">
        <div v-if="row.item.active">
          <div class="alert-primary p-2 mt-2 mb-2" v-for="(item, indexActiveMarketplaces) in row.item.activeMarketplaces" :key="item.key">
            <h6 class="report-marketplace-header">
              {{ item.label }}
            </h6>
            <div data-v-30d88980="" class="row d-flex align-items-center">
              <div data-v-30d88980="" role="group" class="col-4 btn-group btn-group-start">
                <button
                  v-if="item.info.last_job_status && item.info.last_job_status === 'running'"
                  @click="showModalCancelReport(row.item, item.value)"
                  type="button"
                  class="btn btn-danger btn-sm"
                >
                  <i class="icon-ban"></i> Cancel
                </button>
                <button
                  v-else
                  :variant="item.info.last_job_status && (item.info.last_job_status !== 'running') ? 'warning' : 'secondary'"
                  :disabled="!getPermissions.module_enabled || !getPermissions.permissions.braexe || isExceeded(row.item, item.key)"
                  @click="showModalRunJob(row.item, item.value)"
                  data-v-30d88980=""
                  type="button"
                  class="btn btn-warning btn-sm"
                >
                  <i data-v-30d88980="" class="icon-control-play icons"></i> Run
                </button>
                <button
                  type="button"
                  class="btn  btn-secondary btn-sm"
                  @click="showReportSchedulerModal(row.item, item.value, item.info)"
                >
                  <i :class="!item.info.schedule_mode || item.info.schedule_mode === 'daily' ? 'icon-clock' : 'icon-user'" class="icons rounded-circle"></i><div class="ml-1 d-inline">Options</div>
                </button>
              </div>
              <div class="col-3 d-flex justify-content-start align-items-center" v-if="item.info.last_job_status && item.info.last_job_status === 'running'">
                <b-spinner small class="custom_icon"></b-spinner>
                <span class="job-progress badge badge-secondary ml-1">{{ item.info.last_job_progress }}%</span>
              </div>
              <div class="col-3 d-flex justify-content-start align-items-center" v-else>
                <i class="icon-check icons rounded-circle bg-success custom_icon" v-if="item.info.last_job_status && item.info.last_job_status === 'success'"></i>
                <i class="icon-close icons text-danger custom_icon" v-if="item.info.last_job_status && item.info.last_job_status === 'cancelled'"></i>
                <i class="icon-ghost icons text-danger custom_icon" v-if="item.info.last_job_status && item.info.last_job_status === 'dead'"></i>
                <i class="fa fa-frown-o text-danger custom_icon" v-if="item.info.last_job_status && item.info.last_job_status === 'error'"></i>
                <i class="icon-clock icons rounded-circle alert-primary custom_icon" v-if="!item.info.last_job_status" />
                <span data-v-30d88980="" class="ml-2 small">
                  {{ !item.info.last_job_status ? 'Pending' : capitalize(item.info.last_job_status) }}
                </span>
              </div>
              <div class="col-2 small" v-if="item.info.last_job_status && typeof item.info.number_processed_map === 'number'">
                {{ item.info.number_processed_map | formatNumber }} / {{ item.info.number_total_map | formatNumber }}
              </div>
              <div class="col-2 small" v-else>
                N/A
              </div>
              <b-button-group class="col-3 btn-group-end">
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
                  type="button"
                  @click="handleNavToHistoryMarketplacePage(row.item._id, item.value, row.item.name_in_dashboard)"
                  class="btn btn-secondary btn-sm"
                >
                  <i class="icon-clock icons rounded-circle"></i><div class="ml-1 d-inline">History</div>
                </button>
              </b-button-group>
            </div>
            <div class="mt-2" v-if="item.key.includes('amazon')">
              <h6 class="report-marketplace-header">
                Inventory
              </h6>
              <div class="row d-flex align-items-center">
                <div role="group" class="col-4 btn-group btn-group-start">
                  <button
                    v-if="isRunInventory(item.info)"
                    @click="showModalRunInventory(row.item, item.value)"
                    type="button"
                    class="btn btn-warning btn-sm"
                  >
                    <i class="icon-control-play icons"></i> Run
                  </button>
                  <button
                    v-else
                    @click="showModalCancelInventory(row.item, item.value)"
                    type="button"
                    class="btn btn-danger btn-sm"
                  >
                    <i class="icon-ban"></i> Cancel
                  </button>
                  <button
                    type="button"
                    @click="showModalInventoryScraping(row.item, item.value)"
                    class="btn btn-secondary btn-sm"
                  >
                    <i class="icon-clock icons rounded-circle"></i><div class="ml-1 d-inline">Inventory</div>
                  </button>
                </div>
                <div
                  class="col-3 d-flex justify-content-start align-items-center"
                  v-if="item.info.inventory_schedule &&
                    (item.info.inventory_schedule.status === 'PROCESSING' ||
                    item.info.inventory_schedule.status === 'PREPARING')
                  "
                >
                  <b-spinner small class="custom_icon"></b-spinner>
                  <span class="job-progress badge badge-secondary ml-1">{{ item.info.inventory_schedule.progress_percentage || 0 }}%</span>
                </div>
                <div class="col-3 d-flex justify-content-start align-items-center" v-else>
                  <i class="icon-check icons rounded-circle bg-success custom_icon" v-if="item.info.inventory_schedule && item.info.inventory_schedule.status === 'DONE'"></i>
                  <i class="icon-close icons text-danger custom_icon" v-if="item.info.inventory_schedule && item.info.inventory_schedule.status === 'CANCELLED'"></i>
                  <i class="icon-ghost icons text-danger custom_icon" v-if="item.info.inventory_schedule && item.info.inventory_schedule.status === 'DEAD'"></i>
                  <i class="fa fa-frown-o text-danger custom_icon" v-if="item.info.inventory_schedule && item.info.inventory_schedule.status === 'ERROR'"></i>
                  <i class="icon-clock icons rounded-circle alert-primary custom_icon" v-if="!item.info.inventory_schedule" />
                  <span data-v-30d88980="" class="ml-2 small">
                    {{ !item.info.inventory_schedule ? 'Pending' : capitalize(item.info.inventory_schedule.status) }}
                  </span>
                </div>
                <div class="col-2 small" v-if="item.info.inventory_schedule && typeof item.info.inventory_schedule.price_item_processed === 'number'">
                  {{ item.info.inventory_schedule.price_item_processed | formatNumber }} / {{ item.info.inventory_schedule.price_item_total | formatNumber }}
                </div>
                <div class="col-2 small" v-else>
                  N/A
                </div>
                <b-button-group class="col-3 btn-group-end">
                  <button
                    type="button"
                    @click="handleNavToHistoryInventoryPage(row.item._id, item.value, row.item.name_in_dashboard)"
                    class="btn btn-secondary btn-sm"
                  >
                    <i class="icon-clock icons rounded-circle"></i><div class="ml-1 d-inline">History</div>
                  </button>
                </b-button-group>
              </div>
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
    <b-modal title="Please confirm" centered v-model="dialog.run" @ok="handleRunJob(selected.run)" class="cls-modal-run-marketplace">
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
    <b-modal title="Please confirm" centered v-model="dialog.remove" @ok="removeReports(selected.remove)" ok-variant="danger" class="cls-modal-remove-report">
      Are you sure you want to delete this report?
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button variant="warning" @click="ok()"> <i class="icon-check"></i> Yes, I understand &amp; confirm! </b-button>
        <b-button variant @click="cancel()"> <i class="icon-close"></i> No </b-button>
      </template>
    </b-modal>
    <b-modal title modal-class="modal-primary mw-modal-custom" ok-title="YES" cancel-title="NO" v-model="dialog.cancel" @ok="handleRun(selected.run)" ok-variant="primary"
      >Are you sure you want to run data processing for this report?</b-modal
    >
    <b-modal title="Please confirm" centered v-model="dialog.cancelReportSchedule" @ok="handleCancelReport()" class="cls-modal-cancel">
      Are you sure you want to cancel today data processing of this marketplace?
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button size="md" variant="warning" @click="ok()"> <i class="icon-check icons"></i> Yes </b-button>
        <b-button size="md" variant="secondary" @click="cancel()"> <i class="icon-close icons"></i> No </b-button>
      </template>
    </b-modal>
    <b-modal title="Please confirm!" centered v-model="inventoryDialog.run" @ok="handleRunInventory" class="cls-modal-run-inventory">
      Are you sure you want to start running an inventory investigation for this market today?
      <br />
      <!-- <br />
      Inventory investigation is more expensive than other activities. It's 40 credits per ASIN per seller. -->
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button size="md" variant="warning" @click="ok()"> <i class="icon-check icons"></i> Yes, I understand &amp; confirm! </b-button>
        <b-button size="md" variant="secondary" @click="cancel()"> <i class="icon-close icons"></i> No </b-button>
      </template>
    </b-modal>
    <b-modal title="Cancel inventory investigation" centered v-model="inventoryDialog.cancel" @ok="handleCancelInventory" dialog-class="cancel-modal">
      Please choose the inventory investigation schedules that you want to cancel.
      <br />
      <br />
      <b-form-checkbox v-model="cancelInvScheduleOptions.today" @checked="cancelInvScheduleOptions.today">Today</b-form-checkbox>
      <b-form-checkbox v-model="cancelInvScheduleOptions.up7" @checked="cancelInvScheduleOptions.up7">Upcoming 7 days</b-form-checkbox>
      <b-form-checkbox v-model="cancelInvScheduleOptions.up30" @checked="cancelInvScheduleOptions.up30">Upcoming 30 days</b-form-checkbox>
      <b-form-checkbox v-model="cancelInvScheduleOptions.allUp" @checked="cancelInvScheduleOptions.allUp">All upcoming days</b-form-checkbox>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button size="md" variant="warning" @click="ok()"
          :disabled="!cancelInvScheduleOptions.today && !cancelInvScheduleOptions.up7 && !cancelInvScheduleOptions.up30 && !cancelInvScheduleOptions.allUp"
        > <i class="icon-check icons"></i> Process</b-button>
        <b-button size="md" variant="secondary" @click="cancel()"> <i class="icon-close icons"></i> No </b-button>
      </template>
    </b-modal>
    <InventoryScheduleScrapingModal v-if="inventoryDialog.scraping" @hidden="inventoryDialog.scraping = false" :visible="inventoryDialog.scraping" :info="inventoryDialog.selectedInfo" :marketplace="inventoryDialog.marketplace" class="cls-modal-inventory-investigation"/>
    <b-modal title="Report scheduler" centered v-model="reportSchedulerModal" @ok="handleChangeReportScheduleMode" dialog-class="cancel-modal" class="cls-modal-shedule">
      <span>Mode</span>
      <b-form-select v-model="reportScheduleMode" :options="reportScheduleOptions" class="report-schedule-select"></b-form-select>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button size="md" variant="warning" @click="ok()"> <i class="icon-check icons"></i> Save</b-button>
        <b-button size="md" variant="secondary" @click="cancel()"> <i class="icon-close icons"></i> Close</b-button>
      </template>
    </b-modal>
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vToasted from '@/shared/notification'
import {
  GET_PERMISSIONS,
  GET_DEFAULT_PARAMS,
  RUN_AN_INVENTORY,
  CANCEL_AN_INVENTORY,
  REMOVE_INVENTORY_SCHEDULES,
  CHANGE_REPORT_SCHEDULE_MODE,
  CANCEL_A_REPORT
} from '@/actionTypes.js'
import moment from 'moment'
import _nav from '@/_nav'
import { MarketPlacesResult, DashboardFilterSourceType, AllSellerMode } from '@/constants/Report'
import { get, isEmpty } from 'lodash'
import InventoryScheduleScrapingModal from './InventoryScheduleScrapingModal.vue'
import LoadingSpinner from '@/components/common/LoadingSpinner'

export default {
  name: 'c-table',
  components: {
    InventoryScheduleScrapingModal,
    LoadingSpinner
  },
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
    },
    reportLoading: {
      type: Boolean
    }
  },
  mixins: [vToasted],
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
        marketplace: '',
        cancelReportSchedule: false
      },
      selected: {
        remove: null,
        run: null
      },
      nav: _nav,
      inventoryDialog: {
        run: false,
        cancel: false,
        scraping: false,
        selectedInfo: null,
        marketplace: ''
      },
      cancelInvScheduleOptions: {
        today: false,
        up7: false,
        up30: false,
        allUp: false
      },
      reportScheduleOptions: [
        { value: 'daily', text: 'Daily' },
        { value: 'manually', text: 'Manually' }
      ],
      reportScheduleMode: 'daily',
      reportSchedulerModal: false,
      inputSearch: null
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
      return (str) => {
        if (str) {
          const lowcaseString = str.toLowerCase()
          return lowcaseString[0].toUpperCase() + lowcaseString.slice(1)
        }
        return str
      }
    },
    params: function() {
      return { ...this.defaultParams } || {}
    }
  },
  methods: {
    ...mapActions({
      runInventory: `mw/reports/${RUN_AN_INVENTORY}`,
      cancelInventory: `mw/reports/${CANCEL_AN_INVENTORY}`,
      removeInventorySchedules: `mw/reports/${REMOVE_INVENTORY_SCHEDULES}`,
      changeReportScheduleMode: `mw/reports/${CHANGE_REPORT_SCHEDULE_MODE}`,
      cancelReport: `mw/reports/${CANCEL_A_REPORT}`
    }),
    handleRemoveItems(item) {
      this.dialog.remove = true
      this.selected.remove = {
        id: item._id,
        name: item.name_in_dashboard
      }
    },
    paramsChange() {
      this.params.s = this.inputSearch
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
    async handleRunJob(selectedItem) {
      await this.handleRun(selectedItem, { ignore_cache: this.dialog.ignore_cache, force_run: this.dialog.force_run, marketplace: this.dialog.marketplace })
      this.dialog.ignore_cache = false
      this.dialog.force_run = false
      this.paramsChange()
    },
    isExceeded(item, key) {
      if (key.includes('amazon')) {
        return !get(item, 'ready_for_amazon_scraping', true)
      } else {
        return !get(item, 'ready_for_google_scraping', true)
      }
    },
    showModalRunInventory(item, marketplace) {
      this.inventoryDialog.run = true
      this.inventoryDialog.selectedInfo = item
      this.inventoryDialog.marketplace = marketplace
    },
    showModalCancelInventory(item, marketplace) {
      this.inventoryDialog.cancel = true
      this.inventoryDialog.selectedInfo = item
      this.inventoryDialog.marketplace = marketplace
      this.cancelInvScheduleOptions = {
        today: false,
        up7: false,
        up30: false,
        allUp: false
      }
    },
    showModalInventoryScraping(item, marketplace) {
      this.inventoryDialog.scraping = true
      this.inventoryDialog.selectedInfo = item
      this.inventoryDialog.marketplace = marketplace
    },
    handleNavToHistoryInventoryPage(reportId, marketplace, name) {
      this.$router.push({
        name: 'MWReportInventoryHistory',
        params: { client_id: this.nav.clientId },
        query: {
          report_id: reportId,
          marketplace: marketplace,
          name: name
        }
      })
    },
    handleRunInventory() {
      this.runInventory(this.inventoryDialog).then(() => {
        this.vToasted('success', 'Inventory investigation has been started.')
      }).catch((err) => {
        if (err.response.data.statusCode === 403) {
          this.vToasted('error', err.response.data.message)
        } else {
          this.vToasted('error', 'Could not run inventory investigation for this report/marketplace today.')
        }
      })
    },
    async handleCancelInventory() {
      let cancelTodayRes = true
      let cancelUpcomingRes = true
      // Cancel today schedule
      if (this.cancelInvScheduleOptions.today) {
        await this.cancelInventory(this.inventoryDialog).then(() => {
          cancelTodayRes = true
        }).catch(() => {
          cancelTodayRes = false
          this.vToasted('error', 'Could not run inventory cancellation for this report/marketplace today.')
        })
      }
      // Remove upcoming schedule
      if (this.cancelInvScheduleOptions.up7 || this.cancelInvScheduleOptions.up30 || this.cancelInvScheduleOptions.allUp) {
        let from = moment().add(1, 'days')
        let to = moment(from).add(6, 'days')
        if (this.cancelInvScheduleOptions.up30) to = moment(from).add(29, 'days')
        if (this.cancelInvScheduleOptions.allUp) to = null
        await this.removeInventorySchedules({
          report_id: this.inventoryDialog.selectedInfo._id,
          marketplace: this.inventoryDialog.marketplace,
          from: from.format('YYYY-MM-DD'),
          to: to ? to.format('YYYY-MM-DD') : null
        }).then(() => {
          cancelUpcomingRes = true
        }).catch(() => {
          cancelUpcomingRes = false
          this.vToasted('error', 'Could not remove upcoming inventory schedules.')
        })
      }
      if (cancelTodayRes && cancelUpcomingRes) {
        this.vToasted('success', 'Inventory investigations has been cancelled.')
      }
    },
    isRunInventory(item) {
      const runableStatus = ['PENDING', 'CANCELLED', 'DONE']
      return isEmpty(item.inventory_schedule) || runableStatus.includes(item.inventory_schedule.status)
    },
    showReportSchedulerModal(item, marketplace, marketplaceInfo) {
      this.inventoryDialog.selectedInfo = item
      this.inventoryDialog.marketplace = marketplace
      this.reportScheduleMode = marketplaceInfo.schedule_mode || 'daily'
      this.reportSchedulerModal = true
    },
    handleChangeReportScheduleMode() {
      const params = {
        report_id: this.inventoryDialog.selectedInfo._id,
        marketplace: this.inventoryDialog.marketplace,
        mode: this.reportScheduleMode
      }
      this.changeReportScheduleMode(params).then(() => {
        this.paramsChange()
        this.vToasted('success', 'Change report schedule mode successfully.')
      }).catch(() => {
        this.vToasted('error', 'Could not change report schedule mode.')
      })
    },
    showModalCancelReport(item, marketplace) {
      this.dialog.cancelReportSchedule = true
      this.inventoryDialog.selectedInfo = item
      this.inventoryDialog.marketplace = marketplace
    },
    handleCancelReport() {
      const params = {
        report_id: this.inventoryDialog.selectedInfo._id,
        marketplace: this.inventoryDialog.marketplace
      }
      this.cancelReport(params).then(() => {
        this.paramsChange()
        this.vToasted('success', 'Today data processing has been cancelled successfully.')
      }).catch(() => {
        this.vToasted('error', 'Oops! Today data processing could not be cancelled.')
      })
    },
    async checkCondition() {
      if (this.dataSet.items.length === 0 && this.params.page > 1) {
        this.params.page--
        await this.paramsChange()
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
    this.params.s = this.$route.query.s ? this.$route.query.s : ''
    this.inputSearch = this.params.s
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
::v-deep .cancel-modal {
  max-width: 510px !important;
  .custom-checkbox {
    padding-bottom: 0.5rem;
  }
}
#manage-dropdown /deep/ ul {
  min-width: 50px;
}
::v-deep .col-manage {
  width: 90px;
}
::v-deep .custom_icon {
  border-width: 1px;
}
::v-deep .icon_true_map {
  margin-left: 5px;
  font-size: 17px;
}
::v-deep .job-progress {
  font-weight: normal;
}
.btn-group {
  display: inline-block;
  &.btn-group-start {
    text-align: start;
  }
  &.btn-group-end {
    text-align: end;
  }
}
.report-schedule-select {
  width: 25%;
  margin-left: 10px;
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
