<template>
  <div class="animated fadeIn">
    <b-card>
      <!-- header -->
      <template v-slot:header>
        <div class="d-flex justify-content-between align-items-center">
          <span><strong>{{$route.meta.tableName}}</strong></span>
          <div class="card-header-actions">
            <div class="btn-close">
              <b-button variant="secondary" class="btn btn-block" size="sm" @click="backToListSeller()"> <i class="icon-arrow-left-circle icons"></i> Back </b-button>
            </div>
          </div>
        </div>
      </template>
      <table class="table b-table table-striped table-hover border">
        <thead class="thead-light">
        <tr>
          <th v-for="field in fields" :class="field.class" :key="field.key">{{ field.label }}</th>
        </tr>
        </thead>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td class="text-right">
              <button class="btn btn-success btn-sm save-button" @click="saveContacts()" :disabled="!getPermissions.module_enabled || !getPermissions.permissions.seedit || isContactChanged">
                <i class="fa fa-check" aria-hidden="true" ></i> Save
              </button>
              <button class="btn btn-primary btn-sm ml-2" @click="addNewRow()" :disabled="!getPermissions.module_enabled || !getPermissions.permissions.seedit">
                <i class="icons icon-plus"></i> Add more
              </button>
            </td>
          </tr>
        </tfoot>
        <tbody class="text-center" v-if="contacts.length > 0">
          <tr v-for="(data, index) in contacts" :key="data.index" >
            <td class="text-left">
              <span v-if="data.action === 'done'">{{ data.email }}</span>
              <b-form-input v-if="data.action === 'edit'"  type="text" v-model="data.email"
                :class="{'is-invalid': canShowErr && ($v.contacts.$each[index].email.$invalid || $v.contacts.$each[index].email.$anyError)}">
              ></b-form-input>
              <div class="mw-error" v-if="canShowErr && ($v.contacts.$each[index].email.$invalid || $v.contacts.$each[index].email.$anyError)">Email is invalid!</div>
            </td>
            <td class="text-left">
              <span v-if="data.action === 'done'">{{ data.contact_name }}</span>
              <b-form-input v-if="data.action === 'edit'" type="text" v-model="data.contact_name"
                :class="{'is-invalid': canShowErr && ($v.contacts.$each[index].contact_name.$invalid || $v.contacts.$each[index].contact_name.$anyError)}">
              ></b-form-input>
              <div class="mw-error" v-if="canShowErr && ($v.contacts.$each[index].contact_name.$invalid || $v.contacts.$each[index].contact_name.$anyError)">Contact Name is required!</div>
            </td>
            <td class="text-left">
              <span v-if="data.action === 'done'">{{ data.job_title }}</span>
              <b-form-input v-if="data.action === 'edit'" type="text" v-model="data.job_title"
                :class="{'is-invalid': canShowErr && ($v.contacts.$each[index].job_title.$invalid || $v.contacts.$each[index].job_title.$anyError)}">
              ></b-form-input>
              <div class="mw-error" v-if="canShowErr && ($v.contacts.$each[index].job_title.$invalid || $v.contacts.$each[index].job_title.$anyError)">Job Title is required!</div>
            </td>
            <td class="text-right">
              <button v-if="getPermissions.module_enabled && getPermissions.permissions.seedit" class="btn btn-success ml-2 btn-sm" @click="editRowAt(data)" :disabled="data.action === 'edit'"><i class="icon-note "></i><span class="ml-1">Edit</span></button>
              <button v-if="getPermissions.module_enabled && getPermissions.permissions.sedelete" class="btn btn-danger ml-2 btn-sm" @click="deleteContactData = data" v-b-modal.delete-confirm><i class="icon-close "></i><span class="ml-1">Delete</span></button>
             </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="4" class="text-center">
              No contacts
            </td>
          </tr>
        </tbody>
      </table>
      <b-modal id="delete-confirm" variant="danger" centered title="Please confirm">
        <p>Are you sure you want to delete this contact?</p>
        <template v-slot:modal-footer>
          <b-button variant="warning" @click="removeRowAt(deleteContactData)">
            <i class="icon-check"></i> Yes, I understand &amp; confirm!
          </b-button>
          <b-button variant @click="$bvModal.hide('delete-confirm')">
            <i class="icon-close"></i> No
          </b-button>
        </template>
      </b-modal>
    </b-card>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import * as TYPE from '@/actionTypes.js'
import { required, email } from 'vuelidate/lib/validators'
import vToasted from '@/shared/notification'
import _nav from '@/_nav'

export default {
  name: 'MWSellerEnforcementContacts',
  data() {
    return {
      contacts: [],
      canShowErr: false,
      fields: [
        {
          key: 'email',
          label: 'Email Address',
          class: 'text-left'
        },
        {
          key: 'contact_name',
          label: 'Contact Name',
          class: 'text-left'
        },
        {
          key: 'job_title',
          label: 'Job Title',
          class: 'text-left'
        },
        {
          key: 'actions',
          label: '',
          class: 'text-right'
        }
      ],
      nav: _nav,
      deleteContactData: null,
      originalContacts: []
    }
  },
  mixins: [vToasted],
  methods: {
    ...mapActions({
      getOneSeller: `mw/sellerEnforcements/${TYPE.GET_ONE_SELLER_ENFORCEMENT}`,
      remoteEditSeller: `mw/sellerEnforcements/${TYPE.REMOTE_EDIT_SELLER_ENFORCEMENT}`
    }),
    removeRowAt(contact) {
      this.contacts = _.filter(this.contacts, function(o) { return o.index !== contact.index })
      this.$bvModal.hide('delete-confirm')
    },
    editRowAt(contact) {
      const updatedContact = this.contacts[contact.index]
      updatedContact.action = 'edit'
      this.$set(this.contacts, contact.index, updatedContact)
    },
    addNewRow() {
      this.contacts.push({
        email: '',
        contact_name: '',
        job_title: '',
        action: 'edit',
        index: this.contacts.length
      })
      this.canShowErr = false
    },
    async saveContacts() {
      this.canShowErr = true
      this.$v.$touch()
      if (this.$v.$error) {
        return
      }
      try {
        const dataSet = _.map(this.contacts, (contact) => {
          return {
            email: contact.email,
            contact_name: contact.contact_name,
            job_title: contact.job_title
          }
        })
        await this.remoteEditSeller({ params: { contacts: dataSet }, id: this.seller.id })
        this.vToasted('success', `Seller ${this.seller.name} has been updated successfully.`)
        this.contacts = _.map(this.contacts, (contact) => {
          contact.action = 'done'
          return contact
        })
        this.originalContacts = _.cloneDeep(this.contacts)
      } catch (error) {
        this.vToasted('error', error.data.message)
      }
      this.canShowErr = false
    },
    backToListSeller() {
      this.$router.push({ name: 'MWListSellerEnforcements', params: { client_id: this.nav.clientId } })
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: `mw/${TYPE.GET_PERMISSIONS}`
    }),
    isContactChanged() {
      let checkContacts = _.differenceWith(this.contacts, this.originalContacts, _.isEqual)
      let checkOriginContacts = _.differenceWith(this.originalContacts, this.contacts, _.isEqual)
      return _.isEmpty(checkContacts) && _.isEmpty(checkOriginContacts)
    }
  },
  async created() {
    if (!this.$route.params.id) {
      this.backToListSeller()
      return
    }
    try {
      const seller = await this.getOneSeller(this.$route.params.id)
      this.contacts = seller.contacts
      this.originalContacts = _.cloneDeep(seller.contacts)
      this.seller = seller
      const _this = this
      _.each(this.contacts, function(contact, i) {
        _this.contacts[i].index = i
        _this.contacts[i].action = 'done'
      })
    } catch (error) {
      this.vToasted('error', `Seller ${this.$route.params.id} not exist`)
      this.backToListSeller()
    }
  },
  validations: {
    contacts: {
      $each: {
        email: { required, email },
        contact_name: { required },
        job_title: { required },
        action: { required }
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
.save-button {
  margin-left: 22.5px;
}
</style>
