import { createLocalVue, shallowMount } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import DefaultContainer from '@/containers/DefaultHeaderDropdownAccnt.vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('DefaultContainer.vue', () => {
  it('should render DefaultContainer when created', () => {
    const wrapper = shallowMount(DefaultContainer, {
      localVue
    })
  })
})
