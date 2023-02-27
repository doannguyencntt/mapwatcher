<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <MarketplaceHistoryListContent
          fixed
          bordered
          :caption="$route.meta.tableName"
          :fields="fields"
          @paramsChange="loadData"
          :historyLoading="historyLoading"
        ></MarketplaceHistoryListContent>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import MarketplaceHistoryListContent from './MarketplaceHistoryListContent'
import PermissionsMixin from '@/components/common/PermissionsMixin'
import * as TYPE from '@/actionTypes.js'
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import { MarketplaceLabel } from '@/constants/Report'

export default {
  name: 'MWReportMarketplaceHistory',
  components: { MarketplaceHistoryListContent },
  mixins: [PermissionsMixin],
  methods: {
    ...mapActions({
      fetchListReportMarketplaceHistory: `mw/reports/${TYPE.FETCH_LIST_REPORT_MARKETPLACE_HISTORY}`
    }),
    loadData(params = {}) {
      // eslint-disable-next-line
      const { report_id, marketplace, name } = this.$route.query
      // eslint-disable-next-line
      this.fetchHistory(params)
      if (_.isEmpty(params)) {
        this.$router.replace({
          query: {
            report_id: report_id,
            marketplace: marketplace,
            limit: params.limit ? params.limit : '10',
            page: params.page ? params.page : '1',
            name: name
          }
        })
      } else {
        this.$router.push({
          query: {
            report_id: report_id,
            marketplace: marketplace,
            limit: params.limit ? params.limit : '10',
            page: params.page ? params.page : '1',
            name: name
          }
        })
      }
    },
    fetchHistory(params) {
      // eslint-disable-next-line
      const { report_id, marketplace } = this.$route.query
      this.fetchListReportMarketplaceHistory({
        report_id: report_id,
        marketplace: marketplace,
        limit: params.limit ? params.limit : '10',
        page: params.page ? params.page : '1'
      })
    }
  },
  data: () => {
    return {
      marketplaceLabel: _.cloneDeep(MarketplaceLabel)
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: `mw/${TYPE.GET_PERMISSIONS}`,
      defaultParams: `mw/reports/${TYPE.GET_REPORT_MARKETPLACE_HISTORY_DEFAULT_PARAMS}`,
      historyLoading: `mw/reports/${TYPE.GET_HISTORY_LOADING}`
    }),
    params: function() {
      return { ...this.defaultParams } || {}
    }
  },
  created() {
    // eslint-disable-next-line
    const { report_id, marketplace } = this.$route.query
    // eslint-disable-next-line
    if (!report_id || !marketplace) {
      this.$router.push({ name: 'MWListReports' })
      return
    }
    this.loadData()
    this.fields = [
      {
        key: 'date',
        label: 'Date',
        thClass: 'col-date align-middle',
        tdClass: 'col-date align-middle'
      },
      {
        key: 'total',
        label: 'Total',
        thClass: 'text-center align-middle',
        tdClass: 'text-center align-middle'
      },
      {
        key: 'completed',
        label: 'Completed',
        thClass: 'text-center align-middle',
        tdClass: 'text-center align-middle'
      },
      {
        key: 'download',
        label: 'Download',
        thClass: 'text-center col-download align-middle',
        tdClass: 'text-center col-download align-middle'
      }
    ]
  },
  mounted() {
    const { marketplace, name } = this.$route.query
    const marketplaceText = this.marketplaceLabel[marketplace]
    this.$route.meta.tableName = `Report History of ${name} in ${marketplaceText}`
  },
  destroyed() {
    this.$store.state.mw.reports.defaultParamsReportMarketplaceHistory.page = 1
    this.$store.state.mw.reports.listReportMarketplaceHistory = []
  }
}
</script>
<style lang="scss">
  .mw-180 {
    max-width: 180px;
    width: 16%;
  }
  .col-date {
    width: 250px;
  }
  .col-download {
    width: 110px;
  }
</style>
