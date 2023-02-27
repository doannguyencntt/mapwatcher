<template>
  <div class="animated fadeIn">
    <b-card>
      <!-- header -->
      <template v-slot:header>
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <p class="mx-0 my-0">
              <strong>{{ $route.meta.tableName }}</strong>
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
                @click="backToListSeller()"
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
          <b-col>
            <label>
              <b>Sender Email</b>
            </label>
            <b-form-input
              type="text"
              @blur="$v.dataSet.sender_email.$touch()"
              :class="{
                'is-invalid':
                  $v.dataSet.sender_email.$dirty &&
                  $v.dataSet.sender_email.$error
              }"
              v-model.trim="dataSet.sender_email"
            ></b-form-input>
            <div
              class="mw-error"
              v-if="
                $v.dataSet.sender_email.$invalid &&
                $v.dataSet.sender_email.$dirty
              "
            >
              Sender Email is invalid.
            </div>
          </b-col>
          <b-col>
            <label>
              <b>Sender Name</b>
            </label>
            <b-form-input
              type="text"
              @input="$v.dataSet.sender_name.$touch()"
              :class="{
                'is-invalid':
                  $v.dataSet.sender_name.$dirty && $v.dataSet.sender_name.$error
              }"
              v-model.trim="dataSet.sender_name"
              class="custom-width"
            ></b-form-input>
            <!-- <div class="mw-error" v-if="!$v.dataSet.sender_name.required && $v.dataSet.sender_name.$dirty">Sender Name is required.</div> -->
          </b-col>
        </b-row>
        <b-row class="sender-message">
          <b-col>
            <p class="mw-error">
              You can setup these fields later but they are required to delivery
              seller enforcement email.
            </p>
            <p class="mw-error">
              Please check with administrator to make sure your sender is
              whitelisted.
            </p>
          </b-col>
        </b-row>
        <b-row class="mt-3">
          <b-col>
            <label>
              <b>Seller Name</b>
            </label>
            <b-form-input
              type="text"
              @input="$v.dataSet.name.$touch()"
              :class="{
                'is-invalid': $v.dataSet.name.$dirty && $v.dataSet.name.$error
              }"
              v-model.trim="dataSet.name"
            ></b-form-input>
            <div
              class="mw-error"
              v-if="!$v.dataSet.name.required && $v.dataSet.name.$dirty"
            >
              Seller Name is required.
            </div>
          </b-col>
          <b-col>
            <label>
              <b>Frequency</b>
            </label>
            <br />
            <b-form-select
              class="custom-width"
              v-model="dataSet.frequency"
              :options="frequency_options"
              >Frequency</b-form-select
            >
          </b-col>
        </b-row>
      </b-form>
      <!-- footer -->
      <template v-slot:footer>
        <div class="d-flex justify-content-between align-items-center">
          <div class="footer__btns">
            <b-button
              v-if="
                getPermissions.module_enabled &&
                getPermissions.permissions.seedit
              "
              size="sm"
              class="mr-1"
              variant="primary"
              @click="handleSave"
            >
              <i class="fa fa-dot-circle-o"></i> Submit
            </b-button>
            <b-button size="sm" class="ml-2" @click="backToListSeller()">
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
import { mapActions, mapGetters } from 'vuex'
import * as TYPE from '@/actionTypes.js'
import { required, email } from 'vuelidate/lib/validators'
import vToasted from '@/shared/notification'
import { SellerEnforcementFrequencyType } from '@/constants/SellerEnforcement'
import { FormType } from '@/constants/Form.js'

import _nav from '@/_nav'

export default {
  name: 'MWEditSellerEnforcements',
  data() {
    return {
      sellerEnforcementFrequencyType: _.cloneDeep(
        SellerEnforcementFrequencyType
      ),
      frequency_options: [
        {
          value: SellerEnforcementFrequencyType.MANUAL,
          text: _.upperFirst(SellerEnforcementFrequencyType.MANUAL)
        },
        {
          value: SellerEnforcementFrequencyType.DAILY,
          text: _.upperFirst(SellerEnforcementFrequencyType.DAILY)
        }
      ],
      dataSet: {
        sender_email: '',
        sender_name: '',
        name: '',
        frequency: SellerEnforcementFrequencyType.MANUAL
      },
      nav: _nav,
      sellerId: '',
      oldSellerName: '',
      check: true
    }
  },
  mixins: [vToasted],
  methods: {
    ...mapActions({
      remoteEditSeller: `mw/sellerEnforcements/${TYPE.REMOTE_EDIT_SELLER_ENFORCEMENT}`
    }),
    async handleSave() {
      this.$v.$touch()
      if (this.$v.$error) {
        console.log(this.$v.dataSet)
        return
      }
      try {
        const id = this.sellerId
        const name = this.oldSellerName
        await this.remoteEditSeller({ params: this.dataSet, id })
        this.vToasted(
          'success',
          `Seller ${name} has been updated successfully.`
        )
      } catch (error) {
        this.vToasted('error', error.data.message)
      }
    },
    backToListSeller() {
      this.$router.push({
        name: 'MWListSellerEnforcements',
        params: { client_id: this.nav.clientId }
      })
    },

    handleCopyRecord() {
      ClipboardUtil.copy(_.cloneDeep(this.dataSet), FormType.SELLER)
      this.vToasted('success', 'Copied to clipboard.')
      this.checkKey()
    },

    async handlePasteRecord() {
      try {
        const pasteData = await ClipboardUtil.paste(
          _.cloneDeep(this.dataSet),
          FormType.SELLER
        )

        if (!pasteData) {
          this.vToasted('error', 'You need to enable copy to clipboard')
          return
        }

        this.dataSet = {
          ...pasteData
        }

        this.vToasted('success', 'Paste successfully')
      } catch (e) {
        this.vToasted('error', 'Your copy is not valid')
      }
    },
    async checkKey() {
      const result = await ClipboardUtil.check(FormType.SELLER)

      this.check = !result
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: `mw/${TYPE.GET_PERMISSIONS}`
    }),
    isSupport() {
      return ClipboardUtil.isCopySupported()
    }
  },
  async created() {
    this.checkKey()
    if (!this.$route.query.seller) {
      this.backToListSeller()
      return
    }
    const {
      id,
      sender_email: senderEmail,
      sender_name: senderName,
      name,
      frequency
    } = this.$route.query.seller
    if (!id || !name || !frequency) {
      this.backToListSeller()
      return
    }
    this.dataSet.sender_email = senderEmail
    this.dataSet.sender_name = senderName
    this.dataSet.name = name
    this.dataSet.frequency = frequency
    this.sellerId = id
    this.oldSellerName = name

    window.addEventListener('focus', this.checkKey)
  },
  destroyed() {
    window.removeEventListener('focus', this.checkKey)
  },
  validations: {
    dataSet: {
      sender_email: {
        email
      },
      sender_name: {},
      name: {
        required
      }
    }
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
.sender-message {
  margin-top: 5px;
  p {
    margin-bottom: 0;
  }
}
</style>
