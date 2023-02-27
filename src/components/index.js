import modulesStore from '@/store/modules'
import { routerRender } from '@/router/routes.js'
import routes from '@/router/_routerConfig'
import nav from '@/_nav'
import '@/assets/scss/style.scss'
import { MW_API } from '@/service'
// import isFunction from 'lodash/isFunction'
import mwFirebaseSvc from '@/service/firebaseSvc'
import get from 'lodash/get'
import MWSidebarNav from '../containers/MWSidebarNav'
import isObject from 'lodash/isObject'
import { GET_GLOBAL_TOAST_INFO, SAVE_GLOBAL_TOAST_INFO, SAVE_ERROR_NETWORK_TOAST_INFO } from '@/service/_constant'

const DUMMY_TOKEN = process.env.VUE_APP_MW_DEV_ACCESS_TOKEN
const Components = {}

const plugins = {
  install: function(Vue, options = {}) {
    if (!options.store || !options.layout || !options.router || !options.nav || !options.MW_API_CONFIG || !options.PS_API_CONFIG) {
      console.log('Please check params again!')
    }
    // request override base URL
    if (options.MW_API_CONFIG.baseUrl) {
      MW_API.defaults.baseURL = options.MW_API_CONFIG.baseUrl
    }
    if (options.PS_API_CONFIG.baseUrl) {
      window.baseUrlTrackDownload = options.PS_API_CONFIG.baseUrl
    }
    // axios
    const setCount = (type, loadingType) => {
      const loading = loadingType || 'progress'
      options.store.dispatch(`ps/loadingModule/SET_COUNT`, {type, loading})
    }
    MW_API.interceptors.request.use(function (config) {
      const token = localStorage.getItem('ps_access_token') || DUMMY_TOKEN
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      // loading
      if (options.store && !get(config, 'ignoreLoading')) {
        setCount('increment', get(config, 'loading'))
      }
      return config
    }, function (error) {
      return Promise.reject(error)
    })
    // response
    MW_API.interceptors.response.use(function (response) {
      // loading
      if (options.store && !get(response, 'config.ignoreLoading')) {
        setCount('decrease', get(response, 'config.loading'))
      }
      return response
    }, function (error) {
      // const originalRequest = error.config
      // check loading
      if (options.store && !get(error, 'config.ignoreLoading')) {
        setCount('decrease', get(error, 'config.loading'))
      }
      // 401 status
      if (get(error, 'response.status') === 401) {
        Vue.prototype.$bus.$emit('relogin', get(options, 'router.currentRoute.path', ''))
        return Promise.reject(error)
      }
      // if (get(error, 'response.status') === 401) {
      //   if (options.retryOn401 && isFunction(options.retryOn401)) {
      //     return options.retryOn401().then((token) => {
      //       originalRequest.headers['Authorization'] = `Bearer ${token}`
      //       originalRequest._retry = true
      //       return MW_API(originalRequest)
      //     })
      //   } else {
      //     console.log('retryOn401 is not a function')
      //   }
      // }
      // 500 status
      if ((get(error, 'response.status') >= 500) && options.router && !get(error, 'config.params.ignore500Error')) {
        const globalToastFor500Error = 'error500'
        let globalToastInfo = options.store.getters[`ps/globalToast/${GET_GLOBAL_TOAST_INFO}`] || []
        if (!globalToastInfo.includes(globalToastFor500Error)) {
          Vue.toasted.global.error500()
          options.store.dispatch(`ps/globalToast/${SAVE_GLOBAL_TOAST_INFO}`, globalToastFor500Error)
        }
        return
      }
      // Network error
      if (get(error, 'message') === 'Network Error') {
        const globalToastForNetworkError = 'errorNetwork'
        let globalToastInfo = options.store.getters[`ps/globalToast/${GET_GLOBAL_TOAST_INFO}`] || []
        if (!globalToastInfo.includes(globalToastForNetworkError)) {
          options.store.dispatch(`ps/globalToast/${SAVE_GLOBAL_TOAST_INFO}`, globalToastForNetworkError)
          options.store.dispatch(`ps/globalToast/${SAVE_ERROR_NETWORK_TOAST_INFO}`, Vue.toasted.global.errorNetwork())
        }
        return
      }
      // return Error object with Promise
      return Promise.reject(error)
    })
    routerRender.forEach((route) => {
      Components[route.name] = route.component
    })
    Object.keys(Components).forEach((name) => {
      Vue.component(name, Components[name])
    })
    Object.keys(modulesStore).map((name) => {
      options.store.registerModule(name, modulesStore[name])
    })
    // use DefaultContainer in Portal
    routes[0].component = options.layout
    if (routes && routes.length) {
      let updateRoutes = [...routes]
      updateRoutes = updateRoutes.map(rs => updateTitleInRoutes(rs))
      if (options.router) {
        options.router.addRoutes(updateRoutes)
      }
    }

    if (options.nav) {
      options.nav.items = nav.items
    }
    // set up firebase
    if (options.mwFirebaseConfig) {
      mwFirebaseSvc.setFirebase = options.mwFirebaseConfig
    }
    // update _nav
    if (options.nav) {
      const currentClient = options.store.getters['ps/userModule/GET_CURRENT_CLIENT'] || ''
      if (currentClient && currentClient.id) {
        nav.setItem = currentClient.id
      }
      // options.nav.mw = nav
      // nav.addItems = options.nav.ps.items || []
      if (isObject(options.customSidebar)) {
        options.customSidebar.mw = MWSidebarNav
      }
      // update client_id to store
      Vue.prototype.$bus.$on('ps_set_current_client_id', (clientID) => {
        nav.setItem = clientID
      })
    }
    // listen relogin events
    Vue.prototype.$bus.$on('relogin', () => {
      console.log('reset data in MW_____________________')
      // off firebase
      const currentClient = options.store.getters['ps/userModule/GET_CURRENT_CLIENT'] || ''
      options.store.dispatch('mw/reports/resetFirebase', {client_id: currentClient.id})
      // reset state
      options.store.dispatch('mw/resetState')
      // Vue.prototype.$bus.$off('relogin')
    })
  }
}

function updateTitleInRoutes (routes) {
  if (!routes.children || (routes.children && !routes.children.length)) return routes
  routes.children.forEach((r) => {
    if (r.meta && r.meta.title) {
      r.meta.title = r.meta.title + ' - MW - Channel Precision'
    }
    r = updateTitleInRoutes(r)
  })
  return routes
}

export default plugins
