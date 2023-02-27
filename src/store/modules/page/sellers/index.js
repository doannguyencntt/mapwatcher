import * as TYPE from '@/actionTypes'
import { MW_API } from '@/service/'
// import authSvc from '@/services/authSvc'
import _ from 'lodash'
import * as URL from '@/service/_constant'

const state = {
  loadingDownload: false,
  sellerList: {
    items: [],
    total: 1,
    page_size: 10
  },
  sellerFields: [
    { key: 'seller_name', label: 'Seller Name', tdClass: 'align-middle', sortable: 'true' },
    { key: 'merchant_id', label: 'Merchant ID', tdClass: 'align-middle', sortable: 'true' },
    { key: 'status', label: 'Status', tdClass: 'align-middle', sortable: 'true' },
    { key: 'investigation', label: 'Investigation', tdClass: 'align-middle', sortable: 'true' },
    { key: 'source', label: 'Source', tdClass: 'align-middle', sortable: 'true' },
    { key: 'link', label: 'Link', tdClass: 'align-middle', sortable: 'true' },
    { key: 'actions', label: 'Actions', tdClass: 'align-middle col-seller-manage' }
  ],
  sellerData: null,
  listings: {
    items: [],
    total: 1,
    page_size: 10
  },
  listingFields: [
    { key: 'seller.seller_name', label: 'Seller Name', tdClass: 'align-middle' },
    { key: 'seller.merchant_id', label: 'Merchant ID', tdClass: 'align-middle' },
    { key: 'week', label: 'Week', tdClass: 'align-middle' },
    { key: 'date', label: 'Date', tdClass: 'align-middle' },
    { key: 'total', label: 'Total', tdClass: 'align-middle' },
    { key: 'status', label: 'Status', tdClass: 'align-middle' },
    { key: 'actions', label: 'Actions', tdClass: 'align-middle col-listing-manage' }
  ],
  listingData: null,
  detailSettings: null,
  isLoadingSeller: false,
  isLoadingListing: false
}

const getters = {
  getSellers: (state) => state.sellerList,
  getSellerFields: (state) => state.sellerFields,
  getOneSeller: (state) => state.sellerData,
  getListings: (state) => state.listings,
  getListingFields: (state) => state.listingFields,
  getOneListing: (state) => state.listingData,
  [TYPE.GET_SELLER_LOADING]: (state) => state.isLoadingSeller,
  [TYPE.GET_LISTING_LOADING]: (state) => state.isLoadingListing
}

const mutations = {
  saveSellers(state, payload) {
    state.sellerList = { ...payload }
  },
  saveOneSeller(state, payload) {
    state.sellerData = { ...payload }
  },
  saveListings(state, payload) {
    state.listings = { ...payload }
  },
  saveOneListing(state, payload) {
    state.listingData = { ...payload }
  },
  getSettings(state, payload) {
    state.detailSettings = { ...payload }
  },
  getDSStatuses(state, payload) {
    state.DSStatuses = payload
  },
  getUIStatuses(state, payload) {
    state.UIStatuses = payload
  },
  [TYPE.SET_SI_SELLER_URL_EXPORT](state, { loading }) {
    state.loadingDownload = loading
  },
  [TYPE.SET_SELLER_LOADING] (state, payload) {
    state.isLoadingSeller = payload
  },
  [TYPE.SET_LISTING_LOADING] (state, payload) {
    state.isLoadingListing = payload
  }
}

const getShareToken = (payload) => {
  const token = _.has(payload, 'share_token') ? payload.share_token : null
  if (token) {
    payload = _.omit(payload, ['share_token'])
  }
  const config = token ? { share_token: token } : {}
  return { config: config, oriPayload: payload }
}

const actions = {
  // ------------------------- Sellers ------------------------- //
  getSellersData: async ({ commit }, payload) => {
    try {
      let clientID = payload.clientID
      let params = `?limit=${payload.limit}&page=${payload.page}`
      commit(TYPE.SET_SELLER_LOADING, true)
      if (payload.s) {
        params += `&s=${encodeURIComponent(payload.s)}`
      }
      if (payload.sort_by) {
        params += `&sort_by=${payload.sort_by}`
      }
      if (payload.sort_dir) {
        params += `&sort_dir=${payload.sort_dir}`
      }
      let res = await MW_API(URL.GET_SI_SELLER_LIST(clientID, params), {
        method: 'get'
      })
      commit('saveSellers', res.data)
      commit(TYPE.SET_SELLER_LOADING, false)
      return res.status
    } catch (err) {
      commit(TYPE.SET_SELLER_LOADING, false)
      return _.get(err, 'response.data.statusCode', 500)
    }
  },
  getOneSellerData: async ({ commit }, payload) => {
    try {
      let clientID = payload.clientID
      let sellerID = payload.sellerID
      let res = await MW_API(URL.GET_ONE_SI_SELLER(clientID, sellerID), {
        method: 'get'
      })
      commit('saveOneSeller', res.data)
      return res.data
    } catch (err) {
      return _.get(err, 'response.data.statusCode', 500)
    }
  },
  createSeller: async ({ commit }, payload) => {
    try {
      let clientID = payload.clientID
      payload = _.omit(payload, 'clientID')
      let res = await MW_API(URL.CREATE_SI_SELLER(clientID), {
        method: 'post',
        data: payload
      })
      return res.status
    } catch (err) {
      return _.get(err, 'response.data.statusCode', 500)
    }
  },
  updateSeller: async ({ commit }, payload) => {
    try {
      let clientID = payload.clientID
      let sellerID = payload.sellerID
      payload = _.omit(payload, ['clientID', 'sellerID'])
      let res = await MW_API(URL.UPDATE_SI_SELLER(clientID, sellerID), {
        method: 'put',
        data: payload
      })
      return res.status
    } catch (err) {
      return _.get(err, 'response.data.statusCode', 500)
    }
  },
  deleteSeller: async ({ commit }, payload) => {
    try {
      let clientID = payload.clientID
      let sellerID = payload.sellerID
      let res = await MW_API(URL.DELETE_SI_SELLER(clientID, sellerID), {
        method: 'delete'
      })
      return res.status
    } catch (err) {
      return _.get(err, 'response.data.statusCode', 500)
    }
  },
  // ------------------------- Sellers ------------------------- //
  // ------------------------- Listings ------------------------- //
  getListingData: async ({ commit }, payload) => {
    try {
      let clientID = payload.clientID
      let params = `?limit=${payload.limit}&page=${payload.page}`
      commit(TYPE.SET_LISTING_LOADING, true)
      if (payload.s) {
        params += `&s=${encodeURIComponent(payload.s)}`
      }
      if (payload.sort_by) {
        params += `&sort_by=${payload.sort_by}`
      }
      if (payload.sort_dir) {
        params += `&sort_dir=${payload.sort_dir}`
      }
      if (payload.status) {
        params += `&status=${payload.status}`
      }
      let res = await MW_API(URL.GET_SI_LISTINGS(clientID, params), {
        method: 'get'
      })
      commit('saveListings', res.data)
      commit(TYPE.SET_LISTING_LOADING, false)
      return res.status
    } catch (err) {
      commit(TYPE.SET_LISTING_LOADING, false)
      return _.get(err, 'response.data.statusCode', 500)
    }
  },
  getOneListingData: async ({ commit }, payload) => {
    try {
      let clientID = payload.clientID
      let listingID = payload.listingID
      let res = await MW_API(URL.GET_ONE_SI_LISTING(clientID, listingID), {
        method: 'get'
      })
      commit('saveOneListing', res.data)
      return res.data
    } catch (err) {
      return _.get(err, 'response.data.statusCode', 500)
    }
  },
  createListing: async ({ commit }, payload) => {
    try {
      let clientID = payload.clientID
      payload = _.omit(payload, 'clientID')
      let res = await MW_API(URL.CREATE_SI_LISTING(clientID), {
        method: 'post',
        data: payload,
        params: {
          ignore500Error: true
        }
      })
      return res.status
    } catch (err) {
      return _.get(err, 'response.data', 500)
    }
  },
  updateListing: async ({ commit }, payload) => {
    try {
      let clientID = payload.clientID
      let listingID = payload.listingID
      payload = _.omit(payload, ['clientID', 'listingID'])
      let res = await MW_API(URL.UPDATE_SI_LISTING(clientID, listingID), {
        method: 'put',
        data: payload
      })
      return res.status
    } catch (err) {
      return _.get(err, 'response.data', 500)
    }
  },
  deleteListing: async ({ commit }, payload) => {
    try {
      let clientID = payload.clientID
      let listingID = payload.listingID
      let res = await MW_API(URL.DELETE_SI_LISTING(clientID, listingID), {
        method: 'delete'
      })
      return res.status
    } catch (err) {
      return _.get(err, 'response.data.statusCode', 500)
    }
  },
  [TYPE.FETCH_SI_SELLER_URL_EXPORT]({ commit }, params) {
    commit(TYPE.SET_SI_SELLER_URL_EXPORT, { loading: true })
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.get(`${URL.GET_EXPORT_SI_SELLER_LIST()}`)
        resolve(res.data)
        commit(TYPE.SET_SI_SELLER_URL_EXPORT, {
          url: res.data.url,
          loading: false
        })
      } catch (error) {
        commit(TYPE.SET_SI_SELLER_URL_EXPORT, { loading: false })
        reject(error.data)
      }
    })
  },
  [TYPE.FETCH_SI_DASHBOARD_COMPLIED_ACTIVE_ROGUE] ({ commit, dispatch }, params) {
    return new Promise(async (resolve, reject) => {
      params = _.assign({}, state.defaultParams, params)
      try {
        const { config } = getShareToken(params)
        const res = await MW_API.get(`${URL.GET_SI_DASHBOARD_COMPLIED_ACTIVE_ROGUE()}`, config)
        resolve(res.data)
      } catch (error) {
        reject(error)
      }
    })
  },
  [TYPE.FETCH_SI_DASHBOARD_COMPLETION] ({ commit, dispatch }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config } = getShareToken(params)
        const res = await MW_API.get(`${URL.GET_SI_DASHBOARD_COMPLETION()}`, config)
        resolve(res.data)
      } catch (error) {
        reject(error)
      }
    })
  },
  [TYPE.FETCH_SI_DASHBOARD_GMR] ({ commit, dispatch }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config } = getShareToken(params)
        const res = await MW_API.get(`${URL.GET_SI_DASHBOARD_GMR()}`, config)
        resolve(res.data)
      } catch (error) {
        reject(error)
      }
    })
  },
  [TYPE.FETCH_SI_DASHBOARD_ARBITRAGE] ({ commit, dispatch }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config } = getShareToken(params)
        const res = await MW_API.get(`${URL.GET_SI_DASHBOARD_ARBITRAGE()}`, config)
        resolve(res.data)
      } catch (error) {
        reject(error)
      }
    })
  },
  [TYPE.FETCH_SI_DASHBOARD_TOTAL_LISTING] ({ commit, dispatch }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config } = getShareToken(params)
        const res = await MW_API.get(`${URL.GET_SI_DASHBOARD_TOTAL_LISTING()}`, config)
        resolve(res.data)
      } catch (error) {
        reject(error)
      }
    })
  },
  [TYPE.FETCH_SI_DASHBOARD_SELLER_STATUS] ({ commit, dispatch }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config } = getShareToken(params)
        const res = await MW_API.get(`${URL.GET_SI_DASHBOARD_SELLER_STATUS()}`, config)
        resolve(res.data)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
