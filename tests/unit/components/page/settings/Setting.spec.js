import { shallowMount, createLocalVue } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import Toasted from 'vue-toasted'
import Vuex from 'vuex'
import Setting from '@/components/page/settings/Setting'
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(BootstrapVue)
localVue.use(Vuelidate)
localVue.use(Toasted)
// setup data
let data = {
  seller_enforcement_enabled: true,
  seller_investigation_dashboard: true,
  role: 'user'
}
let store, getters, actions, wrapper
const clientId = 'f67e1aec-1aea-4006-b613-d3df09ad5c69'

describe('Setting.Vue', () => {
  beforeEach(() => {
    getters = {
      GET_PERMISSIONS: () => data.role,
      GET_PLAN_CONFIG: () => data
    }
    actions = {
      FETCH_SETTING: jest.fn()
    }
    // setup
    store = new Vuex.Store({
      modules: {
        mw: {
          namespaced: true,
          getters,
          modules: {
            settings: {
              namespaced: true,
              actions
            }
          }
        }
      }
    })
  })

  it('should renders Setting component', () => {
    // setup
    wrapper = shallowMount(Setting, {
      localVue,
      store,
      mocks: {
        $route: {
          params: {
            client_id: clientId
          }
        }
      }
    })
    wrapper.setData({
      data: {
        show_dashboard: true,
        si_listing_brand_name: '',
        default_brand_logo: '',
        map_pricing_policy_document: {
          url: '',
          file_name: ''
        }
      }
    })
    // verify
    expect(wrapper.vm).toBeTruthy()
  })

  it('should show button remove if exist logo', () => {
    // setup
    wrapper = shallowMount(Setting, {
      localVue,
      store,
      mocks: {
        $route: {
          params: {
            client_id: clientId
          }
        }
      }
    })
    wrapper.setData({
      data: {
        default_brand_logo: 'logo.jpg'
      }
    })
    // verify
    expect(wrapper.find('.btn-remove').exists()).toBe(true)
  })

  it('should hidden button remove if does not exist logo', () => {
    // setup
    wrapper = shallowMount(Setting, {
      localVue,
      store,
      mocks: {
        $route: {
          params: {
            client_id: clientId
          }
        }
      }
    })
    wrapper.setData({
      data: {
        default_brand_logo: ''
      }
    })
    // verify
    expect(wrapper.find('.btn-remove').exists()).toBe(false)
  })

  it('should render Sellers & Investigations if seller_investigation_dashboard is true', () => {
    // setup
    wrapper = shallowMount(Setting, {
      localVue,
      store,
      mocks: {
        $route: {
          params: {
            client_id: clientId
          }
        }
      }
    })
    // verify
    const sellersInvestigation = wrapper.find('.seller_investigation_dashboard')
    const getSellersInvestigation = getters.GET_PLAN_CONFIG()
    expect(sellersInvestigation.exists()).toBe(getSellersInvestigation.seller_investigation_dashboard)
  })

  it('should render Seller Enforcement if seller_enforcement_enabled is true', () => {
    // setup
    wrapper = shallowMount(Setting, {
      localVue,
      store,
      mocks: {
        $route: {
          params: {
            client_id: clientId
          }
        }
      }
    })
    // verify
    const sellerEnforcement = wrapper.find('.seller_enforcement_enabled')
    const getSellerEnforcement = getters.GET_PLAN_CONFIG()
    expect(sellerEnforcement.exists()).toBe(getSellerEnforcement.seller_enforcement_enabled)
  })
})
