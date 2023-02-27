<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6" lg="6" sm="12">
        <b-card footer-tag="footer">
          <template v-slot:header>
            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex align-items-center">
                <p class="mx-0 my-0"><strong>EDIT MAP</strong></p>
                <div class="card-header-actions ml-2">
                  <b-button
                    size="sm"
                    class="mr-1"
                    :disabled="check"
                    variant="success"
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
                    @click="backToListMaps()"
                  >
                    <i class="icon-arrow-left-circle icons"></i> Back
                  </b-button>
                </div>
              </div>
            </div>
          </template>
          <b-form>
            <b-form-group>
              <label>
                <b>Report</b>
              </label>
              <b-form-select
                v-model="mapData.report_id"
                :options="reportOptions"
              >
                <template v-slot:first>
                  <option :value="null" disabled>All Reports</option>
                </template>
              </b-form-select>
            </b-form-group>
            <b-form-group>
              <label>
                <b>Brand Name</b>
              </label>
              <b-form-input
                type="text"
                v-model.trim="mapData.brand_name"
              />
            </b-form-group>
            <b-form-group>
              <label>
                <b>SKU</b>
              </label>
              <b-form-input
                type="text"
                @input="$v.mapData.sku.$touch()"
                :class="{
                  'is-invalid': $v.mapData.sku.$dirty && $v.mapData.sku.$error
                }"
                v-model.trim="mapData.sku"
              ></b-form-input>
              <div
                class="mw-error invalid-feedback"
                v-if="!$v.mapData.sku.required && $v.mapData.sku.$dirty"
              >
                SKU is required.
              </div>
            </b-form-group>
            <b-form-group>
              <label>
                <b>ASIN</b>
              </label>
              <b-form-input
                type="text"
                @input="$v.mapData.asin.$touch()"
                :class="{
                  'is-invalid':
                    asinNotEmpty() &&
                    $v.mapData.asin.$dirty &&
                    $v.mapData.asin.$error
                }"
                v-model.trim="mapData.asin"
              ></b-form-input>
              <div
                class="mw-error invalid-feedback"
                v-if="
                  asinNotEmpty() &&
                  !$v.mapData.asin.isAsinAndNotEmpty &&
                  $v.mapData.asin.$dirty
                "
              >
                ASIN is invalid.
              </div>
            </b-form-group>
            <b-form-group>
              <label>
                <b>Amazon Title</b>
              </label>
              <b-form-input
                type="text"
                v-model.trim="mapData.amazon_title"
              />
            </b-form-group>
            <b-form-group>
              <label>
                <b>UPC/EAN</b>
              </label>
              <b-form-input
                type="text"
                @input="$v.mapData.upc.$touch()"
                :class="{
                  'is-invalid':
                    $v.mapData.upc.$dirty && !$v.mapData.upc.isUpcOrEan
                }"
                v-model.trim="mapData.upc"
              ></b-form-input>
              <div
                class="mw-error invalid-feedback"
                v-if="!$v.mapData.upc.isUpcOrEan && $v.mapData.upc.$dirty"
              >
                UPC/EAN is invalid.
              </div>
            </b-form-group>
            <b-form-group>
              <label>
                <b>Price</b>
              </label>
              <b-form-input
                type="number"
                @input="$v.mapData.price.$touch()"
                :class="{
                  'is-invalid':
                    $v.mapData.price.$dirty && $v.mapData.price.$error
                }"
                v-model.trim="mapData.price"
              ></b-form-input>
              <div
                class="mw-error invalid-feedback"
                v-if="!$v.mapData.price.required && $v.mapData.price.$dirty"
              >
                Price is required.
              </div>
            </b-form-group>
            <b-form-group>
              <label>
                <b>GPID</b>
              </label>
              <b-form-input
                type="text"
                v-model.trim="mapData.gpid"
              ></b-form-input>
            </b-form-group>
            <b-form-group>
              <label>
                <b>Size</b>
              </label>
              <b-form-input
                type="text"
                v-model.trim="mapData.size"
              />
            </b-form-group>
            <b-form-group>
              <label>
                <b>Color</b>
              </label>
              <b-form-input
                type="text"
                v-model.trim="mapData.color"
              />
            </b-form-group>
            <b-form-group>
              <label>
                <b>Department</b>
              </label>
              <b-form-input
                type="text"
                v-model.trim="mapData.department"
              />
            </b-form-group>
          </b-form>
          <template v-slot:footer>
            <div class="d-flex justify-content-between">
              <div class="footer__btns">
                <b-button
                  class="mr-1"
                  variant="primary"
                  size="sm"
                  @click="handleEditMap"
                  :disabled="isLoading"
                >
                  <i class="fa fa-dot-circle-o"></i> Update
                </b-button>
                <b-button size="sm" class="ml-2" @click="backToListMaps()">
                  <i class="icon-arrow-left-circle"></i> Cancel
                </b-button>
              </div>
            </div>
          </template>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { ClipboardUtil } from 'plat-sdk/dist/clipboard'
import * as TYPE from '@/actionTypes.js'
import { required } from 'vuelidate/lib/validators'
import vToasted from '@/shared/notification'
import { isUpcOrEan, isAsinAndNotEmpty } from '@/shared/utils'
import _nav from '@/_nav'
import _ from 'lodash'
import { FormType } from '@/constants/Form.js'

export default {
  name: 'MWEditGSMaps',
  data() {
    return {
      nav: _nav,
      check: true,
      isLoading: false
    }
  },
  mixins: [vToasted],
  computed: {
    ...mapGetters({
      mapData: `mw/maps/${TYPE.GET_ONE_GS_MAP}`,
      defaultParams: `mw/maps/${TYPE.GET_DEFAULT_PARAMS}`,
      listGSReports: `mw/reports/${TYPE.GET_GS_LIST_REPORTS}`
    }),
    isCopySupport() {
      return ClipboardUtil.isCopySupported()
    },
    reportOptions() {
      return this.listGSReports.map((item) => ({
        value: item._id,
        text: item.name_in_dashboard
      }))
    }
  },
  methods: {
    ...mapMutations({
      setMapData: `mw/maps/${TYPE.SET_ONE_GS_MAP}`
    }),
    ...mapActions({
      fetchMap: `mw/maps/${TYPE.FETCH_ONE_GS_MAP}`,
      updateMap: `mw/maps/${TYPE.UPDATE_GS_MAP}`,
      fetchListReports: `mw/reports/${TYPE.FETCH_IMPORT_REPORTS}`
    }),
    backToListMaps() {
      this.$router.push({
        name: 'MWGSListMaps',
        params: { client_id: this.nav.clientId },
        query: { ...this.$router.history.current.query }
      })
    },
    async getMapById() {
      this.isLoading = true
      const {
        params: { id }
      } = this.$route
      try {
        await this.fetchMap(id)
      } catch (error) {
        this.vToasted('error', error.message)
      }
      this.isLoading = false
    },
    asinNotEmpty() {
      if (!this.mapData || !this.mapData.asin) {
        return false
      }
      return this.mapData.asin.length > 0
    },
    async handleEditMap() {
      this.$v.$touch()
      if (this.$v.$error) {
        console.log('error')
        return
      }
      this.isLoading = true
      try {
        const { id } = this.$route.params
        await this.updateMap({ id, data: this.mapData })
        this.vToasted('success', 'This MAP has been updated successfully.')
      } catch (error) {
        this.vToasted('error', error.data.message)
      }
      this.isLoading = false
    },

    handleCopyRecord() {
      ClipboardUtil.copy(_.cloneDeep(this.mapData), FormType.MAP_GS)
      this.vToasted('success', 'Copied to clipboard.')
      this.checkKey()
    },

    async handlePasteRecord() {
      try {
        const pasteData = await ClipboardUtil.paste(
          _.cloneDeep(this.mapData),
          FormType.MAP_GS
        )
        if (!pasteData) {
          this.vToasted('error', 'You need to enable copy to clipboard')
          return
        }
        this.setMapData(pasteData)
        this.vToasted('success', 'Paste successfully')
      } catch (e) {
        this.vToasted('error', 'You copy is not valid')
      }
    },

    async checkKey() {
      const result = await ClipboardUtil.check(FormType.MAP_GS)

      this.check = !result
    }
  },

  created() {
    this.getMapById()
    this.checkKey()
    window.addEventListener('focus', this.checkKey)
    this.fetchListReports()
  },

  destroyed() {
    window.removeEventListener('focus', this.checkKey)
  },

  validations: {
    mapData: {
      upc: {
        isUpcOrEan: isUpcOrEan
      },
      asin: {
        isAsinAndNotEmpty
      },
      sku: {
        required
      },
      price: {
        required
      }
    }
  }
}
</script>
