<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <div class="warning-plan">
          <b-alert v-if="checkMaxAsinOfOrganizationPlan" show dismissible variant="warning">Your plan allows <strong>{{planConfig['plan_max_of_asin_for_amazon'] | formatNumber}}</strong> ASINs but you have <strong>{{organizationStats['asin_for_amazon_used'] | formatNumber}}</strong> active {{ 'one' | pluralize(organizationStats['asin_for_amazon_used'])}} in your organization. Please consider removing the unnecessary ones or your report will not be complete as expected. We will randomly select the first <strong>{{planConfig['plan_max_of_asin_for_amazon'] | formatNumber}}</strong> items for processing only.</b-alert>
        </div>
        <list-maps
          fixed
          bordered
          :caption="$route.meta.tableName"
          :fields="fields"
        ></list-maps>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ListMaps from './ListMaps'
import PermissionsMixin from '@/components/common/PermissionsMixin'
import { mapGetters } from 'vuex'
import * as TYPE from '@/actionTypes.js'

export default {
  name: 'MWListMaps',
  components: { ListMaps },
  mixins: [PermissionsMixin],
  data: () => {
    return {
      fields: [
        {
          key: 'selected'
        },
        {
          key: 'marketplace',
          label: 'MARKETPLACE'
        },
        {
          key: 'brand_name',
          label: 'Brand Name'
        },
        {
          key: 'sku',
          label: 'SKU'
        },
        {
          key: 'asin',
          label: 'ASIN'
        },
        {
          key: 'upc',
          label: 'UPC/EAN'
        },
        {
          key: 'price',
          label: 'MAP Price'
        },
        {
          key: 'last_violation_checked',
          label: 'Last Completed'
        },
        {
          key: 'type',
          label: 'Type'
        },
        {
          key: 'discovered_asins',
          label: 'Discovered Asin(s)'
        },
        {
          key: 'actions',
          label: 'Actions',
          thClass: 'th-action'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      planConfig: `mw/${TYPE.GET_PLAN_CONFIG}`,
      organizationStats: `mw/${TYPE.GET_ORGANIZATION_STATS}`
    }),
    checkMaxAsinOfOrganizationPlan() {
      if (this.organizationStats['asin_for_amazon_used'] > this.planConfig['plan_max_of_asin_for_amazon']) {
        return true
      }
      return false
    }
  },
  destroyed() {
    this.$store.state.mw.maps.currentPage = 1
  }
}
</script>
<style lang="scss" scoped>
  .mw-180 {
    max-width: 180px;
    width: 16%;
  }
  .th-action {
    width: 15%;
  }
</style>
