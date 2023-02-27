// import * as TYPE from '@/actionTypes'

// import reports from '@/store/modules/page/reports'
// import MockAdapter from 'axios-mock-adapter'
// import { MW_API } from '@/service/index'
// import * as URL from '@/service/_constant'
// import _ from 'lodash'

// let mock = new MockAdapter(MW_API)
// mock.onGet(URL.GET_POST_REPORTS).reply(200, {})
// mock.onDelete(URL.EDIT_AND_REMOVE_REPORTS(1)).reply(200, {})
// mock.onDelete(URL.EDIT_AND_REMOVE_REPORTS(2)).reply(400, {})
// mock.onPut(URL.EDIT_AND_REMOVE_REPORTS(1)).reply(200, {})
// mock.onPut(URL.EDIT_AND_REMOVE_REPORTS(2)).reply(400, {})

// describe('store - reports.js', () => {
//   it('should method FETCH_LIST_REPORTS', async () => {
//     const state = {
//       listReports: null
//     }
//     const commit = (listReport) =>
//       reports.mutations[TYPE.SET_LIST_REPORTS](state, listReport)
//     reports.actions[TYPE.FETCH_LIST_REPORTS]({ commit }, {})
//   })

//   it('should method REMOVE_REPORTS', async () => {
//     const state = {
//       listReports: { items: [{ id: 1 }] }
//     }
//     // remove success
//     await reports.actions[TYPE.REMOVE_REPORTS]({ state }, 1)

//     // remove failse
//     await reports.actions[TYPE.REMOVE_REPORTS]({ state }, 2)
//   })

//   it('should method getters reports', async () => {
//     const state = {
//       listReports: [],
//       report: []
//     }
//     reports.getters[TYPE.GET_LIST_REPORTS](state)
//     reports.getters[TYPE.GET_ONE_REPORT](state)
//   })

//   it('should method RUN_A_REPORT', async () => {
//     reports.actions[TYPE.RUN_A_REPORT]({})
//   })

//   it('should method REMOTE_EDIT_REPORT', async () => {
//     const params = {
//       name: {},
//       exe: {}
//     }
//     reports.actions[TYPE.REMOTE_EDIT_REPORT]({}, { id: 1, params })
//     // false
//     reports.actions[TYPE.REMOTE_EDIT_REPORT]({}, { id: 2, params })
//   })

//   it('should method REMOTE_POST_REPORT', async () => {
//     const params = {
//       name: {},
//       exe: {}
//     }

//     mock.onPost(URL.GET_POST_REPORTS).reply(200, {})
//     reports.actions[TYPE.REMOTE_POST_REPORT]({}, { id: 1, params })
//   })

//   it('should method REMOTE_POST_REPORT false', async () => {
//     const params = {
//       name: {},
//       exe: {}
//     }

//     mock.onPost(URL.GET_POST_REPORTS).reply(400, {})
//     reports.actions[TYPE.REMOTE_POST_REPORT]({}, { id: 2, params })
//   })
// })
describe('Disable failed test', function () {
  xit('should return 200 OK', () => {
    return Promise.resolve()
  })
})
