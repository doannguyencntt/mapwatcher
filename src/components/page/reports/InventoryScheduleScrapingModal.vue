<template>
  <b-modal
    static
    :visible="visible"
    title="Inventory investigation modal (scheduler)"
    centered
    size="lg"
    @hidden="$emit('hidden')"
  >
    <strong>Altra - Inventory investigation scheduler</strong>
    <br />
    <br />
    Please schedule an inventory investigation for this marketplace.
    <br />
    <!-- <br />
    Inventory investigation is more expensive than the other activities. It's about 40 credits per ASIN per seller.
    <br /> -->
    <br />
    <b-row>
      <b-col md="7" lg="7" sm="13">
        <b-row>
          <b-col md="6" lg="6" sm="6"
            ><b>From</b>
            <b-button-group class="w-100">
              <b-button
                class="col-md-2"
                id="btnDateFrom"
                size="sm"
                @click="pickFromDate()"
              >
                <i class="icons icon-calendar"></i>
              </b-button>
              <Datepicker
                v-model="date.from"
                :disabled-dates="disabledDates"
                bootstrap-styling
                format="MM/dd/yyyy"
                typeable
                ref="dateFrom"
                @input.native="handleInputDateFrom"
                id="fromPicker"
                placeholder="Select a date"
                class="optimize-dp col-md-10 p-0 custom-datepicker-fromto"
              >
              </Datepicker>
            </b-button-group>
             <div class="mw-error" v-if="$v.date.from.$error && $v.date.from.$dirty && !$v.date.from.required">
              Date From is required.
            </div>
            <div class="mw-error" v-else-if="$v.date.from.$error && $v.date.from.$dirty && !$v.date.from.minValue">
              Date From is invalid.
            </div>
          </b-col>
          <b-col md="6" lg="6" sm="6"
            ><b>To</b>
            <b-button-group class="w-100">
              <b-button
                class="col-md-2"
                id="btnDateTo"
                size="sm"
                @click="pickToDate()"
              >
                <i class="icons icon-calendar"></i>
              </b-button>
              <Datepicker
                v-model="date.to"
                :disabled-dates="disabledDates"
                bootstrap-styling
                format="MM/dd/yyyy"
                typeable
                ref="dateTo"
                @input.native="handleInputDateTo"
                id="toPicker"
                placeholder="Select a date"
                class="optimize-dp col-md-10 p-0 custom-datepicker-fromto"
              >
              </Datepicker>
            </b-button-group>
            <div class="mw-error" v-if="$v.date.to.$error && $v.date.to.$dirty && !$v.date.to.required">
              Date To is required.
            </div>
            <div class="mw-error" v-else-if="$v.date.to.$error && $v.date.to.$dirty && !$v.date.to.minValue">
              Date To is invalid.
            </div>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col md="6" lg="6" sm="6">
            <b-button
              size="md"
              variant="danger"
              :disabled="$v.date.from.$error || $v.date.to.$error || isBusy"
              @click="handleRemoveSchedule(false)"
            >
              <i class="icon-minus icons"></i> Remove
            </b-button>
          </b-col>
          <b-col md="6" lg="6" sm="6" class="text-right">
            <b-button
              size="md"
              variant="primary"
              :disabled="$v.date.from.$error || $v.date.to.$error || isBusy"
              @click="addSchedules()"
            >
              <i class="icon-plus"></i> Add
            </b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="5" lg="5" sm="9">
        <b>Scheduled</b> ({{ listInventorySchedules.total || 0 }})
        <b-table
          bordered
          striped
          :hover="true"
          :busy="isBusy"
          outlined
          responsive="sm"
          thead-class="thead-light text-nowrap"
          :items="getItems"
          :fields="fields"
          show-empty
          class="overflow-auto"
        >
          <template v-slot:empty>
            <div class="empty">No Inventory Scheduled</div>
          </template>
          <template v-slot:cell(date)="row">{{
            row.item.date_string | formatDate
          }}</template>
          <template v-slot:cell(action)="row">
            <b-button
              size="md"
              variant="link"
              v-text="'<Remove>'"
              class="p-0"
              @click="handleRemoveSchedule(true, row.item)"
            ></b-button>
          </template>
          <template #table-busy>
            <div
              class="align-middle d-flex justify-content-center align-items-center spinner-container"
            >
              <div class="spinner-border thin-spinner spinner-border-sm"></div>
              &nbsp;Loading...
            </div>
          </template>
        </b-table>
        <nav
          class="d-flex justify-content-center"
          v-if="
            listInventorySchedules.total > listInventorySchedules.page_size &&
              listInventorySchedules.items.length > 0
          "
        >
          <b-pagination
            :total-rows="listInventorySchedules.total"
            :per-page="params.limit"
            v-model="params.page"
            prev-text="Prev"
            next-text="Next"
            hide-goto-end-buttons
            @change="
              params.page = $event
              fetchSchedule()
            "
            hide-ellipsis
          />
        </nav>
      </b-col>
    </b-row>
    <template v-slot:modal-footer="{ cancel }">
      <b-button size="md" variant="secondary" @click="cancel()">
        <i class="icon-close icons"></i> Close
      </b-button>
    </template>
    <b-modal title="Please confirm" centered v-model="dialog.removeMany" @ok="removeSchedules()" ok-variant="danger">
      <span v-if="date.from.getTime() === date.to.getTime()">Are you sure you want to remove the schedule on {{ date.from | formatDate }}</span>
      <span v-else>Are you sure you want to unschedule the inventory investigation from {{ date.from | formatDate }} to {{ date.to | formatDate }}?</span>
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button variant="warning" @click="ok()"> <i class="icon-check"></i> Yes, I understand &amp; confirm! </b-button>
        <b-button variant @click="cancel()"> <i class="icon-close"></i> No </b-button>
      </template>
    </b-modal>
    <b-modal title="Please confirm" centered v-model="dialog.removeOne" @ok="removeOneSchedule()" ok-variant="danger">
      Are you sure you want to remove the schedule on {{ selectedSchedule && selectedSchedule.date_string | formatDate }}?
      <template v-slot:modal-footer="{ ok, cancel }">
        <b-button variant="warning" @click="ok()"> <i class="icon-check"></i> Yes, I understand &amp; confirm! </b-button>
        <b-button variant @click="cancel()"> <i class="icon-close"></i> No </b-button>
      </template>
    </b-modal>
  </b-modal>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Datepicker from 'vuejs-datepicker'
import vToasted from '@/shared/notification'
import {
  GET_INVENTORY_SCHEDULES,
  FETCH_INVENTORY_SCHEDULES,
  ADD_INVENTORY_SCHEDULES,
  REMOVE_INVENTORY_SCHEDULES,
  REMOVE_INVENTORY_SCHEDULE
} from '@/actionTypes.js'
import moment from 'moment'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'InventoryScheduleScrapingModal',
  components: {
    Datepicker
  },
  props: {
    visible: {
      type: Boolean,
      require: true
    },
    info: {
      type: Object
    },
    marketplace: {
      type: String
    }
  },
  mixins: [vToasted],
  data: () => {
    return {
      date: {
        from: null,
        to: null
      },
      disabledDates: {
        to: null
      },
      fields: [{
        key: 'date',
        label: 'Date'
      }, {
        key: 'action',
        label: '',
        thClass: 'w-110',
        tdClass: 'text-center'
      }],
      isBusy: false,
      params: {
        limit: 4,
        page: 1
      },
      dialog: {
        removeMany: false,
        removeOne: false
      },
      selectedSchedule: null
    }
  },
  validations: {
    date: {
      from: {
        required,
        minValue(value) {
          return value >= this.today
        }
      },
      to: {
        required,
        minValue(value) {
          return value >= this.today
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      listInventorySchedules: `mw/reports/${GET_INVENTORY_SCHEDULES}`
    }),
    today() {
      const ESTDateString = new Date().toLocaleString('en-US', { timeZone: 'EST' })
      const today = new Date(ESTDateString)
      today.setHours(0, 0, 0, 0)
      return today
    },
    getItems: function() {
      return this.listInventorySchedules.items
    }
  },
  methods: {
    ...mapActions({
      fetchInventorySchedules: `mw/reports/${FETCH_INVENTORY_SCHEDULES}`,
      addInventorySchedules: `mw/reports/${ADD_INVENTORY_SCHEDULES}`,
      removeInventorySchedules: `mw/reports/${REMOVE_INVENTORY_SCHEDULES}`,
      removeOneInventorySchedule: `mw/reports/${REMOVE_INVENTORY_SCHEDULE}`
    }),
    initInventoryDatePicker() {
      this.date.from = this.today
      this.date.to = this.today
      this.disabledDates.to = this.today
    },
    pickFromDate() {
      this.$refs.dateFrom.$el.querySelector('input').focus()
      this.$refs.dateFrom.showCalendar()
    },
    pickToDate() {
      this.$refs.dateTo.$el.querySelector('input').focus()
      this.$refs.dateTo.showCalendar()
    },
    fetchSchedule() {
      this.isBusy = true
      this.fetchInventorySchedules({
        report_id: this.info._id,
        marketplace: this.marketplace,
        limit: this.params.limit,
        page: this.params.page
      }).finally(() => {
        this.isBusy = false
      })
    },
    handleInputDateFrom(input) {
      if (input.srcElement.value === '') {
        this.date.from = null
      }
      this.$v.date.from.$touch()
    },
    handleInputDateTo(input) {
      if (input.srcElement.value === '') {
        this.date.to = null
      }
      this.$v.date.to.$touch()
    },
    addSchedules() {
      this.isBusy = true
      this.addInventorySchedules({
        report_id: this.info._id,
        marketplace: this.marketplace,
        from: moment(this.date.from).format('YYYY-MM-DD'),
        to: moment(this.date.to).format('YYYY-MM-DD')
      }).then(() => {
        this.vToasted('success', 'Add inventory schedules successfully.')
        this.fetchSchedule()
      }).catch((err) => {
        this.isBusy = false
        if (err.response.data.message.includes('Inventory schedule is existed')) {
          this.vToasted('error', err.response.data.message)
        } else {
          this.vToasted('error', 'Could not add inventory schedules.')
        }
      })
    },
    handleRemoveSchedule(isRemoveOne, schedule) {
      if (isRemoveOne) {
        this.dialog.removeOne = true
        this.selectedSchedule = schedule
      } else {
        this.dialog.removeMany = true
      }
    },
    removeSchedules() {
      this.isBusy = true
      this.removeInventorySchedules({
        report_id: this.info._id,
        marketplace: this.marketplace,
        from: moment(this.date.from).format('YYYY-MM-DD'),
        to: moment(this.date.to).format('YYYY-MM-DD')
      }).then(() => {
        this.vToasted('success', 'Remove inventory schedules successfully.')
        this.fetchSchedule()
      }).catch(() => {
        this.isBusy = false
        this.vToasted('error', 'Could not remove inventory schedules.')
      })
    },
    removeOneSchedule() {
      this.isBusy = true
      this.removeOneInventorySchedule({
        report_id: this.info._id,
        marketplace: this.marketplace,
        id: this.selectedSchedule._id
      }).then(() => {
        this.selectedSchedule = null
        this.vToasted('success', 'Remove inventory schedule successfully.')
        this.fetchSchedule()
      }).catch(() => {
        this.isBusy = false
        this.vToasted('error', 'Could not remove inventory schedule.')
      })
    }
  },
  created() {
    this.initInventoryDatePicker()
    this.info && this.fetchSchedule()
  },
  filters: {
    formatDate(dateTime) {
      return moment(dateTime).format('MM/DD/YYYY')
    }
  }
}
</script>

<style scoped lang="scss">
.spinner-container {
  height: 50px;

  .thin-spinner {
    border-width: 1px;
  }
}
.w-110 {
  width: 110px;
}

.custom-datepicker-fromto ::v-deep {
  .form-control {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
