<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col md="6" lg="6" sm="12">
        <b-card>
          <template v-slot:header>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <b>Import MAPs</b>
              </div>
              <div class="card-header-actions">
                <div class="btn-close">
                  <router-link
                    :to="{name: `MW${sharableRoute}ListMaps`, params: {client_id: nav.clientId}}"
                    tag="button"
                    class="btn btn-secondary btn-block btn-sm"
                  >
                    <i class="icon-arrow-left-circle icons"></i> Back
                  </router-link>
                </div>
              </div>
            </div>
          </template>
          <b-form>
            <b-form-group>
              <b-row class="align-items-center">
                <b-col md="12">
                  <label>Select CSV File</label>
                  <b-form-file v-model="file"></b-form-file>
                </b-col>
              </b-row>
            </b-form-group>
            <b-col class="px-0">
              <i>
                Please download the sample file
                <b-button size="sm" class="btn btn-pill btn-light btn-sm" @click="handleDownloadCSVExample()">
                  <i class="icons icon-cloud-download"></i> Download
                </b-button>
              </i>
            </b-col>
            <b-row>
              <b-col md="6" lg="6" sm="12">
                <b-form-group>
                  <label>
                    <b>File in use</b>
                  </label>
                  <b-form-input type="text"
                                @input="$v.file_in_use.$touch()"
                                v-model="file_in_use"
                  ></b-form-input>
                  <div
                          class="mw-error"
                          v-if="$v.file_in_use.$error && $v.file_in_use.$dirty"
                  >File in use is required.</div>
                </b-form-group>
              </b-col>
              <b-col md="6" lg="6" sm="12">
                <b-form-group>
                  <label>
                    <b>Date started</b>
                  </label>
                  <div class="custom-datepicker-control">
                    <b-button-group class="w-100">
                      <b-button class="col-md-2" id="btnDate" size='sm' @click="$refs.date_started.click()">
                        <i class="icons icon-calendar"></i>
                      </b-button>
                      <Datepicker
                              v-model="date_started"
                              bootstrap-styling
                              format="MM/dd/yyyy"
                              typeable
                              ref="date_started"
                              @input="$v.date_started.$touch()"
                              id="fromPicker"
                              placeholder="Select a date"
                              class="optimize-dp col-md-10 p-0"
                      >
                      </Datepicker>
                    </b-button-group>
                    <div
                            class="mw-error"
                            v-if="$v.date_started.$error && $v.date_started.$dirty"
                    >Date started is required.</div>
                  </div>
                </b-form-group>
              </b-col>
            </b-row>
            <b-col class="px-0">
                <span class="text-danger pt-2" v-if="!reports.isLoad && !reports.items.length">
                  There is no report or active report in the list. Please
                  <router-link class="text-danger font-weight-bold" :to="{name: 'MWAddReports'}">add a new report</router-link> or
                  <router-link class="text-danger font-weight-bold" :to="{name: 'MWListReports'}">activate</router-link> at least one report first.
                </span>
            </b-col>
          </b-form>
          <template v-slot:footer>
            <b-button :disabled="$v.$error || reports.isLoad || !reports.items.length || !file" variant="primary" size="sm" @click="handleSubmitFileUpload()">
              <i class="icon-cloud-upload"></i> Upload
            </b-button>
            <b-button size="sm" class="ml-2" @click="$router.push({name: `MW${sharableRoute}ListMaps`, params: {client_id: nav.clientId}})">
              <i class="icon-arrow-left-circle"></i> Cancel
            </b-button>
          </template>
        </b-card>
      </b-col>
      <b-col md="6" lg="6" sm="12" v-if="flag.processed">
        <b-card>
          <template v-slot:header>
            <span class="align-middle">
              Import
              <strong>Result</strong>
            </span>
          </template>
          <b-card-body>
            <ul>
              <li>
                <strong>Created</strong>
                : {{ getProcess.total_created }}
              </li>
              <li>
                <strong>Updated</strong>
                : {{ getProcess.total_updated }}
              </li>
              <li>
                <strong>Deleted</strong>
                : {{ getProcess.total_deleted }}
              </li>
              <li v-if="getProcess.errors && getProcess.errors.length">
                <strong>Errors</strong>
                <ul>
                  <li
                    v-for="(d, i) in getProcess.errors"
                    :key="i"
                  >{{ d.error }} at row #{{ d.row_number }}</li>
                </ul>
              </li>
            </ul>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
// import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import * as TYPE from '@/actionTypes.js'
import { required } from 'vuelidate/lib/validators'
import vToasted from '@/shared/notification'
import _nav from '@/_nav'
import Datepicker from 'vuejs-datepicker'
import * as moment from 'moment/moment'

export default {
  data() {
    return {
      date_started: null,
      file_in_use: null,
      file: null,
      flag: {
        processed: false
      },
      reports: {
        items: [],
        isLoad: true
      },
      nav: _nav
    }
  },
  mixins: [vToasted],
  computed: {
    ...mapGetters({
      getProcess: `mw/maps/${TYPE.GET_PROCESS_MAPS}`
    }),
    sharableRoute () {
      const routeRegrex = /\/share\//
      return routeRegrex.test(this.$route.path) ? 'Share' : ''
    }
  },
  validations: {
    date_started: {
      required
    },
    file_in_use: {
      required
    }
  },
  components: {
    Datepicker
  },
  methods: {
    ...mapActions({
      remoteFileUpload: `mw/maps/${TYPE.REMOTE_IMPORT_CSV_MAPS}`,
      fetchReports: `mw/reports/${TYPE.FETCH_LIST_REPORTS}`
    }),
    handleCannel() {
      this.report = {}
    },
    async handleSubmitFileUpload() {
      this.$v.$touch()
      if (this.$v.$error) {
        console.log('error')
        return
      }
      if (!this.reports.isLoad && this.reports.items.length && this.file) {
        this.flag.processed = false
        let formData = new FormData()
        formData.append('file', this.file)
        formData.append('date_started', moment(this.date_started).format('MM/DD/YYYY'))
        formData.append('file_in_use', this.file_in_use)
        try {
          await this.remoteFileUpload(formData)
          this.flag.processed = true
        } catch (error) {
          if (error.status && error.status === 400) {
            this.vToasted('error', 'Could not import data. Please compare your file with the sample one to make sure your column definition is correct.')
          } else {
            this.vToasted('error', error.data.message)
          }
          this.flag.processed = false
        }
      }
    },
    handleDownloadCSVExample() {
      window.location.href = 'https://storage.googleapis.com/precise/mw/sample-map-import.csv'
    },
    async fetchReportList() {
      try {
        // check report list is not empty, so limit 1 is enough
        const response = await this.fetchReports({limit: 1, page: 1})
        this.reports.items = response.items
        this.reports.isLoad = false
      } catch (e) {
        this.reports.isLoad = false
      }
    }
  },
  created() {
    this.fetchReportList()
    this.fields = [
      { key: 'name', label: '', sortable: true, thClass: 'text-center' },
      { key: 'count', label: 'Count', sortable: true, thClass: 'text-center' }
    ]
  }
}
</script>
