// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/_middleware'
import store from './store'
import _nav from './_nav'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-tree-halower/dist/halower-tree.min.css' // you can customize the style of the tree
// Import styles
import '@coreui/coreui/scss/coreui.scss'
// Import Main styles for this application
import './assets/scss/style.scss'
import { VTree, VSelectTree } from 'vue-tree-halower'
import Vuelidate from 'vuelidate'
import Toasted from 'vue-toasted'
import vueMoment from 'vue-moment'
import ToggleButton from 'vue-js-toggle-button'
import sdkModule from 'plat-rs-sdk'
import 'plat-rs-sdk/dist/reporting-sdk.css'
import importSDK from 'plat-import-lib'
import { MW_API } from '@/service'
import 'plat-import-lib/dist/import-lib-web.css'
import pluralize from 'pluralize'

Vue.use(ToggleButton)
Vue.use(vueMoment)
Vue.use(Toasted)
Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(VSelectTree)
Vue.use(VTree)
const EventBus = new Vue()
Object.defineProperties(Vue.prototype, {
  $bus: {
    get: function () {
      return EventBus
    }
  }
})
const clientId = window.location.hash.split('/')[2]
const endPointAPI = {
  postFile: `/v1/clients/${clientId}`,
  validate: `/v1/clients/${clientId}`,
  process: `/v1/clients/${clientId}`,
  getListItems: `/v1/clients/${clientId}`,
  linkSample: `/v1/clients/${clientId}`,
  linkInvalid: `/v1/clients/${clientId}`,
  linkAll: `/v1/clients/${clientId}`,
  infoImport: `/v1/clients/${clientId}`
}

Vue.use(importSDK, { store, router, _nav, endPointAPI })
importSDK.setAxios(MW_API)

Vue.config.productionTip = false

Vue.filter('pluralize', function (value, number) {
  return pluralize(value, number)
})

Vue.filter('formatNumber', function (number) {
  return new Intl.NumberFormat('en-US').format(number)
})

Vue.filter('formatPercentBase1', function (number) {
  return Math.round(number * 100)
})

const DS_API_CONFIG = {
  baseUrl: `${process.env.VUE_APP_MW_API_BASE_URL}/ds-proxy` || ''
  // baseUrl: `http://localhost:3200` || ''
}
const getToken = () => {
  return `${process.env.VUE_APP_MW_DEV_ACCESS_TOKEN}`
}
const getClientId = () => {
  return `${process.env.VUE_APP_MW_DEV_CLIENT_ID}`
}
const handlerErrorCodeSdk = (errorCode) => {
  return 'error_code'
}

Vue.use(sdkModule, {
  DS_API_CONFIG,
  getToken,
  getClientId,
  handlerErrorCodeSdk,
  chartColor: {
    accentColor: '#000',
    mainColor: '#fff',
    hoverItemColor: '#000',
    navigationActive: '#17a2b8',
    navigationInactive: '#cecece'
  }
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
