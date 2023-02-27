<template>
  <div class="animated fadeIn">
    <b-card>
      <!-- header -->
      <template v-slot:header>
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <p class="mx-0 my-0"><strong>Add a new Report</strong></p>
            <div class="card-header-actions ml-2">
              <b-button
                size="sm"
                class="mr-1"
                variant="success"
                :disabled="check"
                @click="handlePasteRecord"
              >
                Paste
              </b-button>
              <b-button
                size="sm"
                class="ml-2"
                :disabled="!isCopySupport"
                variant="secondary"
                @click="handleCopyRecord"
              >
                Copy
              </b-button>
            </div>
          </div>
          <div class="card-header-actions">
            <div class="btn-close">
              <b-button
                variant="secondary"
                class="btn btn-block"
                size="sm"
                @click="backToListReport()"
              >
                <i class="icon-arrow-left-circle icons"></i> Back
              </b-button>
            </div>
          </div>
        </div>
      </template>
      <!-- body -->
      <b-form>
        <b-row>
          <b-col class="p-0">
            <b-col>
              <label>
                <b>Name In Dashboard</b>
              </label>
              <b-form-input
                type="text"
                @input="$v.dataSet.name_in_dashboard.$touch()"
                :class="{
                  'is-invalid':
                    $v.dataSet.name_in_dashboard.$dirty &&
                    $v.dataSet.name_in_dashboard.$error
                }"
                v-model.trim="dataSet.name_in_dashboard"
              ></b-form-input>
              <div
                class="mw-error"
                v-if="
                  !$v.dataSet.name_in_dashboard.required &&
                  $v.dataSet.name_in_dashboard.$dirty
                "
              >
                Name in Dashboard is required.
              </div>
            </b-col>
            <b-col class="mt-2">
              <b-form-checkbox
                v-model="dataSet.true_map_report"
                class="mb-2 basicText font-weight-bold"
                switch
                >True MAP report</b-form-checkbox
              >
              <p>
                Check this if this list is provided with TRUE MAP REPORT purpose
                (while the others may be just for RW purpose only).
              </p>
            </b-col>
          </b-col>
          <b-col class="p=0">
            <b-row>
              <b-col>
                <img
                  :src="dataSet.logo ? dataSet.logo : reportLogo"
                  class="my-1 img-thumbnail mx-auto d-block"
                  alt="Left image"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-file
                  class="mt-2"
                  ref="file-input"
                  @change="handleImagesFileUpload($event)"
                ></b-form-file>
                <b-button
                  size="sm"
                  class="mt-2 float-right"
                  variant="warning"
                  v-if="dataSet.logo"
                  @click="handleShowModal()"
                  >Remove</b-button
                >
              </b-col>
            </b-row>
          </b-col>
          <b-col>
            <b-row class="p-0">
              <b-col>
                <b-form-checkbox
                  v-model="dataSet.active"
                  class="mb-2 basicText font-weight-bold"
                  switch
                  >Active</b-form-checkbox
                >
              </b-col>
            </b-row>
            <b-row v-if="isShowPriority">
              <b-col>
                <label class="component-label m-0 mr-1 my-auto"
                  ><strong>Priority</strong></label
                >
                <b-form-select
                  class="custom-width"
                  v-model="dataSet.priority"
                  :options="priority_options"
                  >Priority</b-form-select
                >
              </b-col>
            </b-row>
            <b-row>
              <b-col class="mt-2">
                <label class="component-label m-0 mr-1 my-auto">
                  <strong class="h-100">Order</strong>
                </label>
                <b-form-input
                  class="custom-width d-inline-block"
                  type="number"
                  @input="$v.dataSet.order.$touch()"
                  :class="{
                    'is-invalid':
                      $v.dataSet.order.$dirty && $v.dataSet.order.$error
                  }"
                  v-model="dataSet.order"
                ></b-form-input>
                <div
                  class="mw-error"
                  v-if="!$v.dataSet.order.required && $v.dataSet.order.$dirty"
                >
                  Order is required.
                </div>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-form>
      <label class="mt-4"><strong>Marketplaces</strong></label>
      <MWReportMarketplacePicker
        class="mt-2"
        ref="marketplaceBuilder"
        @marketplaceChange="handleMarketplaceChange($event)"
        :reportDoc="dataSet"
        :isValidMarketplace="$v.dataSet.marketplaces.required || $v.dataSet.marketplaces.$dirty"
      ></MWReportMarketplacePicker>
      <b-row>
        <b-col>
          <b-form-checkbox
            v-model="dataSet.separate_mfn_fba_authorized_seller"
            class="mb-2 basicText font-weight-bold"
            switch
            >Separate MFN and FBA Authorized Sellers</b-form-checkbox
          >
        </b-col>
      </b-row>
      <b-row v-show="dataSet.separate_mfn_fba_authorized_seller">
        <b-col>
          <label for="#">
            <strong>FBA Authorized Sellers</strong>
          </label>
          <vue-tags-input
            v-model="fbaInutTags.tag"
            :tags="fbaInutTags.tags"
            @tags-changed="(newTags) => (fbaInutTags.tags = newTags)"
            class="mw-vue-tags-custom input-keyword un-rounded-bottom-border"
          />
          <b-form-textarea
            id="textarea"
            v-model="fbaInutTags.textarea"
            placeholder="Enter names."
            rows="3"
            max-rows="6"
            class="tag-input textarea"
            @keyup.enter.native="handleFbaAuthorizedSellers()"
          ></b-form-textarea>
        </b-col>
        <b-col>
          <label for="#">
            <strong>MFN Authorized Sellers</strong>
          </label>
          <vue-tags-input
            v-model="mfnInutTags.tag"
            :tags="mfnInutTags.tags"
            @tags-changed="(newTags) => (mfnInutTags.tags = newTags)"
            class="mw-vue-tags-custom input-keyword"
          />
          <b-form-textarea
            id="textarea-1"
            v-model="mfnInutTags.textarea"
            placeholder="Enter names."
            rows="3"
            max-rows="6"
            class="tag-input textarea"
            @keyup.enter.native="handleMfnAuthorizedSellers()"
          ></b-form-textarea>
        </b-col>
      </b-row>
      <b-row v-show="!dataSet.separate_mfn_fba_authorized_seller">
        <b-col>
          <b-form-group>
            <label for="#">
              <strong>Authorized Sellers</strong>
            </label>
            <vue-tags-input
              v-model="inutTags.tag"
              :tags="inutTags.tags"
              @tags-changed="(newTags) => (inutTags.tags = newTags)"
              class="mw-vue-tags-custom input-keyword d-flex"
            />
            <b-form-textarea
              id="textarea-2"
              v-model="inutTags.textarea"
              placeholder="Enter names."
              rows="3"
              max-rows="6"
              class="textarea-keyword textarea"
              @keyup.enter.native="handleEnterTextarea()"
            ></b-form-textarea>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col
          class="d-flex justify-content-between col-md-6 col-lg-6 col-sm-12"
        >
          <div class="column-1">
            <b-form-checkbox
              v-model="dataSet.ignore_screenshot"
              class="mb-2 basicText font-weight-bold"
              switch
              >Ignore Screenshot</b-form-checkbox
            >
            <b-form-checkbox
              v-model="dataSet.ignore_price_tracking"
              class="mb-2 basicText font-weight-bold"
              switch
              >Ignore price tracking</b-form-checkbox
            >
            <b-form-checkbox
              v-model="dataSet.watch_for_used_items"
              class="mb-2 basicText font-weight-bold"
              switch
              >Watch for used items</b-form-checkbox
            >
          </div>
          <div class="column-1">
            <b-form-checkbox
              v-model="dataSet.show_upc_in_dashboard"
              class="mb-2 basicText font-weight-bold"
              switch
              >Show UPC/EAN in dashboard</b-form-checkbox
            >
            <b-form-checkbox
              v-model="dataSet.fulfillment"
              class="mb-2 basicText font-weight-bold"
              switch
              >Fulfillment filter in dashboard</b-form-checkbox
            >
          </div>
        </b-col>
      </b-row>
      <!-- footer -->
      <template v-slot:footer>
        <div class="d-flex justify-content-between align-items-center">
          <div class="footer__btns">
            <b-button
              size="sm"
              class="mr-1"
              variant="primary"
              @click="handleSave"
            >
              <i class="fa fa-dot-circle-o"></i> Submit
            </b-button>
            <b-button size="sm" class="ml-2" @click="backToListReport()">
              <i class="icon-arrow-left-circle"></i> Cancel
            </b-button>
          </div>
        </div>
      </template>
    </b-card>
    <b-modal
      title="Please confirm"
      centered
      v-model="dialog.run"
      @ok="handleRemoveLogo()"
    >
      Are you sure you want to remove the logo?
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button size="md" variant="warning" @click="ok()">
          <i class="icon-check icons"></i> Yes
        </b-button>
        <b-button size="md" variant="secondary" @click="cancel()">
          <i class="icon-close icons"></i> No
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
import { ClipboardUtil } from 'plat-sdk/dist/clipboard'

import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import * as TYPE from '@/actionTypes.js'
import { required } from 'vuelidate/lib/validators'
import vToasted from '@/shared/notification'
import reportLogo from '@/assets/img/report-demo.jpg'
import VueTagsInput from '@johmun/vue-tags-input'
import MWReportMarketplacePicker from './ReportMarketplacePicker'
import { FormType } from '@/constants/Form.js'

import _nav from '@/_nav'
import { MarketPlacesResult } from '@/constants/Report'

export default {
  data() {
    return {
      MarketPlacesResult,
      reportLogo,
      priority_options: [
        { value: 10, text: 'High' },
        { value: 5, text: 'Normal' }
      ],
      dialog: {
        remove: false,
        run: false,
        cancel: false
      },
      dataSet: {
        logo: null,
        separate_mfn_fba_authorized_seller: false,
        true_map_report: false,
        name_in_dashboard: '',
        marketplaces: null,
        active: false,
        show_upc_in_dashboard: false,
        ignore_screenshot: true,
        order: 1,
        priority: 5,
        fulfillment: false,
        ignore_price_tracking: false,
        watch_for_used_items: false,
        list_authorized_seller_names: [],
        fba_authorized_seller_names: [],
        mfn_authorized_seller_names: []
      },
      inutTags: {
        tag: '',
        tags: [],
        textarea: ''
      },
      fbaInutTags: {
        tag: '',
        tags: [],
        textarea: ''
      },
      mfnInutTags: {
        tag: '',
        tags: [],
        textarea: ''
      },
      nav: _nav,
      check: true
    }
  },
  mixins: [vToasted],
  methods: {
    ...mapActions({
      remotePostReport: `mw/reports/${TYPE.REMOTE_POST_REPORT}`,
      remoteImagesFileUpload: `mw/images/${TYPE.REMOTE_UPLOAD_IMAGES}`
    }),
    handleShowModal() {
      if (this.dataSet.logo) {
        this.dialog.run = true
      }
    },
    handleRemoveLogo() {
      this.dataSet.logo = null
    },
    handleMarketplaceChange(data) {
      const { parsedData, marketplaces } = data
      _.assign(this.dataSet, parsedData)
      this.dataSet.marketplaces = marketplaces
    },
    async handleSave() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.dataSet.list_authorized_seller_names = this.inutTags.tags.map(
        (e) => e.text
      )
      this.dataSet.fba_authorized_seller_names = this.fbaInutTags.tags.map(
        (e) => e.text
      )
      this.dataSet.mfn_authorized_seller_names = this.mfnInutTags.tags.map(
        (e) => e.text
      )
      this.$v.$touch()
      if (this.$v.$error) {
        console.log('error')
        return
      }
      try {
        await this.remotePostReport(this.dataSet)
        this.$router.push({
          name: 'MWListReports',
          params: { client_id: this.nav.clientId }
        })
        this.vToasted('success', 'A new report has been created successfully.')
      } catch (error) {
        console.log(error)
        this.vToasted('error', error.data.message)
      }
    },
    async handleImagesFileUpload(e) {
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      formData.append('type', 'brand_logos')
      try {
        const res = await this.remoteImagesFileUpload(formData)
        this.dataSet = {
          ...this.dataSet,
          logo: res.url
        }
      } catch (error) {
        let message = _.get(error, 'response.data.message', null)
        if (message) {
          this.vToasted('error', message)
        } else {
          console.log(error)
        }
      }
    },
    handleEnterTextarea() {
      const { tags, textarea } = this.inutTags
      const cutArray = [...`${textarea}`.split('\n')]
      this.inutTags.tags = [
        ...tags,
        ...cutArray.reduce((acc, cur) => {
          if (
            cur &&
            !_.find(acc, (o) => o.text === cur) &&
            !_.find(tags, (o) => o.text === cur)
          ) {
            acc = [...acc, { text: cur.trim() }]
          }
          return acc
        }, [])
      ]
      this.inutTags.textarea = ''
    },
    handleMfnAuthorizedSellers() {
      const { tags, textarea } = this.mfnInutTags
      const cutArray = [...`${textarea}`.split('\n')]
      this.mfnInutTags.tags = [
        ...tags,
        ...cutArray.reduce((acc, cur) => {
          if (
            cur &&
            !_.find(acc, (o) => o.text === cur) &&
            !_.find(tags, (o) => o.text === cur)
          ) {
            acc = [...acc, { text: cur.trim() }]
          }
          return acc
        }, [])
      ]
      this.mfnInutTags.textarea = ''
    },
    handleFbaAuthorizedSellers() {
      const { tags, textarea } = this.fbaInutTags
      const cutArray = [...`${textarea}`.split('\n')]
      this.fbaInutTags.tags = [
        ...tags,
        ...cutArray.reduce((acc, cur) => {
          if (
            cur &&
            !_.find(acc, (o) => o.text === cur) &&
            !_.find(tags, (o) => o.text === cur)
          ) {
            acc = [...acc, { text: cur.trim() }]
          }
          return acc
        }, [])
      ]
      this.fbaInutTags.textarea = ''
    },
    backToListReport() {
      this.$router.push({
        name: 'MWListReports',
        params: { client_id: this.nav.clientId }
      })
    },

    handleCopyRecord() {
      ClipboardUtil.copy(
        _.assignIn(
          _.cloneDeep(this.dataSet),
          { inutTags: this.inutTags },
          { fbaInutTags: this.fbaInutTags },
          { mfnInutTags: this.mfnInutTags }
        ),
        FormType.REPORTS
      )
      this.vToasted('success', 'Copied to clipboard.')
      this.checkKey()
    },

    async handlePasteRecord() {
      try {
        const pasteData = await ClipboardUtil.paste(
          _.cloneDeep(this.dataSet),
          FormType.REPORTS
        )

        if (!pasteData) {
          this.vToasted('error', 'You need to enable copy to clipboard')
          return
        }

        // set tags
        this.inutTags = pasteData.inutTags
        this.fbaInutTags = pasteData.fbaInutTags
        this.mfnInutTags = pasteData.mfnInutTags

        // remove redundant key after paste
        this.dataSet = _.omit(pasteData, [
          'client_id',
          'created',
          'deleted',
          'id',
          'updated',
          'inutTags',
          'fbaInutTags',
          'mfnInutTags',
          'isEdit',
          'ready_for_amazon_scraping',
          'ready_for_google_scraping'
        ])
        this.vToasted('success', 'Paste successfully')
      } catch (e) {
        this.vToasted('error', 'You copy is not valid')
      }
    },

    async checkKey() {
      const result = await ClipboardUtil.check(FormType.REPORTS)
      this.check = !result
    }
  },
  computed: {
    isCopySupport() {
      return ClipboardUtil.isCopySupported()
    },
    ...mapGetters({
      orgIs: `mw/${TYPE.GET_ORG_IS}`
    }),
    isShowPriority() {
      return this.orgIs
    }
  },
  created() {
    // console.log(this.$route)
    this.checkKey()
    window.addEventListener('focus', this.checkKey)
  },
  destroyed() {
    window.removeEventListener('focus', this.checkKey)
  },
  validations: {
    dataSet: {
      // logo: {
      //   required,
      //   url
      // },
      marketplaces: {
        required
      },
      name_in_dashboard: {
        required
      },
      order: {
        required
      }
    }
  },
  components: {
    VueTagsInput,
    MWReportMarketplacePicker
  }
}
</script>
<style lang="scss" scoped>
::v-deep .card-header-actions {
  margin-right: 0;
}
::v-deep .form-control:focus {
  box-shadow: none;
  border-color: #e4e7ea;
}
::v-deep .tag-input {
  border-top: 0px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.textarea {
  overflow-y: auto !important;
}
::v-deep .mw-vue-tags-custom .ti-input {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
  height: auto !important;
}
.component-label {
  min-width: 55px;
}
.custom-datepicker-control {
  &::v-deep {
    button.btn {
      width: 83px;
    }
    .vdp-datepicker {
      width: calc(100% - 83px);
      margin-right: 0 !important;
    }
  }
}
.custom-width {
  width: 100%;
  max-width: 70%;
}
</style>
