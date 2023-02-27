<template>
  <b-row>
      <b-col sm="12" class="pt-3 d-flex justify-content-center">
          <div class="pr-3 pt-3 pb-3 text-white font-weight-bold" v-if="selected.report && selected.marketplace && selected.report[`marketplace_${selected.marketplace.replace(/[.]/g, '_')}`].file_in_use">
              File in Use: {{ selected.report[`marketplace_${selected.marketplace.replace(/[.]/g, '_')}`].file_in_use }}
          </div>
          <div class="pl-3 pt-3 pt-3 pb-3 content-header text-white font-weight-bold" v-if="selected.report && selected.marketplace && selected.report[`marketplace_${selected.marketplace.replace(/[.]/g, '_')}`].date_started">
              Date Started: {{ selected.report[`marketplace_${selected.marketplace.replace(/[.]/g, '_')}`].date_started | moment('MM/DD/YYYY')}}
          </div>
      </b-col>
    <b-col sm="12" class="pt-3 d-flex justify-content-center">
      <b-col sm="12" xs="12" md="10" class="mw-dashboard__grSelectbox">
        <b-row class="w-100">
          <b-col xs="4">
            <b-form-group class="text-center">
              <label>
                <b class="text-white">Report Name:</b>
              </label>
              <b-form-select v-model="selected.report" class="mb-3">
                <option v-for="(item, _i) in reports.items" :key="_i" :value="item">{{item.name_in_dashboard}}</option>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col xs="4">
            <b-form-group class="text-center">
              <label>
                <b class="text-white">Marketplace:</b>
              </label>
              <b-form-select class="mb-3" v-model="selected.marketplace">
                  <template v-for="(item, _i) in selected.options.marketplace">
                    <option :key="_i" :value="item.value">{{item.label}}</option>
                  </template>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col xs="4">
            <b-form-group class="text-center">
              <label>
                <b class="text-white">Seller Type:</b>
              </label>
              <b-form-select class="mb-3" v-model="selected.seller_type">
                <template>
                  <option
                    v-for="(item, _i) in selected.options.seller_type"
                    :key="_i"
                    :value="item.value"
                  >{{item.label}}</option>
                </template>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col xs="4" v-if="(selected.marketplace === ReportMarketplaces.amazon_com || selected.marketplace === ReportMarketplaces.amazon_ca) && selected.report.fulfillment">
            <b-form-group class="text-center">
              <label>
                <b class="text-white">Fulfillment:</b>
              </label>
              <b-form-select class="mb-3" v-model="selected.fulfillment">
                <template>
                  <option
                    v-for="(item, _i) in selected.options.fulfillment"
                    :key="_i"
                    :value="item.value"
                  >{{item.label}}</option>
                </template>
              </b-form-select>
            </b-form-group>
          </b-col>
          <b-col xs="4" v-if="!needToHideSourceTypeFilter()">
            <b-form-group class="text-center">
              <label>
                <b class="text-white">Source:</b>
              </label>
              <b-form-select v-model="selected.source" :options="getCurrentSourceOption()"></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
      </b-col>
    </b-col>
    <b-col sm="12">
      <b-row class="justify-content-center align-items-center mw-mb" v-if="selected.report && selected.report.logo" v-show="validSrc">
        <b-col sm="12" class="report-logo-center">
          <img id="report-logo" class="report-logo" @error="validSrc = false" @load="validSrc = true" :src="selected.report.logo">
        </b-col>
      </b-row>
      <b-row class="d-flex justify-content-center mw-mb" v-if="selected.marketplace">
        <h3
          class="text-white mb-0"
        >{{getMarketplaceLabel(selected.marketplace)}} - {{selected.seller_type ?
          coverValueToLabelForReport[selected.seller_type] : 'All Sellers'}}
          <span v-if="(selected.marketplace === ReportMarketplaces.amazon_com || selected.marketplace === ReportMarketplaces.amazon_ca) && selected.report.fulfillment && selected.fulfillment">
            - {{ selected.fulfillment }}
          </span>
          <span v-if="!needToHideSourceTypeFilter()">
            - {{getSourceTextByValue(selected.source)}}
          </span>

          <span v-if="dataSelectedDate">
            - {{ dataSelectedDate || '' | moment('MM/DD/YYYY') }}
          </span>
        </h3>
      </b-row>
    </b-col>
  </b-row>
</template>
<script>
import { coverValueToLabelForReport } from './configOptions'
import { mapGetters } from 'vuex'
import * as TYPE from '@/actionTypes.js'
import { ReportMarketplaces, DashboardFilterSourceType, AllSellerMode } from '@/constants/Report'
import { getMarketplaceLabelByType } from '@/shared/utils'
import _ from 'lodash'

export default {
  data: () => ({
    coverValueToLabelForReport,
    validSrc: true,
    ReportMarketplaces,
    DashboardFilterSourceType,
    AllSellerMode,
    sourceOptions: [
      { value: DashboardFilterSourceType.VIOLATIONS, text: 'Violations' },
      { value: DashboardFilterSourceType.ALL_SELLERS, text: 'All Sellers' }
    ] }),
  props: ['value', 'reports', 'needToHideSourceTypeFilter', 'getCurrentSourceOption'],
  methods: {
    getMarketplaceLabel(object) {
      return getMarketplaceLabelByType(object)
    },
    getSourceTextByValue(value) {
      const sourceOptions = this.getCurrentSourceOption()
      return _.find(sourceOptions, {'value': value}).text
    }
  },
  computed: {
    selected: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    ...mapGetters({
      dataSelectedDate: `mw/dashboard/${TYPE.GET_SELECTED_DATE}`
    })
  },
  created() {
    // console.log(this.selected)
  }
}
</script>
<style lang="scss">
  .report-logo {
    max-width: 100%;
  }
  .mw-mb {
    margin-bottom: 2rem;
  }
  .report-logo-center {
    text-align: center
  }
</style>
