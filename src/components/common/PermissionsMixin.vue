<script>
// import { mapActions } from 'vuex'
// import { FETCH_PERMISSIONS } from '@/actionTypes.js'
// import has from 'lodash/has'

export default {
  methods: {
    // ...mapActions({
    //   fetchPermissions: `mw/${FETCH_PERMISSIONS}`
    // }),
    gotoGlobalHomePageIfNoPermission: function (permissions) {
      if (!permissions.siview) {
        this.$router.push({'name': 'ps-dashboard'})
      }
    }
  }
  // created() {
  //   const getShareToken = (payload) => {
  //     const token = has(payload, 'share_token') ? payload.share_token : null
  //     const config = token ? { share_token: token } : {}
  //     return { config: config }
  //   }
  //   if (this.$route.meta && this.$route.meta.reloadPermissions) {
  //     this.fetchPermissions(getShareToken(this.$route.query))
  //   }
  // }
}
</script>
