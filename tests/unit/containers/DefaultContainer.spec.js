import { createLocalVue, shallowMount } from '@vue/test-utils'
import BootstrapVue from 'bootstrap-vue'
import DefaultContainer from '@/containers/DefaultContainer.vue'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '',
      name: 'home',
      children: [
        {
          path: 'test',
          name: 'editReports',
          meta: {
            label: 'Manage Reports',
            title: 'Edit for reports'
          },
          component: () => ({
            template: `<div>Test</div>`
          })
        }
      ]
    }
  ]
})

describe('DefaultContainer.vue', () => {
  it('should render DefaultContainer', () => {
    const wrapper = shallowMount(DefaultContainer, {
      localVue,
      router
    })
    wrapper.vm.name
  })
})
