<template>
   <div class="animated fadeIn">
     <div class="align-middle d-flex justify-content-center align-items-center spinner-container" v-if="!sdkConfigInitialized">
        <div class="spinner-border thin-spinner spinner-border-sm thin-spinner"></div>&nbsp;Loading...
      </div>
    <div class="cbpo-s form-group mw-historical-control-select mb-0" :class="{ 'pt-0': sdkConfigInitialized }" v-if="sdkConfigInitialized">
      <label>Date:</label>
      <select v-model="selectedDate" @change="dateChange($event)" class="form-control">
        <template v-for="(date, i) in dates">
          <option :value="date" :key="i">{{date}}</option>
        </template>
      </select>
    </div>
    <div v-if="sdkConfigInitialized" class="widgets-container overflow-auto">
      <!--dashboard sdk will be rendered where, DON'T change the class-->
        <cbpo-dashboard :key="sdkConfigForceReload" config-ref="mw_dashboard_main_config" class="mw-sdk-styled"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as TYPE from '@/actionTypes.js'
import $ from 'jquery'
import { Promise } from 'q'
import _ from 'lodash'
import { DashboardFilterSourceType } from '@/constants/Report'
import { DashboardViolatorTitle, DashboardAllSellerTitle, DashboardWidgetId } from '@/constants/Dashboard'
import configHistoricalDataTable from '@/store/modules/page/dashboard/configs/historical-data-table'

export default {
  props: ['selected'],
  data: () => ({
    dashboardFilterSourceType: _.cloneDeep(DashboardFilterSourceType),
    dashboardAllSellerTitle: _.cloneDeep(DashboardAllSellerTitle),
    dashboardViolatorTitle: _.cloneDeep(DashboardViolatorTitle),
    dashboardWidgetId: _.cloneDeep(DashboardWidgetId),
    dates: [],
    loader: false,
    selectedDate: null,
    sdkConfigInitialized: false,
    sdkConfigForceReload: 0,
    violationDataSourceConnection: {
      type: 'vio',
      ds_external_id: null
    }
  }),
  name: 'MWDashboardHistorical',
  computed: {
    ...mapGetters({
      dataHistoricalTable: `mw/dashboard/${TYPE.GET_DATA_HISTORICAL}`,
      dataDateHistorical: `mw/dashboard/${TYPE.GET_DATE_HISTORICAL}`,
      dataNumberViolations: `mw/dashboard/${TYPE.GET_DATA_NUMBER_OF_VIOLATIONS}`,
      dataNumberViolationsViolators: `mw/dashboard/${TYPE.GET_DATA_NUMBER_OF_VIOLATIONS_VIOLATORS}`,
      mainConfig: `mw/dashboard/${TYPE.GET_DATA_CONFIG_HISTORICAL}`
    })
  },
  methods: {
    ...mapActions({
      fetchDataHistoricalTable: `mw/dashboard/${TYPE.FETCH_DATA_HISTORICAL}`,
      fetchDataDateHistorical: `mw/dashboard/${TYPE.FETCH_DATE_HISTORICAL}`,
      fetchDataNumberViolations: `mw/dashboard/${TYPE.FETCH_DATA_NUMBER_OF_VIOLATIONS}`,
      fetchDataNumberViolationsViolators: `mw/dashboard/${TYPE.FETCH_DATA_NUMBER_OF_VIOLATIONS_VIOLATORS}`,
      downloadDailyViolations: `mw/dashboard/${TYPE.FETCH_DOWNLOAD_DAILY_VIOLATIONS}`,
      setSelectedDate: `mw/dashboard/${TYPE.SET_SELECTED_DATE}`,
      getDsMaps: `mw/dashboard/${TYPE.GET_DS_MAPS}`
    }),
    handleDataHistorical(marketplace) {
      return new Promise((resolve, reject) => {
        this.fetchDataHistoricalTable(this.useShareTokenIfNeed({
          date: this.selectedDate ? this.$moment(this.selectedDate).format('YYYY-MM-DD') : null,
          marketplace: marketplace,
          report_id: this.selected.report._id,
          seller_type: this.selected.seller_type,
          show_upc_in_dashboard: this.selected.report.show_upc_in_dashboard
        })).then(() => {
          let fakeHistorical = {...this.dataHistoricalTable}
          fakeHistorical = this.emptyRowData(fakeHistorical, this.getIgnoredColumnsHistorical(this.selected.report))
          if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
            fakeHistorical = this.removeColumnData(fakeHistorical, ['upc/ean'])
          }
          window.mw_historical_data_table = fakeHistorical
          resolve()
        })
      })
    },
    // remove column from table data
    removeColumnData(data, cols = []) {
      if (!cols.length || !data || !data.cols || !data.rows) return data
      let names = data.cols.map(d => d.name)
      let indexs = cols.reduce((a, c) => { if (names.includes(c)) a.push(names.indexOf(c)); return a }, []).filter(e => e >= 0)
      indexs.forEach(i => { data.rows = data.rows.map(r => { r[i] = null; return r }) })
      return data
    },
    findWidgetByLabel(widgetArray, label) {
      let flag
      widgetArray.forEach(widget => {
        if (widget.config.widgets && widget.config.widgets.length > 0) {
          let result = this.findWidgetByLabel(widget.config.widgets, label)
          // eslint-disable-next-line no-unused-expressions
          result ? flag = result : ''
        } else if (label === widget.config.widget.title.text) {
          flag = widget
        }
      })
      return flag
    },
    handleCaseRemoveColumn(widgetName, arrayLabel) {
      let widget = this.findWidgetByLabel(window.mw_dashboard_main_config.widgetLayout.widgets, widgetName)
      widget.config.elements[0].config.columns = this.removeColumnByLabel(widget.config.elements[0].config.columns, arrayLabel)
    },
    removeColumnByLabel(arrayColumn, arrayLabel) {
      return arrayColumn.filter(column => !arrayLabel.includes(column.name))
    },
    useShareTokenIfNeed(object) {
      if (this.selected.share_token) {
        _.assign(object, { share_token: this.selected.share_token })
      }
      _.assign(object, { source: this.selected.source })
      _.assign(object, { is_true_map: !!this.selected.report.true_map_report })
      return object
    },
    getIgnoredColumnsHistorical(report) {
      let ignoredColumns = []
      if (report && report.ignore_price_tracking) {
        ignoredColumns.push('map_price', 'diff', 'diff_percent')
      }
      return ignoredColumns
    },
    handleDataNumberOfViolationsViolators(marketplace) {
      return new Promise((resolve, reject) => {
        this.fetchDataNumberViolationsViolators(this.useShareTokenIfNeed({
          marketplace: marketplace,
          report_id: this.selected.report._id,
          seller_type: this.selected.seller_type
        })).then(() => {
          window.mw_historical_number_of_violation_violator = this.dataNumberViolationsViolators
          resolve()
        })
      })
    },
    handleDataNumberViolations(marketplace) {
      return new Promise((resolve, reject) => {
        this.fetchDataNumberViolations(this.useShareTokenIfNeed({
          marketplace: marketplace,
          report_id: this.selected.report._id,
          seller_type: this.selected.seller_type
        })).then(() => {
          window.mw_historical_number_of_violations = this.dataNumberViolations
          resolve()
        })
      })
    },
    emptyRowData(data, cols = []) {
      if (!cols.length || !data || !data.cols || !data.rows) return data
      let names = data.cols.map(d => d.name)
      let indexs = cols.reduce((a, c) => { if (names.includes(c)) a.push(names.indexOf(c)); return a }, []).filter(e => e >= 0)
      indexs.forEach(i => { data.rows = data.rows.map(r => { r[i] = null; return r }) })
      return data
    },
    syncMarketplaceParams (marketplace) {
      return _.includes(marketplace, 'amazon') ? marketplace.replace(/[_]/g, '.') : marketplace
    },
    async _fetchDashboardWidgetData() {
      let marketplace = this.syncMarketplaceParams(this.selected.marketplace)
      const isTrueMap = !!this.selected.report.true_map_report
      // const isTrueMap = false
      // const promises = [this.handleDataHistorical(marketplace)]
      const promises = [] // GET data from data source VIOLATION
      if (isTrueMap) {
        promises.push(this.handleDataNumberOfViolationsViolators(marketplace))
        promises.push(this.handleDataNumberViolations(marketplace))
      }

      await Promise.all(promises).then(() => {
        let cloneObj = $.extend(true, {}, this.mainConfig)

        cloneObj.widgetLayout.widgets.unshift(this.buildConfigWidgetHistoricalData(marketplace))

        for (const [index, widget] of cloneObj.widgetLayout.widgets.entries()) {
          const widgetId = widget.config.widget_id
          if (widgetId) {
            const text = this.selected.source === this.dashboardFilterSourceType.ALL_SELLERS ? this.dashboardAllSellerTitle[widgetId] : this.dashboardViolatorTitle[widgetId]
            cloneObj.widgetLayout.widgets[index].config.widget.title.text = text
          }
        }
        if (!isTrueMap) {
          // const cloneWidgets = _.clone(widgets)
          cloneObj.widgetLayout.widgets = _.filter(cloneObj.widgetLayout.widgets, (item) => {
            return !_.includes([this.dashboardWidgetId.number_of_violations_per_seller, this.dashboardWidgetId.number_of_violations_violators], item.config.widget_id)
          })
        }

        window.mw_dashboard_main_config = cloneObj
        if (!this.sdkConfigInitialized) {
          // for first time
          this.sdkConfigInitialized = true
        } else {
          // change dataSource effect to sdk
          this.sdkConfigForceReload++
        }
      })
    },
    buildConfigWidgetHistoricalData(marketplace) {
      const ignoreColumnNames = []
      if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
        ignoreColumnNames.push('upc')
      }
      const emptyDataColumnNames = []
      if (this.selected.report && this.selected.report.ignore_price_tracking) {
        emptyDataColumnNames.push(...['map_price', 'diff', 'diff_percent'])
      }
      const exportFileName = [
        'HistoricalDataTable',
        this.selected.report.name_in_dashboard,
        marketplace,
        this.selected.seller_type,
        this.selected.fulfillment,
        this.selected.source,
        this.selectedDate
      ].filter(element => !!element).join('-')
      return {
        type: 'cbpo-widget',
        config: configHistoricalDataTable(
          this.violationDataSourceConnection.ds_external_id,
          this.buildFilterHistoricalData(marketplace),
          ignoreColumnNames,
          emptyDataColumnNames,
          exportFileName)
      }
    },
    buildFilterHistoricalData(marketplace) {
      const conditions = [
        {
          column: 'marketplace',
          operator: '==',
          value: 'amazon.com'
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
      return {
        type: 'AND',
        conditions
      }
    },
    _renderDashboardWidgets() {
      // if (this.selected.report && !this.selected.report.show_upc_in_dashboard) {
      //   this.handleCaseRemoveColumn('Historical Data Table', ['upc/ean'])
      // }
      // const isTrueMap = !!this.selected.report.true_map_report
      // if (!isTrueMap) {
      //   this.handleCaseRemoveColumn('Historical Data Table', ['map_price', 'diff', 'diff_percent'])
      // }
      // let el = $(this.$el).find('.widgets-container:eq(0)')
      // el.html(
      //   '<cbpo-dashboard config-ref="mw_dashboard_main_config" class="mw-sdk-styled" />'
      // )
      // this.$CBPO.wgManager().init('.widgets-container')
      // this.$forceUpdate()
      this.sdkConfigForceReload++
    },
    async fetchAndRenderDashboardWidgets() {
      await this._fetchDashboardWidgetData()
      // this._renderDashboardWidgets()
    },
    async fetchDate() {
      let marketplace = this.syncMarketplaceParams(this.selected.marketplace)
      await this.fetchDataDateHistorical(this.useShareTokenIfNeed({
        marketplace: marketplace,
        report_id: this.selected.report._id,
        seller_type: this.selected.seller_type,
        fulfillment: this.selected.fulfillment
      }))
      this.dates = this.dataDateHistorical.dates
      if (_.isEmpty(this.selectedDate) || !this.dates.includes(this.selectedDate)) {
        this.selectedDate = _.isEmpty(this.dates) ? null : this.dates[0]
      }
      this.setSelectedDate(this.selectedDate)
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
  async created() {
    const allDataSources = await this._fetchDs()
    this.violationDataSourceConnection = _.find(allDataSources, ele => ele.type === 'vio')
    this.fetchDate()
  },

  watch: {
    '$route.query'(val) {
      this.fetchDate()
    }
  },
  destroyed() {
    this.$CBPO.$bus.$off(`trigger_button_history_${TYPE.DOWNLOAD_DAILY_VIOLATIONS}`)
  }
}
</script>
<style lang="scss" scoped>

.pl-05 {
  padding-left: 0.5rem !important;
}

.mb-0 {
  margin-bottom: 0 !important;
}

.mw-historical-control-select {
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
    .cbpo-dashboard-container{
      border: none;
      padding: 0
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
