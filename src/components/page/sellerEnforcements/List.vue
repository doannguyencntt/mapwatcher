<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <Content
          v-if="getPermissions.permissions && this.getPermissions.permissions.seview"
          fixed
          bordered
          :caption="$route.meta.tableName"
          :fields="fields"
          @paramsChange="loadData"
          :sellerEnforcementLoading="sellerEnforcementLoading"
        ></Content>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Content from './Content'
import PermissionsMixin from '@/components/common/PermissionsMixin'
import * as TYPE from '@/actionTypes.js'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MWListSellerEnforcements',
  components: { Content },
  mixins: [PermissionsMixin],
  methods: {
    ...mapActions({
      fetchList: `mw/sellerEnforcements/${TYPE.FETCH_LIST_SELLER_ENFORCEMENTS}`
    }),
    loadData(params = {}) {
      this.fetchData(params)
      const limit = params.limit ? params.limit : '10'
      const page = params.page ? params.page : '1'
      const s = params.s ? params.s : ''
      this.$router.replace({
        query: {
          s: s,
          limit: limit,
          page: page
        }
      })
    },
    fetchData(params) {
      this.fetchList({
        s: params.s ? params.s : '',
        limit: params.limit ? params.limit : '10',
        page: params.page ? params.page : '1'
      })
    }
  },
  data: () => {
    return {
      fields: [
        {
          key: 'name',
          label: 'Authorized Seller'
        },
        {
          key: 'letter',
          label: 'Enforcement Letter'
        },
        {
          key: 'log',
          label: 'Activity Log'
        },
        {
          key: 'sender',
          label: 'Sender',
          class: 'sender-td'
        },
        {
          key: 'frequency',
          label: 'Frequency'
        },
        {
          key: 'contacts',
          label: 'Contacts'
        },
        {
          key: 'actions',
          label: ''
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: `mw/${TYPE.GET_PERMISSIONS}`,
      defaultParams: `mw/reports/${TYPE.GET_REPORT_MARKETPLACE_HISTORY_DEFAULT_PARAMS}`,
      sellerEnforcementLoading: `mw/sellerEnforcements/${TYPE.GET_SELLER_ENFORCEMENT_LOADING}`
    }),
    params: function() {
      return { ...this.defaultParams } || {}
    }
  },
  // watch: {
  //   'getPermissions': function() {
  //     if (this.getPermissions.permissions && this.getPermissions.permissions.seview) {
  //       this.loadData()
  //     }
  //   }
  // },
  created() {
    this.loadData()
  },
  destroyed() {
    this.$store.state.mw.sellerEnforcements.defaultParams.page = 1
    this.$store.state.mw.sellerEnforcements.listSellers = []
  }
}
</script>
<style lang="scss" scoped>
  .mw-180 {
    max-width: 180px;
    width: 16%;
  }
</style>
