<template>
  <div class="animated fadeIn">
    <div class="widgets-container">
      <div class="align-middle d-flex justify-content-center align-items-center spinner-container" v-if="!sdkConfigInitialized">
        <div class="spinner-border thin-spinner spinner-border-sm thin-spinner"></div>&nbsp;Loading...
      </div>
      <!--dashboard sdk will be rendered where, DON'T change the class-->
      <cbpo-dashboard v-if="sdkConfigInitialized" :key="sdkConfigForceReload" config-ref="ms_dashboard_main_config" class="mw-sdk-styled"/>
    </div>
    <div class="cbpo-s form-group mw-dashboard-control-select mb-0" :class="{ 'pt-0': sdkConfigInitialized }" v-if="sdkConfigInitialized">
      <label>Date:</label>
      <select v-model="selectedDate" @change="dateChange($event)" class="form-control">
        <template v-for="(date, i) in dates">
          <option :value="date" :key="i">{{date}}</option>
        </template>
      </select>
    </div>
  </div>
</template>
<script>
import * as TYPE from '@/actionTypes.js'
import PermissionsMixin from '@/components/common/PermissionsMixin'
import $ from 'jquery'
import _ from 'lodash'
import {mapActions, mapGetters} from 'vuex'
import {DashboardFilterSourceType} from '@/constants/Report'
import {
  DashboardAllSellerTitle,
  DashboardViolatorTitle,
  DashboardViolatorTitleNoTrueMap,
  DashboardWidgetId
} from '@/constants/Dashboard'
import configDailyViolator from '@/store/modules/page/dashboard/configs/daily-violator'
import configRepeatOffender from '@/store/modules/page/dashboard/configs/repeat-offenders'
import dailyViolatorWithInventory from '@/store/modules/page/dashboard/configs/daily-violator-with-inventory'
import vToasted from '@/shared/notification'
import config1stTimeViolator from '@/store/modules/page/dashboard/configs/new-1st-time-violator'
import config2ndTimeViolator from '@/store/modules/page/dashboard/configs/new-2nd-time-violator'

export default {
  props: ['selected'],
  mixins: [PermissionsMixin, vToasted],
  data: () => ({
    dashboardFilterSourceType: _.cloneDeep(DashboardFilterSourceType),
    dashboardAllSellerTitle: _.cloneDeep(DashboardAllSellerTitle),
    dashboardViolatorTitle: _.cloneDeep(DashboardViolatorTitle),
    dashboardViolatorTitleNoTrueMap: _.cloneDeep(DashboardViolatorTitleNoTrueMap),
    dashboardWidgetId: _.cloneDeep(DashboardWidgetId),
    dates: [],
    selectedDate: null,
    sdkConfigInitialized: false,
    sdkConfigForceReload: 0,
    violationDataSourceConnection: {
      client_id: null,
      type: 'vio', // violation
      ds_external_id: null
    },
    violationInvDataSourceConnection: {
      client_id: null,
      type: 'vio_inv', // violation with inventory
      ds_external_id: null
    },
    violationRepeatOffenderConnection: {
      client_id: null,
      type: 'vio_offender',
      ds_external_id: null
    },
    violation1st2ndDataSourceConnection: {
      client_id: null,
      type: 'vio_1st_2nd_time',
      ds_external_id: null
    }
  }),
  computed: {
    ...mapGetters({
      getPermissions: `mw/${TYPE.GET_PERMISSIONS}`,
      dataViolator: `mw/dashboard/${TYPE.GET_DATA_VIOLATOR}`,
      dataViolatorWithInventory: `mw/dashboard/${TYPE.GET_DATA_VIOLATOR_WITH_INVENTORY}`,
      dataTopViolatedProductViolator: `mw/dashboard/${
        TYPE.GET_DATA_TOP_VIOLATED_PRODUCTS_7D
      }`,
      dataNew1stTimeViolator: `mw/dashboard/${TYPE.GET_DATA_NEW_1ST_TIME}`,
      dataNew2ndTimeViolator: `mw/dashboard/${TYPE.GET_DATA_NEW_2ND_TIME}`,
      dataSellerViolations7d: `mw/dashboard/${TYPE.GET_DATA_SELLER_VIOLATIONS_7D}`,
      dataAvgPercentageOffMap: `mw/dashboard/${
        TYPE.GET_DATA_AVG_PERCENTAGE_OFF_MAP
      }`,
      dataNewRepeatViolators: `mw/dashboard/${TYPE.GET_DATA_NEW_REPEAT_VIOLATORS}`,
      dataAllRepeatOffenders: `mw/dashboard/${TYPE.GET_DATA_ALL_REPEAT_OFFENDERS}`,
      mainConfig: `mw/dashboard/${TYPE.GET_DATA_CONFIG_VIOLATOR}`,
      downloadDailyLoader: `mw/dashboard/${TYPE.GET_DOWNLOAD_DAILY_LOADER}`,
      downloadNewRepeatLoader: `mw/dashboard/${TYPE.GET_DOWNLOAD_NEW_REPEAT_LOADER}`,
      dataDateHistorical: `mw/dashboard/${TYPE.GET_DATE_HISTORICAL}`,
      orgIs: `mw/${TYPE.GET_ORG_IS}`
    })
  },
  methods: {
    ...mapActions({
      fetchDataViolator: `mw/dashboard/${TYPE.FETCH_DATA_VIOLATOR}`,
      fetchAllWidgetData: `mw/dashboard/${TYPE.FETCH_ALL_WIDGET}`,
      fetchDataDailyWithInventoryViolator: `mw/dashboard/${TYPE.FETCH_DATA_VIOLATOR_WITH_INVENTORY}`,
      fetchDataTopViolatedProduct: `mw/dashboard/${
        TYPE.FETCH_DATA_TOP_VIOLATED_PRODUCTS_7D
      }`,
      fetchDataNew1stTimeViolator: `mw/dashboard/${TYPE.FETCH_DATA_NEW_1ST_TIME}`,
      fetchDataNew2ndTimeViolator: `mw/dashboard/${TYPE.FETCH_DATA_NEW_2ND_TIME}`,
      fetchDataSellerViolations7d: `mw/dashboard/${
        TYPE.FETCH_DATA_SELLER_VIOLATIONS_7D
      }`,
      fetchDataAvgPercentageOffMap: `mw/dashboard/${
        TYPE.FETCH_DATA_AVG_PERCENTAGE_OFF_MAP
      }`,
      fetchDataNewRepeatViolators: `mw/dashboard/${
        TYPE.FETCH_DATA_NEW_REPEAT_VIOLATORS
      }`,
      fetchDataAllRepeatOffenders: `mw/dashboard/${
        TYPE.FETCH_DATA_ALL_REPEAT_OFFENDERS
      }`,
      getDsMaps: `mw/dashboard/${TYPE.GET_DS_MAPS}`,
      downloadDailyViolations: `mw/dashboard/${TYPE.FETCH_DOWNLOAD_DAILY_VIOLATIONS}`,
      downloadNewRepeatViolators: `mw/dashboard/${TYPE.FETCH_DOWNLOAD_NEW_REPEAT_VIOLATORS}`,
      downloadDailyViolationsWithInventory: `mw/dashboard/${TYPE.FETCH_DOWNLOAD_DAILY_VIOLATIONS_WITH_INVENTORY}`,
      fetchDataDateHistorical: `mw/dashboard/${TYPE.FETCH_DATE_HISTORICAL}`,
      setSelectedDate: `mw/dashboard/${TYPE.SET_SELECTED_DATE}`
    }),
    syncMarketplaceParams(marketplace) {
      return _.includes(marketplace, 'amazon') ? marketplace.replace(/[_]/g, '.') : marketplace
    },
    handleDataViolator(marketplace) {
      return new Promise((resolve, reject) => {
        this.fetchDataViolator(this.useShareTokenIfNeed({
          date: this.selectedDate,
          marketplace: marketplace,
          report_id: this.selected.report._id,
          seller_type: this.selected.seller_type,
          fulfillment: this.selected.fulfillment,
          show_upc_in_dashboard: this.selected.report.show_upc_in_dashboard
        })).then(() => {
          let fakeDaily = { ...this.dataViolator }
          fakeDaily = this.emptyRowData(fakeDaily, this.getIgnoredColumnsDaily(this.selected.report))
          if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
            fakeDaily = this.removeColumnData(fakeDaily, ['upc/ean'])
          }
          window.mw_dashboard_main_daily_visitors = fakeDaily
          resolve()
        })
      })
    },
    /**
     * Use share token
     * Add needed source param
     */
    useShareTokenIfNeed(object) {
      if (this.selected.share_token) {
        _.assign(object, { share_token: this.selected.share_token })
      }
      _.assign(object, { source: this.selected.source })
      _.assign(object, { is_true_map: !!this.selected.report.true_map_report })
      return object
    },
    getIgnoredColumnsDaily(report) {
      let ignoredColumns = []
      if (report && report.ignore_screenshot) {
        ignoredColumns.push('screenshot', 'captured_at')
      }
      if (report && report.ignore_price_tracking) {
        ignoredColumns.push('map_price', 'diff', 'diff_percent')
      }
      if (report && this.selected.marketplace === 'google_shopping') {
        ignoredColumns.push('fba', 'prime')
      }
      return ignoredColumns
    },
    handleDataDailyWithInventoryViolator(marketplace) {
      return new Promise((resolve, reject) => {
        this.fetchDataDailyWithInventoryViolator({
          date: this.selectedDate,
          marketplace: marketplace,
          report_id: this.selected.report._id,
          seller_type: this.selected.seller_type,
          fulfillment: this.selected.fulfillment,
          show_upc_in_dashboard: this.selected.report.show_upc_in_dashboard,
          source: this.selected.source,
          is_true_map: !!this.selected.report.true_map_report
        })
          .then(() => {
            let fakeDaily = { ...this.dataViolatorWithInventory }
            fakeDaily = this.emptyRowData(fakeDaily, this.getIgnoredColumnsDaily(this.selected.report))
            if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
              fakeDaily = this.removeColumnData(fakeDaily, ['upc/ean'])
            }
            window.mw_dashboard_main_daily_with_inventory_visitors = fakeDaily
            resolve()
          })
      })
    },
    handleDataTopViolatedProduct(marketplace) {
      return new Promise((resolve, reject) => {
        this.fetchDataTopViolatedProduct(this.useShareTokenIfNeed({
          date: this.selectedDate,
          marketplace: marketplace,
          report_id: this.selected.report._id,
          seller_type: this.selected.seller_type,
          fulfillment: this.selected.fulfillment
        }))
          .then(() => {
            window.mw_dashboard_top_violated = this.dataTopViolatedProductViolator
            resolve()
          })
      })
    },
    handleDataNew1stTimeViolator(marketplace) {
      return new Promise((resolve, reject) => {
        this.fetchDataNew1stTimeViolator(this.useShareTokenIfNeed({
          date: this.selectedDate,
          marketplace: marketplace,
          report_id: this.selected.report._id,
          seller_type: this.selected.seller_type,
          fulfillment: this.selected.fulfillment,
          show_upc_in_dashboard: this.selected.report.show_upc_in_dashboard
        })).then(() => {
          let fake1stData = { ...this.dataNew1stTimeViolator }
          fake1stData = this.emptyRowData(fake1stData, this.getIgnoredColumns1st(this.selected.report))
          if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
            fake1stData = this.removeColumnData(fake1stData, ['upc/ean'])
          }
          window.mw_dashboard_new_1st_time = fake1stData
          resolve()
        })
      })
    },
    getIgnoredColumns1st(report) {
      let ignoredColumns = []
      if (report && report.ignore_price_tracking) {
        ignoredColumns.push('map')
      }
      if (report && report.ignore_screenshot) {
        ignoredColumns.push('screenshot')
      }
      return ignoredColumns
    },
    handleDataNew2ndTimeViolator(marketplace) {
      return new Promise((resolve, reject) => {
        this.fetchDataNew2ndTimeViolator(this.useShareTokenIfNeed({
          date: this.selectedDate,
          marketplace: marketplace,
          report_id: this.selected.report._id,
          seller_type: this.selected.seller_type,
          fulfillment: this.selected.fulfillment,
          show_upc_in_dashboard: this.selected.report.show_upc_in_dashboard
        })).then(() => {
          let fake2nd = { ...this.dataNew2ndTimeViolator }
          fake2nd = this.emptyRowData(fake2nd, this.getIgnoredColumns2st(this.selected.report))
          if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
            fake2nd = this.removeColumnData(fake2nd, ['upc/ean'])
          }
          window.mw_dashboard_new_2nd_time = fake2nd
          resolve()
        })
      })
    },
    getIgnoredColumns2st(report) {
      let ignoredColumns = []
      if (report && report.ignore_price_tracking) {
        ignoredColumns.push('map')
      }
      if (report.marketplace === 'google_shopping') {
        ignoredColumns = ['date_violated']
      }
      return ignoredColumns
    },
    handleDataSellerViolations7d(marketplace) {
      return new Promise((resolve, reject) => {
        this.fetchDataSellerViolations7d(this.useShareTokenIfNeed({
          date: this.selectedDate,
          marketplace: marketplace,
          report_id: this.selected.report._id,
          seller_type: this.selected.seller_type,
          fulfillment: this.selected.fulfillment
        }))
          .then(() => {
            window.mw_dashboard_seller_violations_7d = this.dataSellerViolations7d
            resolve()
          })
      })
    },
    handleDataAvgPercentageOffMap(marketplace) {
      return new Promise((resolve, reject) => {
        this.fetchDataAvgPercentageOffMap(this.useShareTokenIfNeed({
          date: this.selectedDate,
          marketplace: marketplace,
          report_id: this.selected.report._id,
          seller_type: this.selected.seller_type,
          fulfillment: this.selected.fulfillment
        }))
          .then(() => {
            let fakeAVGPercent = { ...this.dataAvgPercentageOffMap }
            fakeAVGPercent = this.emptyRowData(fakeAVGPercent, this.getIgnoredColumnsAvgPercent(this.selected.report))
            window.mw_dashboard_avg_percentage_off_map = _.cloneDeep(fakeAVGPercent)
            resolve()
          })
      })
    },
    getIgnoredColumnsAvgPercent(report) {
      let ignoredColumns = []
      if (report && report.ignore_price_tracking) {
        ignoredColumns.push('seller_name', 'average_off_map_percent', 'average_off_map_percent')
      }
      return ignoredColumns
    },
    handleDataAllRepeatOffenders(marketplace) {
      return new Promise((resolve, reject) => {
        this.fetchDataAllRepeatOffenders(this.useShareTokenIfNeed({
          date: this.selectedDate,
          marketplace: marketplace,
          report_id: this.selected.report._id,
          seller_type: this.selected.seller_type,
          fulfillment: this.selected.fulfillment
        }))
          .then(() => {
            window.mw_dashboard_all_repeat_offenders = this.dataAllRepeatOffenders
            resolve()
          })
      })
    },
    handleDataNewRepeatViolators(marketplace) {
      return new Promise((resolve, reject) => {
        this.fetchDataNewRepeatViolators(this.useShareTokenIfNeed({
          date: this.selectedDate,
          marketplace: marketplace,
          report_id: this.selected.report._id,
          seller_type: this.selected.seller_type,
          fulfillment: this.selected.fulfillment,
          show_upc_in_dashboard: this.selected.report.show_upc_in_dashboard
        })).then(() => {
          let fakeNewRepeat = { ...this.dataNewRepeatViolators }
          fakeNewRepeat = this.emptyRowData(fakeNewRepeat, this.getIgnoredColumnsNewRepeat(this.selected.report))
          if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
            fakeNewRepeat = this.removeColumnData(fakeNewRepeat, ['upc/ean'])
          }
          window.mw_dashboard_new_repeat_violators = fakeNewRepeat
          resolve()
        })
      })
    },
    getIgnoredColumnsNewRepeat(report) {
      let ignoredColumns = []
      if (report && report.ignore_price_tracking) {
        ignoredColumns.push('map', 'diff_percent')
      }
      return ignoredColumns
    },
    handlePrepareApisForData(isOeUser, marketplace) {
      let apis = [
        this.handleDataViolator(marketplace),
        this.handleDataTopViolatedProduct(marketplace),
        this.handleDataSellerViolations7d(marketplace),
        this.handleDataAvgPercentageOffMap(marketplace),
        this.handleDataNew1stTimeViolator(marketplace),
        this.handleDataNew2ndTimeViolator(marketplace),
        this.handleDataNewRepeatViolators(marketplace),
        this.handleDataAllRepeatOffenders(marketplace)
      ]
      if (isOeUser) {
        apis.push(this.handleDataDailyWithInventoryViolator(marketplace))
      }
      return apis
    },
    handlePrepareApisForDataOptimized(isOeUser, marketplace) {
      return [
        this.fetchAllWidgetData({
          date: this.selectedDate,
          marketplace: marketplace,
          report_id: this.selected.report._id,
          seller_type: this.selected.seller_type,
          fulfillment: this.selected.fulfillment,
          show_upc_in_dashboard: this.selected.report.show_upc_in_dashboard,
          source: this.selected.source,
          is_true_map: !!this.selected.report.true_map_report
        })
      ]
    },
    async _fetchDashboardWidgetData() {
      const marketplace = this.syncMarketplaceParams(this.selected.marketplace)
      const invsee = _.get(this.getPermissions, 'permissions.invsee')
      const isTrueMap = !!this.selected.report.true_map_report

      const apis = this.handlePrepareApisForDataOptimized(invsee, marketplace)
      const self = this
      await Promise.all(apis).then(() => {
        // TODO: move data source outside these promise
        // handleDataViolator
        // let fakeDaily = { ...this.dataViolator }
        // fakeDaily = this.emptyRowData(fakeDaily, this.getIgnoredColumnsDaily(this.selected.report))
        // if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
        //   fakeDaily = this.removeColumnData(fakeDaily, ['upc/ean'])
        // }
        // window.mw_dashboard_main_daily_visitors = fakeDaily

        // handleDataTopViolatedProduct
        window.mw_dashboard_top_violated = this.dataTopViolatedProductViolator
        // handleDataSellerViolations7d
        window.mw_dashboard_seller_violations_7d = this.dataSellerViolations7d
        // handleDataAvgPercentageOffMap
        let fakeAVGPercent = { ...this.dataAvgPercentageOffMap }
        fakeAVGPercent = this.emptyRowData(fakeAVGPercent, this.getIgnoredColumnsAvgPercent(this.selected.report))
        window.mw_dashboard_avg_percentage_off_map = _.cloneDeep(fakeAVGPercent)
        // handleDataNew1stTimeViolator
        // let fake1stData = { ...this.dataNew1stTimeViolator }
        // fake1stData = this.emptyRowData(fake1stData, this.getIgnoredColumns1st(this.selected.report))
        // if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
        // fake1stData = this.removeColumnData(fake1stData, ['upc/ean'])
        // }
        // window.mw_dashboard_new_1st_time = fake1stData
        // handleDataNew2ndTimeViolator
        // let fake2nd = { ...this.dataNew2ndTimeViolator }
        // fake2nd = this.emptyRowData(fake2nd, this.getIgnoredColumns2st(this.selected.report))
        // if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
        //   fake2nd = this.removeColumnData(fake2nd, ['upc/ean'])
        // }
        // window.mw_dashboard_new_2nd_time = fake2nd
        if (this.selected.report.true_map_report) {
          // handleDataNewRepeatViolators
          let fakeNewRepeat = { ...this.dataNewRepeatViolators }
          fakeNewRepeat = this.emptyRowData(fakeNewRepeat, this.getIgnoredColumnsNewRepeat(this.selected.report))
          if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
            fakeNewRepeat = this.removeColumnData(fakeNewRepeat, ['upc/ean'])
          }
          window.mw_dashboard_new_repeat_violators = fakeNewRepeat
        }
        // handleDataAllRepeatOffenders
        window.mw_dashboard_all_repeat_offenders = this.dataAllRepeatOffenders

        let cloneObj = $.extend(true, {}, this.mainConfig)
        // TODO Remove this function when Builder mode was merged into develop
        if (self.selected.report && self.selected.report.client_id === '98596dc6-c495-4ff8-83fc-81e9b46232cd') {
          cloneObj.widgets = cloneObj.widgets.filter((c, i) => i < 2)
        }

        const widgets = cloneObj.widgetLayout.widgets
        const handledSeparationDataSource = [
          DashboardWidgetId.daily_violator,
          DashboardWidgetId.daily_violator_with_inventory,
          DashboardWidgetId.all_repeat_offenders,
          DashboardWidgetId.new_1st_time_violator,
          DashboardWidgetId.new_2nd_time_violator]
        // WIDGET DAILY VIOLATOR AT THE TOP
        widgets.unshift(this.buildConfigWidgetDailyViolator(marketplace, isTrueMap))

        widgets.splice(
          4,
          0,
          this.buildConfigWidget1stTimeViolator(marketplace)
        )
        widgets.splice(
          5,
          0,
          this.buildConfigWidget2ndTimeViolator(marketplace)
        )

        if (invsee && this.orgIs) {
          // WIDGET DAILY VIOLATOR WITH INVENTORY AT THE BOTTOM
          widgets.push(this.buildConfigWidgetDailyViolatorWithInventory(marketplace, isTrueMap))
        }
        widgets.splice(7, 0, this.buildConfigWidgetRepeatOffender(marketplace))
        for (const [index, widget] of widgets.entries()) {
          const widgetId = widget.config.widget_id
          if (widgetId && !handledSeparationDataSource.includes(widgetId)) {
            // some titles are initialized with data source separation handler in handledSeparationDataSource
            // TODO: remove
            const text = this.selected.source === this.dashboardFilterSourceType.ALL_SELLERS ? this.dashboardAllSellerTitle[widgetId] : isTrueMap ? this.dashboardViolatorTitle[widgetId] : this.dashboardViolatorTitleNoTrueMap[widgetId]
            cloneObj.widgetLayout.widgets[index].config.widget.title.text = text
          }
        }
        if (!isTrueMap) {
          cloneObj.widgetLayout.widgets = _.filter(cloneObj.widgetLayout.widgets, (item) => {
            return !_.includes([this.dashboardWidgetId.avg_percentage_off_map, this.dashboardWidgetId.new_repeat_violators], item.config.widget_id)
          })
          if (this.selected.source !== this.dashboardFilterSourceType.ALL_SELLERS) {
            const index = _.findIndex(cloneObj.widgetLayout.widgets, (item) => {
              return item.config.widget_id === this.dashboardWidgetId.all_repeat_offenders
            })
            if (index > 0) {
              cloneObj.widgetLayout.widgets[index].config.elements[0].config.columns[1].displayName = 'Days with Listings'
              cloneObj.widgetLayout.widgets[index].config.elements[0].config.columns[2].displayName = 'Number of Listings Active'
            }
          }
          cloneObj.widgetLayout.widgets[1].config.grid.h = 40
          cloneObj.widgetLayout.widgets[5].config.grid.x = 0
          cloneObj.widgetLayout.widgets[5].config.grid.w = 12
        }

        window.ms_dashboard_main_config = cloneObj
        // TODO: SDK support API refresh data source
        if (!this.sdkConfigInitialized) {
          // for first time
          this.sdkConfigInitialized = true
        } else {
          // change dataSource effect to sdk
          this.sdkConfigForceReload++
        }
      })
    },
    buildConfigWidgetRepeatOffender(marketplace, isTrueMap) {
      const widgetId = DashboardWidgetId.all_repeat_offenders
      const filter = this.buildFilterDailyViolator(marketplace)
      const titleWidget = this.selected.source === this.dashboardFilterSourceType.ALL_SELLERS ? this.dashboardAllSellerTitle[widgetId] : isTrueMap ? this.dashboardViolatorTitle[widgetId] : this.dashboardViolatorTitleNoTrueMap[widgetId]
      const ignoreColumns = []
      const emptyDataColumns = []
      const exportFileName = [
        'AllRepeatOffender',
        this.selected.report.name_in_dashboard,
        marketplace,
        this.selected.seller_type,
        this.selected.fulfillment,
        this.selected.source,
        this.selectedDate
      ].filter(element => !!element).join('-')
      // if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
      //   ignoreColumns.push('upc')
      // }
      return {
        type: 'cbpo-widget',
        config: configRepeatOffender(this.violationRepeatOffenderConnection.ds_external_id, filter, titleWidget, ignoreColumns, emptyDataColumns, exportFileName)
      }
    },
    buildConfigWidgetDailyViolator(marketplace, isTrueMap) {
      const widgetId = DashboardWidgetId.daily_violator
      const filter = this.buildFilterDailyViolator(marketplace)
      const titleWidget = this.selected.source === this.dashboardFilterSourceType.ALL_SELLERS ? this.dashboardAllSellerTitle[widgetId] : isTrueMap ? this.dashboardViolatorTitle[widgetId] : this.dashboardViolatorTitleNoTrueMap[widgetId]
      const ignoreColumns = []
      const emptyDataColumns = []
      const exportFileName = [
        'DailyViolator',
        this.selected.report.name_in_dashboard,
        marketplace,
        this.selected.seller_type,
        this.selected.fulfillment,
        this.selected.source,
        this.selectedDate
      ].filter(element => !!element).join('-')
      if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
        ignoreColumns.push('upc')
      }
      if (!this.violationDataSourceConnection) {
        this.vToasted('error', 'The daily violator data source is not ready yet. Please wait for a while when the system initializing it for the first time.')
        return
      }
      return {
        type: 'cbpo-widget',
        config: configDailyViolator(this.violationDataSourceConnection.ds_external_id, filter, titleWidget, ignoreColumns, emptyDataColumns, exportFileName)
      }
    },
    buildFilterDailyViolator(marketplace) {
      const conditions = [
        {
          column: 'marketplace',
          operator: '==',
          value: marketplace
        },
        {
          column: 'report_id',
          operator: '==',
          value: this.selected.report._id
        }
      ]
      if (!_.isEmpty(this.selected.fulfillment)) {
        const operator = this.selected.fulfillment === 'FBA' ? 'is_true' : 'is_false'
        conditions.push({
          column: 'fba',
          value: '',
          operator
        })
      }
      conditions.push({
        column: 'violation_date_string',
        operator: '==',
        value: this.selectedDate
      })
      if (!_.isEmpty(this.selected.seller_type)) {
        if (_.isEqual(this.selected.seller_type, 'authorized_sellers')) {
          conditions.push({
            column: 'is_authorized_seller',
            operator: 'is_true',
            value: ''
          })
        } else {
          conditions.push({
            column: 'is_authorized_seller',
            operator: 'is_false',
            value: ''
          })
        }
      }
      if (_.isEqual(this.selected.source, this.dashboardFilterSourceType.VIOLATIONS)) {
        conditions.push({
          column: 'is_violation',
          operator: 'is_true',
          value: ''
        })
      }
      return {
        type: 'AND',
        conditions
      }
    },
    buildConfigWidgetDailyViolatorWithInventory(marketplace, isTrueMap) {
      const widgetId = DashboardWidgetId.daily_violator_with_inventory
      const titleWidget = this.selected.source === this.dashboardFilterSourceType.ALL_SELLERS ? this.dashboardAllSellerTitle[widgetId] : isTrueMap ? this.dashboardViolatorTitle[widgetId] : this.dashboardViolatorTitleNoTrueMap[widgetId]
      const filter = this.buildFilterDailyViolatorWithInventory(marketplace)
      const exportFileName = [
        'DailyViolatorWithInventory',
        this.selected.report.name_in_dashboard,
        marketplace,
        this.selected.seller_type,
        this.selected.fulfillment,
        this.selected.source,
        this.selectedDate
      ].filter(element => !!element).join('-')
      if (!this.violationInvDataSourceConnection) {
        this.vToasted('error', 'The daily violator with inventory data source is not ready yet. Please wait for a while when the system initializing it for the first time.')
        return
      }
      return {
        type: 'cbpo-widget',
        config: dailyViolatorWithInventory(this.violationInvDataSourceConnection.ds_external_id, filter, titleWidget, exportFileName)
      }
    },
    buildFilterDailyViolatorWithInventory(marketplace) {
      const conditions = [
        {
          column: 'marketplace',
          operator: '==',
          value: marketplace
        },
        {
          column: 'report_id',
          operator: '==',
          value: this.selected.report._id
        },
        {
          type: 'OR',
          conditions: [
            {
              column: 'total_fba_inventory',
              operator: '$gt',
              value: 0
            },
            {
              column: 'sku_vault_inventory',
              operator: '$gt',
              value: 0
            }
          ]
        }
      ]
      if (!_.isEmpty(this.selected.fulfillment)) {
        const operator = this.selected.fulfillment === 'FBA' ? 'is_true' : 'is_false'
        conditions.push({
          column: 'fba',
          value: '',
          operator
        })
      }
      // keeping conditions in order for the better performance from DB indexing
      conditions.push({
        column: 'violation_date_string',
        operator: '==',
        value: this.selectedDate
      })
      if (_.isEqual(this.selected.source, this.dashboardFilterSourceType.VIOLATIONS)) {
        conditions.push({
          column: 'is_violation',
          operator: 'is_true',
          value: ''
        })
      }
      if (!_.isEmpty(this.selected.seller_type)) {
        if (_.isEqual(this.selected.seller_type, 'authorized_sellers')) {
          conditions.push({
            column: 'is_authorized_seller',
            operator: 'is_true',
            value: ''
          })
        } else {
          conditions.push({
            column: 'is_authorized_seller',
            operator: 'is_false',
            value: ''
          })
        }
      }
      return {
        type: 'AND',
        conditions
      }
    },
    buildConfigWidget1stTimeViolator(marketplace) {
      const titleWidget = DashboardViolatorTitle.new_1st_time_violator
      const filter = this.buildFilterTimesViolator('is_first_time_violation', marketplace)
      const emptyDataColumns = []
      if (this.selected.report && this.selected.report.ignore_price_tracking) {
        emptyDataColumns.push('map_price')
      }
      if (this.selected.report && this.selected.report.ignore_screenshot) {
        emptyDataColumns.push('screenshot')
      }
      const ignoreColumns = []
      if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
        ignoreColumns.push('upc')
      }
      const exportFileName = [
        'New1stTimeViolators',
        this.selected.report.name_in_dashboard,
        marketplace,
        this.selected.seller_type,
        this.selected.fulfillment,
        this.selected.source,
        this.selectedDate
      ].filter(element => !!element).join('-')
      return {
        type: 'cbpo-widget',
        config: config1stTimeViolator(this.violation1st2ndDataSourceConnection.ds_external_id, filter, titleWidget, ignoreColumns, emptyDataColumns, exportFileName)
      }
    },
    buildConfigWidget2ndTimeViolator(marketplace) {
      const titleWidget = DashboardViolatorTitle.new_2nd_time_violator
      const filter = this.buildFilterTimesViolator('is_second_time_violation', marketplace)
      const emptyDataColumns = []
      if (this.selected.report && this.selected.report.ignore_price_tracking) {
        emptyDataColumns.push('map_price')
      }
      if (this.selected.report && this.selected.report.marketplace === 'google_shopping') {
        emptyDataColumns.push('date_violated')
      }
      const ignoreColumns = []
      if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
        ignoreColumns.push('upc')
      }
      const exportFileName = [
        'New2ndTimeViolators',
        this.selected.report.name_in_dashboard,
        marketplace,
        this.selected.seller_type,
        this.selected.fulfillment,
        this.selected.source,
        this.selectedDate
      ].filter(element => !!element).join('-')
      return {
        type: 'cbpo-widget',
        config: config2ndTimeViolator(this.violation1st2ndDataSourceConnection.ds_external_id, filter, titleWidget, ignoreColumns, emptyDataColumns, exportFileName)
      }
    },
    buildFilterTimesViolator(timeViolation, marketplace) {
      const conditions = [
        {
          column: 'marketplace',
          operator: '==',
          value: marketplace
        },
        {
          column: 'report_id',
          operator: '==',
          value: this.selected.report._id
        },
        {
          column: 'violation_date_string',
          operator: '==',
          value: this.selectedDate
        },
        {
          column: timeViolation,
          operator: 'is_true',
          value: ''
        }
      ]
      return {
        type: 'AND',
        conditions
      }
    },
    emptyRowData(data, cols = []) {
      if (!cols.length || !data || !data.cols || !data.rows) return data
      let names = data.cols.map(d => d.name)
      let indexs = cols.reduce((a, c) => {
        if (names.includes(c)) a.push(names.indexOf(c))
        return a
      }, []).filter(e => e >= 0)
      indexs.forEach(i => {
        data.rows = data.rows.map(r => {
          r[i] = null
          return r
        })
      })
      return data
    },
    // remove column from table data
    removeColumnData(data, cols = []) {
      if (!cols.length || !data || !data.cols || !data.rows) return data
      let names = data.cols.map(d => d.name)
      let indexs = cols.reduce((a, c) => {
        if (names.includes(c)) a.push(names.indexOf(c))
        return a
      }, []).filter(e => e >= 0)
      indexs.forEach(i => {
        data.rows = data.rows.map(r => {
          r[i] = null
          return r
        })
      })
      return data
    },
    handleCaseRemoveColumn(widgetName, arrayLabel) {
      let widget = this.findWidgetByLabel(window.ms_dashboard_main_config.widgetLayout.widgets, widgetName)
      if (widget) {
        widget.config.elements[0].config.columns = this.removeColumnByLabel(widget.config.elements[0].config.columns, arrayLabel)
      }
    },
    removeColumnByLabel(arrayColumn, arrayLabel) {
      return arrayColumn.filter(column => !arrayLabel.includes(column.name))
    },
    _renderDashboardWidgets() {
      const isAllSellerMode = this.selected.source === this.dashboardFilterSourceType.ALL_SELLERS
      const isTrueMap = !!this.selected.report.true_map_report
      const titleSource = isAllSellerMode ? this.dashboardAllSellerTitle : !isTrueMap && !isAllSellerMode ? this.dashboardViolatorTitleNoTrueMap : this.dashboardViolatorTitle
      if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
        this.handleCaseRemoveColumn(titleSource.daily_violator, ['upc/ean'])
        this.handleCaseRemoveColumn(titleSource.new_1st_time_violator, ['upc/ean'])
        this.handleCaseRemoveColumn(titleSource.new_2nd_time_violator, ['upc/ean'])
        this.handleCaseRemoveColumn(titleSource.new_repeat_violators, ['upc/ean'])
        this.handleCaseRemoveColumn(titleSource.daily_violator_with_inventory, ['upc/ean'])
      }
      if (!isTrueMap) {
        this.handleCaseRemoveColumn(titleSource.daily_violator, ['map_price', 'diff', 'diff_percent'])
        this.handleCaseRemoveColumn(titleSource.daily_violator_with_inventory, ['diff', 'diff_percent'])
        this.handleCaseRemoveColumn(titleSource.new_1st_time_violator, ['map'])
        this.handleCaseRemoveColumn(titleSource.new_2nd_time_violator, ['map'])
        this.handleCaseRemoveColumn(titleSource.new_repeat_violators, ['map', 'diff_percent'])
        this.handleCaseRemoveColumn(titleSource.new_repeat_violators, ['map', 'diff_percent'])
      }
      // let el = $(this.$el).find('.widgets-container:eq(0)')
      // el.html(
      //   '<cbpo-dashboard config-ref="ms_dashboard_main_config" class="mw-sdk-styled" />'
      // )
      // this.$CBPO.wgManager().init('.widgets-container')
      // this.$forceUpdate()
      this.sdkConfigForceReload++
    },
    findWidgetByLabel(widgetArray, label) {
      return widgetArray.find(widget => widget.config.widget.title.text === label)
    },
    async handleFetchSetting() {
      const showDashboard = await this.fetchSetting()
      return showDashboard
    },
    async fetchAndRenderDashboardWidgets() {
      await this._fetchDashboardWidgetData()
      this._renderDashboardWidgets()
    },
    createEventButtonAction() {
      // Download button NEW REPEAT widgets

      this.$CBPO.$bus.$on(`trigger_button_${TYPE.DOWNLOAD_NEW_REPEAT_VIOLATORS}`, () => {
        let marketplace = this.syncMarketplaceParams(this.selected.marketplace)
        this.$CBPO.$bus.$emit(TYPE.DOWNLOAD_NEW_REPEAT_VIOLATORS + '_stateChange', true)
        this.downloadNewRepeatViolators(this.useShareTokenIfNeed({
          date: this.selectedDate,
          marketplace: marketplace,
          report_id: this.selected.report._id,
          seller_type: this.selected.seller_type,
          fulfillment: this.selected.fulfillment
        })).then((link) => {
          this.$CBPO.$bus.$emit(TYPE.DOWNLOAD_NEW_REPEAT_VIOLATORS + '_stateChange', false)
          if (link && link.uri) {
            let a = document.createElement('a')
            a.href = link.uri
            a.click()
          }
          this.$CBPO.$bus.$emit(TYPE.DOWNLOAD_NEW_REPEAT_VIOLATORS + '_stateChange', false)
        })
      })
      // Download button DAILY VIOLATOR widget
      this.$CBPO.$bus.$on(`trigger_button_${TYPE.DOWNLOAD_DAILY_VIOLATIONS}`, () => {
        let marketplace = this.syncMarketplaceParams(this.selected.marketplace)
        this.$CBPO.$bus.$emit(TYPE.DOWNLOAD_DAILY_VIOLATIONS + '_stateChange', true)
        this.downloadDailyViolations(this.useShareTokenIfNeed({
          date: this.selectedDate,
          marketplace: marketplace,
          report_id: this.selected.report._id,
          seller_type: this.selected.seller_type,
          fulfillment: this.selected.fulfillment
        })).then((link) => {
          this.$CBPO.$bus.$emit(TYPE.DOWNLOAD_DAILY_VIOLATIONS + '_stateChange', false)
          if (link && link.uri) {
            let a = document.createElement('a')
            a.href = link.uri
            a.click()
          }
          this.$CBPO.$bus.$emit(TYPE.DOWNLOAD_DAILY_VIOLATIONS + '_stateChange', false)
        })
      })
      this.$CBPO.$bus.$on(`trigger_button_${TYPE.DOWNLOAD_DAILY_VIOLATIONS_WITH_INVENTORY}`, () => {
        let marketplace = this.syncMarketplaceParams(this.selected.marketplace)
        this.$CBPO.$bus.$emit(TYPE.DOWNLOAD_DAILY_VIOLATIONS_WITH_INVENTORY + '_stateChange', true)
        this.downloadDailyViolationsWithInventory(this.useShareTokenIfNeed({
          date: this.selectedDate,
          marketplace: marketplace,
          report_id: this.selected.report._id,
          seller_type: this.selected.seller_type,
          fulfillment: this.selected.fulfillment
        })).then((link) => {
          this.$CBPO.$bus.$emit(TYPE.DOWNLOAD_DAILY_VIOLATIONS_WITH_INVENTORY + '_stateChange', false)
          if (link && link.uri) {
            let a = document.createElement('a')
            a.href = link.uri
            a.click()
          }
          this.$CBPO.$bus.$emit(TYPE.DOWNLOAD_DAILY_VIOLATIONS_WITH_INVENTORY + '_stateChange', false)
        })
      })
    },
    async fetchDate() {
      // TODO: SDK support API refresh data source
      this.sdkConfigInitialized = false
      let marketplace = this.syncMarketplaceParams(this.selected.marketplace)
      await this.fetchDataDateHistorical(this.useShareTokenIfNeed({
        marketplace: marketplace,
        seller_type: this.selected.seller_type,
        report_id: this.selected.report._id
      }))
      this.dates = this.dataDateHistorical.dates
      if (_.isEmpty(this.selectedDate) || !this.dates.includes(this.selectedDate)) {
        this.selectedDate = _.isEmpty(this.dates) ? null : this.dates[0]
      }
      this.setSelectedDate(this.selectedDate)
      // render Dashboard Widgets
      this.fetchAndRenderDashboardWidgets()
    },
    dateChange(e) {
      this.selectedDate = e.target.value
      this.setSelectedDate(this.selectedDate)
      this.fetchAndRenderDashboardWidgets()
    },
    async _fetchDs() {
      try {
        return await this.getDsMaps()
      } catch (e) {
        console.log(e)
      }
    }
  },
  async created () {
    // get violation data source connection info
    const allDataSources = await this._fetchDs()
    this.violationDataSourceConnection = _.find(allDataSources, ele => ele.type === 'vio')
    this.violationInvDataSourceConnection = _.find(allDataSources, ele => ele.type === 'vio_inv')
    this.violationRepeatOffenderConnection = _.find(allDataSources, ele => ele.type === 'vio_offender')
    // TODO: filter for another data source type
    this.violation1st2ndDataSourceConnection = _.find(allDataSources, ele => ele.type === 'vio_1st_2nd_time')
    // this.violation1st2ndDataSourceConnection = {
    //   client_id: 'f67e1aec-1aea-4006-b613-d3df09ad5c69',
    //   type: 'vio_1st_2nd_time',
    //   ds_external_id: 'mw:md:f67e1aec-1aea-4006-b613-d3df09ad5c69_vio_1st_2nd_time'
    // }
    this.fetchDate()
    this.createEventButtonAction()
  },
  watch: {
    '$route.query' (val) {
      this.fetchDate()
    }
  },
  destroyed () {
    this.$CBPO.$bus.$off(`trigger_button_${TYPE.DOWNLOAD_NEW_REPEAT_VIOLATORS}`)
    this.$CBPO.$bus.$off(`trigger_button_${TYPE.DOWNLOAD_DAILY_VIOLATIONS}`)
    this.$CBPO.$bus.$off(`trigger_button_${TYPE.DOWNLOAD_DAILY_VIOLATIONS_WITH_INVENTORY}`)
  }
}

</script>
<style lang="scss" scoped>
  .spinner-container {
    height: 50px;

    .thin-spinner {
      border-width: 1px;
    }
  }
  .mw-dashboard-control-select {
    padding: 0.5rem;
    label {
      margin: 0;
      padding: 5px 10px 5px 9px;
      display: inline-block;
    }
    select {
      padding: .2rem .5rem;
      width: auto;
      height: auto;
      display: inline-block;
      font-size: 11.5px;
      border-radius: 0;
    }
  }
  .mw-sdk-styled {
    &.cbpo-dashboard {
      border: none;
    }
    /deep/ {
      .__advance-feature {
        padding: 0 !important;
      }
      .cbpo-dashboard-container{
        border: none !important;
      }
      .cbpo-widget-title{
        border-bottom: unset !important;
      }
      .cbpo-widget .cbpo-control-features .cbpo-wrapper-form{
        flex-grow: 1;
      }
      .cbpo-widget .cbpo-control-features .cbpo-wrapper-action{
        flex-shrink: 1;
        padding-top: .7rem;
      }
      .cbpo-wrapper-action{
        margin-left: auto;
      }
      .cbpo-btn {
        display: flex;
        justify-content: center;
      }
      .cbpo-btn .spinner-border {
        width: 10px;
        height: 10px;
        border-width: 1px;
      }
    }
  }
</style>
