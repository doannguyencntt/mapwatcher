<template>
  <SidebarNav :navItems="nav"></SidebarNav>
</template>

<script>
import SidebarNav from './SidebarNav'
import { mapGetters, mapActions } from 'vuex'
import _nav from '@/_nav'
import _ from 'lodash'
import each from 'lodash/each'
import has from 'lodash/has'
import * as TYPE from '@/actionTypes.js'

export default {
  name: 'MWSidebar',
  components: {
    SidebarNav
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters({
      planConfig: `mw/${TYPE.GET_PLAN_CONFIG}`,
      getPermissions: `mw/${TYPE.GET_PERMISSIONS}`
    }),
    nav() {
      // check permissions
      let menuItems = [{
        name: 'Home',
        icon: 'icon-home',
        to: { name: 'ps-dashboard' }
      }]
      const mwPermissions = this.getPermissions
      if (mwPermissions && mwPermissions.permissions) {
        // render mw nav based on permission
        const permissionsFromStore = mwPermissions.permissions
        let permissionsArray = Object.keys(permissionsFromStore).filter(k => permissionsFromStore[k])
        if (!_.isEmpty(permissionsArray)) {
          each(_nav.items, (item) => {
            if (_.size(item.permissions) === 0) {
              // check the menu Seller Enforcements
              if (_.has(item, 'to') && _.has(this.planConfig, 'seller_enforcement_enabled')) {
                if (item.to.name === 'MWListSellerEnforcements' && this.planConfig.seller_enforcement_enabled === false) return
              }
              if (_.has(item, 'to') && permissionsFromStore.seview === false) {
                if (item.to.name === 'MWListSellerEnforcements') return
              }
              // check the menu MAP Pricing (gs) and planConfig google_shopping
              if (_.has(item, 'to') && _.has(permissionsFromStore, 'gsmapman')) {
                if ((item.to.name === 'MWGSListMaps' && permissionsFromStore.gsmapman === false) || (item.to.name === 'MWGSListMaps' && this.planConfig.plan_max_of_reports_with_google_shopping === 0)) return
              }
              // check the menu MAP Pricing and planConfig amazon_marketplaces
              if (_.has(item, 'to') && _.has(permissionsFromStore, 'mapman')) {
                if ((item.to.name === 'MWListMaps' && permissionsFromStore.mapman === false) || (item.to.name === 'MWListMaps' && _.isEmpty(this.planConfig.allowed_amazon_marketplaces)) || (item.to.name === 'MWListMaps' && this.planConfig.plan_max_of_reports_with_amazon === 0)) return
              }
              menuItems.push(item)
            } else {
              const filterPermissions = _.filter(item.permissions, (permission) => {
                return !_.includes(permissionsArray, permission)
              })
              if (_.isEmpty(filterPermissions)) {
                // check the menu SELLERS & INVESTIGATIONS
                if (_.has(item, 'to') && _.has(this.planConfig, 'seller_investigation_dashboard')) {
                  const siPageList = ['MWSellerDashboardIndex', 'MWSIListings', 'MWSISellerList']
                  if ((_.includes(siPageList, item.to.name) && this.planConfig.seller_investigation_dashboard === false) || (_.includes(siPageList, item.to.name) && permissionsFromStore.siview === false)) return
                }
                if (_.has(item, 'meta') && _.has(this.planConfig, 'seller_investigation_dashboard')) {
                  if ((item.meta.isSIParent && this.planConfig.seller_investigation_dashboard === false) || (item.meta.isSIParent && permissionsFromStore.siview === false)) return
                }
                menuItems.push(item)
              }
            }
          })
          return menuItems
        } else if (mwPermissions && mwPermissions.module_enabled) {
          each(_nav.items, (item) => {
            if (_.size(item.permissions) === 0) {
              menuItems.push(item)
            }
          })
        }
      }
      return menuItems
    },
    isSIPage () {
      const siPageUrlList = ['si-listings', 'sellers', 'listings']
      for (let item of siPageUrlList) {
        if (this.$route.path.includes(item)) return true
      }
      return false
    }
  },
  methods: {
    ...mapActions({
      fetchPermissions: `mw/${TYPE.FETCH_PERMISSIONS}`
    }),
    async fetchPermissionsWithCache() {
      await this.fetchPermissions()
      this.gotoGlobalHomePageIfFailPlanConfig()
    },
    gotoGlobalHomePageIfFailPlanConfig() {
      if (this.planConfig.seller_enforcement_enabled === false && this.$route.path.includes('seller-enforcements')) {
        this.$router.push({'name': 'ps-dashboard'})
      } else if (this.planConfig.seller_investigation_dashboard === false && this.isSIPage) {
        this.$router.push({'name': 'ps-dashboard'})
      }
    },
    getShareToken(payload) {
      const token = has(payload, 'share_token') ? payload.share_token : null
      const config = token ? { share_token: token } : {}
      return { config: config }
    }
  },
  watch: {
    '$route.path': {
      immediate: true,
      async handler() {
        if (this.$route.meta && this.$route.meta.reloadPermissions) {
          await this.fetchPermissions(this.getShareToken(this.$route.query)).then(() => {
            if (this.isSIPage || this.$route.path.includes('seller-enforcements')) {
              this.gotoGlobalHomePageIfFailPlanConfig()
            }
          })
        } else {
          await this.fetchPermissionsWithCache()
        }
      }
    }
  }
  // async created() {
  //   console.log('sidebar')
  //   await this.fetchPermissions()
  // },
  // methods: {
  //   ...mapActions({
  //     fetchPermissions: `mw/${TYPE.FETCH_PERMISSIONS}`
  //   })
  // }
}
</script>

<style lang="scss" scoped>
.sidebar {
  /deep/ .router-link-active {
    color: #fff;
    background: #3a4248;
    .nav-icon {
      color: #20a8d8;
    }
  }
}
</style>
