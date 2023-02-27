import * as TYPE from '@/actionTypes'
import { MW_API } from '@/service'
import * as URL from '@/service/_constant'
import * as utils from '@/shared/utils'
import _ from 'lodash'
import { MarketPlacesResult } from '@/constants/Report'

const state = {
  listMapPrice: {},
  listGSMapPrice: {},
  process: {},
  loadingDownload: false,
  defaultParams: {
    page: 1,
    limit: 100,
    search: null,
    report_id: null,
    sort_by: null,
    sort_dir: null,
    marketplace: MarketPlacesResult.AMAZON_COM,
    brand_name: null,
    review_status: null
  },
  defaultAmazonMapParams: {
    page: 1,
    limit: 100,
    search: null,
    report_id: null,
    sort_by: null,
    sort_dir: null,
    marketplace: null,
    brand_name: null
  },
  mapData: {},
  gsMapData: {},
  caMapData: {},
  isLoadingMap: false,
  isLoadingMapGs: false,
  listDiscoveredGPID: []
}
const getters = {
  [TYPE.GET_MAPS]: (state) => state.listMapPrice,
  [TYPE.GET_GS_MAPS]: (state) => state.listGSMapPrice,
  [TYPE.GET_ONE_MAP]: (state) => state.mapData,
  [TYPE.GET_ONE_GS_MAP]: (state) => state.gsMapData,
  [TYPE.GET_PROCESS_MAPS]: (state) => state.process,
  [TYPE.GET_DEFAULT_PARAMS]: (state) => state.defaultParams,
  [TYPE.GET_DEFAULT_AMAZON_MAP_PARAMS]: (state) => state.defaultAmazonMapParams,
  [TYPE.GET_MAP_PRICING_LOADING]: (state) => state.isLoadingMap,
  [TYPE.GET_MAP_PRICING_GS_LOADING]: (state) => state.isLoadingMapGs,
  [TYPE.GET_LIST_DISCOVERED_GPID]: (state) => state.listDiscoveredGPID
}
const mutations = {
  [TYPE.SET_LIST_MAPS](state, listMapPrice) {
    state.listMapPrice = listMapPrice
  },
  [TYPE.SET_LIST_GS_MAPS](state, listGSMapPrice) {
    state.listGSMapPrice = listGSMapPrice
  },
  [TYPE.SET_ONE_MAP](state, mapData) {
    state.mapData = mapData
  },
  [TYPE.SET_ONE_GS_MAP](state, gsMapData) {
    state.gsMapData = gsMapData
  },
  [TYPE.SET_PROCESS_MAPS](state, process) {
    state.process = process
  },
  [TYPE.SET_URL_EXPORT](state, { loading }) {
    state.loadingDownload = loading
  },
  [TYPE.SET_URL_GS_MAP_EXPORT](state, { loading }) {
    state.loadingDownload = loading
  },
  [TYPE.UPDATE_TOTAL_GS_MAP](state, data) {
    state.listGSMapPrice.total = data
  },
  [TYPE.SET_LIST_MAPS_TOTAL](state, total) {
    state.listMapPrice.total = total
  },
  [TYPE.SET_MAP_PRICING_LOADING] (state, payload) {
    state.isLoadingMap = payload
  },
  [TYPE.SET_MAP_PRICING_GS_LOADING] (state, payload) {
    state.isLoadingMapGs = payload
  },
  [TYPE.UPDATE_LIST_DISCOVERED_GPID] (state, payload) {
    let mapIndex = _.findIndex(state.listGSMapPrice.items, item => item.id === payload.id)
    state.listGSMapPrice.items[mapIndex].discovered_gpids = payload.discovered_gpids
    state.listDiscoveredGPID = state.listGSMapPrice.items[mapIndex].discovered_gpids
  },
  [TYPE.RESET_LIST_DISCOVERED_GPID] (state, payload) {
    state.listDiscoveredGPID = payload
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
  async [TYPE.FETCH_LIST_MAPS]({ commit }, params) {
    params = _.assign({}, state.defaultAmazonMapParams, params)
    commit(TYPE.SET_MAP_PRICING_LOADING, true)
    try {
      const { config, oriPayload } = getShareToken(params)
      const res = await MW_API.get(`${URL.GET_MAPS()}?${utils.buildUrlQueryString(oriPayload)}`, config)
      commit(TYPE.SET_LIST_MAPS, res.data)
      commit(TYPE.SET_MAP_PRICING_LOADING, false)
    } catch (error) {
      console.log(error)
    }
  },
  async [TYPE.FETCH_LIST_GS_MAPS]({ commit }, params) {
    params = _.assign({}, state.defaultParams, params)
    commit(TYPE.SET_MAP_PRICING_GS_LOADING, true)
    const res = await MW_API.get(`${URL.GET_GS_MAPS()}?${utils.buildUrlQueryString(params)}`)
    commit(TYPE.SET_LIST_GS_MAPS, res.data)
    commit(TYPE.SET_MAP_PRICING_GS_LOADING, false)
  },
  async [TYPE.FETCH_ONE_MAP]({ commit }, id) {
    try {
      const res = await MW_API.get(URL.GET_EDIT_AND_REMOVE_A_MAP(id))
      commit(TYPE.SET_ONE_MAP, res.data)
    } catch (error) {
      console.log(error)
    }
  },
  async [TYPE.FETCH_ONE_GS_MAP]({ commit }, id) {
    const res = await MW_API.get(URL.GET_EDIT_AND_REMOVE_A_GS_MAP(id))
    commit(TYPE.SET_ONE_GS_MAP, res.data)
  },
  [TYPE.REMOTE_IMPORT_CSV_MAPS]({ commit }, csv) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.put(URL.PUT_IMPORT_MAPS(), csv)
        commit(TYPE.SET_PROCESS_MAPS, res.data)
        resolve(res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  [TYPE.FETCH_URL_EXPORT]({ commit }, params) {
    commit(TYPE.SET_URL_EXPORT, { loading: true })
    return new Promise(async (resolve, reject) => {
      try {
        const { config } = getShareToken(params)
        const res = await MW_API.get(`${URL.GET_EXPORT_MAP()}?${utils.buildUrlQueryString(params)}`, config)
        resolve(res.data)
        commit(TYPE.SET_URL_EXPORT, {
          url: res.data.url,
          loading: false
        })
      } catch (error) {
        commit(TYPE.SET_URL_EXPORT, { loading: false })
        reject(error.data)
      }
    })
  },
  [TYPE.FETCH_URL_GS_MAP_EXPORT]({ commit }, params) {
    commit(TYPE.SET_URL_GS_MAP_EXPORT, { loading: true })
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.get(`${URL.GET_EXPORT_GS_MAP()}?${utils.buildUrlQueryString(params)}`)
        resolve(res.data)
        commit(TYPE.SET_URL_EXPORT, {
          url: res.data.url,
          loading: false
        })
      } catch (error) {
        commit(TYPE.SET_URL_EXPORT, { loading: false })
        reject(error.data)
      }
    })
  },
  [TYPE.REMOVE_MAP]({ commit, state }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.delete(URL.GET_EDIT_AND_REMOVE_A_MAP(id))
        _.remove(state.listMapPrice.items, (d) => d.id === id)
        state.listMapPrice.items = [...state.listMapPrice.items]
        commit(TYPE.SET_LIST_MAPS_TOTAL, --state.listMapPrice.total)
        resolve(res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  [TYPE.REMOVE_GS_MAP]({ state }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.delete(URL.GET_EDIT_AND_REMOVE_A_GS_MAP(id))
        _.remove(state.listGSMapPrice.items, (d) => d.id === id)

        state.listGSMapPrice.items = [...state.listGSMapPrice.items]

        resolve(res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  [TYPE.UPDATE_MAP]({ state }, { id, data }) {
    let updatedField = ['brand_name', 'sku', 'asin', 'upc', 'price', 'type', 'report_id', 'marketplace']
    const mapData = _.cloneDeep(data)
    _.forEach(mapData, (v, k) => {
      if (updatedField.indexOf(k.toLowerCase()) === -1) {
        delete mapData[k]
      }
    })
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.put(URL.GET_EDIT_AND_REMOVE_A_MAP(id), mapData)
        resolve(res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  [TYPE.UPDATE_GS_MAP]({ state }, { id, data }) {
    let updatedField = ['brand_name', 'sku', 'asin', 'amazon_title', 'upc', 'price', 'gpid', 'report_id', 'size', 'color', 'department']
    const mapData = _.cloneDeep(data)
    _.forEach(mapData, (v, k) => {
      if (updatedField.indexOf(k.toLowerCase()) === -1) {
        delete mapData[k]
      }
    })
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.put(URL.GET_EDIT_AND_REMOVE_A_GS_MAP(id), mapData)
        resolve(res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  [TYPE.EDIT_GPID_DISCOVERY_NEEDED]({ state }, { id, data }) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.put(URL.PUT_GPID_DISCOVERY_NEEDED(id), { gpid_discovery_needed: data })
        resolve(res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  [TYPE.ACCEPT_DISCOVERED_GPID]({ state, commit }, params) {
    const { id, gpid } = params
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.put(URL.ACCEPT_DISCOVERED_GPID(id), { gpid: gpid })
        resolve(res.data)
        commit(TYPE.UPDATE_LIST_DISCOVERED_GPID, res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  [TYPE.DENIED_DISCOVERED_GPID]({ state, commit }, params) {
    const { id, gpid } = params
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.put(URL.DENIED_DISCOVERED_GPID(id), { gpid: gpid })
        resolve(res.data)
        commit(TYPE.UPDATE_LIST_DISCOVERED_GPID, res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  [TYPE.REMOVE_DISCOVERED_GPID]({ state, commit }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id, gpid } = params
        const res = await MW_API.put(URL.REMOVE_DISCOVERED_GPID(id), { gpid: gpid })
        resolve(res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  [TYPE.UPDATE_TOTAL_GS_MAP]({ commit }, data) {
    commit(TYPE.UPDATE_TOTAL_GS_MAP, data)
  },
  [TYPE.GET_BRAND_NAMES] ({ commit }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await MW_API.get(`${URL.GET_BRAND_NAMES()}?${utils.buildUrlQueryString(params)}`)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  },
  [TYPE.GET_GS_BRAND_NAMES] ({ commit }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await MW_API.get(`${URL.GET_GS_BRAND_NAMES()}?${utils.buildUrlQueryString(params)}`)
        resolve(data)
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
