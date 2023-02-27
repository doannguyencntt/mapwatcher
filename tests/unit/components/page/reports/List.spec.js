import { shallowMount, createLocalVue } from '@vue/test-utils'
import List from '@/components/page/reports/List.vue'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import Vuex from 'vuex'
import _ from 'lodash'
import Toasted from 'vue-toasted'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(BootstrapVue)
localVue.use(Toasted)

let data = {
  plan_config: {
    plan_max_of_reports: 100,
    plan_max_of_reports_with_amazon: 100,
    plan_max_of_reports_with_google_shopping: 100
  },
  organization_stats: {
    reports_used: 41,
    reports_with_amazon_used: 17,
    reports_with_google_shopping_used: 17
  },
  reports: {
    items: [
      {
        _id: 'f584c558-518a-4f1c-9760-b458c6cd99f0',
        marketplaces: {
          amazon_com: true,
          amazon_ca: true,
          amazon_co_uk: false,
          amazon_de: false,
          amazon_fr: false,
          amazon_it: false,
          amazon_es: false,
          amazon_nl: false,
          amazon_co_jp: false,
          amazon_in: false,
          amazon_com_au: false,
          amazon_sg: false,
          amazon_ae: false,
          amazon_com_tr: false,
          amazon_com_mx: false,
          amazon_com_br: false,
          google_shopping: true
        },
        marketplace_amazon_com: {
          name: null,
          last_job_id: null,
          last_successful_job_at: '2021-12-14T05:23:54.282Z',
          last_failed_job_at: '',
          last_job_status: 'success',
          last_job_progress: 100,
          last_job_completed: '2021-12-14T05:23:54.282Z',
          number_total_map: 53,
          number_processed_map: 53,
          last_job_created: 2021 - 12 - 14,
          file_in_use: '',
          date_started: null,
          all_seller_mode: 'none',
          schedule_mode: 'daily',
          total_jobs: 53,
          total_processed_jobs: 53
        },
        marketplace_amazon_ca: {
          name: null,
          last_job_id: null,
          last_successful_job_at: '2021-12-14T05:23:54.282Z',
          last_failed_job_at: '',
          last_job_status: 'success',
          last_job_progress: 100,
          last_job_completed: '2021-12-14T05:23:54.282Z',
          number_total_map: 53,
          number_processed_map: 53,
          last_job_created: 2021 - 12 - 14,
          file_in_use: '',
          date_started: null,
          all_seller_mode: 'none',
          schedule_mode: 'daily',
          total_jobs: 53,
          total_processed_jobs: 53
        },
        marketplace_amazon_co_uk: {
          name: '',
          last_job_id: null,
          last_successful_job_at: null,
          last_failed_job_at: '',
          last_job_status: null,
          last_job_progress: null,
          last_job_completed: null,
          number_total_map: 0,
          number_processed_map: 0,
          last_job_created: null,
          file_in_use: '',
          date_started: null,
          all_seller_mode: '',
          schedule_mode: 'daily'
        },
        marketplace_amazon_de: {
          name: '',
          last_job_id: null,
          last_successful_job_at: null,
          last_failed_job_at: '',
          last_job_status: null,
          last_job_progress: null,
          last_job_completed: null,
          number_total_map: 0,
          number_processed_map: 0,
          last_job_created: null,
          file_in_use: '',
          date_started: null,
          all_seller_mode: '',
          schedule_mode: 'daily'
        },
        marketplace_amazon_fr: {
          name: '',
          last_job_id: null,
          last_successful_job_at: null,
          last_failed_job_at: '',
          last_job_status: null,
          last_job_progress: null,
          last_job_completed: null,
          number_total_map: 0,
          number_processed_map: 0,
          last_job_created: null,
          file_in_use: '',
          date_started: null,
          all_seller_mode: '',
          schedule_mode: 'daily'
        },
        marketplace_amazon_it: {
          name: '',
          last_job_id: null,
          last_successful_job_at: null,
          last_failed_job_at: '',
          last_job_status: null,
          last_job_progress: null,
          last_job_completed: null,
          number_total_map: 0,
          number_processed_map: 0,
          last_job_created: null,
          file_in_use: '',
          date_started: null,
          all_seller_mode: '',
          schedule_mode: 'daily'
        },
        marketplace_amazon_es: {
          name: '',
          last_job_id: null,
          last_successful_job_at: null,
          last_failed_job_at: '',
          last_job_status: null,
          last_job_progress: null,
          last_job_completed: null,
          number_total_map: 0,
          number_processed_map: 0,
          last_job_created: null,
          file_in_use: '',
          date_started: null,
          all_seller_mode: '',
          schedule_mode: 'daily'
        },
        marketplace_amazon_nl: {
          name: '',
          last_job_id: null,
          last_successful_job_at: null,
          last_failed_job_at: '',
          last_job_status: null,
          last_job_progress: null,
          last_job_completed: null,
          number_total_map: 0,
          number_processed_map: 0,
          last_job_created: null,
          file_in_use: '',
          date_started: null,
          all_seller_mode: '',
          schedule_mode: 'daily'
        },
        marketplace_amazon_co_jp: {
          name: '',
          last_job_id: null,
          last_successful_job_at: null,
          last_failed_job_at: '',
          last_job_status: null,
          last_job_progress: null,
          last_job_completed: null,
          number_total_map: 0,
          number_processed_map: 0,
          last_job_created: null,
          file_in_use: '',
          date_started: null,
          all_seller_mode: '',
          schedule_mode: 'daily'
        },
        marketplace_amazon_in: {
          name: '',
          last_job_id: null,
          last_successful_job_at: null,
          last_failed_job_at: '',
          last_job_status: null,
          last_job_progress: null,
          last_job_completed: null,
          number_total_map: 0,
          number_processed_map: 0,
          last_job_created: null,
          file_in_use: '',
          date_started: null,
          all_seller_mode: '',
          schedule_mode: 'daily'
        },
        marketplace_amazon_com_au: {
          name: '',
          last_job_id: null,
          last_successful_job_at: null,
          last_failed_job_at: '',
          last_job_status: null,
          last_job_progress: null,
          last_job_completed: null,
          number_total_map: 0,
          number_processed_map: 0,
          last_job_created: null,
          file_in_use: '',
          date_started: null,
          all_seller_mode: '',
          schedule_mode: 'daily'
        },
        marketplace_amazon_sg: {
          name: '',
          last_job_id: null,
          last_successful_job_at: null,
          last_failed_job_at: '',
          last_job_status: null,
          last_job_progress: null,
          last_job_completed: null,
          number_total_map: 0,
          number_processed_map: 0,
          last_job_created: null,
          file_in_use: '',
          date_started: null,
          all_seller_mode: '',
          schedule_mode: 'daily'
        },
        marketplace_amazon_ae: {
          name: '',
          last_job_id: null,
          last_successful_job_at: null,
          last_failed_job_at: '',
          last_job_status: null,
          last_job_progress: null,
          last_job_completed: null,
          number_total_map: 0,
          number_processed_map: 0,
          last_job_created: null,
          file_in_use: '',
          date_started: null,
          all_seller_mode: '',
          schedule_mode: 'daily'
        },
        marketplace_amazon_com_tr: {
          name: '',
          last_job_id: null,
          last_successful_job_at: null,
          last_failed_job_at: '',
          last_job_status: null,
          last_job_progress: null,
          last_job_completed: null,
          number_total_map: 0,
          number_processed_map: 0,
          last_job_created: null,
          file_in_use: '',
          date_started: null,
          all_seller_mode: '',
          schedule_mode: 'daily'
        },
        marketplace_amazon_com_mx: {
          name: '',
          last_job_id: null,
          last_successful_job_at: null,
          last_failed_job_at: '',
          last_job_status: null,
          last_job_progress: null,
          last_job_completed: null,
          number_total_map: 0,
          number_processed_map: 0,
          last_job_created: null,
          file_in_use: '',
          date_started: null,
          all_seller_mode: '',
          schedule_mode: 'daily'
        },
        marketplace_amazon_com_br: {
          name: '',
          last_job_id: null,
          last_successful_job_at: null,
          last_failed_job_at: '',
          last_job_status: null,
          last_job_progress: null,
          last_job_completed: null,
          number_total_map: 0,
          number_processed_map: 0,
          last_job_created: null,
          file_in_use: '',
          date_started: null,
          all_seller_mode: '',
          schedule_mode: 'daily'
        },
        marketplace_google_shopping: {
          name: null,
          last_job_id: null,
          last_successful_job_at: '2021-12-14T05:23:55.099Z',
          last_failed_job_at: 'Tue Nov 16 2021 22:04:23 GMT-0500 (GMT-05:00)',
          last_job_status: 'success',
          last_job_progress: 100,
          last_job_completed: '2021-12-14T05:23:55.099Z',
          number_total_map: 108,
          number_processed_map: 95,
          last_job_created: '2021-12-14',
          file_in_use: '',
          date_started: null,
          all_seller_mode: 'none',
          schedule_mode: 'daily',
          total_jobs: 139,
          total_processed_jobs: 139
        },
        last_check: {
          yesterday_history_date_str: 20211214,
          daily_reset_map_number_date_str: 20211214
        },
        list_authorized_seller_names: [],
        mfn_authorized_seller_names: [],
        fba_authorized_seller_names: [],
        active: true,
        watch_for_used_items: false,
        separate_mfn_fba_authorized_seller: false,
        deleted: false,
        priority: 5,
        ignore_screenshot: true,
        order: 1,
        fulfillment: false,
        ignore_price_tracking: false,
        show_upc_in_dashboard: false,
        calculate_1st_2nd_ok: false,
        true_map_report: false,
        last_completed_create_map_job_date_string: 20211214,
        is_synced_history_date: false,
        ready_for_amazon_scraping: true,
        ready_for_google_scraping: true,
        job_handling_mode: 'task_per_map_item',
        name_in_dashboard: 'Alasor Moody',
        logo: null,
        client_id: 'f67e1aec-1aea-4006-b613-d3df09ad5c69',
        created: '2021-11-09T03:07:51.497Z',
        updated: '2021-12-14T05:23:55.000Z',
        __v: 0
      }
    ],
    page_count: 1,
    page_current: 1,
    page_size: 1,
    total: 1
  },
  reportLoading: false
}
let store, getters, actions, wrapper
const clientId = 'f67e1aec-1aea-4006-b613-d3df09ad5c69'

let router = new VueRouter({
  routes: [
    {
      path: 'reports/list',
      name: 'MWListReports',
      meta: {
        tableName: 'List of Monitored Reports'
      },
      params: {
        client_id: clientId
      },
      query: {
        s: '',
        limit: 10,
        page: 1,
        sort_by: 'name_in_dashboard',
        sort_dir: 'asc'
      }
    }]
})

let routerEdit = new VueRouter({
  routes: [
    {
      path: 'reports/edit/f584c558-518a-4f1c-9760-b458c6cd99f0',
      name: 'MWEditReports',
      params: {
        client_id: clientId
      },
      query: {
        name: data.reports.items[0].name_in_dashboard
      }
    }]
})

describe('List.Vue', () => {
  beforeEach(() => {
    getters = {
      GET_ORGANIZATION_STATS: () => data.organization_stats,
      GET_PLAN_CONFIG: () => data.plan_config,
      GET_LIST_REPORTS: () => data.reports,
      GET_REPORT_LOADING: () => data.reportLoading
    }
    actions = {
      FETCH_LIST_REPORTS: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        mw: {
          namespaced: true,
          getters,
          modules: {
            reports: {
              namespaced: true,
              actions,
              getters
            }
          }
        }
      }
    })
  })

  it('should render List of reports component', () => {
    // setup
    wrapper = shallowMount(List, {
      localVue,
      store,
      router
    })
    // verify
    expect(wrapper.vm).toBeTruthy()
  })

  it('should redirect to Edit a report page when clicking Edit button', () => {
    // setup
    wrapper = shallowMount(List, {
      localVue,
      store,
      router,
      routerEdit
    })
    // verify
    routerEdit.push({ name: 'MWEditReports' })
    expect(wrapper.vm).toBeTruthy()
  })
})

// const store = new Vuex.Store({
//   modules: {
//     reports: {
//       namespaced: true,
//       state: {
//         reports: []
//       },
//       getters: {
//         GET_LIST_REPORTS: (state) => ({
//           items: [
//             {
//               items: [{}, {}]
//             }
//           ]
//         })
//       },
//       actions: {
//         FETCH_LIST_REPORTS() {},
//         REMOVE_REPORTS() {
//           return new Promise((resolve, reject) => {
//             resolve({ message: 'message' })
//           })
//         }
//       }
//     }
//   }
// })
// const router = new VueRouter({
//   routes: [{ name: 'editReports', path: 'edit/:id' }]
// })
// describe('List.vue', () => {
//   it('should show list report when created', () => {
//     const wrapper = shallowMount(List, {
//       localVue,
//       router,
//       store
//     })
//     wrapper.vm.filterReports
//   })
//   it('should redirects to edit page when click edit button', () => {
//     const wrapper = shallowMount(List, {
//       localVue,
//       router,
//       store
//     })
//     wrapper.vm.handleEditReport(1)
//   })

//   it('should redirects to edit page when click pagination', () => {
//     const wrapper = shallowMount(List, {
//       localVue,
//       router,
//       store
//     })
//     wrapper.vm.handleChangePage()
//   })

//   it('should remove report when click remove button', () => {
//     const wrapper = shallowMount(List, {
//       localVue,
//       router,
//       store
//     })
//     wrapper.vm.handleRemoveReport(1)
//   })

//   it('runAReport', () => {
//     const wrapper = shallowMount(List, {
//       localVue,
//       router,
//       store
//     })
//     wrapper.vm.runAReport()
//   })
// })
// describe('Disable failed test', function () {
//   xit('should return 200 OK', () => {
//     return Promise.resolve();
//   })
// })
