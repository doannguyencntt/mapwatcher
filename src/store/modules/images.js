import * as TYPE from '../../actionTypes'
import { MW_API } from '@/service/'
import * as URL from '@/service/_constant'

const state = {
  images: null
}
const getters = {
  [TYPE.GET_LIST_REPORTS]: (state) => state.images
}
const mutations = {
  [TYPE.SET_IMAGES](state, reports) {
    state.listReports = { ...reports }
  }
}

const actions = {
  async [TYPE.REMOTE_UPLOAD_IMAGES]({ commit, state, dispatch }, images) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await MW_API.post(URL.POST_IMAGES, images)
        commit(TYPE.SET_IMAGES, res.data)
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
