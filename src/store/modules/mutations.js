import { SET_PERMISSIONS, SET_PLAN_CONFIG, SET_ORGANIZATION_STATS, SET_ORG_IS } from '@/actionTypes'
import { initialStoreModules } from './index'
import * as cloneDeep from 'lodash/cloneDeep'
import * as forOwn from 'lodash/forOwn'

export default {
  [SET_PERMISSIONS](state, payload) {
    state.permissions = payload
  },
  [SET_PLAN_CONFIG](state, payload) {
    state.plan_config = payload
  },
  [SET_ORGANIZATION_STATS](state, payload) {
    state.organization_stats = payload
  },
  [SET_ORG_IS](state, payload) {
    state.isOrgIs = payload
  },
  /** Reset data in mw store */
  resetState(state) {
    forOwn(initialStoreModules, (value, key) => {
      state[key] = cloneDeep(value.state)
    })
    state.permissions = {}
    state.isOrgIs = false
  }
}
