<template>
  <div class="animated fadeIn" v-if="isGetFullData">
    <b-row>
      <b-col lg="6">
        <transition name="fade">
          <b-card no-body>
            <template v-slot:header>
              <span class="align-middle">
                <span v-if="!sellerID"><i class="icon-plus"></i><strong> Add New Seller</strong></span>
                <span v-else><strong><i class="icon-note"></i> Edit Seller Info</strong></span>
              </span>
              <div class="pull-right">
                <router-link :to="{ name: 'MWSISellerList', params: { client_id: nav.clientId } }" class="btn btn-secondary btn-sm">
                  <i class="icon-arrow-left-circle"></i> Back
                </router-link>
              </div>
            </template>
            <b-card-body>
              <b-row>
                <b-col lg="6" md="6" sm="12">
                  <label>Seller Name</label>
                  <b-form-input
                    :class="{'is-invalid': $v.sellerData.seller_name.$dirty && $v.sellerData.seller_name.$error}"
                    type="text"
                    v-model.trim="sellerData.seller_name"
                    placeholder="Enter your seller name"
                    class="mb-2"
                    @input="$v.sellerData.seller_name.$touch()">
                  </b-form-input>
                  <div class="invalid-feedback" v-if="$v.sellerData.seller_name.$dirty && !$v.sellerData.seller_name.required">Seller name is required</div>
                </b-col>
                <b-col lg="6" md="6" sm="12">
                  <label>Merchant ID</label>
                  <b-form-input
                    :class="{'is-invalid': $v.sellerData.merchant_id.$dirty && $v.sellerData.merchant_id.$error}"
                    type="text"
                    v-model.trim="sellerData.merchant_id"
                    placeholder="Enter your Merchant ID"
                    class="mb-2"
                    @input="$v.sellerData.merchant_id.$touch()">
                  </b-form-input>
                  <div class="invalid-feedback" v-if="$v.sellerData.merchant_id.$dirty && !$v.sellerData.merchant_id.required">Merchant ID is required</div>
                </b-col>
                <b-col lg="6" md="6" sm="12">
                  <label>Status</label>
                  <b-form-select v-model="sellerData.status" class="mb-2">
                    <option :value="null" disabled>Please select an option</option>
                    <option value="new">New</option>
                    <option value="complied">Complied</option>
                    <option value="complied_low_sku">Complied Low SKU</option>
                    <option value="gmr_complied">GMR Complied</option>
                    <option value="gmr_still_rogue">GMR Still Rogue</option>
                    <option value="still_rogue">Still Rogue</option>
                    <option value="relisted">Relisted</option>
                    <option value="gmr_relisted">GMR Relisted</option>
                  </b-form-select>
                  <div class="invalid-feedback" v-if="$v.sellerData.status.$dirty && !$v.sellerData.status.required">Status is required</div>
                </b-col>
                <b-col lg="6" md="6" sm="12">
                  <label>Investigation</label>
                  <b-form-input
                    type="text"
                    v-model.trim="sellerData.investigation"
                    placeholder="Enter your investigation"
                    class="mb-2">
                  </b-form-input>
                  <!--<b-form-input
                    :class="{'is-invalid': $v.sellerData.investigation.$dirty && $v.sellerData.investigation.$error}"
                    type="text"
                    v-model.trim="sellerData.investigation"
                    placeholder="Enter your investigation"
                    class="mb-2"
                    @input="$v.sellerData.investigation.$touch()">
                  </b-form-input>
                  <div class="invalid-feedback" v-if="$v.sellerData.investigation.$dirty && !$v.sellerData.investigation.required">Investigation is required</div>-->
                </b-col>
                <b-col lg="6" md="6" sm="12">
                  <label>Source</label>
                  <b-form-input
                    type="text"
                    v-model.trim="sellerData.source"
                    placeholder="Enter your source"
                    class="mb-2">
                  </b-form-input>
                  <!--<b-form-input
                    :class="{'is-invalid': $v.sellerData.source.$dirty && $v.sellerData.source.$error}"
                    type="text"
                    v-model.trim="sellerData.source"
                    placeholder="Enter your source"
                    class="mb-2"
                    @input="$v.sellerData.source.$touch()">
                  </b-form-input>
                  <div class="invalid-feedback" v-if="$v.sellerData.source.$dirty && !$v.sellerData.source.required">Source is required</div>-->
                </b-col>
                <b-col lg="6" md="6" sm="12">
                  <label>Link</label>
                  <b-form-input
                    :class="{'is-invalid': $v.sellerData.link.$dirty && $v.sellerData.link.$error}"
                    type="text"
                    v-model.trim="sellerData.link"
                    placeholder="Enter your link"
                    class="mb-2"
                    @input="$v.sellerData.link.$touch()">
                  </b-form-input>
                  <div class="invalid-feedback" v-if="$v.sellerData.link.$dirty && !$v.sellerData.link.url">Link is invalid</div>
                </b-col>
              </b-row>
            </b-card-body>
            <template v-slot:footer>
              <b-button v-if="!sellerID" :disabled="$v.$anyError || $v.$invalid" variant="primary" size="sm" @click="submit()">
                <i class="fa fa-dot-circle-o"></i> Submit
              </b-button>
              <b-button v-if="sellerID" :disabled="$v.$anyError || $v.$invalid" variant="primary" size="sm" @click="update()">
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
import { required, url } from 'vuelidate/lib/validators'
import PermissionsMixin from '@/components/common/PermissionsMixin'
import _ from 'lodash'
import * as TYPE from '@/actionTypes.js'

export default {
  name: 'MWSIManageSeller',
  mixins: [toastMixin, PermissionsMixin],
  data: function () {
    return {
      nav: _nav,
      sellerID: null,
      sellerData: {
        seller_name: null,
        merchant_id: null,
        status: null,
        investigation: null,
        source: null,
        link: null
      },
      isGetFullData: false
    }
  },
  validations: {
    sellerData: {
      seller_name: {
        required
      },
      merchant_id: {
        required
      },
      status: {
        required
      },
      link: {
        url
      }
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: `mw/${TYPE.GET_PERMISSIONS}`,
      getOneSeller: `mw/sellers/getOneSeller`
    })
  },
  methods: {
    ...mapActions({
      fetchPermissions: `mw/${TYPE.FETCH_PERMISSIONS}`,
      getOneSellerData: `mw/sellers/getOneSellerData`,
      createSeller: `mw/sellers/createSeller`,
      updateSeller: `mw/sellers/updateSeller`
    }),
    async submit () {
      this.$v.$touch()
      if (!this.$v.$anyError) {
        let payload = _.cloneDeep(this.sellerData)
        payload.clientID = this.$route.params.client_id
        let res = await this.createSeller(payload)
        if (res === 200 || res === 201) {
          this.vueToast('Seller has been created successfully', 'success')
          this.$router.push({ name: 'MWSISellerList', params: { client_id: this.nav.clientId } })
        } else {
          this.vueToast('Seller has not been created. Please retry or contact administrator.', 'error')
        }
      }
    },
    async update () {
      this.$v.$touch()
      if (!this.$v.$anyError) {
        let payload = _.cloneDeep(this.sellerData)
        payload.clientID = this.$route.params.client_id
        payload.sellerID = this.$route.params.seller_id
        let res = await this.updateSeller(payload)
        if (res === 200 || res === 201) {
          this.vueToast('Seller info has been updated successfully', 'success')
          this.$router.push({ name: 'MWSISellerList', params: { client_id: this.nav.clientId } })
        } else {
          this.vueToast('Seller info has not been updated. Please retry or contact administrator.', 'error')
        }
      }
    },
    assignFormData (data) {
      for (let k in this.sellerData) {
        this.sellerData[k] = data[k]
      }
    }
  },
  async created() {
    // await this.fetchPermissions()
    this.sellerID = this.$route.params.seller_id
    this.isGetFullData = true
    let payload = {
      sellerID: this.sellerID,
      clientID: this.$route.params.client_id
    }
    // if no permission -> return Home page
    if (this.getPermissions.permissions) {
      this.gotoGlobalHomePageIfNoPermission(this.getPermissions.permissions)
      if (this.sellerID && this.getPermissions.permissions) {
        await this.getOneSellerData(payload)
        this.assignFormData(this.getOneSeller)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
