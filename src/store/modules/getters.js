import { GET_PERMISSIONS, GET_PLAN_CONFIG, GET_ORGANIZATION_STATS, GET_ORG_IS } from '@/actionTypes'

export default {
  [GET_PERMISSIONS]: (state) => state.permissions,
  [GET_PLAN_CONFIG]: (state) => state.plan_config,
  [GET_ORGANIZATION_STATS]: (state) => state.organization_stats,
  [GET_ORG_IS]: (state) => state.isOrgIs
}
