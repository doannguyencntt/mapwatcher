<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <div class="warning-plan">
          <b-alert v-if="checkMaxAsinOfOrganizationPlan" show dismissible variant="warning">Your plan allows <strong>{{this.planConfig['plan_max_of_asin_for_google_shopping'] | formatNumber}}</strong> ASINs but you have <strong>{{organizationStats['asin_for_google_shopping_used'] | formatNumber}}</strong> active  {{ 'one' | pluralize(organizationStats['asin_for_google_shopping_used'])}} in your organization. Please consider removing the unnecessary ones or your report will not be complete as expected. We will randomly select the first <strong>{{this.planConfig['plan_max_of_asin_for_google_shopping'] | formatNumber}}</strong> items for processing only.</b-alert>
        </div>
        <list-maps
          fixed
          bordered
          :caption="$route.meta.tableName"
          :fields="fields"
          class="tbl-list-map"
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
  name: 'MWGSListMaps',
  components: { ListMaps },
  mixins: [PermissionsMixin],
  data: () => {
    return {
      fields: [
        {
          key: 'selected',
          tdClass: 'td-selected'
        },
        {
          key: 'brand_name',
          label: 'Brand Name',
          tdClass: 'td-brand-name'
        },
        {
          key: 'sku',
          label: 'SKU',
          tdClass: 'td-sku'
        },
        {
          key: 'asin',
          label: 'ASIN',
          tdClass: 'td-asin'
        },
        {
          key: 'upc',
          label: 'UPC/EAN',
          tdClass: 'td-upc'
        },
        {
          key: 'price',
          label: 'MAP Price',
          tdClass: 'td-price'
        },
        {
          key: 'last_violation_checked',
          label: 'Last Completed',
          tdClass: 'td-completed'
        },
        {
          key: 'gpid',
          label: 'GPID',
          tdClass: 'td-gpid'
        },
        {
          key: 'discovered_gpids',
          label: 'Discovered GPID(s)',
          tdClass: 'td-discovered'
        },
        {
          key: 'actions',
          label: 'Actions',
          tdClass: 'td-action'
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
      if (this.organizationStats['asin_for_google_shopping_used'] > this.planConfig['plan_max_of_asin_for_google_shopping']) {
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
  .tbl-list-map ::v-deep {
    .td-selected {
      width: 3%;
    }
    .td-brand-name {
      width: 10%;
      word-break: break-all
    }
    .td-sku {
      width: 16%;
      word-break: break-all
    }
    .td-asin {
      width: 15%;
    }
    .td-upc {
      width: 10%;
    }
    .td-price {
      width: 10%;
    }
    .td-completed {
      width: 11%;
    }
    .td-gpid {
      width: 10%;
    }
    .td-discovered {
      width: 10%;
    }
    .td-action {
      width: 5%;
    }
  }
</style>
