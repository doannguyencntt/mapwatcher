<template>
  <b-form-group>
    <b-table
      class="table-marketplace"
      show-empty
      :fields="fields"
      :items="marketplaceItems"
      striped
      bordered
      responsive="sm"
      hover
      collapsed
      fixed
      style="overflow: visible !important"
    >
      <!-- A custom formatted data column cell -->
      <template v-slot:empty>
        <div class="text-center">No Marketplace</div>
      </template>
      <template v-slot:cell(marketplace)="row" class="pl-0">
        <b-form-input
          type="text"
          disabled
          class="bg-white"
          :value="row.item.marketplace.text"
        ></b-form-input>
      </template>
      <template v-slot:cell(file_in_use)="row">
        <b-form-input
          type="text"
          required
          v-model.trim="row.item.file_in_use"
        ></b-form-input>
      </template>
      <template v-slot:cell(date_started)="row" class="pr-0">
        <Datepicker
          v-model="row.item.date_started"
          bootstrap-styling
          format="MM/dd/yyyy"
          typeable
          placeholder="Select a date"
        >
        </Datepicker>
      </template>
      <template v-slot:cell(all_seller_mode)="row" class="pr-0">
        <b-form-select
          v-model="row.item.all_seller_mode"
          :options="allSellerModeOptions"
        ></b-form-select>
      </template>
      <template v-slot:cell(action)="row">
        <b-button
          variant="danger"
          @click="removeMarketplace(row.item.marketplace.value)"
          size="md"
          class="white text-center w-auto text-nowrap"
          ><i class="fa fa-minus"> </i> Remove</b-button
        >
      </template>
    </b-table>
    <div class="w-100 add-marketplace p-2 d-flex justify-content-between">
      <div class="mw-error"  v-if="isValidMarketplace && marketplaceItems.length === 0">
        Please input at least one marketplace
      </div>
      <b-dropdown id="dropdown-1" variant="primary" size="md" class="ml-auto" :disabled="amazonMarketPlaceList.length === 0 && googleShoppingMarketplaceList.length === 0">
        <template v-slot:button-content>
          <i class="fa fa-plus"></i> Add
        </template>
        <template v-if="planConfig.allowed_amazon_marketplaces.length || planConfig.plan_max_of_reports_with_amazon > 0">
          <b-dropdown-item @click="insertMarketplace(item.value)" v-for="item in amazonMarketPlaceList"
            v-bind:key="item.value"
            class="mt-2">
            {{ item.text }}
          </b-dropdown-item>
        </template>
        <b-dropdown-divider v-if="planConfig.allowed_amazon_marketplaces.length && planConfig.plan_max_of_reports_with_google_shopping > 0"></b-dropdown-divider>
        <template v-if="planConfig.plan_max_of_reports_with_google_shopping > 0">
          <b-dropdown-item
            @click="insertMarketplace(item.value)"
            v-for="item in googleShoppingMarketplaceList"
            v-bind:key="item.value"
            class="mt-2">
            {{ item.text }}
          </b-dropdown-item>
        </template>
      </b-dropdown>
    </div>
  </b-form-group>
</template>
<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import vToasted from '@/shared/notification'
import VueTagsInput from '@johmun/vue-tags-input'
import Datepicker from 'vuejs-datepicker'
import * as moment from 'moment/moment'
import { MarketPlacesResult } from '@/constants/Report'
import * as TYPE from '@/actionTypes.js'
import PermissionsMixin from '@/components/common/PermissionsMixin'

export default {
  name: 'MWReportMarketplacePicker',
  data() {
    return {
      MarketPlacesResult,
      listUniqGoogleShoppingMarketplace: [],
      fields: [
        // A column that needs custom formatting
        { key: 'marketplace', label: 'Marketplace' },
        { key: 'file_in_use', label: 'File in Use' },
        { key: 'date_started', label: 'Date Started' },
        { key: 'all_seller_mode', label: 'All Seller Mode' },
        { key: 'action', label: '' }
      ],
      allSellerModeOptions: [
        { value: 'none', text: 'None' },
        { value: 'authorized_only', text: 'Authorized Only' },
        { value: 'rogue_only', text: 'Rogue Only' },
        { value: 'both', text: 'Both' }
      ],
      marketplaces: {
        amazon_com: false,
        amazon_ca: false,
        amazon_co_uk: false,
        amazon_de: false,
        amazon_fr: false,
        amazon_it: false,
        amazon_es: false,
        amazon_nl: false,
        amazon_co_jp: false,
        amazon_in: false,
        amazon_com_au: false,
        amazon_sg: false,
        amazon_ae: false,
        amazon_com_tr: false,
        amazon_com_mx: false,
        amazon_com_br: false,
        google_shopping: false
      },
      marketplaceItems: [],
      removedMarketplace: [],
      parsedData: {}
    }
  },
  mixins: [vToasted, PermissionsMixin],
  props: {
    reportDoc: Object,
    isValidMarketplace: Boolean
  },
  computed: {
    ...mapGetters({
      planConfig: `mw/${TYPE.GET_PLAN_CONFIG}`
    }),
    listUniqAmazonMarketplace() {
      if (_.isEmpty(this.planConfig)) return []
      let listAmazon = this.planConfig.allowed_amazon_marketplaces.map(item => {
        return {
          value: item,
          text: _.upperFirst(item)
        }
      })
      return _.sortBy(listAmazon, ['value'])
    },
    listUniqAllMarketplace() {
      return _.concat(this.listUniqAmazonMarketplace, this.listUniqGoogleShoppingMarketplace)
    },
    amazonMarketPlaceList() {
      return this.listUniqAmazonMarketplace.filter(
        (item) =>
          !this.marketplaceItems.find(
            (mkItem) => mkItem.marketplace.value === item.value
          )
      )
    },
    googleShoppingMarketplaceList() {
      return this.listUniqGoogleShoppingMarketplace.filter(
        (item) =>
          !this.marketplaceItems.find(
            (mkItem) => mkItem.marketplace.value === item.value
          )
      )
    }
  },
  methods: {
    ...mapActions({}),
    /* eslint-disable */
    insertMarketplace(marketplace) {
      const alreadyExist = _.find(this.marketplaceItems, function (o) {
        return o.marketplace.value === marketplace
      })
      if (!alreadyExist) {
        const marketplaceDoc = _.find(this.listUniqAllMarketplace, {
          value: marketplace
        })
        this.marketplaceItems.push({
          marketplace: marketplaceDoc,
          file_in_use: '',
          date_started: '',
          all_seller_mode: 'none',
          action: false
        })
      }
      this.autoEnableWhenSelectMarketplace(marketplace, true)
    },
    autoEnableWhenSelectMarketplace(marketplace, action) {
      this.marketplaces[marketplace.replace(/[.]/g, '_')] = action
    },
    buildMarketplaceInfo(fileInUse, dateStarted, all_seller_mode) {
      return {
        file_in_use: fileInUse,
        date_started: dateStarted
          ? moment(dateStarted).format('MM/DD/YYYY')
          : '',
        all_seller_mode: all_seller_mode
      }
    },
    removeMarketplace(marketplace) {
      this.marketplaceItems = _.remove(this.marketplaceItems, function (o) {
        return o.marketplace.value !== marketplace
      })
      this.autoEnableWhenSelectMarketplace(marketplace, false)
    },
    isAmazonMarketplace(marketplace) {
      return _.includes(marketplace, 'amazon')
    },
    getMarketplaceField(marketplace) {
      return `marketplace_${marketplace.replace(/[.]/g, '_')}`
    },
    convertMarketplaceKeyToField(marketplace) {
      return marketplace.replace(/[_]/g, '.')
    },
    findMarketplaceFromListUnique(marketplace) {
      return _.find(this.listUniqAllMarketplace, (data) => {
        if (this.isAmazonMarketplace(marketplace)) {
          return data.value === this.convertMarketplaceKeyToField(marketplace)
        } else if (this.isGoogleShoppingMarketplace(marketplace)) {
          return data.value === MarketPlacesResult.GOOGLE_SHOPPING
        }
      })
    },
    isAmazonMarketplace(marketplace) {
      return _.includes(marketplace, 'amazon')
    },
    isGoogleShoppingMarketplace(marketplace) {
      return _.includes(marketplace, 'google')
    },
    syncMarketplaceItems(doc) {
      if (!doc.marketplaces) {
        return
      }
      const marketplaceKeys = _.keys(doc.marketplaces)
      const values = _.values(MarketPlacesResult)
      _.forEach(marketplaceKeys, (marketplaceKey) => {
        const marketplaceField = _.includes(marketplaceKey, 'amazon')
          ? this.convertMarketplaceKeyToField(marketplaceKey)
          : marketplaceKey
        if (
          doc.marketplaces[marketplaceKey] &&
          _.includes(values, marketplaceField)
        ) {
          this.marketplaces[marketplaceKey] = true
          const marketplaceField = this.getMarketplaceField(marketplaceKey)
          const marketplaceInfo = doc[marketplaceField]
          if (marketplaceInfo) {
            const {
              file_in_use,
              date_started,
              all_seller_mode
            } = marketplaceInfo
            this.marketplaceItems.push({
              marketplace: this.findMarketplaceFromListUnique(marketplaceKey),
              file_in_use: file_in_use,
              date_started: date_started,
              action: '',
              all_seller_mode: all_seller_mode || 'none'
            })
          } else {
            this.marketplaceItems.push({
              marketplace: this.findMarketplaceFromListUnique(marketplaceKey),
              file_in_use: '',
              date_started: '',
              action: '',
              all_seller_mode: all_seller_mode || 'none'
            })
          }
        }
      })
    },
    convertData() {
      _.forEach(this.marketplaceItems, (marketplaceItem) => {
        const marketplaceInfo = this.getMarketplaceField(
          marketplaceItem.marketplace.value
        )
        const {
          file_in_use,
          date_started,
          all_seller_mode
        } = marketplaceItem
        _.assign(this.parsedData, {
          [marketplaceInfo]: this.buildMarketplaceInfo(
            file_in_use,
            date_started,
            all_seller_mode
          )
        })
      })
    }
  },
  created() {
    const marketplaceValues = _.values(MarketPlacesResult)
    _.forEach(marketplaceValues, (marketplaceValue) => {
      if (_.includes(marketplaceValue, 'google')) {
        this.listUniqGoogleShoppingMarketplace.push({
          value: marketplaceValue,
          text: 'Google Shopping'
        })
      }
    })
    if (this.reportDoc) {
      this.syncMarketplaceItems(this.reportDoc)
      // this.$watch('reportDoc', (val) =>
      //   {
      //     this.marketplaceItems = []
      //     this.syncMarketplaceItems(val)
      //   }
      // )
    }
  },
  components: {
    VueTagsInput,
    Datepicker
  },
  watch: {
    marketplaceItems: {
      deep: true,
      handler(val) {
        this.convertData()
        this.$emit('marketplaceChange', {
          parsedData: this.parsedData,
          marketplaces: this.marketplaces
        })
      }
    },
    reportDoc: {
      handler(val) {
        this.marketplaceItems = []
        this.syncMarketplaceItems(val)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.table-marketplace {
  &::v-deep {
    overflow: visible;
    margin-bottom: 0px;
    tbody tr td {
      background: white;
    }
    tbody tr td:nth-child(5) {
      text-align: center;
    }
    tfoot tr {
      th {
        &:not(:last-child) {
          border-right: none !important;
        }
        &:not(:first-child) {
          border-left: none !important;
        }
      }
    }
  }
}
::v-deep .add-marketplace {
  text-align: right;
  border: 1px solid #c8ced3;
  border-top: none;
}
::v-deep .vdp-datepicker__calendar {
  position: absolute !important;
}
::v-deep ul {
  max-height: 350px;
  overflow: auto;
}
</style>
