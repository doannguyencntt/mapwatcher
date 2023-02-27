<template>
    <div >
      <div class="mw-main card">
      <div class="widgets-container">
        <div class="align-middle d-flex justify-content-center align-items-center spinner-container" v-if="!sdkConfigInitialized">
      <div class="spinner-border thin-spinner spinner-border-sm thin-spinner"></div>&nbsp;Loading...
      </div>
          <!--dashboard sdk will be renderred where, DON'T change the class-->
          <cbpo-dashboard v-if="sdkConfigInitialized" config-ref="ms_dashboard_seller_main_config" class="mw-sdk-styled seller-dashboard"/>
        </div>
      </div>
    </div>
</template>
<script>
import _nav from '@/_nav'
import * as TYPE from '@/actionTypes.js'
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import config from './sdk-configs/mainTabConfig'
import reportLogo from '@/assets/img/report-demo.jpg'

export default {
  name: 'MWSellerDashboardIndex',
  components: {
  },
  data: () => ({
    share_token: null,
    sdkConfigInitialized: false,
    nav: _nav,
    isLoading: true
  }),
  methods: {
    ...mapActions({
      mainConfig: `mw/dashboard/${TYPE.GET_DATA_CONFIG_VIOLATOR}`,
      remoteFetchSetting: `mw/settings/${TYPE.FETCH_SETTING}`,
      fetchCompliedActiveRogue: `mw/sellers/${TYPE.FETCH_SI_DASHBOARD_COMPLIED_ACTIVE_ROGUE}`,
      fetchCompletion: `mw/sellers/${TYPE.FETCH_SI_DASHBOARD_COMPLETION}`,
      fetchGmr: `mw/sellers/${TYPE.FETCH_SI_DASHBOARD_GMR}`,
      fetchArbitrage: `mw/sellers/${TYPE.FETCH_SI_DASHBOARD_ARBITRAGE}`,
      fetchTotalListing: `mw/sellers/${TYPE.FETCH_SI_DASHBOARD_TOTAL_LISTING}`,
      fetchSellerStatus: `mw/sellers/${TYPE.FETCH_SI_DASHBOARD_SELLER_STATUS}`
    }),
    keepShareTokenForQuery(query) {
      if (this.share_token) {
        _.assign(query, { share_token: this.share_token })
      }
      return query
    },
    initMainDataSource() {
      window.ms_dashboard_seller_main_config = config
    },
    async updateSIDashboardTotalListing() {
      window.ms_dashboard_seller_total_listing = await this.fetchTotalListing(this.keepShareTokenForQuery({}))
    },
    async updateSIDashboardCompliedActiveRogue() {
      window.ms_dashboard_seller_complied_active_rogue = await this.fetchCompliedActiveRogue(this.keepShareTokenForQuery({}))
    },
    async updateSIDashboardCompletion() {
      window.ms_dashboard_seller_completion = await this.fetchCompletion(this.keepShareTokenForQuery({}))
    },
    async updateSIDashboardGmr() {
      window.ms_dashboard_seller_gmr = await this.fetchGmr(this.keepShareTokenForQuery({}))
    },
    async updateSIDashboardArbitrage() {
      window.ms_dashboard_seller_arbitrage = await this.fetchArbitrage(this.keepShareTokenForQuery({}))
    },
    async updateSIDashboardSellerStatus() {
      window.ms_dashboard_seller_status = await this.fetchSellerStatus(this.keepShareTokenForQuery({}))
    },
    async updateDataSrc() {
      const apiList = this.prepareApisForData()
      await Promise.all(apiList).then(() => {
        // TODO: SDK support API refresh data source
        this.$nextTick(() => {
          this.sdkConfigInitialized = true
        })
      })
    },
    prepareApisForData() {
      return [
        this.updateSIDashboardTotalListing(),
        this.updateSIDashboardCompliedActiveRogue(),
        this.updateSIDashboardCompletion(),
        this.updateSIDashboardGmr(),
        this.updateSIDashboardArbitrage(),
        this.updateSIDashboardSellerStatus()
      ]
    },
    async fetchSettings() {
      try {
        const result = await this.remoteFetchSetting(this.keepShareTokenForQuery({}))
        return result
      } catch (error) {
        console.log(error.response.data.message)
        return false
      }
    },
    updateReportLogo(link) {
      if (_.isEmpty(link)) {
        link = reportLogo
      }
      window.ms_dashboard_seller_main_config.widgetLayout.widgets[0].config.elements[0].config.content = `<img src="${link}">`
    }
  },
  computed: {
    ...mapGetters({
    }),
    sharableRoute () {
      const routeRegrex = /\/share\//
      return routeRegrex.test(this.$route.path) ? 'Share' : ''
    }
  },
  async created() {
    this.share_token = this.$route.query.share_token
    const result = await this.fetchSettings()
    this.initMainDataSource()
    this.updateReportLogo(result.default_brand_logo)
    await this.updateDataSrc()
  }
}
</script>

<style lang="scss">
.spinner-container {
  height: 50px;

  .thin-spinner {
    border-width: 1px;
  }
}
.main-board {
  padding-bottom: 10px
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
.seller-dashboard .cbpo-layout .vue-grid-layout .vue-grid-item:nth-child(1) .ql-container .ql-editor img {
  margin:0 auto !important;
  display:block !important;
}
</style>
