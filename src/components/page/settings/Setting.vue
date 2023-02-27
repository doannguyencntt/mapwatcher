<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6" lg="6" sm="12">
        <b-card footer-tag="footer">
          <div slot="header" class="d-flex justify-content-between align-items-center">
            <span><strong>Edit Settings</strong></span>
          </div>
          <b-form>
            <b-row>
              <b-col md="4" lg="4" sm="8">
                <b-form-group>
                  <label for="#">
                    <b>Show dashboard</b>
                  </label>
                </b-form-group>
              </b-col>
              <b-col md="2" lg="2" sm="4">
                <div class="d-flex flex-row">
                  <b-form-checkbox
                          v-model="data.show_dashboard"
                          class="mr-4 font-weight-light"
                          :disabled="getPermissions.role !== 'admin' && getPermissions.role !== 'owner'"
                          switch
                  ></b-form-checkbox>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-form-group>
                  <label>
                    <b>Default report logo</b>
                  </label>
                  <b-row class="align-items-center">
                    <b-col md="2">
                      <img
                              :src="data.default_brand_logo ? data.default_brand_logo : reportLogo"
                              class="mw-img-report my-1 img-thumbnail mx-auto d-block"
                              alt="Left image"
                      />
                      <b-button
                              size="sm"
                              variant="warning"
                              v-if="data.default_brand_logo"
                              @click="removeLogo()"
                              class="d-block mx-auto btn-remove"
                      >
                        Remove
                      </b-button>
                    </b-col>
                    <b-col md="10">
                      <b-form-file ref="file-input" @change="handleImagesFileUpload($event)"></b-form-file>
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row v-if="planConfig.seller_investigation_dashboard" class="seller_investigation_dashboard">
              <b-col md="5" lg="5" sm="12">
                <b-form-group>
                  <label for="#">
                    <b>Sellers & Investigations Listing Brand Name</b>
                  </label>
                </b-form-group>
              </b-col>
              <b-col md="7" lg="7" sm="10">
                <div class="d-flex flex-row">
                  <b-form-input
                          v-model="data.si_listing_brand_name"
                          class="font-weight-light"
                  ></b-form-input>
                </div>
              </b-col>
            </b-row>
            <b-row v-if="planConfig.seller_enforcement_enabled" class="seller_enforcement_enabled">
              <b-col md="12">
                <b-form-group>
                  <b-row>
                    <b-col md="5">
                      <label>
                        <b>Map Pricing Policy Document</b>
                        <div class="mw-error ml-0">This file will be attached to the Seller Enforcement violation emails.</div>
                      </label>
                    </b-col>
                    <b-col md="7">
                      <b>Update new policy document</b>
                      <b-form-file ref="policyFileInput" class="mt-2" :file-name-formatter="formatNames" @change="handleUploadMapPricingPolicyDocument($event)" placeholder="Select new file"></b-form-file>
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col md="5" class="mt-2" v-if="data.map_pricing_policy_document && data.map_pricing_policy_document.url && data.map_pricing_policy_document.url !== ''">
                      Current file <u @click="downloadFile()" class="pointer">{{ data.map_pricing_policy_document.file_name }}</u>
                    </b-col>
                    <b-col md="7" class="text-right" v-if="data.map_pricing_policy_document && data.map_pricing_policy_document.url && data.map_pricing_policy_document.url !== ''">
                      <b-button size="sm" class="mt-2 ml-1" @click="downloadFile()" :disabled="isLoading"><i class="fa fa-download" /> Download</b-button>
                      <b-button size="sm" class="mt-2 ml-1" v-b-modal.remove-file-modal :disabled="isLoading"><i class="fa fa-trash" /> Remove</b-button>
                      <span
                        id="policy-control-button"
                        class="d-inline-block"
                        tabindex="0"
                        v-b-tooltip.hover="{disabled: policyUpdated}"
                        title="Please save your settings first!"
                      >
                        <b-button
                          v-b-modal="policyModalID"
                          class="btn-sm mt-2 ml-1"
                          target="_self"
                          :disabled="(newPolicyUploaded && !policyUpdated) || isLoading"
                          title="Send Email"
                        >
                          <i class="fa fa-paper-plane" /> Notify
                        </b-button>
                      </span>
                    </b-col>
                  </b-row>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
          <em slot="footer">
            <b-button class="mr-1" variant="primary" :disabled="(getPermissions.role !== 'admin' && getPermissions.role !== 'owner') || isLoading" size="sm" @click="handleUpdateSetting">
              <i class="fa fa-dot-circle-o"></i> Save Settings
            </b-button>
          </em>
        </b-card>
      </b-col>
    </b-row>
    <PolicyNotificationModal :id="policyModalID"/>
    <b-modal id="remove-file-modal"  title="Please confirm" centered @ok="removePolicyFile()" ok-variant="danger">
      Are you sure you want to remove current policy document?
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button variant="warning" @click="ok()"> <i class="icon-check"></i> Yes, I understand &amp; confirm! </b-button>
        <b-button variant @click="cancel()"> <i class="icon-close"></i> No </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import _nav from '@/_nav'
import * as TYPE from '@/actionTypes.js'
import vToasted from '@/shared/notification'
import { mapActions, mapGetters } from 'vuex'
import PermissionsMixin from '@/components/common/PermissionsMixin'
import reportLogo from '@/assets/img/report-demo.jpg'
import PolicyNotificationModal from './PolicyNotificationModal.vue'
import get from 'lodash/get'
export default {
  components: { PolicyNotificationModal },
  data() {
    return {
      reportLogo,
      isLoading: false,
      data: {
        show_dashboard: true,
        si_listing_brand_name: '',
        default_brand_logo: '',
        map_pricing_policy_document: {
          url: '',
          file_name: ''
        }
      },
      originData: {},
      nav: _nav,
      policyModalID: 'policy-sending-confirmation',
      policyUpdated: false
    }
  },
  mixins: [vToasted, PermissionsMixin],
  methods: {
    ...mapActions({
      remoteFetchSetting: `mw/settings/${TYPE.FETCH_SETTING}`,
      remoteUpdateSetting: `mw/settings/${TYPE.REMOTE_EDIT_SETTING}`,
      remoteImagesFileUpload: `mw/images/${TYPE.REMOTE_UPLOAD_IMAGES}`,
      remoteFileUpload: `mw/settings/${TYPE.REMOTE_UPLOAD_FILES}`
    }),
    async handleImagesFileUpload(e) {
      this.isLoading = true
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      formData.append('type', 'brand_logos')
      try {
        const res = await this.remoteImagesFileUpload(formData)
        this.data.default_brand_logo = res.url
        this.vToasted('success', `Your file is uploaded successfully.`)
      } catch (error) {
        let message = get(error, 'response.data.message', null)
        if (message) {
          this.vToasted('error', message)
        } else {
          console.log(error)
        }
      }
      this.isLoading = false
    },
    async handleUploadMapPricingPolicyDocument(e) {
      this.isLoading = true
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      formData.append('type', 'map_pricing_policy_document')
      try {
        const res = await this.remoteFileUpload(formData)
        // eslint-disable-next-line
        const { url, file_name } = res
        this.data.map_pricing_policy_document.url = url
        // eslint-disable-next-line
        this.data.map_pricing_policy_document.file_name = file_name
        this.vToasted('success', `Your file is uploaded successfully.`)
      } catch (error) {
        let message = get(error, 'response.data.message', null)
        if (message) {
          this.vToasted('error', message)
        } else {
          console.log(error)
        }
      }
      this.isLoading = false
    },
    removeLogo() {
      this.data.default_brand_logo = ''
    },
    removePolicyFile() {
      this.data.map_pricing_policy_document.url = ''
      this.data.map_pricing_policy_document.file_name = ''
      this.$refs.policyFileInput.reset()
    },
    downloadFile() {
      window.location.href = this.data.map_pricing_policy_document.url
    },
    formatNames(files) {
      const name = files[0].name
      return name.length > 20 ? `${name.substr(0, 15)}...` : name
    },
    async handleUpdateSetting() {
      this.isLoading = true
      try {
        /* eslint-disable */
        const { client_id } = this.$route.params
        await this.remoteUpdateSetting({ params: this.data, client_id })
        this.vToasted('success', `Settings have been updated successfully.`)
        this.policyUpdated = true
      } catch (error) {
        let message = get(error, 'response.data.message', null)
        if (message) {
          this.vToasted('error', message)
        } else {
          console.log(error)
        }
      }
      this.isLoading = false
    },
    async handleFetchAndReloadData() {
      this.isLoading = true
      try {
        /* eslint-disable */
        const { client_id } = this.$route.params
        const result = await this.remoteFetchSetting({ client_id })
        this.data.show_dashboard = result.show_dashboard
        this.data.si_listing_brand_name = result.si_listing_brand_name
        this.data.default_brand_logo = result.default_brand_logo
        this.data.map_pricing_policy_document.url = result.map_pricing_policy_document.url
        this.data.map_pricing_policy_document.file_name = result.map_pricing_policy_document.file_name
        // backup originData
        this.originData = JSON.parse(JSON.stringify(this.data))
      } catch (error) {
        let message = get(error, 'response.data.message', null)
        if (message) {
          this.vToasted('error', message)
        } else {
          console.log(error)
        }
      }
      this.isLoading = false
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: `mw/${TYPE.GET_PERMISSIONS}`,
      // defaultParams: `mw/reports/${TYPE.GET_DEFAULT_PARAMS}`,
      planConfig: `mw/${TYPE.GET_PLAN_CONFIG}`
    }),
    capitalize: function() {
      return (str) => str[0].toUpperCase() + str.slice(1)
    },
    // params: function() {
    //   return {...this.defaultParams} || {}
    // },
    newPolicyUploaded() {
      return (
        this.data.map_pricing_policy_document.url !==
        this.originData.map_pricing_policy_document.url
      )
    }
  },
  created() {
    this.handleFetchAndReloadData()
  }
}
</script>
<style lang="scss">
  input[type=file] {
    color: white;
  }

  .pointer {
    cursor: pointer;
  }
</style>
