<template>
    <div v-if="filterReports.items.length > 0 && settings.show_dashboard && !isLoading">
      <div class="card mw-header__bg">
        <header-component :needToHideSourceTypeFilter="needToHideSourceTypeFilter" :getCurrentSourceOption="getCurrentSourceOption" v-model="selected" :reports="filterReports"></header-component>
      </div>
      <div class="mw-main card">
        <div class="animated fadeIn">
          <div class="main-board pb-0">
            <ul class="widgets-nav nav nav-tabs">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  :to="{name: `MW${sharableRoute}DashboardMain`, params: {client_id: nav.clientId}, query: queryParams}"
                >Dashboard</router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  :to="{name: `MW${sharableRoute}DashboardHistorical`, params: {client_id: nav.clientId}, query: queryParams}"
                >Historical</router-link>
              </li>
            </ul>
            <router-view :selected="selected" v-if="selected.report"></router-view>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="!settings.show_dashboard">
      <div class="card bg-secondary">
        <div class="card-body">
          <p class="mb-0 text-center">
            Your dashboard has been disabled temporarily.
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="!isLoading" class="card bg-secondary">
        <div class="card-body">
          <p class="mb-0 text-center">
            This workspace does not have any active reports.
          </p>
        </div>
      </div>
    </div>
</template>
<script>
import _nav from '@/_nav'
import * as TYPE from '@/actionTypes.js'
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import { allSellers, sellersTypeFields } from './configOptions'
import HeaderComponent from './Header'
import { ReportMarketplaces, MarketPlacesResult, AllSellerMode, DashboardFilterSourceType } from '@/constants/Report'
import { getMarketplaceLabelByType } from '@/shared/utils'
import vToasted from '@/shared/notification'
export default {
  name: 'MWDashboardIndex',
  components: {
    HeaderComponent
  },
  mixins: [vToasted],
  data: () => ({
    MarketPlacesResult,
    ReportMarketplaces,
    AllSellerMode,
    DashboardFilterSourceType,
    sourceAllSellerOptions: [
      { value: DashboardFilterSourceType.VIOLATIONS, text: 'Violations' },
      { value: DashboardFilterSourceType.ALL_SELLERS, text: 'All Items' }
    ],
    sourceAuthorizedOnlyOptions: [
      { value: DashboardFilterSourceType.VIOLATIONS, text: 'Violations' },
      { value: DashboardFilterSourceType.ALL_SELLERS, text: 'All Authorized Items' }
    ],
    sourceRogueOnlyOptions: [
      { value: DashboardFilterSourceType.VIOLATIONS, text: 'Violations' },
      { value: DashboardFilterSourceType.ALL_SELLERS, text: 'All Rogue Items' }
    ],
    queryOptions: {
      active: true
    },
    settings: {
      show_dashboard: true
    },
    routeDashboardMain: 'MWDashboardMain',
    routeDashboardHistorical: 'MWDashboardHistorical',
    selected: {
      report: null,
      marketplace: null,
      marketplace_string_prefix: 'marketplace_',
      seller_type: null,
      fulfillment: '',
      share_token: null,
      source: DashboardFilterSourceType.VIOLATIONS,
      options: {
        marketplaces: [],
        seller_type: [],
        fulfillment: [
          { label: 'All', value: '' },
          { label: 'FBA', value: 'FBA' },
          { label: 'MFN', value: 'MFN' }
        ]
      }
    },
    nav: _nav,
    isLoading: true
  }),
  methods: {
    ...mapActions({
      fetchReports: `mw/dashboard/${TYPE.FETCH_LIST_REPORTS}`,
      mainConfig: `mw/dashboard/${TYPE.GET_DATA_CONFIG_VIOLATOR}`,
      remoteFetchSetting: `mw/settings/${TYPE.FETCH_SETTING}`
    }),
    keepShareTokenForQuery() {
      let query = {
        report: this.selected.report.name_in_dashboard,
        marketplace: this.selected.marketplace,
        seller_type: this.selected.seller_type,
        fulfillment: this.selected.fulfillment,
        source: this.selected.source
      }
      if (this.selected.share_token) {
        _.assign(query, { share_token: this.selected.share_token })
      }
      return query
    },
    hanldeChangeReportName() {
      const val = this.selected.marketplace
      this.selected.options.seller_type = []
      if (val === ReportMarketplaces.google_shopping) {
        this.selected.seller_type = allSellers.value
        this.selected.options.seller_type.push(allSellers)
      } else if (_.includes(_.values(MarketPlacesResult), val.replace(/[_]/g, '.'))) {
        if ((!this.selected.report.separate_mfn_fba_authorized_seller && this.selected.report.list_authorized_seller_names.length === 0) || (this.selected.report.separate_mfn_fba_authorized_seller &&
          this.selected.report.mfn_authorized_seller_names.length === 0 &&
          this.selected.report.fba_authorized_seller_names.length === 0)) {
          this.selected.seller_type = allSellers.value
          this.selected.options.seller_type.push(allSellers)
        } else {
          this.selected.options.seller_type = _.cloneDeep(sellersTypeFields)
          if (this.selected.options.seller_type.length) {
            this.selected.seller_type = this.selected.options.seller_type[0].value
          }
        }
      }
      const query = this.keepShareTokenForQuery()

      this.$router.push({
        params: {
          client_id: this.nav.clientId
        },
        query: query
      })
    },
    handleChangeSource() {
      const query = this.keepShareTokenForQuery()
      this.$router.push({
        params: {
          client_id: this.nav.clientId
        },
        query: query
      })
    },
    handleChangeSellerType() {
      const query = this.keepShareTokenForQuery()

      this.$router.push({
        params: {
          client_id: this.nav.clientId
        },
        query: query
      })
    },
    needToHideSourceTypeFilter() {
      const allSellerMode = this.getMarketplaceInfoDoc(this.selected.report, this.selected.marketplace).all_seller_mode || AllSellerMode.NONE
      if (allSellerMode === AllSellerMode.NONE) {
        this.selected.source = DashboardFilterSourceType.VIOLATIONS
        return true
      }
      return false
    },
    getMarketplaceInfoDoc(report, marketplace) {
      return report[`${this.getMarketplaceInfoKey(marketplace)}`]
    },
    getMarketplaceInfoKey(marketplace) {
      marketplace = this.convertMarketplaceEnumToMarketplaceStringInfo(marketplace)
      return `${this.selected.marketplace_string_prefix}${marketplace}`
    },
    convertMarketplaceEnumToMarketplaceStringInfo(marketplace) {
      if (_.includes(marketplace, 'amazon')) {
        return marketplace.replace(/[.]/g, '_')
      }
      return marketplace
    },
    getCurrentSourceOption() {
      const allSellerMode = this.getMarketplaceInfoDoc(this.selected.report, this.selected.marketplace).all_seller_mode || AllSellerMode.NONE
      switch (allSellerMode) {
        case AllSellerMode.AUTHORIZED_ONLY:
          return this.sourceAuthorizedOnlyOptions
        case AllSellerMode.ROGUE_ONLY:
          return this.sourceRogueOnlyOptions
        case AllSellerMode.NONE:
        case AllSellerMode.BOTH:
          return this.sourceAllSellerOptions
      }
    },
    async fetchSettings() {
      const existShareToken = _.has(this.$route.query, 'token')
      if (!existShareToken) {
        const { id } = this.$route.params
        try {
          const result = await this.remoteFetchSetting({ id })
          return result.show_dashboard
        } catch (error) {
          let message = _.get(error, 'response.data.message', null)
          if (message) {
            this.vToasted('error', message)
          } else {
            console.log(error)
          }
        }
      }
      return true
    }
  },
  computed: {
    ...mapGetters({
      reports: `mw/dashboard/${TYPE.GET_LIST_REPORTS}`
    }),
    filterReports() {
      return this.reports
    },
    queryParams() {
      return this.$route.query || {}
    },
    sharableRoute () {
      const routeRegrex = /\/share\//
      return routeRegrex.test(this.$route.path) ? 'Share' : ''
    }
  },
  async created() {
    const existShareToken = _.has(this.$route.query, 'share_token')
    let params = {
      active_only: this.queryOptions.active,
      limit: 99,
      // must keep this order
      sort_by: 'order',
      sort_dir: 'asc'
    }
    this.selected.source = DashboardFilterSourceType.VIOLATIONS
    this.settings.show_dashboard = true
    if (existShareToken) {
      this.routeDashboardHistorical = 'MWShareDashboardHistorical'
      this.routeDashboardMain = 'MWShareDashboardMain'
      const shareToken = this.$route.query.share_token
      _.assign(params, { share_token: shareToken })
      this.selected.share_token = shareToken
    } else {
      this.settings.show_dashboard = await this.fetchSettings()
    }
    if (this.settings.show_dashboard) {
      this.fetchReports(params).then(res => {
        this.isLoading = false
      }).catch(res => {
        this.isLoading = false
      })
    }
  },
  async syncedReportName() {
    this.hanldeChangeReportName()
  },
  watch: {
    filterReports(val) {
      if (val.items.length) {
        this.selected.report = val.items[0]
        const existReportName = _.has(this.$route.query, 'report')
        if (existReportName) {
          const reportName = this.$route.query.report
          const index = _.findIndex(val.items, function(value) { return reportName.toLowerCase() === value.name_in_dashboard.toLowerCase() })
          if (index > 0) {
            this.selected.report = val.items[index]
          }
        }
      }
    },
    'selected.report'(val) {
      this.selected.marketplace = null
      this.selected.options.marketplace = []
      this.selected.seller_type = null
      this.selected.options.seller_type = []
      _.forEach(val.marketplaces, (v, k) => {
        if (v) {
          this.selected.options.marketplace.push({
            label: getMarketplaceLabelByType(k),
            value: k
          })
        }
      })
      if (!_.isEmpty(this.selected.options.marketplace)) {
        const existMarketplace = _.has(this.$route.query, 'marketplace')
        if (existMarketplace && _.find(this.selected.options.marketplace, { value: this.$route.query.marketplace })) {
          this.selected.marketplace = this.$route.query.marketplace
        } else {
          this.selected.marketplace = this.selected.options.marketplace[0].value
        }
        this.hanldeChangeReportName()
      }
      let query = this.keepShareTokenForQuery()
      this.$router.push({
        params: {
          client_id: this.nav.clientId
        },
        query: query
      })
    },
    'selected.marketplace'(val) {
      this.hanldeChangeReportName()
    },
    'selected.seller_type'(val) {
      this.handleChangeSellerType()
    },
    'selected.fulfillment'(val) {
      this.handleChangeSellerType()
    },
    'selected.source'(val) {
      this.handleChangeSource()
    }
  }
}
</script>

<style lang="scss">
.main-board {
  padding-bottom: 10px;
}
.mw-main {
  overflow: hidden;
  .cbpo-pagination button.current{
    background-color: #57719b !important;
  }
}
.widgets-nav {
  .nav-item:first-child {
    .nav-link {
      border-left: 0;
    }
  }
  .nav-link {
    border-top: 0!important;
    border-radius: 0!important;
    &.active {
      position: relative;
      &:before {
        content: '';
        position: absolute;
        width: 100%;
        top: 0;
        left: 0;
        height: 4px;
        background: #50a3a2;
        border: 1px solid #50a3a2;
      }
    }
  }
}
</style>
