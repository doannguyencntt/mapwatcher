<template>
  <div class="animated fadeIn" v-if="dataSet">
    <b-card>
      <!-- header -->
      <template v-slot:header>
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items center">
            <p class="mx-0 my-0">
              <strong>Edit "{{ dataSet.name_in_dashboard }}" Report</strong>
            </p>
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
        <div class="header-container">
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
                  Check this if this list is provided with TRUE MAP REPORT
                  purpose (while the others may be just for RW purpose only).
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
        </div>
      </b-form>
      <label class="mt-4"><strong>Marketplaces</strong></label>
      <MWReportMarketplacePicker
        class="mt-2"
        ref="marketplaceBuilder"
        :key="reloadTime"
        :reportDoc="dataSet"
        @marketplaceChange="handleMarketplaceChange($event)"
        :isValidMarketplace="$v.dataSet.marketplaces.valid || $v.dataSet.marketplaces.$dirty"
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
            id="textarea-1"
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
            id="textarea-2"
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
              class="mw-vue-tags-custom input-keyword"
            />
            <b-form-textarea
              id="textarea-3"
              v-model="inutTags.textarea"
              placeholder="Enter names."
              rows="3"
              max-rows="6"
              class="textarea-keyword textarea"
              @keyup.enter.native="handleEnterTextarea()"
            />
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
          <div class="column-2">
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
      </b-row>
      <!-- footer -->
      <template v-slot:footer>
        <div class="d-flex justify-content-between align-items-center">
          <div class="footer__btns">
            <b-button
              class="mr-1"
              variant="primary"
              size="sm"
              @click="handleEditReport"
            >
              <i class="fa fa-dot-circle-o"></i> Update
            </b-button>
            <b-button size="sm" class="ml-2" @click="backToListReport()">
              <i class="icon-arrow-left-circle"></i> Cancel
            </b-button>
          </div>
        </div>
      </template>
    </b-card>
  </div>
</template>
<script>
import { ClipboardUtil } from 'plat-sdk/dist/clipboard'

import _ from 'lodash'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import * as TYPE from '@/actionTypes.js'
import { required } from 'vuelidate/lib/validators'
import vToasted from '@/shared/notification'
import reportLogo from '@/assets/img/report-demo.jpg'
import VueTagsInput from '@johmun/vue-tags-input'
import _nav from '@/_nav'
import { MarketPlacesResult } from '@/constants/Report'
import MWReportMarketplacePicker from './ReportMarketplacePicker'
import { FormType } from '@/constants/Form.js'

export default {
  name: 'MWEditReports',
  data() {
    return {
      reloadTime: 0,
      MarketPlacesResult,
      reportLogo,
      priority_options: [
        { value: 10, text: 'High' },
        { value: 5, text: 'Normal' }
      ],
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
      dialog: {
        remove: false,
        run: false,
        cancel: false
      },
      check: true
    }
  },
  mixins: [vToasted],
  computed: {
    ...mapGetters({
      dataSet: `mw/reports/${TYPE.GET_ONE_REPORT}`,
      fetchListReports: `mw/reports/${TYPE.GET_LIST_REPORTS}`,
      orgIs: `mw/${TYPE.GET_ORG_IS}`
    }),
    isCopySupport() {
      return ClipboardUtil.isCopySupported()
    },
    isValidMarketplaces() {
      return this.dataSet.marketplaces ? Object.values(this.dataSet.marketplaces).includes(true) : false
    },
    isShowPriority() {
      return this.orgIs
    }
  },
  methods: {
    ...mapActions({
      remoteEditReport: `mw/reports/${TYPE.REMOTE_EDIT_REPORT}`,
      remoteImagesFileUpload: `mw/images/${TYPE.REMOTE_UPLOAD_IMAGES}`,
      fetchReport: `mw/reports/${TYPE.FETCH_ONE_REPORT}`,
      fetchReports: `mw/reports/${TYPE.FETCH_LIST_REPORTS}`
    }),
    ...mapMutations({
      setReport: `mw/reports/${TYPE.SET_ONE_REPORT}`,
      dataReset: `mw/reports/${TYPE.SET_ONE_REPORT}`
    }),
    handleMarketplaceChange(data) {
      const { parsedData, marketplaces } = data
      this.resetMarketplaceInfo()
      _.assignIn(this.dataSet, parsedData)
      this.dataSet.marketplaces = marketplaces
    },
    async handleEditReport() {
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
      if (!this.orgIs) {
        this.dataSet.priority = 5
      }
      try {
        const { id } = this.$route.params
        await this.remoteEditReport({ params: this.dataSet, id })
        this.$router.push({
          name: 'MWListReports',
          params: { client_id: this.nav.clientId }
        })
        this.vToasted(
          'success',
          `Report ${this.dataSet.name_in_dashboard} has been updated successfully.`
        )
      } catch (error) {
        this.vToasted('error', error.data.message)
      }
    },
    handleShowModal() {
      if (this.dataSet.logo) {
        this.dialog.run = true
      }
    },
    handleRemoveLogo() {
      this.dataSet.logo = ''
    },
    async handleImagesFileUpload(e) {
      let formData = new FormData()
      formData.append('file', e.target.files[0])
      formData.append('type', 'brand_logos')
      try {
        const res = await this.remoteImagesFileUpload(formData)
        let dataSet = {
          ...this.dataSet,
          logo: res.url
        }
        this.$store.commit(`mw/reports/${TYPE.SET_ONE_REPORT}`, dataSet)
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
    async handleFetchAndReloadData() {
      try {
        const {
          params: { id }
        } = this.$route
        let data = this.fetchListReports.items.filter(
          (report) => report._id === id
        )[0]
        if (_.isEmpty(data)) {
          await this.fetchReport(id)
          this.reloadTime++
        } else {
          this.$store.commit(`mw/reports/${TYPE.SET_ONE_REPORT}`, data)
        }
        this.inutTags.tags = this.dataSet.list_authorized_seller_names.map(
          (e) => ({
            text: e,
            tiClasses: ['ti-valid']
          })
        )
        if (this.dataSet.fba_authorized_seller_names) {
          this.fbaInutTags.tags = this.dataSet.fba_authorized_seller_names.map(
            (e) => ({
              text: e,
              tiClasses: ['ti-valid']
            })
          )
        }
        if (this.dataSet.mfn_authorized_seller_names) {
          this.mfnInutTags.tags = this.dataSet.mfn_authorized_seller_names.map(
            (e) => ({
              text: e,
              tiClasses: ['ti-valid']
            })
          )
        }
        if (!this.dataSet.priority) {
          this.dataSet.priority = 5
        }
      } catch (error) {
        this.vToasted('error', error.message)
      }
    },
    backToListReport() {
      this.dataReset({})
      this.$router.push({
        name: 'MWListReports',
        params: { client_id: this.nav.clientId }
      })
    },
    getMarketplaceField(marketplace) {
      return `marketplace_${marketplace.replace(/[.]/g, '_')}`
    },
    resetMarketplaceInfo() {
      const marketplaces = _.values(MarketPlacesResult)
      _.forEach(marketplaces, (marketplace) => {
        const field = this.getMarketplaceField(marketplace)
        this.dataSet[field] = null
      })
    },
    handleCopyRecord() {
      ClipboardUtil.copy(
        _.assignIn(
          _.cloneDeep(this.dataSet),
          { inutTags: this.inutTags },
          { fbaInutTags: this.fbaInutTags },
          { mfnInutTags: this.mfnInutTags },
          { isEdit: true }
        ),
        FormType.REPORTS
      )
      this.checkKey()
      this.vToasted('success', 'Copied to clipboard.')
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

        // validate if copy from another report EDIT
        const defaultKey = {
          client_id: this.dataSet.client_id,
          created: this.dataSet.created,
          deleted: this.dataSet.deleted,
          id: this.dataSet.id
        }

        // set tags
        this.inutTags = pasteData.inutTags
        this.fbaInutTags = pasteData.fbaInutTags
        this.mfnInutTags = pasteData.mfnInutTags

        if (pasteData.isEdit) {
          // store default auto generate field in default key
          this.setReport(
            _.omit(_.defaults(defaultKey, pasteData), [
              'inutTags',
              'fbaInutTags',
              'mfnInutTags',
              'isEdit'
            ])
          )
        }

        this.setReport(
          _.omit({ ...defaultKey, ...pasteData }, [
            'inutTags',
            'fbaInutTags',
            'mfnInutTags',
            'isEdit'
          ])
        )
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
  created() {
    this.handleFetchAndReloadData()
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
        valid: function() {
          return this.isValidMarketplaces
        }
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
#btnDate {
  &::v-deep {
    max-width: 40px;
  }
}
.optimize-dp {
  &::v-deep {
    .input-group {
      .form-control {
        /*border-radius: 0px 0.25rem 0.25rem 0px;*/
        border-left: none;
      }
    }
  }
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
::v-deep .textarea {
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
