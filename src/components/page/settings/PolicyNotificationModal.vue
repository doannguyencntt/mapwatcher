<template>
  <b-modal
    :id="id"
    title="Please confirm"
    centered
    @ok="handleSendUpdatedPolicyMail()"
    ok-variant="danger"
    scrollable
  >
    Are you sure you want to let all the contacts know about the policy change?
    <div
      v-if="internalSellerData && Object.keys(internalSellerData).length"
      class="seller-list mt-3 mb-0"
    >
      <b-card no-body class="mb-2">
        <b-card-header>
          <b-row>
            <b-col cols="12" md="6">
              <strong>Contact List</strong>
            </b-col>
            <b-col cols="12" md="6" class="d-flex justify-content-end">
              <b-form-group class="action-part mb-0">
                <b-form-checkbox
                  v-model="allChecked"
                  @change="toggleAllList($event)"
                  name="toggle-all-button"
                >
                  {{ allChecked ? 'Unselect All' : 'Select All' }}
                </b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>
        </b-card-header>

        <b-card-body>
          <b-form-group
            v-for="(sellerItem, sellerName) in internalSellerData"
            :key="`seller-item-${sellerName}`"
            class="mb-3"
          >
            <template #label>
              <b-form-checkbox
                :id="`contact-${sellerName}`"
                v-model="sellerItem.allSelected"
                :indeterminate="sellerItem.indeterminate"
                @change="toggleAllContacts(sellerName, $event)"
              >
                Seller <strong>{{ sellerName }}</strong>
              </b-form-checkbox>
            </template>
            <b-form-checkbox-group
              :id="`seller-contacts-${sellerName}`"
              v-model="sellerItem.selected"
              class="ml-4"
              stacked
              @change="onChangeSellerContact(sellerName, $event)"
            >
              <b-form-checkbox
                :id="`contact-${option.email}-${index}`"
                v-for="(option, index) in sellerItem.options"
                :key="`contact-${index}`"
                :value="{
                  email: option.email,
                  contact_name: option.contact_name
                }"
                class="contact-checkbox"
              >
                {{ option.contact_name }} &lt;{{ option.email }}&gt;
              </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-card-body>
      </b-card>
    </div>
    <template v-slot:modal-footer="{ ok, cancel }">
      <b-button variant="warning" @click="ok()">
        <i class="icon-check"></i> Yes, I understand &amp; confirm!
      </b-button>
      <b-button variant @click="cancel()">
        <i class="icon-close"></i> No
      </b-button>
    </template>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vToasted from '@/shared/notification'
import * as TYPE from '@/actionTypes.js'

export default {
  name: 'PolicyNotificationModal',
  props: {
    id: { type: String, required: true }
  },
  data() {
    return {
      internalSellerData: {},
      allChecked: true
    }
  },
  mixins: [vToasted],
  computed: {
    ...mapGetters({
      listSellers: `mw/sellerEnforcements/${TYPE.GET_LIST_SELLER_ENFORCEMENT}`
    }),
    sellerItemsList: function() {
      return this.listSellers.items || []
    }
  },
  methods: {
    ...mapActions({
      fetchSellerEnforcementsList: `mw/sellerEnforcements/${
        TYPE.FETCH_LIST_SELLER_ENFORCEMENTS
      }`,
      sendPolicyNotification: `mw/settings/${TYPE.SEND_POLICY_NOTIFICATION}`
    }),
    toggleAllList(checked) {
      for (const sellerName in this.internalSellerData) {
        this.toggleAllContacts(sellerName, checked)
        this.internalSellerData[sellerName].allSelected = checked
        this.internalSellerData[sellerName].indeterminate = false
      }
    },
    toggleAllContacts(sellerName, checked) {
      this.internalSellerData[sellerName].selected = checked
        ? this.internalSellerData[sellerName].options
          .map((option) => ({
            email: option.email,
            contact_name: option.contact_name
          }))
          .slice()
        : []
    },
    onChangeSellerContact(sellerName, selected) {
      // Handle changes in individual checkboxes
      if (selected.length === 0) {
        this.internalSellerData[sellerName].indeterminate = false
        this.internalSellerData[sellerName].allSelected = false
        this.allChecked = false
      } else if (
        selected.length === this.internalSellerData[sellerName].options.length
      ) {
        this.internalSellerData[sellerName].indeterminate = false
        this.internalSellerData[sellerName].allSelected = true
        this.allChecked = Object.values(this.internalSellerData).every(
          (seller) => seller.allSelected === true
        )
      } else {
        this.internalSellerData[sellerName].indeterminate = true
        this.internalSellerData[sellerName].allSelected = false
        this.allChecked = false
      }
    },
    handleFetchSellerList() {
      this.fetchSellerEnforcementsList().then(() => {
        const defaultOptions = { allSelected: true, indeterminate: false }
        this.internalSellerData = this.sellerItemsList.reduce(
          (acc, sellerItem) => {
            if (
              sellerItem.name &&
              sellerItem.contacts &&
              sellerItem.contacts.length
            ) {
              acc[sellerItem.name] = {
                options: sellerItem.contacts,
                selected: sellerItem.contacts.map((item) => ({
                  email: item.email,
                  contact_name: item.contact_name
                })),
                ...defaultOptions
              }
            }
            return acc
          },
          {}
        )
      })
    },
    handleSendUpdatedPolicyMail() {
      let payload = { email_list: [] }
      for (const [key, value] of Object.entries(this.internalSellerData)) {
        if (value.selected.length) {
          payload.email_list.push({
            seller_name: key,
            contact_list: value.selected
          })
        }
      }
      this.sendPolicyNotification(payload)
        .then(() => {
          this.vToasted(
            'success',
            `Policy notification email has been sent successfully.`
          )
        })
        .catch((error) => {
          this.vToasted('error', error.data.message)
        })
    }
  },
  created() {
    this.handleFetchSellerList()
  }
}
</script>

<style lang="scss">
.seller-list {
  &::v-deep {
    .custom-control-label {
      padding-top: 1px;
    }
  }
}
.action-part {
  label {
    padding-top: 1px;
  }
}
</style>
