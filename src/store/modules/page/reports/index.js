import * as TYPE from '@/actionTypes'
// import { promiseOneReport } from './_dataConfig'
import _ from 'lodash'
import { MW_API } from '@/service/'
import * as URL from '@/service/_constant'
// import { ucfirst } from '@/shared/utils'
import * as utils from '@/shared/utils'
import mwFirebaseJob from '@/service/firebaseSvc'
import { MarketPlacesResult } from '@/constants/Report'
import Vue from 'vue'
// import Vue from 'vue'

const fieldAccess = [
  'active',
  'marketplaces',
  'list_authorized_seller_names',
  'logo',
  'name_in_dashboard',
  'price_manager',
  'ignore_screenshot',
  'fulfillment',
  'order',
  'ignore_price_tracking',
  'show_upc_in_dashboard',
  'priority',
  'watch_for_used_items',
  'separate_mfn_fba_authorized_seller',
  'fba_authorized_seller_names',
  'mfn_authorized_seller_names',
  'true_map_report'
]

const state = {
  listImportReports: {},
  listReports: {
    items: [],
    total: 0
  },
  report: {
    price_manager: {},
    active: false
  },
  listReportMarketplaceHistory: {},
  tempReport: {},
  defaultParams: {
    page: 1,
    limit: 10,
    s: null,
    sort_by: 'name_in_dashboard',
    sort_dir: 'asc'
  },
  defaultParamsImportReports: {
    page: 1,
    limit: 250,
    sort_by: 'name_in_dashboard',
    sort_dir: 'asc'
  },
  defaultParamsReportMarketplaceHistory: {
    page: 1,
    limit: 10,
    report_id: null,
    marketplace: null
  },
  isLoad: false,
  isGSLoad: false,
  runReportNr: 0,
  getValidAmazonReport: [],
  getValidAmazonCAReport: [],
  getValidGSReport: [],
  inventoryHistories: [],
  inventorySchedules: [],
  isLoadingReportHistory: false,
  isLoadingInventoryHistory: false,
  isLoadingListReports: false,
  listAmazonReports: [],
  listGSReports: []
}
const getters = {
  [TYPE.GET_LIST_REPORTS]: (state) => state.listReports,
  [TYPE.GET_ONE_REPORT]: (state) => state.report,
  [TYPE.GET_REPORT_LOADING]: (state) => state.isLoad,
  [TYPE.GET_GS_REPORT_LOADING]: (state) => state.isGSLoad,
  [TYPE.GET_DEFAULT_PARAMS]: (state) => state.defaultParams,
  [TYPE.GET_VALID_AMAZON_REPORTS]: (state) => state.getValidAmazonReport,
  [TYPE.GET_VALID_GS_REPORTS]: (state) => state.getValidGSReport,
  [TYPE.GET_REPORT_MARKETPLACE_HISTORY]: (state) => state.listReportMarketplaceHistory,
  [TYPE.GET_REPORT_MARKETPLACE_HISTORY_DEFAULT_PARAMS]: (state) => state.defaultParamsReportMarketplaceHistory,
  [TYPE.GET_INVENTORY_HISTORY]: (state) => state.inventoryHistories,
  [TYPE.GET_INVENTORY_SCHEDULES]: (state) => state.inventorySchedules,
  [TYPE.GET_LIST_IMPORT_REPORTS]: (state) => state.listImportReports,
  [TYPE.GET_HISTORY_LOADING]: (state) => state.isLoadingReportHistory,
  [TYPE.GET_INVENTORY_HISTORY_LOADING]: (state) => state.isLoadingInventoryHistory,
  [TYPE.GET_LIST_REPORT_LOADING]: (state) => state.isLoadingListReports,
  [TYPE.GET_AMAZON_LIST_REPORTS]: (state) => state.listAmazonReports,
  [TYPE.GET_GS_LIST_REPORTS]: (state) => state.listGSReports
}
const getShareToken = (payload) => {
  const token = _.has(payload, 'share_token') ? payload.share_token : null
  if (token) {
    payload = _.omit(payload, ['share_token'])
  }
  const config = token ? { share_token: token } : {}
  return { config: config, oriPayload: payload }
}

const mutations = {
  [TYPE.SET_LIST_REPORTS] (state, payload) {
    state.listReports = { ...payload }
  },
  [TYPE.SET_INVENTORY_STATUS_LIST_REPORTS] (state, payload) {
    const index = state.listReports.items.findIndex(element => element._id === payload.report_id)
    if (index !== -1) {
      if (state.listReports.items[index].activeMarketplaces) {
        const activeMarketplaces = state.listReports.items[index].activeMarketplaces
        const indexUpdateInfo = activeMarketplaces.findIndex(e => e.value === payload.marketplace)
        indexUpdateInfo !== -1 && Vue.set(activeMarketplaces[indexUpdateInfo].info, 'inventory_schedule', payload)
      }
      const marketplace = `marketplace_${payload.marketplace.replace(/[.]/g, '_')}`
      Vue.set(state.listReports.items[index][marketplace], 'inventory_schedule', payload)
    }
  },
  [TYPE.SET_LIST_REPORT_MARKETPLACE_HISTORY] (state, payload) {
    state.listReportMarketplaceHistory = { ...payload }
  },
  [TYPE.GET_VALID_AMAZON_REPORTS] (state, payload) {
    state.getValidAmazonReport = { ...payload }
  },
  [TYPE.GET_VALID_GS_REPORTS] (state, payload) {
    state.getValidGSReport = { ...payload }
  },
  [TYPE.SET_ONE_REPORT] (state, payload) {
    state.report = payload
  },
  [TYPE.SET_REPORT_LOADING] (state, payload) {
    state.isLoad = payload
  },
  [TYPE.SET_GS_REPORT_LOADING] (state, payload) {
    state.isGSLoad = payload
  },
  [TYPE.UPDATE_REPORT_PROGRESS] (state, payload) {
    let index = state.listReports.items.findIndex(item => item._id === payload.report_id)
    if (index !== -1) {
      if (state.runReportNr > 0) {
        // console.log('payload', payload)
        const indexItem = _.findIndex(state.listReports.items[index].activeMarketplaces, (info) => { return info.value === payload.marketplace })
        if (indexItem !== -1) {
          if (!_.isEmpty(payload.inventory_schedule)) {
            state.listReports.items[index].activeMarketplaces[indexItem].info.inventory_schedule = payload.inventory_schedule
          } else {
            state.listReports.items[index].activeMarketplaces[indexItem].info.last_job_status = payload.status
            // use this for system mode handle job is map based job
            state.listReports.items[index].activeMarketplaces[indexItem].info.last_job_progress = payload.progress
            if (typeof (payload.number_processed_map) === 'number') {
              state.listReports.items[index].activeMarketplaces[indexItem].info.number_processed_map = payload.number_processed_map
            }
            if (typeof (payload.number_total_map) === 'number') {
              state.listReports.items[index].activeMarketplaces[indexItem].info.number_total_map = payload.number_total_map
            }
            console.log('report is updated')
          }
        }
      } else {
        state.runReportNr = state.runReportNr + 1
        console.log('not update - report')
      }
    }
    // console.log('after', state.items)
  },
  [TYPE.RESET_REPORT_RUN_NR] (state, payload) {
    state.runReportNr = 0
  },
  [TYPE.SET_IS_DOWLOADING_REPORT] (state, payload) {
    // Vue.$set(state.listReports.items[payload.index].activeMarketplaces[payload.indexActiveMarketplaces], 'isLoad', payload.isLoad)
    state.listReports.items[payload.index].activeMarketplaces[payload.indexActiveMarketplaces].isLoad = payload.isLoad
    console.log('state.listReports.items[payload.index].activeMarketplaces[payload.indexActiveMarketplaces].isLoad', state.listReports.items[payload.index].activeMarketplaces[payload.indexActiveMarketplaces].isLoad)
  },
  [TYPE.SET_INVENTORY_HISTORY] (state, payload) {
    state.inventoryHistories = { ...payload }
  },
  [TYPE.SET_INVENTORY_SCHEDULES] (state, payload) {
    state.inventorySchedules = { ...payload }
  },
  [TYPE.SET_IMPORT_REPORTS] (state, payload) {
    state.listImportReports = payload
  },
  [TYPE.SET_HISTORY_LOADING] (state, payload) {
    state.isLoadingReportHistory = payload
  },
  [TYPE.SET_INVENTORY_HISTORY_LOADING] (state, payload) {
    state.isLoadingInventoryHistory = payload
  },
  [TYPE.SET_LIST_REPORT_LOADING] (state, payload) {
    state.isLoadingListReports = payload
  },
  [TYPE.SET_EDIT_FORM_LIST_REPORTS] (state, payload) {
    state.listGSReports = payload.filter(report => report.marketplaces.google_shopping === true)
    state.listAmazonReports = payload.filter(report => {
      return Object.keys(report.marketplaces).find(key => key.includes('amazon') && report.marketplaces[key] === true)
    })
  }
}

const actions = {
  [TYPE.GET_VALID_AMAZON_REPORTS] ({ commit, dispatch }, params) {
    params = _.assign({}, state.getValidAmazonReport, params)
    commit(TYPE.SET_REPORT_LOADING, true)
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(params)
        const res = await MW_API.get(`${URL.GET_VALID_AMAZON_REPORT()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        commit(TYPE.GET_VALID_AMAZON_REPORTS, res.data)
        commit(TYPE.SET_REPORT_LOADING, false)
        resolve(res.data)
      } catch (error) {
        reject(error)
      }
    })
  },
  [TYPE.GET_VALID_GS_REPORTS] ({ commit, dispatch }, params) {
    params = _.assign({}, state.getValidGSReport, params)
    commit(TYPE.SET_REPORT_LOADING, true)
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.get(`${URL.GET_VALID_GS_REPORT()}?${utils.buildUrlQueryString(params)}`)
        commit(TYPE.GET_VALID_GS_REPORTS, res.data)
        commit(TYPE.SET_REPORT_LOADING, false)
        resolve(res.data)
      } catch (error) {
        reject(error)
      }
    })
  },
  [TYPE.FETCH_LIST_REPORTS] ({ commit, dispatch }, params) {
    params = _.assign({}, state.defaultParams, params)
    commit(TYPE.SET_REPORT_LOADING, true)
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.get(`${URL.GET_POST_REPORTS()}?${utils.buildUrlQueryString(params)}`)
        _.forEach(res.data.items, (item, index) => {
          item.activeMarketplaces = []
          const keys = _.keys(item.marketplaces)
          _.forEach(keys, (key) => {
            if (item.marketplaces[key]) {
              item[`marketplace_${key}`].isLoad = false
              item.activeMarketplaces.push({
                key: key,
                value: _.includes(key, 'amazon') ? key.replace(/[_]/g, '.') : key,
                label: _.includes(key, 'amazon') ? _.upperFirst(key.replace(/[_]/g, '.')) : _.startCase(_.toLower(key.replace(/[_]/g, ' '))),
                info: item[`marketplace_${key}`]
              }) // TODO we already migrate data if marketplace is enable - script will create info with field marketplace_${marketplace_field} so i think case null will not happen
            }
          })
        })
        commit(TYPE.SET_LIST_REPORTS, res.data)
        commit(TYPE.SET_REPORT_LOADING, false)
        dispatch(TYPE.LISTEN_TO_FIREBASE_EVENT_REPORT, res.data)
        resolve(res.data)
      } catch (error) {
        // console.log(error)
        reject(error)
      }
    })
  },
  [TYPE.RESET_REPORTS] ({ commit }) {
    try {
      let data = {
        items: [],
        total: 0
      }
      commit(TYPE.SET_LIST_REPORTS, data)
    } catch (error) {
      console.log(error)
    }
  },
  async [TYPE.FETCH_LIST_REPORT_MARKETPLACE_HISTORY]({ commit }, params) {
    try {
      params = _.assign({}, state.defaultParamsReportMarketplaceHistory, params)
      commit(TYPE.SET_HISTORY_LOADING, true)
      const res = await MW_API.get(`${URL.GET_REPORT_MARKETPLACE_HISTORY(params.report_id, params.marketplace)}?${utils.buildUrlQueryString(params)}`)
      commit(TYPE.SET_LIST_REPORT_MARKETPLACE_HISTORY, res.data)
      commit(TYPE.SET_HISTORY_LOADING, false)
    } catch (error) {
      commit(TYPE.SET_HISTORY_LOADING, false)
      throw error
    }
  },
  async [TYPE.REMOVE_REPORTS] ({ state }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.delete(URL.EDIT_AND_REMOVE_REPORTS(id))
        _.remove(state.listReports.items, (d) => d._id === id)
        state.listReports.items = [...state.listReports.items]
        resolve(res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  async [TYPE.RUN_A_REPORT] ({ commit, state, dispatch }, info) {
    // return new Promise(async (resolve, reject) => {
    try {
      const reportId = info.id
      const runOptions = info.runOptions
      const marketplace = info.runOptions.marketplace
      // let res = null
      if (_.includes(marketplace, 'amazon')) {
        await MW_API.post(URL.RUN_A_REPORT(reportId), {
          ...runOptions
        })
      } else if (marketplace === MarketPlacesResult.GOOGLE_SHOPPING) {
        await MW_API.post(URL.RUN_A_GS_REPORT(reportId), {
          ...runOptions
        })
      }
      // const { data } = res
      // const report = state.listReports.items.find((e) => e._id === reportId)
      // if (report) {
      //   const index = _.findIndex(report.activeMarketplaces, (info) => { return info.value === marketplace })
      // for system mode handle mode report based task
      // report.activeMarketplaces[index].info.latest_job = {
      //   status: data.status,
      //   progress: data.progress
      // }
      // report.activeMarketplaces[index].info.last_job_id = data.id
      // report.activeMarketplaces[index].info.last_job_status = data.status
      // for system mode handle mode map based task
      // report.activeMarketplaces[index].info.last_job_status = data.status
      // report.activeMarketplaces[index].info.last_job_progress = 0
      // if (data.system_mode_handling_mode === SystemJobHandlingMode.TASK_PER_MAP) {
      //   report.activeMarketplaces[index].info.last_job_status = data.status
      //   report.activeMarketplaces[index].info.last_job_progress = 0
      // } else if (data.system_mode_handling_mode === SystemJobHandlingMode) {
      //
      // }
      // }
      // commit(TYPE.SET_LIST_REPORTS, state.listReports)
      // if (res.data.status === 'running') {
      //   await dispatch(TYPE.REAL_TIME_STATUS_RUN, { reportId })
      // }
      // console.log('end jobs', reportId)
      // resolve()
    } catch (error) {
      console.log('jobs', error)
      throw _.get(error, 'response.data', error)
    }
  },
  async [TYPE.CANCEL_A_REPORT]({ commit }, payload) {
    try {
      const params = {
        report_id: payload.report_id,
        marketplace: payload.marketplace
      }
      const result = await MW_API.post(URL.CANCEL_A_REPORT(params.report_id, params.marketplace))
      return result.data
    } catch (error) {
      throw error
    }
  },
  [TYPE.REAL_TIME_STATUS_RUN] (
    { commit, state, dispatch },
    { reportId, reResolve, reReject }
  ) {
    return new Promise(async (resolve, reject) => {
      if (reResolve) {
        resolve = reResolve
        reject = reReject
      }
      try {
        const res = await MW_API.get(URL.CHECK_STATUS_RUN_A_REPORT(reportId))
        const { data } = res
        const report = state.listReports.items.find((e) => e.id === reportId)
        if (report) {
          report.last_job = data.last_job
          report.last_job_id = data.last_job_id
          commit(TYPE.SET_LIST_REPORTS, state.listReports)
          if (res.data.last_job.status === 'running') {
            setTimeout(() => {
              console.log(
                reportId,
                'realtime get status for job',
                new Date().getTime() / 1000
              )
              dispatch(TYPE.REAL_TIME_STATUS_RUN, {
                reportId,
                reResolve: resolve,
                reReject: reject
              })
            }, 4000)
          } else {
            resolve()
          }
        } else {
          resolve()
        }
      } catch (error) {
        console.log('realtime get status for job is error', error)
        reject(error)
      }
    })
  },
  async [TYPE.REMOTE_EDIT_REPORT] ({ commit, state }, { id, params }) {
    const report = _.cloneDeep(params)
    _.forEach(report, (v, k) => {
      if (fieldAccess.indexOf(k.toLowerCase()) === -1 && (!_.includes(k, 'amazon') && !_.includes(k, 'google'))) {
        delete report[k]
      }
    })
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.put(URL.EDIT_AND_REMOVE_REPORTS(id), {
          ...report
        })
        resolve(res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  async [TYPE.REMOTE_POST_REPORT] ({ commit, state }, params) {
    const report = _.cloneDeep(params)
    _.forEach(report, (v, k) => {
      if (fieldAccess.indexOf(k.toLowerCase()) === -1 && (!_.includes(k, 'amazon') && !_.includes(k, 'google'))) {
        delete report[k]
      }
    })
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.post(URL.GET_POST_REPORTS(), {
          ...report
        })
        resolve(res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  async [TYPE.REMOTE_GET_LINK_DOWNLOAD_JOB] ({ commit, state, dispatch }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id, marketplace, source } = params
        let query = `?report_id=${id}&marketplace=${marketplace}`
        if (source) {
          query += `&source=${source}`
        }
        const res = await MW_API.get(`${URL.DOWNLOAD_JOB_BY_ID(id)}${query}`)
        resolve(res.data)
      } catch (error) {
        reject(error.response.data)
      }
    })
  },
  [TYPE.FETCH_ONE_REPORT] ({ commit, state, dispatch }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.get(URL.GET_ONE_REPORT_BY_ID(id))
        commit(TYPE.SET_ONE_REPORT, res.data)
        resolve()
      } catch (error) {
        reject(error.data)
      }
    })
  },
  async [TYPE.REMOTE_SEARCH_REPORTS] ({ commit }, payload) {
    try {
      const res = await MW_API.get(URL.GET_POST_REPORTS(), payload.search ? {
        params: {
          s: payload.search
        }
      } : {})
      state.currentPage = 1
      commit(TYPE.SET_LIST_REPORTS, res.data)
    } catch (error) {
      console.log(error.data)
    }
  },
  async [TYPE.REMOTE_SORT_REPORTS] ({ commit, state }, payload) {
    try {
      const res = await MW_API.get(URL.GET_POST_REPORTS(), {
        params: {
          sort_dir: payload.sortDir,
          sort_by: payload.sortBy,
          ...(payload.search ? { s: payload.search } : {})
        }
      })
      state.currentPage = 1
      commit(TYPE.SET_LIST_REPORTS, res.data)
    } catch (error) {
      console.log('err', error.data)
    }
  },
  resetFirebase ({ commit }, payload) {
    if (payload.client_id) {
      mwFirebaseJob.getFirebaseDb.ref(`/mw_job_status_${payload.client_id}`).off('value')
    } else {
      console.error('client_id is required to reset firebase')
    }
  },
  [TYPE.LISTEN_TO_FIREBASE_EVENT_REPORT] ({ commit }, payload) {
    if (payload.items[0].client_id) {
      mwFirebaseJob.getFirebaseDb.ref(`/mw_job_status_${payload.items[0].client_id}`).off('value')
      commit(TYPE.RESET_REPORT_RUN_NR)
      mwFirebaseJob.getFirebaseDb.ref(`/mw_job_status_${payload.items[0].client_id}`).on('value',
        function (snapshot) {
          if (snapshot.val().report_id) {
            // console.log('mw_job_status', snapshot.val())
            commit(TYPE.UPDATE_REPORT_PROGRESS, snapshot.val())
          }
        },
        function (errorObject) {
          console.log('The read failed: ' + errorObject.code)
        })
    } else {
      console.error('client_id is required to get firebase')
    }
  },
  [TYPE.SET_IS_DOWLOADING_REPORT] ({commit}, payload) {
    commit(TYPE.SET_IS_DOWLOADING_REPORT, payload)
  },
  async [TYPE.RUN_AN_INVENTORY]({commit}, payload) {
    try {
      const params = {
        report_id: payload.selectedInfo._id,
        marketplace: payload.marketplace
      }
      const result = await MW_API.post(URL.RUN_AN_INVENTORY(params.report_id, params.marketplace))
      commit(TYPE.SET_INVENTORY_STATUS_LIST_REPORTS, result.data)
      return result.data
    } catch (error) {
      throw error
    }
  },
  async [TYPE.CANCEL_AN_INVENTORY]({commit}, payload) {
    try {
      const params = {
        report_id: payload.selectedInfo._id,
        marketplace: payload.marketplace
      }
      const result = await MW_API.post(URL.CANCEL_AN_INVENTORY(params.report_id, params.marketplace))
      commit(TYPE.SET_INVENTORY_STATUS_LIST_REPORTS, result.data)
      return result.data
    } catch (error) {
      throw error
    }
  },
  async [TYPE.FETCH_INVENTORY_HISTORY]({ commit }, params) {
    try {
      const query = {
        limit: params.limit,
        page: params.page
      }
      commit(TYPE.SET_INVENTORY_HISTORY_LOADING, true)
      const result = await MW_API.get(`${URL.FETCH_INVENTORY_HISTORY(params.report_id, params.marketplace)}?${utils.buildUrlQueryString(query)}`)
      commit(TYPE.SET_INVENTORY_HISTORY, result.data)
      commit(TYPE.SET_INVENTORY_HISTORY_LOADING, false)
      return result.data
    } catch (error) {
      commit(TYPE.SET_INVENTORY_HISTORY_LOADING, false)
      throw error
    }
  },
  async [TYPE.FETCH_INVENTORY_SCHEDULES]({ commit }, params) {
    try {
      const query = {
        limit: params.limit,
        page: params.page
      }
      const result = await MW_API.get(`${URL.FETCH_INVENTORY_SCHEDULES(params.report_id, params.marketplace)}?${utils.buildUrlQueryString(query)}`)
      commit(TYPE.SET_INVENTORY_SCHEDULES, result.data)
      return result.data
    } catch (error) {
      throw error
    }
  },
  async [TYPE.ADD_INVENTORY_SCHEDULES]({ commit }, params) {
    try {
      const result = await MW_API.post(
        URL.FETCH_INVENTORY_SCHEDULES(params.report_id, params.marketplace),
        {
          from: params.from,
          to: params.to
        }
      )
      return result.data
    } catch (error) {
      throw error
    }
  },
  async [TYPE.REMOVE_INVENTORY_SCHEDULES]({ commit }, params) {
    try {
      const query = {
        from: params.from,
        to: params.to
      }
      const result = await MW_API.delete(`${URL.FETCH_INVENTORY_SCHEDULES(params.report_id, params.marketplace)}?${utils.buildUrlQueryString(query)}`)
      return result.data
    } catch (error) {
      throw error
    }
  },
  async [TYPE.REMOVE_INVENTORY_SCHEDULE]({ commit }, params) {
    try {
      const result = await MW_API.delete(URL.REMOVE_INVENTORY_SCHEDULE(params.report_id, params.marketplace, params.id))
      return result.data
    } catch (error) {
      throw error
    }
  },
  async [TYPE.CHANGE_REPORT_SCHEDULE_MODE]({ commit }, params) {
    try {
      const result = await MW_API.put(
        URL.CHANGE_REPORT_SCHEDULE_MODE(params.report_id, params.marketplace),
        { mode: params.mode }
      )
      return result.data
    } catch (error) {
      throw error
    }
  },
  async [TYPE.FETCH_IMPORT_REPORTS] ({commit}, params) {
    try {
      params = _.assign({}, state.defaultParamsImportReports, params)
      commit(TYPE.SET_LIST_REPORT_LOADING, true)
      const { data: { items } } = await MW_API.get(URL.GET_POST_REPORTS(), {
        params: {
          ...params
        }
      })
      commit(TYPE.SET_IMPORT_REPORTS, items)
      commit(TYPE.SET_EDIT_FORM_LIST_REPORTS, items)
      commit(TYPE.SET_LIST_REPORT_LOADING, false)
    } catch (error) {
      commit(TYPE.SET_LIST_REPORT_LOADING, false)
      throw error
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
