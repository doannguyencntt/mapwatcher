import { shallowMount, createLocalVue } from '@vue/test-utils'
import App from '@/App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)

describe('App.vue', () => {
  it('renders div#app', () => {
    const wrapper = shallowMount(App, {
      localVue
    }).find('#app')
    expect(wrapper.is('div')).toBe(true)
  })
})
