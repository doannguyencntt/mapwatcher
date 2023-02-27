import * as TYPE from '@/actionTypes'
// import { promiseOneReport } from './_dataConfig'
import _ from 'lodash'
import { MW_API } from '@/service/'
import * as URL from '@/service/_constant'
import * as utils from '@/shared/utils'

// import Vue from 'vue'

const state = {
  listSellers: {
    items: [],
    total: 0
  },
  defaultParams: {
    page: 1,
    limit: 10,
    s: null,
    sort_by: 'name',
    sort_dir: 'asc'
  },
  isLoading: false
}
const getters = {
  [TYPE.GET_LIST_SELLER_ENFORCEMENT]: (state) => state.listSellers,
  [TYPE.GET_DEFAULT_SELLER_ENFORCEMENT_PARAMS]: (state) => state.defaultParams,
  [TYPE.GET_SELLER_ENFORCEMENT_LOADING]: (state) => state.isLoading
}
const mutations = {
  [TYPE.SET_LIST_SELLER_ENFORCEMENTS] (state, payload) {
    state.listSellers = { ...payload }
  },
  [TYPE.SET_SELLER_ENFORCEMENT_LOADING] (state, payload) {
    state.isLoading = payload
  }
}

const actions = {
  [TYPE.FETCH_LIST_SELLER_ENFORCEMENTS] ({ commit, dispatch }, params) {
    params = _.assign({}, state.defaultParams, params)
    commit(TYPE.SET_SELLER_ENFORCEMENT_LOADING, true)
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.get(`${URL.GET_SELLER_ENFORCEMENTS()}?${utils.buildUrlQueryString(params)}`)
        commit(TYPE.SET_LIST_SELLER_ENFORCEMENTS, res.data)
        commit(TYPE.SET_SELLER_ENFORCEMENT_LOADING, false)
        resolve(res.data)
      } catch (error) {
        reject(error)
        commit(TYPE.SET_SELLER_ENFORCEMENT_LOADING, false)
      }
    })
  },
  async [TYPE.FETCH_LIST_SELLER_ENFORCEMENT_HISTORY] ({ commit, dispatch }, data) {
    let { params, id } = data
    params = _.assign({}, state.defaultParams, params)
    params = _.omit(params, ['s', 'sort_dir', 'sort_by'])
    try {
      const res = await MW_API.get(`${URL.GET_SELLER_ENFORCEMENT_HISTORIES(id)}?${utils.buildUrlQueryString(params)}`)
      return res.data
    } catch (error) {
      throw error
    }
  },
  [TYPE.REMOTE_POST_SELLER_ENFORCEMENT] ({ commit, dispatch }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.post(URL.GET_POST_SELLER_ENFORCEMENT(), params)
        resolve(res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  [TYPE.REMOTE_MANUAL_SEND_MAIL_SELLER_ENFORCEMENT] ({ commit, dispatch }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id, date } = params
        const res = await MW_API.post(URL.GET_POST_MANUAL_SEND_MAIL_SELLER_ENFORCEMENT(id), {date: date})
        resolve(res.data)
      } catch (error) {
        reject(error.response.data)
      }
    })
  },
  async [TYPE.CHANGE_FREQUENCY_SELLER_ENFORCEMENT] ({ state }, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id, frequency } = params
        const res = await MW_API.put(URL.EDIT_AND_REMOVE_SELLER_ENFORCEMENT(id), { frequency: frequency })
        const index = _.findIndex(state.listSellers.items, { id: id })
        if (index !== -1) {
          state.listSellers.items[index].frequency = frequency
        }
        resolve(res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  async [TYPE.REMOTE_EDIT_SELLER_ENFORCEMENT] ({ commit, state }, { id, params }) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.put(URL.EDIT_AND_REMOVE_SELLER_ENFORCEMENT(id), params)
        resolve(res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  async [TYPE.REMOVE_SELLER_ENFORCEMENT] ({ state }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.delete(URL.EDIT_AND_REMOVE_SELLER_ENFORCEMENT(id))
        _.remove(state.listSellers.items, (d) => d.id === id)
        state.listSellers.items = [...state.listSellers.items]
        resolve(res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  async [TYPE.GET_ONE_SELLER_ENFORCEMENT] ({ state }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.get(URL.EDIT_AND_REMOVE_SELLER_ENFORCEMENT(id))
        resolve(res.data)
      } catch (error) {
        reject(error.response)
      }
    })
  },
  async [TYPE.GET_SELLER_ENFORCEMENT_HISTORY_DATES] ({ state }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.get(URL.GET_SELLER_ENFORCEMENT_HISTORY_DATE(id))
        resolve(res.data)
      } catch (error) {
        reject(error.response)
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
