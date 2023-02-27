<template>
  <div class="animated fadeIn" v-if="isGetFullData">
    <b-row>
      <b-col lg="8">
        <transition name="fade">
          <b-card no-body>
            <template v-slot:header>
              <span class="align-middle">
                <span v-if="!listingID"><i class="icon-plus"></i><strong> Add New Listing</strong></span>
                <span v-else><strong><i class="icon-note"></i> Edit Listing Info</strong></span>
              </span>
              <div class="pull-right">
                <router-link :to="{ name: 'MWSIListings', params: { client_id: nav.clientId } }" class="btn btn-secondary btn-sm">
                  <i class="icon-arrow-left-circle"></i> Back
                </router-link>
              </div>
            </template>
            <b-card-body>
              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <label>Seller</label>
                  <b-form-select v-model="listingData.seller_id" :options="sellerOptions" class="">
                    <template v-slot:first>
                      <option :value="null" disabled>Please select a seller</option>
                    </template>
                  </b-form-select>
                  <div class="invalid-feedback" v-if="$v.listingData.seller_id.$dirty && !$v.listingData.seller_id.required">Seller is required</div>
                </b-col>
                <b-col lg="6" md="6" sm="12">
                  <label>Date</label>
                  <Datepicker
                    v-model="listingData.date"
                    bootstrap-styling
                    format="yyyy-MM-dd"
                    typeable
                    id="dataPicker"
                    placeholder="Enter your date"
                  >
                  </Datepicker>
                  <div class="invalid-feedback" v-if="$v.listingData.date.$dirty && !$v.listingData.date.required">Date is required</div>
                </b-col>
                <b-col lg="6" md="6" sm="12">
                  <label>Total</label>
                  <b-form-input
                    :class="{'is-invalid': $v.listingData.total.$dirty && $v.listingData.total.$error}"
                    type="number"
                    min="0"
                    v-model.trim="listingData.total"
                    placeholder="Enter your total"
                    class="mb-2"
                    @input="$v.listingData.total.$touch()">
                  </b-form-input>
                  <div class="invalid-feedback" v-if="$v.listingData.total.$dirty && !$v.listingData.total.required">Total is required</div>
                </b-col>
              </b-row>
            </b-card-body>
            <template v-slot:footer>
              <b-button v-if="!listingID" :disabled="$v.$anyError" variant="primary" size="sm" @click="submit()">
                <i class="fa fa-dot-circle-o"></i> Submit
              </b-button>
              <b-button v-if="listingID" :disabled="$v.$anyError" variant="primary" size="sm" @click="update()">
                <i class="fa fa-dot-circle-o"></i> Update
              </b-button>
            </template>
          </b-card>
        </transition>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import toastMixin from './../toastMixin'
import _nav from '@/_nav'
import { required } from 'vuelidate/lib/validators'
import PermissionsMixin from '@/components/common/PermissionsMixin'
import _ from 'lodash'
import Datepicker from 'vuejs-datepicker'
import * as TYPE from '@/actionTypes.js'

export default {
  name: 'MWSIManageListing',
  mixins: [toastMixin, PermissionsMixin],
  components: {
    Datepicker
  },
  data: function () {
    return {
      nav: _nav,
      listingID: null,
      listingData: {
        seller_id: null,
        date: null,
        total: null
      },
      sellerOptions: [],
      isGetFullData: false
    }
  },
  validations: {
    listingData: {
      seller_id: {
        required
      },
      date: {
        required
      },
      total: {
        required
      }
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: `mw/${TYPE.GET_PERMISSIONS}`,
      getOneListing: `mw/sellers/getOneListing`,
      getSellers: `mw/sellers/getSellers`
    })
  },
  methods: {
    ...mapActions({
      fetchPermissions: `mw/${TYPE.FETCH_PERMISSIONS}`,
      getOneListingData: `mw/sellers/getOneListingData`,
      createListing: `mw/sellers/createListing`,
      updateListing: `mw/sellers/updateListing`,
      getSellersData: `mw/sellers/getSellersData`
    }),
    async submit () {
      this.$v.$touch()
      if (!this.$v.$anyError) {
        let payload = _.cloneDeep(this.listingData)
        payload.clientID = this.$route.params.client_id
        let res = await this.createListing(payload)
        if (res === 200 || res === 201) {
          this.vueToast('Listing has been created successfully', 'success')
          this.$router.push({ name: 'MWSIListings', params: { client_id: this.nav.clientId } })
        } else {
          if (res && res.statusCode === 500 && res.message) {
            this.vueToast('This seller already had a listing for this week. Please choose another seller.', 'error')
          } else {
            this.vueToast('Listing has not been created. Please retry or contact administrator.', 'error')
          }
        }
      }
    },
    async update () {
      this.$v.$touch()
      if (!this.$v.$anyError) {
        let payload = _.cloneDeep(this.listingData)
        payload.clientID = this.$route.params.client_id
        payload.listingID = this.$route.params.listing_id
        let res = await this.updateListing(payload)
        if (res === 200 || res === 201) {
          this.vueToast('Listing info has been updated successfully', 'success')
          this.$router.push({ name: 'MWSIListings', params: { client_id: this.nav.clientId } })
        } else {
          if (res && res.statusCode === 500 && res.message) {
            this.vueToast('This seller already had a listing for this week. Please choose another seller.', 'error')
          } else {
            this.vueToast('Listing has not been updated. Please retry or contact administrator.', 'error')
          }
        }
      }
    },
    assignFormData (data) {
      for (let k in this.listingData) {
        this.listingData[k] = data[k]
      }
    },
    async handleGetSellersData() {
      let payload = {
        limit: 200,
        page: 1,
        sort_by: 'seller_name',
        sort_dir: 1,
        clientID: this.$route.params.client_id
      }
      await this.getSellersData(payload)
      this.mapSellerOptions()
    },
    mapSellerOptions() {
      this.sellerOptions = _.map(this.getSellers.items, (item) => {
        return {
          value: item._id ? item._id : item.id,
          text: item.seller_name
        }
      })
    }
  },
  async created() {
    // await this.fetchPermissions()
    this.listingID = this.$route.params.listing_id
    this.isGetFullData = true
    if (this.listingID) {
      let payload = {
        listingID: this.listingID,
        clientID: this.$route.params.client_id
      }
      await this.getOneListingData(payload)
      this.assignFormData(this.getOneListing)
    }
    // if no permission -> return Home page
    if (this.getPermissions) {
      const permission = this.getPermissions.permissions
      this.gotoGlobalHomePageIfNoPermission(permission)
      if (permission) {
        await this.handleGetSellersData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
