<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <InventoryHistoryListContent
          fixed
          bordered
          :caption="$route.meta.tableName"
          :fields="fields"
          @paramsChange="loadData"
          :historyLoading="historyLoading"
        ></InventoryHistoryListContent>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import InventoryHistoryListContent from './InventoryHistoryListContent'
import PermissionsMixin from '@/components/common/PermissionsMixin'
import * as TYPE from '@/actionTypes.js'
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'
import { MarketplaceLabel } from '@/constants/Report'

export default {
  name: 'MWReportInventoryHistory',
  components: { InventoryHistoryListContent },
  mixins: [PermissionsMixin],
  methods: {
    ...mapActions({
      fetchInventoryHistory: `mw/reports/${TYPE.FETCH_INVENTORY_HISTORY}`
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
      this.fetchInventoryHistory({
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
      historyLoading: `mw/reports/${TYPE.GET_INVENTORY_HISTORY_LOADING}`
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
        thClass: 'text-center align-middle',
        tdClass: 'text-center align-middle'
      },
      {
        key: 'actions',
        label: 'Actions',
        thClass: 'text-center align-middle',
        tdClass: 'text-center align-middle'
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
    this.$store.state.mw.reports.inventoryHistories = []
  }
}
</script>
<style lang="scss">
</style>
