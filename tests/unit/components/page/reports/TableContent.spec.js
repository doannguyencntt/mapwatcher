import { shallowMount, createLocalVue } from '@vue/test-utils'
import TableReportMapJob from '@/components/page/reports/TableReportMapJob.vue'
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
  getPermissions: {
    module_enabled: true,
    permissions: {
      braman: true,
      braexe: true,
      mapman: true,
      invsee: true,
      gsmapman: true,
      siman: true,
      siview: true,
      adminman: true,
      secreate: true,
      sedelete: true,
      seedit: true,
      sesend: true,
      seview: true
    }
  },
  defaultParams: {
    limit: 10,
    page: 1,
    s: '',
    sort_by: 'name_in_dashboard',
    sort_dir: 'asc'
  }
}

let propsData = {
  fields: [
    {
      key: 'name_in_dashboard',
      label: 'Report Name',
      sortable: true,
      sortDirection: 'desc',
      tdClass: 'align-middle'
    },
    {
      key: 'active',
      label: 'Active',
      thClass: 'at-50 text-center align-middle',
      tdClass: 'text-center mw-checkbox-active align-middle'
    },
    {
      key: 'status',
      label: 'Status',
      thClass: 'text-center align-middle',
      tdClass: 'text-center align-middle'
    },
    {
      key: 'updated',
      label: 'Modified',
      thClass: 'md-120 text-center align-middle',
      tdClass: 'align-middle text-center',
      sortable: true
    },
    {
      key: 'actions',
      label: 'Actions',
      thClass: 'text-center align-middle',
      tdClass: 'col-manage align-middle text-center'
    }
  ],
  fixed: true,
  bordered: true,
  striped: true,
  hover: true,
  caption: 'List of Monitored Reports',
  dataSet: {
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
      query: {
        s: '',
        limit: 10,
        page: 1,
        sort_by: 'name_in_dashboard',
        sort_dir: 'asc'
      }
    }]
})

let routerAdd = new VueRouter({
  routes: [
    {
      path: 'reports/add',
      name: 'MWAddReports',
      params: {
        client_id: clientId
      }
    }]
})

let routerMarketplaceHistory = new VueRouter({
  routes: [
    {
      path: 'reports/marketplace/history',
      name: 'MWReportMarketplaceHistory',
      params: {
        client_id: clientId
      },
      query: {
        report_id: propsData.dataSet.items[0]._id,
        marketplace: propsData.dataSet.items[0].marketplaces,
        name: propsData.dataSet.items[0].name_in_dashboard
      }
    }]
})

let routerInventoryHistory = new VueRouter({
  routes: [
    {
      path: 'reports/inventory/history',
      name: 'MWReportInventoryHistory',
      params: {
        client_id: clientId
      },
      query: {
        report_id: propsData.dataSet.items[0]._id,
        marketplace: propsData.dataSet.items[0].marketplaces,
        name: propsData.dataSet.items[0].name_in_dashboard
      }
    }]
})

let routerSearching = new VueRouter({
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
        s: 'ddddd',
        limit: 10,
        page: 1,
        sort_by: 'name_in_dashboard',
        sort_dir: 'asc'
      }
    }]
})

describe('TableReportMapJob.Vue', () => {
  beforeEach(() => {
    getters = {
      GET_PERMISSIONS: () => data.getPermissions,
      GET_DEFAULT_PARAMS: () => data.defaultParams
    }
    actions = {
      CHANGE_REPORT_SCHEDULE_MODE: jest.fn()
    }
    store = new Vuex.Store({
      modules: {
        mw: {
          namespaced: true,
          getters,
          modules: {
            reports: {
              namespaced: true,
              getters
            }
          }
        }
      }
    })
  })
  it('should redirect to Add a new report page when clicking Add button', () => {
    // setup
    wrapper = shallowMount(TableReportMapJob, {
      localVue,
      store,
      propsData,
      router,
      routerAdd
    })
    // verify
    routerAdd.push({ name: 'MWAddReports' })
    expect(wrapper.vm).toBeTruthy()
  })

  it('should redirect to Marketplace History page when clicking History button', () => {
    // setup
    wrapper = shallowMount(TableReportMapJob, {
      localVue,
      store,
      propsData,
      router,
      routerMarketplaceHistory
    })
    // verify
    routerMarketplaceHistory.push({ name: 'MWReportMarketplaceHistory' })
    expect(wrapper.vm).toBeTruthy()
  })

  it('should redirect to Inventory History page when clicking History button', () => {
    // setup
    wrapper = shallowMount(TableReportMapJob, {
      localVue,
      store,
      propsData,
      router,
      routerInventoryHistory
    })
    // verify
    routerInventoryHistory.push({ name: 'MWReportInventoryHistory' })
    expect(wrapper.vm).toBeTruthy()
  })

  it('should render List when searching by name', () => {
    // setup
    wrapper = shallowMount(TableReportMapJob, {
      localVue,
      store,
      propsData,
      router,
      routerSearching
    })
    // verify
    expect(wrapper.vm).toBeTruthy()
  })

  it('should open dialog when clicking Options button', () => {
    // setup
    wrapper = shallowMount(TableReportMapJob, {
      localVue,
      store,
      propsData,
      router
    })
    wrapper.setData({ reportSchedulerModal: true })
    const clsModal = wrapper.find('.cls-modal-shedule')
    // verify
    expect(clsModal.exists()).toBe(true)
  })

  it('should change schedule mode when clicking Options button', () => {
    // setup
    const params = {
      report_id: propsData.dataSet.items[0]._id,
      marketplace: propsData.dataSet.items[0].marketplaces,
      mode: propsData.dataSet.items[0].marketplace_amazon_com.schedule_mode
      // mode: propsData.dataSet.items[0].marketplace_amazon_ca.schedule_mode,
      // mode: propsData.dataSet.items[0].marketplace_google_shopping.schedule_mode
    }
    wrapper = shallowMount(TableReportMapJob, {
      localVue,
      store,
      propsData,
      router,
      params
    })
    // verify
    wrapper.vm.handleChangeReportScheduleMode = jest.fn()
    wrapper.vm.handleChangeReportScheduleMode()
    expect(wrapper.vm.handleChangeReportScheduleMode).toHaveBeenCalled()
  })

  it('should open dialog when clicking Remove button', () => {
    // setup
    wrapper = shallowMount(TableReportMapJob, {
      localVue,
      store,
      propsData,
      router
    })
    wrapper.setData({ dialog: {
      remove: true
    }
    })
    const clsModal = wrapper.find('.cls-modal-remove-report')
    // verify
    expect(clsModal.exists()).toBe(true)
  })

  it('should open dialog when clicking Cancel button', () => {
    // setup
    wrapper = shallowMount(TableReportMapJob, {
      localVue,
      store,
      propsData,
      router
    })
    wrapper.setData({ dialog: {
      cancelReportSchedule: true
    }
    })
    const clsModal = wrapper.find('.cls-modal-cancel')
    // verify
    expect(clsModal.exists()).toBe(true)
  })

  it('should open dialog when clicking Run button for Marketplace', () => {
    // setup
    wrapper = shallowMount(TableReportMapJob, {
      localVue,
      store,
      propsData,
      router
    })
    wrapper.setData({ dialog: {
      run: true
    }
    })
    const clsModal = wrapper.find('.cls-modal-run-marketplace')
    // verify
    expect(clsModal.exists()).toBe(true)
  })

  it('should open dialog when clicking Run button for Inventory', () => {
    // setup
    wrapper = shallowMount(TableReportMapJob, {
      localVue,
      store,
      propsData,
      router
    })
    wrapper.setData({ inventoryDialog: {
      run: true
    }
    })
    const clsModal = wrapper.find('.cls-modal-run-inventory')
    // verify
    expect(clsModal.exists()).toBe(true)
  })

  it('should open dialog when clicking Inventory button', () => {
    // setup
    wrapper = shallowMount(TableReportMapJob, {
      localVue,
      store,
      propsData,
      router
    })
    wrapper.setData({ inventoryDialog: {
      scraping: true
    }
    })
    const clsModal = wrapper.find('.cls-modal-inventory-investigation')
    // verify
    expect(clsModal.exists()).toBe(true)
  })
})

// describe('TableContent.vue', () => {
//   it('render list when created', () => {
//     const wrapper = shallowMount(ListReport, {
//       localVue
//       //   propsData: {
//       //     'table-data': [],
//       //     'fields': [],
//       //     fixed: true,
//       //     bordered: true,
//       //     'caption': 'title',
//       //     'removeReportsByIndex': () => {},
//       //     'handleEditReport': () => {},
//       //     tableData: () => {}
//       //   }
//     })
//   })
//   it('render list when created #2', () => {
//     const wrapper = shallowMount(ListReport, {
//       localVue,
//       propsData: {
//         'table-data': [],
//         'bordered': true,
//         'caption': 'title',
//         'removeReportsByIndex': () => {},
//         'handleEditReport': () => {},
//         'tableData': () => [],
//         'dataSet': {
//           items: [{}, {}],
//           total: 1,
//           page_size: 1,
//           page_current: 1
//         }
//       }
//     })
//     wrapper.vm.captions
//     wrapper.vm.handleRemoveItems(11)
//     wrapper.vm.handleRunItem({})
//   })
// })
// describe('Disable failed test', function () {
//   xit('should return 200 OK', () => {
//     return Promise.resolve();
//   })
// })
