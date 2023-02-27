<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <div class="warning-plan">
          <b-alert v-if="remainingSlotsReport" show dismissible variant="warning">Your plan allows <strong>{{planConfig['plan_max_of_reports'] | formatNumber}}</strong> {{ 'report' | pluralize(planConfig['plan_max_of_reports'])}} but you have <strong>{{organizationStats['reports_used'] | formatNumber}}</strong> active {{ 'one' | pluralize(organizationStats['reports_used'])}}. Please consider removing the unnecessary ones or we will randomly disable data processing for your <strong>{{remainingSlotsReport | formatNumber}}</strong> {{ 'one' | pluralize(remainingSlotsReport)}}.</b-alert>
          <b-alert v-if="remainingSlotsReportAmazon" show dismissible variant="warning">Your plan allows <strong>{{planConfig['plan_max_of_reports_with_amazon'] | formatNumber}}</strong> Amazon {{ 'report' | pluralize(planConfig['plan_max_of_reports_with_amazon'])}} but you have <strong>{{ organizationStats['reports_with_amazon_used']| formatNumber}}</strong> active {{ 'one' | pluralize(organizationStats['reports_with_amazon_used'])}}. Please consider removing the unnecessary ones or we will randomly disable data processing for your <strong>{{remainingSlotsReportAmazon | formatNumber}}</strong> {{ 'one' | pluralize(remainingSlotsReportAmazon)}}.</b-alert>
          <b-alert v-if="remainingSlotsReportGoogleShopping" show dismissible variant="warning">Your plan allows <strong>{{planConfig['plan_max_of_reports_with_google_shopping'] | formatNumber}}</strong> Google Shopping {{ 'report' | pluralize(planConfig['plan_max_of_reports_with_google_shopping'])}} but you have <strong>{{organizationStats['reports_with_google_shopping_used'] | formatNumber}}</strong> active {{ 'one' | pluralize(organizationStats['reports_with_google_shopping_used'])}}. Please consider removing the unnecessary ones or we will randomly disable data processing for your <strong>{{remainingSlotsReportGoogleShopping | formatNumber}}</strong> {{ 'one' | pluralize(remainingSlotsReportGoogleShopping)}}.</b-alert>
        </div>
        <table-content
          ref="tableContentReport"
          :fields="fields"
          fixed
          bordered
          striped
          :hover="true"
          :caption="$route.meta.tableName"
          :removeReports="handleRemoveReport"
          :handleEditReport="handleEditReport"
          :handleRun="handleRunAReport"
          :dataSet="reports"
          :handleExportForJob="handleExportForJob"
          @paramsChange="loadData"
          :reportLoading="reportLoading"
        ></table-content>
      </b-col>
    </b-row>
  </div>
</template>

<script>
// import { shuffleArray } from '@/shared/utils'
// import TableContent from './TableContent' // use this for system mode handle job is report based job
import TableContent from './TableReportMapJob' // use this for system mode handle job mode map based job
import { mapGetters, mapActions } from 'vuex'
import * as TYPE from '@/actionTypes.js'
import vToasted from '@/shared/notification'
import PermissionsMixin from '@/components/common/PermissionsMixin'
import _nav from '@/_nav'
import action from '@/service/activity'

export default {
  name: 'tables',
  components: { TableContent },
  mixins: [vToasted, PermissionsMixin],
  data() {
    return {
      fields: {},
      nav: _nav
    }
  },
  computed: {
    ...mapGetters({
      reports: `mw/reports/${TYPE.GET_LIST_REPORTS}`,
      planConfig: `mw/${TYPE.GET_PLAN_CONFIG}`,
      organizationStats: `mw/${TYPE.GET_ORGANIZATION_STATS}`,
      reportLoading: `mw/reports/${TYPE.GET_REPORT_LOADING}`
    }),
    remainingSlotsReport() {
      if (this.organizationStats['reports_used'] > this.planConfig['plan_max_of_reports']) {
        return parseInt(this.organizationStats['reports_used'] - this.planConfig['plan_max_of_reports'])
      }
      return false
    },
    remainingSlotsReportAmazon() {
      if (this.organizationStats['reports_with_amazon_used'] > this.planConfig['plan_max_of_reports_with_amazon']) {
        return parseInt(this.organizationStats['reports_with_amazon_used'] - this.planConfig['plan_max_of_reports_with_amazon'])
      }
      return false
    },
    remainingSlotsReportGoogleShopping() {
      if (this.organizationStats['reports_with_google_shopping_used'] > this.planConfig['plan_max_of_reports_with_google_shopping']) {
        return parseInt(this.organizationStats['reports_with_google_shopping_used'] - this.planConfig['plan_max_of_reports_with_google_shopping'])
      }
      return false
    }
  },
  methods: {
    ...mapActions({
      fetchReports: `mw/reports/${TYPE.FETCH_LIST_REPORTS}`,
      removeReport: `mw/reports/${TYPE.REMOVE_REPORTS}`,
      runAReport: `mw/reports/${TYPE.RUN_A_REPORT}`,
      // forceRunAReport: `mw/reports/${TYPE.FORCE_RUN_A_REPORT}`,
      downloadJobById: `mw/reports/${TYPE.REMOTE_GET_LINK_DOWNLOAD_JOB}`,
      onSeach: `mw/reports/${TYPE.REMOTE_SEARCH_REPORTS}`,
      onSort: `mw/reports/${TYPE.REMOTE_SORT_REPORTS}`,
      resetReports: `mw/reports/${TYPE.RESET_REPORTS}`
    }),
    handleEditReport(data) {
      this.$router.push({
        name: 'MWEditReports',
        params: { client_id: this.nav.clientId, id: data._id },
        query: { name: data.name_in_dashboard }
      })
    },
    loadData(params = {}) {
      this.fetchReports(params)
      this.$router.push({
        query: {
          s: params.s,
          limit: params.limit ? params.limit : '10',
          page: params.page ? params.page : '1',
          sort_by: params.sort_by ? params.sort_by : 'name_in_dashboard',
          sort_dir: params.sort_dir ? params.sort_dir : 'asc'
        }
      })
    },
    async handleRemoveReport(data) {
      try {
        await this.removeReport(data.id)
        this.vToasted('success', `Report ${data.name} has been deleted successfully`)
        this.$refs.tableContentReport.checkCondition()
      } catch (error) {
        this.vToasted('error', error.data.message)
      }
    },
    async handleRunAReport(e, runOptions) {
      try {
        console.log('e ', e)
        console.log('runOptions ', runOptions)
        await this.runAReport({ id: e._id, runOptions: runOptions })
      } catch (error) {
        this.vToasted('error', error.message)
      }
    },
    trackDownload(data) {
      let payload = {
        client_id: data.client_id,
        report_name: data.name_in_dashboard,
        report_id: data.id
      }
      action.downloadAction(payload)
    },
    async handleExportForJob(item, index, marketplace, indexActiveMarketplaces, source) {
      this.trackDownload(item)
      try {
        this.$set(this.reports.items[index].activeMarketplaces[indexActiveMarketplaces].info, 'isLoad', true)
        const res = await this.downloadJobById({ id: item._id, marketplace: marketplace, source: source })
        window.location.href = res.uri
      } catch (error) {
        this.vToasted('error', error.message)
      } finally {
        this.$set(this.reports.items[index].activeMarketplaces[indexActiveMarketplaces].info, 'isLoad', false)
      }
    }
  },
  created() {
    let params = {
      s: this.$route.query.s ? this.$route.query.s : '',
      limit: this.$route.query.limit ? this.$route.query.limit : 10,
      page: this.$route.query.page ? this.$route.query.page : 1,
      sort_by: this.$route.query.sort_by ? this.$route.query.sort_by : 'name_in_dashboard',
      sort_dir: this.$route.query.sort_dir ? this.$route.query.sort_dir : 'asc'
    }
    this.loadData(params)
    this.fields = [
      {
        key: 'name_in_dashboard',
        label: 'Report Name',
        sortable: true,
        sortDirection: 'desc',
        tdClass: 'align-middle'
      },
      {
        key: 'active',
        label: 'Active',
        thClass: 'at-50 text-center align-middle',
        tdClass: 'text-center mw-checkbox-active align-middle'
      },
      {
        key: 'status',
        label: 'Status',
        thClass: 'text-center align-middle',
        tdClass: 'text-center align-middle'
      },
      {
        key: 'updated',
        label: 'Modified',
        thClass: 'md-120 text-center align-middle',
        tdClass: 'align-middle text-center',
        sortable: true
      },
      {
        key: 'actions',
        label: 'Actions',
        thClass: 'text-center align-middle',
        tdClass: 'col-manage align-middle text-center'
      }
    ]
  },
  beforeDestroy() {
    this.resetReports()
  }
}
</script>
<style lang="scss">
.mw-160 {
  width: 160px;
}
.at-50 {
  width: 50px;
}
.mkp-170 {
  width: 170px;
}
.md-120 {
  width: 120px;
}
</style>
