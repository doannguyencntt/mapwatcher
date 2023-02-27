import * as TYPE from '@/actionTypes'
// import _ from 'lodash'
import { MW_API } from '@/service/'
import * as URL from '@/service/_constant'
import * as config from './_config'
import * as utils from '@/shared/utils'
import _ from 'lodash'

const state = {
  dataSource: {
    daily_violator: {},
    daily_violator_with_inventory: {},
    daily_violator_1st_time: {},
    daily_violator_2nd_time: {},
    top_violated_products: {},
    sellers_violations_7d: {},
    avg_percentage_off_map: {},
    new_repeat_violators: {},
    all_repeat_offenders: {},
    data_historical: {},
    historyNumberOfViolations: {},
    historyNumberOfViolationViolator: {},
    date_historical: {}
  },
  loader: {
    tableLoad: false,
    downloadDailyLoad: false,
    downloadDailyWithInventoryLoad: false,
    downloadNewRepeatLoad: false
  },
  config,
  listReports: {
    items: [],
    total: 0
  },
  defaultParams: {
    page: 1,
    limit: 10,
    s: null,
    sort_by: null,
    sort_dir: null
  },
  isLoad: false,
  selectedDate: null
}

const getters = {
  [TYPE.GET_DATA_VIOLATOR]: (state) => state.dataSource.daily_violator,
  [TYPE.GET_DATA_VIOLATOR_WITH_INVENTORY]: (state) => state.dataSource.daily_violator_with_inventory,
  [TYPE.GET_DATA_NEW_1ST_TIME]: (state) => state.dataSource.daily_violator_1st_time,
  [TYPE.GET_DATA_NEW_2ND_TIME]: (state) => state.dataSource.daily_violator_2nd_time,
  [TYPE.GET_DATA_TOP_VIOLATED_PRODUCTS_7D]: (state) => state.dataSource.top_violated_products,
  [TYPE.GET_DATA_SELLER_VIOLATIONS_7D]: (state) => state.dataSource.sellers_violations_7d,
  [TYPE.GET_DATA_AVG_PERCENTAGE_OFF_MAP]: (state) => state.dataSource.avg_percentage_off_map,
  [TYPE.GET_DATA_NEW_REPEAT_VIOLATORS]: (state) => state.dataSource.new_repeat_violators,
  [TYPE.GET_DATA_ALL_REPEAT_OFFENDERS]: (state) => state.dataSource.all_repeat_offenders,
  [TYPE.GET_DATA_HISTORICAL]: (state) => state.dataSource.data_historical,
  [TYPE.GET_DATA_NUMBER_OF_VIOLATIONS]: (state) => state.dataSource.historyNumberOfViolations,
  [TYPE.GET_DATA_NUMBER_OF_VIOLATIONS_VIOLATORS]: (state) => state.dataSource.historyNumberOfViolationViolator,
  [TYPE.GET_DATE_HISTORICAL]: (state) => state.dataSource.date_historical,
  [TYPE.GET_DATA_CONFIG_VIOLATOR]: (state) => state.config.configDashBoard,
  [TYPE.GET_DATA_CONFIG_HISTORICAL]: (state) => state.config.configHistorical,
  [TYPE.GET_TABLE_LOADER]: (state) => state.loader.tableLoad,
  [TYPE.GET_DOWNLOAD_DAILY_LOADER]: (state) => state.loader.downloadDailyLoad,
  [TYPE.GET_DOWNLOAD_NEW_REPEAT_LOADER]: (state) => state.loader.downloadNewRepeatLoad,
  [TYPE.GET_LIST_REPORTS]: (state) => state.listReports,
  [TYPE.GET_SELECTED_DATE]: (state) => state.selectedDate
}

const mutations = {
  [TYPE.SET_DATA_VIOLATOR](state, payload) {
    state.dataSource.daily_violator = payload
    state.dataSource.daily_violator = { ...state.dataSource.daily_violator }
  },
  [TYPE.SET_DATA_VIOLATOR_WITH_INVENTORY](state, payload) {
    state.dataSource.daily_violator_with_inventory = payload
    state.dataSource.daily_violator_with_inventory = { ...state.dataSource.daily_violator_with_inventory }
  },
  [TYPE.SET_DATA_NEW_1ST_TIME](state, payload) {
    state.dataSource.daily_violator_1st_time = payload
    state.dataSource.daily_violator_1st_time = { ...state.dataSource.daily_violator_1st_time }
  },
  [TYPE.SET_DATA_NEW_2ND_TIME](state, payload) {
    state.dataSource.daily_violator_2nd_time = payload
    state.dataSource.daily_violator_2nd_time = { ...state.dataSource.daily_violator_2nd_time }
  },
  [TYPE.SET_DATA_TOP_VIOLATED_PRODUCTS_7D](state, payload) {
    state.dataSource.top_violated_products = payload
    state.dataSource.top_violated_products = { ...state.dataSource.top_violated_products }
  },
  [TYPE.SET_DATA_SELLER_VIOLATIONS_7D](state, payload) {
    state.dataSource.sellers_violations_7d = payload
    state.dataSource.sellers_violations_7d = { ...state.dataSource.sellers_violations_7d }
  },
  [TYPE.SET_DATA_AVG_PERCENTAGE_OFF_MAP](state, payload) {
    state.dataSource.avg_percentage_off_map = payload
    state.dataSource.avg_percentage_off_map = { ...state.dataSource.avg_percentage_off_map }
  },
  [TYPE.SET_DATA_NEW_REPEAT_VIOLATORS](state, payload) {
    state.dataSource.new_repeat_violators = payload
    state.dataSource.new_repeat_violators = { ...state.dataSource.new_repeat_violators }
  },
  [TYPE.SET_DATA_ALL_REPEAT_OFFENDERS](state, payload) {
    state.dataSource.all_repeat_offenders = payload
    state.dataSource.all_repeat_offenders = { ...state.dataSource.all_repeat_offenders }
  },
  [TYPE.SET_DATA_HISTORICAL](state, payload) {
    state.dataSource.data_historical = payload
    state.dataSource.data_historical = { ...state.dataSource.data_historical }
  },
  [TYPE.SET_DATA_NUMBER_OF_VIOLATIONS](state, payload) {
    state.dataSource.historyNumberOfViolations = payload
    state.dataSource.historyNumberOfViolations = { ...state.dataSource.historyNumberOfViolations }
  },
  [TYPE.SET_DATA_NUMBER_OF_VIOLATIONS_VIOLATORS](state, payload) {
    state.dataSource.historyNumberOfViolationViolator = payload
    state.dataSource.historyNumberOfViolationViolator = { ...state.dataSource.historyNumberOfViolationViolator }
  },
  [TYPE.SET_DATE_HISTORICAL](state, payload) {
    state.dataSource.date_historical = payload
    state.dataSource.date_historical = { ...state.dataSource.date_historical }
  },
  [TYPE.SET_TABLE_LOADER](state, payload) {
    state.loader.tableLoad = payload
  },
  [TYPE.SET_DOWNLOAD_DAILY_LOADER](state, payload) {
    state.loader.downloadDailyLoad = payload
  },
  [TYPE.SET_DOWNLOAD_DAILY_WITH_INVENTORY_LOADER](state, payload) {
    state.loader.downloadDailyWithInventoryLoad = payload
  },
  [TYPE.SET_DOWNLOAD_NEW_REPEAT_LOADER](state, payload) {
    state.loader.downloadNewRepeatLoad = payload
  },
  [TYPE.SET_LIST_REPORTS](state, payload) {
    state.listReports = { ...payload }
  },
  [TYPE.SET_REPORT_LOADING](state, payload) {
    state.isLoad = payload
  },
  [TYPE.SET_SELECTED_DATE](state, payload) {
    state.selectedDate = payload
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
  [TYPE.FETCH_DATA_VIOLATOR]({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(payload)
        const res = await MW_API.get(`${URL.DAILY_ALL_WIDGET()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        commit(TYPE.SET_DATA_VIOLATOR, res.data, payload)
        resolve()
      } catch (error) {
        console.log(error)
      }
    })
  },
  [TYPE.FETCH_ALL_WIDGET]({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(payload)
        config.cancelPreviousCallTicket = 'fetch_all_widget'
        const res = await MW_API.get(`${URL.DAILY_ALL_WIDGET()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        commit(TYPE.SET_DATA_ALL_REPEAT_OFFENDERS, res.data.all_repeat_offenders, payload)
        commit(TYPE.SET_DATA_AVG_PERCENTAGE_OFF_MAP, res.data.average_percentage_off_map, payload)
        commit(TYPE.SET_DATA_VIOLATOR, res.data.daily_violators, payload)
        commit(TYPE.SET_DATA_NEW_1ST_TIME, res.data.daily_violators_1st_time, payload)
        commit(TYPE.SET_DATA_NEW_2ND_TIME, res.data.daily_violators_2nd_time, payload)
        commit(TYPE.SET_DATA_NEW_REPEAT_VIOLATORS, res.data.new_repeat_violators, payload)
        commit(TYPE.SET_DATA_NUMBER_OF_VIOLATIONS, res.data.number_of_violations, payload)
        commit(TYPE.SET_DATA_NUMBER_OF_VIOLATIONS_VIOLATORS, res.data.number_of_violations_and_violators, payload)
        commit(TYPE.SET_DATA_SELLER_VIOLATIONS_7D, res.data.seller_violations_7d, payload)
        commit(TYPE.SET_DATA_TOP_VIOLATED_PRODUCTS_7D, res.data.top_violated_products_7d, payload)
        resolve()
      } catch (error) {
        console.log(error)
      }
    })
  },
  [TYPE.FETCH_DATA_VIOLATOR_WITH_INVENTORY]({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const config = {
          cancelPreviousCallTicket: 'fetch_data_violator_with_inventory'
        }
        const res = await MW_API.get(`${URL.DAILY_VIOLATORS_WITH_INVENTORY()}?${utils.buildUrlQueryString(payload)}`, config)
        commit(TYPE.SET_DATA_VIOLATOR_WITH_INVENTORY, res.data, payload)
        resolve()
      } catch (error) {
        console.log(error)
      }
    })
  },
  [TYPE.FETCH_DATA_NEW_1ST_TIME]({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(payload)
        const res = await MW_API.get(`${URL.NEW_1ST_TIME_VIOLATORS()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        commit(TYPE.SET_DATA_NEW_1ST_TIME, res.data, payload)
        resolve()
      } catch (error) {
        console.log(error)
      }
    })
  },
  [TYPE.FETCH_DATA_NEW_2ND_TIME]({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(payload)
        const res = await MW_API.get(`${URL.NEW_2ND_TIME_VIOLATORS()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        commit(TYPE.SET_DATA_NEW_2ND_TIME, res.data, payload)
        resolve()
      } catch (error) {
        console.log(error)
      }
    })
  },
  [TYPE.FETCH_DATA_TOP_VIOLATED_PRODUCTS_7D]({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(payload)
        const res = await MW_API.get(`${URL.TOP_VIOLATED_PRODUCTS()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        commit(TYPE.SET_DATA_TOP_VIOLATED_PRODUCTS_7D, res.data, payload)
        resolve()
      } catch (error) {
        console.log(error)
      }
    })
  },
  [TYPE.FETCH_DATA_SELLER_VIOLATIONS_7D]({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(payload)
        const res = await MW_API.get(`${URL.SELLER_VIOLATIONS_7D()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        commit(TYPE.SET_DATA_SELLER_VIOLATIONS_7D, res.data, payload)
        resolve()
      } catch (error) {
        console.log(error)
      }
    })
  },
  [TYPE.FETCH_DATA_AVG_PERCENTAGE_OFF_MAP]({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(payload)
        const res = await MW_API.get(`${URL.AVG_PERCENTAGE_OFF_MAP()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        commit(TYPE.SET_DATA_AVG_PERCENTAGE_OFF_MAP, res.data, payload)
        resolve()
      } catch (error) {
        console.log(error)
      }
    })
  },
  [TYPE.FETCH_DATA_NEW_REPEAT_VIOLATORS]({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(payload)
        const res = await MW_API.get(`${URL.NEW_REPEAT_VIOLATORS()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        commit(TYPE.SET_DATA_NEW_REPEAT_VIOLATORS, res.data, payload)
        resolve()
      } catch (error) {
        console.log(error)
      }
    })
  },
  [TYPE.FETCH_DATA_ALL_REPEAT_OFFENDERS]({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(payload)
        const res = await MW_API.get(`${URL.ALL_REPEAT_OFFENDERS()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        commit(TYPE.SET_DATA_ALL_REPEAT_OFFENDERS, res.data, payload)
        resolve()
      } catch (error) {
        console.log(error)
      }
    })
  },
  [TYPE.FETCH_DATA_HISTORICAL]({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(payload)
        const res = await MW_API.get(`${URL.DAILY_VIOLATORS()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        commit(TYPE.SET_DATA_HISTORICAL, res.data, payload)
        resolve()
      } catch (error) {
        console.log(error)
      }
    })
  },
  [TYPE.FETCH_DATA_NUMBER_OF_VIOLATIONS]({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(payload)
        const res = await MW_API.get(`${URL.NUMBER_OF_VIOLATIONS()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        commit(TYPE.SET_DATA_NUMBER_OF_VIOLATIONS, res.data, payload)
        resolve()
      } catch (error) {
        console.log(error)
      }
    })
  },
  [TYPE.FETCH_DATA_NUMBER_OF_VIOLATIONS_VIOLATORS]({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(payload)
        const res = await MW_API.get(`${URL.NUMBER_OF_VIOLATIONS_VIOLATORS()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        commit(TYPE.SET_DATA_NUMBER_OF_VIOLATIONS_VIOLATORS, res.data, payload)
        resolve()
      } catch (error) {
        console.log(error)
      }
    })
  },
  [TYPE.TOGGLE_TABLE_LOADER]({commit, state}, payload) {
    commit(TYPE.SET_TABLE_LOADER, payload)
  },
  [TYPE.SET_SELECTED_DATE]({commit, state}, payload) {
    commit(TYPE.SET_SELECTED_DATE, payload)
  },
  [TYPE.FETCH_DOWNLOAD_DAILY_VIOLATIONS]({ commit, state }, payload) {
    commit(TYPE.SET_DOWNLOAD_DAILY_LOADER, true)
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(payload)
        const res = await MW_API.get(`${URL.DOWNLOAD_VIOLATIONS()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        commit(TYPE.SET_DOWNLOAD_DAILY_LOADER, false)
        resolve(res.data)
      } catch (error) {
        commit(TYPE.SET_DOWNLOAD_DAILY_LOADER, false)
        console.log(error)
      }
    })
  },
  [TYPE.FETCH_DOWNLOAD_DAILY_VIOLATIONS_WITH_INVENTORY]({ commit, state }, payload) {
    commit(TYPE.SET_DOWNLOAD_DAILY_WITH_INVENTORY_LOADER, true)
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.get(`${URL.DOWNLOAD_VIOLATIONS_WITH_INVENTORY()}?${utils.buildUrlQueryString(payload)}`)
        commit(TYPE.SET_DOWNLOAD_DAILY_WITH_INVENTORY_LOADER, false)
        resolve(res.data)
      } catch (error) {
        commit(TYPE.SET_DOWNLOAD_DAILY_WITH_INVENTORY_LOADER, false)
        console.log(error)
      }
    })
  },
  [TYPE.FETCH_DOWNLOAD_NEW_REPEAT_VIOLATORS]({ commit, state }, payload) {
    commit(TYPE.SET_DOWNLOAD_NEW_REPEAT_LOADER, true)
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(payload)
        const res = await MW_API.get(`${URL.DOWNLOAD_NEW_REPEAT_VIOLATORS()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        commit(TYPE.SET_DOWNLOAD_DAILY_LOADER, false)
        resolve(res.data)
      } catch (error) {
        commit(TYPE.SET_DOWNLOAD_DAILY_LOADER, false)
        console.log(error)
      }
    })
  },
  [TYPE.FETCH_DATE_HISTORICAL]({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(payload)
        config.cancelPreviousCallTicket = 'fetch_date_history'
        const res = await MW_API.get(`${URL.DATE_HISTORICAL()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        commit(TYPE.SET_DATE_HISTORICAL, res.data, payload)
        resolve()
      } catch (error) {
        console.log(error)
      }
    })
  },
  [TYPE.FETCH_LIST_REPORTS]({ commit, dispatch }, params) {
    params = _.assign({}, state.defaultParams, params)
    commit(TYPE.SET_REPORT_LOADING, true)
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(params)
        const res = await MW_API.get(`${URL.GET_POST_REPORTS()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        _.forEach(res.data.items, (item, index) => {
          item.activeMarketplaces = []
          const keys = _.keys(item.marketplaces)
          _.forEach(keys, (key) => {
            if (item.marketplaces[key]) {
              item[`marketplace_${key}`].isLoad = false
              item.activeMarketplaces.push({
                key: key,
                value: _.includes(key, 'amazon') ? key.replace(/[_]/g, '.') : key,
                label: _.includes(key, 'amazon') ? _.upperFirst(key.replace(/[_]/g, '.')) : _.upperFirst(key.replace(/[_]/g, ' ')),
                info: item[`marketplace_${key}`]
              }) // TODO we already migrate data if marketplace is enable - script will create info with field marketplace_${marketplace_field} so i think case null will not happen
            }
          })
        })
        commit(TYPE.SET_LIST_REPORTS, res.data)
        commit(TYPE.SET_REPORT_LOADING, false)
        resolve(res.data)
      } catch (error) {
        // console.log(error)
        reject(error)
      }
    })
  },
  async [TYPE.GET_DS_MAPS]({ commit, state }) {
    try {
      const { data } = await MW_API.get(`${URL.DS_MAPS()}`)
      return data.results
    } catch (e) {
      throw e
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
