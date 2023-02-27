import { createLocalVue, shallowMount } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import DefaultContainer from '@/containers/DefaultAside.vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('DefaultAside.vue', () => {
  it('should render DefaultAside when created', () => {
    const wrapper = shallowMount(DefaultContainer, {
      localVue
    })
  })
})
