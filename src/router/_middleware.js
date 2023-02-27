import router from './'

router.beforeEach((to, from, next) => {
  // to.path !== '/dashboard' ? next('/dashboard') : next()
  next()
})
export default router
