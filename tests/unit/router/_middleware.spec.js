import _middleware from '@/router/_middleware'
import { createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter({
  routes: [{ path: '', name: 'test' }, { path: '/abc', name: 'abc' }]
})

describe('_middleware.js', () => {
  it('should run middleware', () => {
    _middleware.push('')
  })
})
