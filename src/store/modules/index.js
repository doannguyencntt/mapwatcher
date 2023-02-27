import reports from '@/store/modules/page/reports'
import maps from '@/store/modules/page/maps'
import images from '@/store/modules/images'
import dashboard from '@/store/modules/page/dashboard'
import settings from '@/store/modules/page/settings'
import sellerEnforcements from '@/store/modules/page/sellerEnforcements'
import sellers from '@/store/modules/page/sellers'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import * as cloneDeep from 'lodash/cloneDeep'

export const initialStoreModules = {
  reports,
  maps,
  images,
  dashboard,
  settings,
  sellerEnforcements,
  sellers
}

export default {
  mw: {
    namespaced: true,
    modules: cloneDeep(initialStoreModules),
    state: {
      permissions: {},
      plan_config: {},
      organization_stats: {},
      isOrgIs: false
    },
    getters,
    mutations,
    actions
  }
}
