<template>
  <b-card :header="caption" v-if="getPermissions.permissions">
    <template v-slot:header>
      <p class="po-list-title my-0 pull-left align-middle map-list-title">
        <strong><i class="fa fa-user-circle-o"></i>
        {{ caption }}</strong>
      </p>
      <div v-if="getPermissions.module_enabled && getPermissions.permissions.seview && getPermissions.permissions.secreate" class="pull-right align-middle">
        <b-button-group>
          <router-link :to="{ name: 'MWAddSellerEnforcements', params: { client_id: nav.clientId } }" tag="button" class="btn btn-primary btn-sm">
            <i class="icons icon-plus"></i> Add
          </router-link>
        </b-button-group>
      </div>
    </template>
    <b-row>
      <b-col md="4" offset-md="4" class="my-0 mb-4">
        <b-form-group class="mb-0" v-if="getPermissions.permissions.seview">
          <b-input-group class="search cancel-action">
            <b-form-input
                    placeholder="Enter seller name"
                    ref="inputSearch"
                    v-model.trim="inputSearch"
                    @keyup.enter="
                params.page = 1
                paramsChange()
              "
            ></b-form-input>
            <i
                    v-show="inputSearch"
                    @click="
                inputSearch = ''
                params.page = 1
                paramsChange()
              "
                    class="icon-close cancel-icon"
            ></i>
            <b-input-group-append>
              <b-button
                      @click="
                  params.page = 1
                  paramsChange()
                "
              >
                <i class="icons icon-magnifier"></i>
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-table
      :dark="dark"
      :hover="hover"
      striped
      :small="small"
      outlined
      responsive="sm"
      thead-class="thead-light text-nowrap"
      :items="getItems"
      :fields="captions"
      show-empty
      class="overflow-auto"
      :class="'text-left'"
    >
      <template v-slot:empty>
        <LoadingSpinner :isLoading="sellerEnforcementLoading" v-if="sellerEnforcementLoading"/>
        <div class="align-middle d-flex justify-content-center align-items-center" v-else>No Sellers</div>
      </template>
      <template v-slot:cell(name)="data">
        <div>
          {{ data.item.name }}
        </div>
      </template>
      <template v-slot:cell(letter)="data">
        <button class="btn btn-primary btn-sm" @click="handleEditLetter(data.item)" :disabled="!getPermissions.module_enabled || !getPermissions.permissions.seedit"><i class="fa fa-envelope" aria-hidden="true"></i><span class="ml-1">Edit</span></button>
      </template>
      <template v-slot:cell(log)="data">
        <button v-if="getPermissions.module_enabled && getPermissions.permissions.seview" class="btn btn-primary btn-sm" @click="handleGotoHistories(data.item)"><i class="fa fa-history" aria-hidden="true"></i><span class="ml-1">View</span></button>
      </template>
      <template v-slot:cell(frequency)="data">
        <button v-if="getPermissions.module_enabled && getPermissions.permissions.seview && data.item.frequency === 'daily'" @click="handleChangeFrequency(data.item)" class="btn btn-primary btn-sm" :disabled="!getPermissions.permissions.seedit">Daily</button>
        <button v-if="getPermissions.module_enabled && getPermissions.permissions.seview && data.item.frequency === 'manual'" class="btn bg-secondary btn-sm" @click="handleChangeFrequency(data.item)" :disabled="!getPermissions.permissions.seedit">Manual</button>
        <a href="javascript:void(0);" v-if="getPermissions.module_enabled && getPermissions.permissions.seview" @click="handleSendMail(data.item)" :class="{'disabled-icon': !getPermissions.permissions.sesend}"><i class="fa fa-paper-plane pl-1"></i></a>
      </template>
      <template v-slot:cell(sender)="data">
        <div v-if="data.item.sender_name || data.item.sender_email" class="text-truncate" :id="`sender-${data.item.name}`">
          <strong v-if="data.item.sender_name">{{ data.item.sender_name }} </strong>
          <span v-if="data.item.sender_email">&lt;{{ data.item.sender_email }}&gt;</span>
        </div>
        <div v-else>
          <b-badge variant="secondary">empty</b-badge>
        </div>
        <b-popover
          :target="`sender-${data.item.name}`"
          triggers="hover"
          placement="top"
          v-if="data.item.sender_email"
        >
          <template v-slot:title>Email</template>
          <div>
            <a href="javascript:void(0);"><i class="fa fa-envelope" /></a>
            {{ data.item.sender_email }}
          </div>
        </b-popover>
      </template>
      <template v-slot:cell(contacts)="data">
        <button v-if="getPermissions.module_enabled && getPermissions.permissions.seview" @click="handleGotoEditContacts(data.item)" class="btn btn-primary btn-sm text-nowrap">({{data.item.contacts.length}}) <i class="fa fa-user-o" aria-hidden="true"></i><span class="ml-1">View</span></button>
      </template>
      <template v-slot:cell(actions)="data">
        <!-- <b-dropdown variant="primary" class="mr-1 small-dropdown" size="sm"
          :disabled="!getPermissions.module_enabled || (!getPermissions.permissions.seedit && !getPermissions.permissions.sedelete)">
          <template v-slot:button-content>
            <i class="icon-settings"></i> Manage
          </template>
          <b-dropdown-item-button
            v-if="getPermissions.permissions.seedit"
            @click="handleEditItem(data.item)"
          >
            <i class="icon-note text-primary"></i> Edit
          </b-dropdown-item-button>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item-button
            v-if="getPermissions.permissions.sedelete"
            @click="handleRemoveItem(data.item)"
          >
            <i class="icon-close text-danger"></i> Delete
          </b-dropdown-item-button>
        </b-dropdown> -->
        <b-dropdown v-if="getPermissions.permissions.seedit" variant="primary" size="sm" split text="Edit" @click="handleEditItem(data.item)" class="drp-actions" :disabled="!getPermissions.module_enabled || (!getPermissions.permissions.seedit && !getPermissions.permissions.sedelete)">
          <b-dropdown-item v-if="getPermissions.permissions.sedelete" variant="danger" @click="handleRemoveItem(data.item)">
            <i class="icon-trash cls-icon-trash"></i>Remove
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-table>
    <b-modal hide-footer size="lg" title="Edit Email Template" centered v-model="dialog.letter" ok-variant="danger">
      <b-row>
        <b-col md="2">
          <div>Send To </div>
        </b-col>
        <b-col md="10" >
          <b-col class="border" v-if="selected.item && selected.item.contacts && selected.item.contacts.length > 0">
            <ul>
              <li v-for="(item, _i) in selected.item.contacts" v-bind:key="_i">
                {{item.contact_name}} &lt;{{item.email}}&gt; <div class="d-inline mr-1" v-if="_i < (selected.item.contacts.length - 1)">, </div>
              </li>
            </ul>
          </b-col>
        </b-col>
      </b-row>
      <br>
      <b-row>
        <b-col md="2">
          <div>Email Body </div>
        </b-col>
        <b-col md="10">
          <vue-editor :editorToolbar="vueEditorCustomToolbar" v-model="selected.letter.body"></vue-editor>
        </b-col>
      </b-row>
      <b-row class="mt-3">
        <b-col md="2">
        </b-col>
        <b-col md="5">
          <b-form-checkbox v-model="selected.letter.include_document" class="mb-2 basicText font-weight-bold" switch>Include MAP Pricing Policy Document</b-form-checkbox>
        </b-col>
        <b-col md="5" class="text-right">
          <b-button variant="warning" @click="handleUpdateLetter()"> <i class="icon-check"></i> Save</b-button>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal title="Please confirm" centered v-model="dialog.switch" @ok="changeFrequencyMode()" ok-variant="danger">
      Are you sure you want to change Frequency Mode of this seller?
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button variant="warning" @click="ok()"> <i class="icon-check"></i> Yes, I understand &amp; confirm! </b-button>
        <b-button variant @click="cancel()"> <i class="icon-close"></i> No </b-button>
      </template>
    </b-modal>
    <b-modal title="Please confirm" centered v-model="dialog.remove" @ok="removeItem()" ok-variant="danger">
      Are you sure you want to delete this seller?
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button variant="warning" @click="ok()"> <i class="icon-check"></i> Yes, I understand &amp; confirm! </b-button>
        <b-button variant @click="cancel()"> <i class="icon-close"></i> No </b-button>
      </template>
    </b-modal>
    <b-modal hide-header centered v-model="dialog.update_sender">
      <strong class="d-block my-2">Please update sender first to send the email.</strong>
      <template v-slot:modal-footer="{ cancel }">
        <b-button variant="primary" @click="cancel()"> <i class="icon-check"></i> OK </b-button>
      </template>
    </b-modal>
    <b-modal title="Please confirm" centered v-model="dialog.send_mail" @ok="handleManualSendMail()" ok-variant="danger">
      Are you sure you want to send violation report to this contact list:
      <div v-if="selected.item && selected.item.contacts" class="overflow-hidden">
        <div v-for="(item, index) in selected.item.contacts" v-bind:key="index"  class="float-left" :class="index > 0 ? 'ml-1' : ''">
          {{item.contact_name}} &lt;{{item.email}}&gt;<span v-if="index < (selected.send_mail.total_contact - 1)">, </span></div>
      </div>
      <p v-if="selected.item" class="d-block mt-2 mb-0">With the sender is:&nbsp;
        <strong>{{ selected.item.sender_name || 'Channel Precision' }}</strong>
        <strong>&nbsp;&lt;{{ selected.item.sender_email }}&gt;</strong>
      </p>
      <p v-if="selected.item">Violation date:
        <v-select class="w-50 ml-2 mt-2 d-inline-block" :clearable="false" v-model="selected.send_mail.date" :options="selected.history_dates">
          <span slot="no-options">No violation date.</span>
        </v-select>
      </p>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button variant="warning" @click="ok()"> <i class="icon-check"></i> Yes, I understand &amp; confirm! </b-button>
        <b-button variant @click="cancel()"> <i class="icon-close"></i> No </b-button>
      </template>
    </b-modal>
    <nav
      class="d-flex justify-content-center"
      v-if="listSellers.total > listSellers.page_size && listSellers.items.length > 0"
    >
      <b-pagination
              :total-rows="listSellers.total"
              :per-page="params.limit"
              v-model="params.page"
              prev-text="Prev"
              next-text="Next"
              hide-goto-end-buttons
              @change="params.page = $event, paramsChange()"
              hide-ellipsis
      />
    </nav>
  </b-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vToasted from '@/shared/notification'
import * as TYPE from '@/actionTypes.js'
import _ from 'lodash'
import _nav from '@/_nav'
import { SellerEnforcementFrequencyType } from '@/constants/SellerEnforcement'
import { VueEditor } from 'vue2-editor'
import vSelect from 'vue-select'
import moment from 'moment'
import LoadingSpinner from '@/components/common/LoadingSpinner'

export default {
  name: 'c-table',
  inheritAttrs: false,
  mixins: [vToasted],
  props: {
    caption: {
      type: String,
      default: 'Table'
    },
    hover: {
      type: Boolean,
      default: false
    },
    striped: {
      type: Boolean,
      default: false
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: [Array, Function],
      default: () => []
    },
    fields: {
      type: [Array, Object],
      default: () => []
    },
    dark: {
      type: Boolean,
      default: false
    },
    totalRows: {
      type: Number,
      default: 0
    },
    handleChangePage: {
      type: [Function]
    },
    sellerEnforcementLoading: {
      type: Boolean
    }
  },
  data: () => {
    return {
      sellerEnforcementFrequencyType: _.cloneDeep(SellerEnforcementFrequencyType),
      dialog: {
        remove: false,
        letter: false,
        switch: false,
        update_sender: false,
        send_mail: false
      },
      selected: {
        remove: null,
        switch: null,
        item: null,
        history_dates: [],
        send_mail: {
          total_contact: 0,
          date: null
        },
        letter: {
          body: {},
          include_document: false
        }
      },
      vueEditorCustomToolbar: [
        [ { 'font': [] } ],
        [{ 'header': [ false, 1, 2, 3, 4, 5, 6 ] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline'],
        [{'align': ''}, {'align': 'center'}, {'align': 'right'}, {'align': 'justify'}],
        [{ 'header': 1 }, { 'header': 2 }],
        [{'list': 'ordered'}, { 'list': 'bullet' }],
        [{'script': 'sub'}, { 'script': 'super' }],
        [{'indent': '-1'}, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'formula'],
        [{ 'direction': 'rtl' }],
        ['clean']
      ],
      defaultLetterContent: '<p>Dear {{ contact-name }},</p>' +
              '<p>We would like to inform that you have violation .Total number of violation is {{ violation-count }}.</p>' +
              '<p>Please see the attached file.</p>' +
              '<p>Regards,</p>' +
              '<p>Investigate Team</p>',
      nav: _nav,
      inputSearch: null
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: `mw/${TYPE.GET_PERMISSIONS}`,
      defaultParams: `mw/sellerEnforcements/${TYPE.GET_DEFAULT_SELLER_ENFORCEMENT_PARAMS}`,
      listSellers: `mw/sellerEnforcements/${TYPE.GET_LIST_SELLER_ENFORCEMENT}`
    }),
    params: function() {
      console.log(this.defaultParams)
      return { ...this.defaultParams } || {}
    },
    getItems: function() {
      return this.listSellers.items
    },
    captions: function() {
      const { fields } = this
      return fields
    }
  },
  components: {
    VueEditor,
    vSelect,
    LoadingSpinner
  },
  methods: {
    ...mapActions({
      removeSeller: `mw/sellerEnforcements/${TYPE.REMOVE_SELLER_ENFORCEMENT}`,
      changeFrequency: `mw/sellerEnforcements/${TYPE.CHANGE_FREQUENCY_SELLER_ENFORCEMENT}`,
      remoteEditSeller: `mw/sellerEnforcements/${TYPE.REMOTE_EDIT_SELLER_ENFORCEMENT}`,
      manualSendMail: `mw/sellerEnforcements/${TYPE.REMOTE_MANUAL_SEND_MAIL_SELLER_ENFORCEMENT}`,
      getHistoryDates: `mw/sellerEnforcements/${TYPE.GET_SELLER_ENFORCEMENT_HISTORY_DATES}`
    }),
    paramsChange() {
      this.params.s = this.inputSearch
      this.$emit('paramsChange', this.params)
    },
    handleEditItem(seller) {
      this.$router.push({ name: 'MWEditSellerEnforcements', params: { client_id: this.nav.clientId, id: seller.id }, query: { seller: seller } })
    },
    async handleManualSendMail() {
      const { id, contacts, name } = this.selected.item
      if (_.isEmpty(contacts)) {
        return this.vToasted('error', `${name} seller has empty contact list.`)
      }
      try {
        await this.manualSendMail({ id: id, date: this.selected.send_mail.date })
        this.vToasted('success', `${name} seller's violations on ${this.selected.send_mail.date} have been successfully sent to all contacts.`)
        this.dialog.send_mail = false
      } catch (e) {
        this.vToasted('error', e.message)
      }
    },
    handleRemoveItem(item) {
      this.dialog.remove = true
      this.selected.remove = {
        id: item.id,
        name: item.name
      }
    },
    async handleUpdateLetter() {
      try {
        const { name } = this.selected.item
        const { id } = this.selected.item
        await this.remoteEditSeller({ params: { letter: this.selected.letter }, id })
        this.vToasted('success', `Letter of seller ${name} has been updated successfully.`)
        this.paramsChange()
        this.dialog.letter = false
      } catch (error) {
        this.vToasted('error', error.data.message)
      }
    },
    handleEditLetter(item) {
      this.selected.item = item
      if (!_.isEmpty(item.letter.body)) {
        this.selected.letter.body = item.letter.body
      } else {
        this.selected.letter.body = this.defaultLetterContent
      }
      this.selected.letter.include_document = item.letter.include_document
      this.dialog.letter = true
    },
    handleChangeFrequency(seller) {
      this.dialog.switch = true
      this.selected.switch = {
        id: seller.id,
        frequency: seller.frequency,
        name: seller.name
      }
    },
    handleGotoEditContacts(seller) {
      const { id } = seller
      this.$router.push({ name: 'MWSellerEnforcementContacts', params: { client_id: this.nav.clientId, id: id } })
    },
    async handleSendMail(seller) {
      if (seller.sender_email) {
        this.selected.item = seller
        this.selected.send_mail.total_contact = _.size(seller.contacts)
        this.dialog.send_mail = true
        const histories = await this.getHistoryDates(seller.id)
        this.selected.history_dates = _.map(histories, (history) => moment(history.date_string, 'YYYYMMDD').format('MM-DD-YYYY'))
        if (!_.isEmpty(this.selected.history_dates)) {
          this.selected.send_mail.date = this.selected.history_dates[0]
        } else {
          this.selected.send_mail.date = moment().format('MM-DD-YYYY')
        }
      } else {
        this.dialog.update_sender = true
      }
    },
    handleGotoHistories(seller) {
      const { id } = seller
      this.$router.push({ name: 'MWSellerEnforcementHistories', params: { client_id: this.nav.clientId, id: id } })
    },
    changeFrequencyMode() {
      const { id, frequency, name } = this.selected.switch
      const updatedFrequency = frequency === this.sellerEnforcementFrequencyType.MANUAL ? this.sellerEnforcementFrequencyType.DAILY : this.sellerEnforcementFrequencyType.MANUAL
      this.changeFrequency({ id: id, frequency: updatedFrequency })
      this.vToasted('success', `Seller ${name} has been change frequency mode to ${updatedFrequency} successfully`)
    },
    async removeItem() {
      try {
        const id = this.selected.remove.id
        await this.removeSeller(id)
        this.vToasted('success', `Seller ${this.selected.remove.name} has been deleted successfully`)
      } catch (error) {
        this.vToasted('error', error.data.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .map-list-title{
    position: relative;
    top: 4px;
  }
  .dropdown-action {
    margin: 0 !important;
  }
  .max-width-300{
    max-width: 300px;
  }
  .w-10{
    width: 10%!important;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
  }

  li a {
    display: block;
    color: white;
    text-align: center;
    padding: 16px;
    text-decoration: none;
  }
  ol, ul, dl {
     margin-top: 0px!important;
     margin-bottom: 0px!important;
  }
  ::v-deep .sender-td {
    max-width: 250px;
  }
  .disabled-icon {
    pointer-events: none;
    cursor: not-allowed;

    .fa {
      color: #6c757d;
      opacity: 0.5;
    }
  }

  ::v-deep .small-dropdown {
    ul {
      min-width: 10px!important;
      li {
        width: 100%;
        .dropdown-divider {
          margin: 0;
        }
        .dropdown-item {
          font-size: 0.76563rem;
          line-height: 1.5;
          padding: 8px 20px;
        }
      }
    }
  }
  .drp-actions ::v-deep {
    .dropdown-menu {
      min-width: 50%;
      height: auto;
      .cls-icon-trash {
        color: #DC3545;
        margin-right: 5px;
      }
      .dropdown-item {
        padding: 6px 15px;
        font-size: 12px;
      }
    }
  }
</style>
