import { MW_API } from '@/service'
import * as URL from '@/service/_constant'
import { FETCH_PERMISSIONS, SET_PERMISSIONS, SET_PLAN_CONFIG, SET_ORGANIZATION_STATS, SET_ORG_IS } from '@/actionTypes'
import isEmpty from 'lodash/isEmpty'
import omit from 'lodash/omit'
import get from 'lodash/get'

export default {
  async [FETCH_PERMISSIONS]({ commit }, payload) {
    try {
      let respone
      if (!isEmpty(payload)) {
        const { config } = payload
        respone = await MW_API.get(URL.FETCH_PERMISSIONS(), config)
      } else {
        respone = await MW_API.get(URL.FETCH_PERMISSIONS())
      }
      if (respone && respone.data) {
        // permission
        commit(SET_PERMISSIONS, omit(respone.data, ['organization']))
        // plan_config
        commit(SET_PLAN_CONFIG, get(respone.data, 'organization.plan_config'))
        // plan stats
        commit(SET_ORGANIZATION_STATS, get(respone.data, 'organization.stats'))
        // is oe user
        commit(SET_ORG_IS, get(respone.data, 'organization.is'))
      } else {
        commit(SET_PERMISSIONS, {})
      }
    } catch (err) {
      console.log('permissions', err)
      commit(SET_PERMISSIONS, {})
    }
  },
  resetState: ({ commit }) => {
    commit('resetState')
  }
}
