<template>
  <div class="animated fadeIn" v-if="isGetFullData">
    <div class="warning-plan px-2 container-fluid">
      <b-alert v-if="remainingSlotsASIN !== false" show dismissible variant="warning">With the current plan, your organization has <strong>{{remainingSlotsASIN | formatNumber}}</strong> remaining {{'slot' | pluralize(remainingSlotsASIN)}} for new ASINs. Your import processing will be failed if you try to add more than <strong>{{planConfig['plan_max_of_asin_for_amazon'] | formatNumber}}</strong> {{ 'item' | pluralize(planConfig['plan_max_of_asin_for_amazon'])}}.</b-alert>
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
          <b-row>
            <b-col md="6" lg="6" sm="12">
              <b-form-group>
                <label>
                  <b>File in use</b>
                </label>
                <b-form-input type="text" v-model="options.meta.file_in_use"></b-form-input>
              </b-form-group>
            </b-col>
            <b-col md="6" lg="6" sm="12">
              <b-form-group class="w-100">
                <label>
                  <b>Date started</b>
                </label>
                <b-input-group class="w-100">
                  <template v-slot:prepend>
                    <b-input-group-append class="append-group btn-custom">
                      <b-button class="" id="btnDate" size="md" @click="$refs.date_started.showCalendar()">
                        <i class="icons icon-calendar"></i>
                      </b-button>
                    </b-input-group-append>
                  </template>
                  <Datepicker
                    v-model="options.date_started"
                    bootstrap-styling
                    format="MM/dd/yyyy"
                    typeable
                    ref="date_started"
                    id="fromPicker"
                    @input="changeInput()"
                    placeholder="Select a date"
                    class="optimize-dp custom-datepicker-control p-0"
                  >
                  </Datepicker>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <p>This file in use and date will be applied to any marketplace in the file, please be careful if you want different values for different marketplaces</p>
        </template>
      </Step1Import>
    </div>
  </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker'
import * as moment from 'moment/moment'
import { mapGetters, mapActions } from 'vuex'
import * as TYPE from '@/actionTypes.js'
import PermissionsMixin from '@/components/common/PermissionsMixin'
import isEmpty from 'lodash/isEmpty'
import LoadingSpinner from '@/components/common/LoadingSpinner'

export default {
  name: 'MWImportAmazonMaps',
  mixins: [PermissionsMixin],
  components: {
    Datepicker,
    LoadingSpinner
  },
  data() {
    return {
      options: {
        title: 'Amazon MAP select file to upload',
        nextStepRouter: 'MWValidateAmazonMaps',
        module: 'AmazonMapImport',
        progressBar: true,
        date_started: null,
        meta: {
          date_started: null,
          file_in_use: null,
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
      listAmazonReports: `mw/reports/${TYPE.GET_AMAZON_LIST_REPORTS}`
    }),
    remainingSlotsASIN() {
      const remainingSlotsASIN = parseInt(this.planConfig['plan_max_of_asin_for_amazon'] - this.organizationStats['asin_for_amazon_used'])
      if (remainingSlotsASIN >= 0) {
        return remainingSlotsASIN
      }
      return false
    },
    /* eslint-disable */
    reportOptions() {
      if (!isEmpty(this.listAmazonReports)) {
        return this.listAmazonReports.map(item => {
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
    }),
    changeInput() {
      this.options.meta.date_started = moment(new Date(this.options.date_started)).format('MM/DD/YYYY')
    }
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

<style scoped lang="scss">
.append-group {
  #btnDate {
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
  }
}
::v-deep .custom-datepicker-control {
  // 40 - 2px border
  max-width: calc(100% - 38px);
  width: 100%;
  .form-control {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left-width: 0;
  }
}
.btn-custom {
  max-width: 40px;
  width: 100%;
}

/deep/ #btnDate {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
