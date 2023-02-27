<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile/>
      <b-link class="navbar-brand" to="#">
        <img
          class="navbar-brand-full"
          src="./../assets/img/logo.png"
          width="89"
          height="25"
          alt="CoreUI Logo"
        >
        <img
          class="navbar-brand-minimized"
          src="./../assets/img/brand/sygnet.svg"
          width="30"
          height="30"
          alt="CoreUI Logo"
        >
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg"/>
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" :to="{name: 'MWDashboardMain'}">Dashboard</b-nav-item>
        <b-nav-item class="px-3" to="/users" exact>Users</b-nav-item>
        <b-nav-item class="px-3">Settings</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item class="d-md-down-none">
          <i class="icon-bell"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-list"></i>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-location-pin"></i>
        </b-nav-item>
        <DefaultHeaderDropdownAccnt/>
      </b-navbar-nav>
      <AsideToggler class="d-none d-lg-block"/>
      <!--<AsideToggler class="d-lg-none" mobile />-->
    </AppHeader>
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <MWSidebarNav :navItems="nav"></MWSidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <a href="https://coreui.io">CoreUI</a>
        <span class="ml-1">&copy; 2018 creativeLabs.</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="https://coreui.io">CoreUI for Vue</a>
      </div>
    </TheFooter>
  </div>
</template>
<script>
import nav from '@/_nav'
import {
  Header as AppHeader,
  SidebarToggler,
  Sidebar as AppSidebar,
  SidebarFooter,
  SidebarForm,
  SidebarHeader,
  SidebarMinimizer,
  Aside as AppAside,
  AsideToggler,
  Footer as TheFooter,
  Breadcrumb
} from '@coreui/vue'
import DefaultAside from './DefaultAside.vue'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt.vue'
import MWSidebarNav from './MWSidebarNav.vue'
// import * as TYPE from '@/actionTypes.js'
// import { mapGetters, mapActions } from 'vuex'
// import { isEmpty } from 'lodash'

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    MWSidebarNav,
    SidebarMinimizer
  },
  data() {
    return {
      nav: nav.items
    }
  },
  computed: {
    name() {
      return this.$route.name
    },
    list() {
      return this.$route.matched.filter((route) => {
        return route.meta.label || route.name
      })
    }
    // ...mapGetters({
    //   planConfig: `mw/${TYPE.GET_PLAN_CONFIG}`
    // })
    // isSIPage () {
    //   const siPageUrlList = ['si-listings', 'sellers', 'listings']
    //   for (let item of siPageUrlList) {
    //     if (this.$route.path.includes(item)) return true
    //   }
    //   return false
    // }
  },
  methods: {
    // ...mapActions({
    //   fetchPermissions: `mw/${TYPE.FETCH_PERMISSIONS}`
    // }),
    // async fetchPermissionsWithCache() {
    //   await this.fetchPermissions()
    //   this.gotoGlobalHomePageIfFailPlanConfig()
    // },
    // gotoGlobalHomePageIfFailPlanConfig() {
    //   if (this.planConfig.seller_enforcement_enabled === false && this.$route.path.includes('seller-enforcements')) {
    //     this.$router.push({'name': 'ps-dashboard'})
    //   } else if (this.planConfig.seller_investigation_dashboard === false && this.isSIPage) {
    //     this.$router.push({'name': 'ps-dashboard'})
    //   }
    // }
  }
  // watch: {
  //   '$route.path': {
  //     immediate: true,
  //     async handler() {
  //       if (isEmpty(this.planConfig)) {
  //         await this.fetchPermissionsWithCache()
  //       } else {
  //         this.gotoGlobalHomePageIfFailPlanConfig()
  //       }
  //     }
  //   }
  // }
}
</script>
