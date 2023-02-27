<template>
    <div class="animated fadeIn" v-if="isGetFullData">
        <div class="warning-plan px-2 container-fluid">
          <b-alert v-if="remainingSlotsASIN !== false" show dismissible variant="warning">With the current plan, your organization has <strong>{{remainingSlotsASIN | formatNumber}}</strong> remaining {{'slot' | pluralize(remainingSlotsASIN)}} for new ASINs. Your import processing will be failed if you try to add more than <strong>{{planConfig['plan_max_of_asin_for_google_shopping'] | formatNumber}}</strong> {{ 'item' | pluralize(planConfig['plan_max_of_asin_for_google_shopping'])}}.</b-alert>
        </div>
        <LoadingSpinner :isLoading="reportLoading" v-if="reportLoading"/>
        <div v-else>
          <div class="px-2 container-fluid">
            <b-alert v-if="reportOptions.length < 1" show dismissible variant="danger">Please create at least one <router-link class="text-danger font-weight-bold" :to="{name: 'MWListReports'}">report</router-link> to import MAP.</b-alert>
          </div>
          <Step1Import v-if="reportOptions.length > 0" :inputOptions="options">
          <template v-slot:extend>
            <b-row>
              <b-col md="12" lg="12" sm="12">
                <b-form-group>
                  <label>Select the report <span class="text-danger">*</span></label>
                  <b-form-select
                    v-model="options.meta.report_id"
                    :options="reportOptions"
                    >
                  </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
          </template>
          </Step1Import>
        </div>
    </div>
</template>

<script>
import PermissionsMixin from '@/components/common/PermissionsMixin'
import { mapGetters, mapActions } from 'vuex'
import * as TYPE from '@/actionTypes.js'
import isEmpty from 'lodash/isEmpty'
import LoadingSpinner from '@/components/common/LoadingSpinner'

export default {
  name: 'MWImportGSMaps',
  mixins: [PermissionsMixin],
  components: {
    LoadingSpinner
  },
  data() {
    return {
      options: {
        title: 'Upload (Google Shopping MAP Pricing)',
        nextStepRouter: 'MWValidateGSMaps',
        module: 'GoogleShoppingImport',
        meta: {
          report_id: null
        }
      },
      isGetFullData: false
    }
  },
  computed: {
    ...mapGetters({
      reports: `mw/reports/${TYPE.GET_LIST_IMPORT_REPORTS}`,
      planConfig: `mw/${TYPE.GET_PLAN_CONFIG}`,
      organizationStats: `mw/${TYPE.GET_ORGANIZATION_STATS}`,
      reportLoading: `mw/reports/${TYPE.GET_LIST_REPORT_LOADING}`,
      listGSReports: `mw/reports/${TYPE.GET_GS_LIST_REPORTS}`
    }),
    remainingSlotsASIN() {
      const remainingSlotsASIN = parseInt(this.planConfig['plan_max_of_asin_for_google_shopping'] - this.organizationStats['asin_for_google_shopping_used'])
      if (remainingSlotsASIN >= 0) {
        return remainingSlotsASIN
      }
      return false
    },
    /* eslint-disable */
    reportOptions() {
      if (!isEmpty(this.listGSReports)) {
        return this.listGSReports.map(item => {
          return {
            value: item._id,
            text: item.name_in_dashboard
          }
        })
      }
      else return []
    }
  },
  methods: {
    ...mapActions({
      fetchImportReports: `mw/reports/${TYPE.FETCH_IMPORT_REPORTS}`
    })
  },
  watch: {
    reportOptions: {
      immediate: true,
      handler() {
        if (this.reportOptions.length > 0) {
          this.options.meta.report_id = this.reportOptions[0].value
        }
      }
    }
  },
  created() {
    this.fetchImportReports()
    this.isGetFullData = true
  }
}
</script>

<style scoped>

</style>
