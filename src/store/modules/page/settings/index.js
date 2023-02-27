import * as TYPE from '@/actionTypes'
import { MW_API } from '@/service/'
import * as URL from '@/service/_constant'
import * as utils from '@/shared/utils'
import _ from 'lodash'

const state = {
  show_dashboard: false
}
const getters = {
  [TYPE.FETCH_SETTING]: (state) => state.show_dashboard
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
  [TYPE.FETCH_SETTING]({ commit, dispatch }, params) {
    params = _.assign({}, state.defaultParams, params)
    return new Promise(async (resolve, reject) => {
      try {
        const { config, oriPayload } = getShareToken(params)
        const res = await MW_API.get(`${URL.GET_SETTINGS()}?${utils.buildUrlQueryString(oriPayload)}`, config)
        resolve(res.data)
      } catch (error) {
        reject(error)
      }
    })
  },
  async [TYPE.REMOTE_EDIT_SETTING]({ commit, state }, { id, params }) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.put(URL.PUT_SETTINGS(id), {
          ...params
        })
        resolve(res.data)
      } catch (error) {
        reject(error)
      }
    })
  },
  async [TYPE.REMOTE_UPLOAD_FILES]({ commit, state, dispatch }, file) {
    try {
      const res = await MW_API.post(URL.POST_FILES(), file)
      return res.data
    } catch (error) {
      throw error
    }
  },
  async [TYPE.SEND_POLICY_NOTIFICATION]({ commit }, emailList) {
    try {
      const result = await MW_API.post(URL.POST_POLICY_NOTIFICATION(), emailList)
      return result.data
    } catch (error) {
      throw error
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions
}
