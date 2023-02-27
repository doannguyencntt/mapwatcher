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
      <b-table
              hover
              striped
              small
              outlined
              responsive="sm"
              thead-class="thead-light text-nowrap"
              :fields="fields"
              :items="paginationDoc.items"
              show-empty
              class="overflow-auto"
              :class="'text-center'"
      >
        <template v-slot:empty>
          <div class="empty">No Histories</div>
        </template>
        <template v-slot:head(date)="data">
          <span>
            <i class="icon-clock icons rounded-circle"></i> <span class="ml-2">{{ data.label }}</span>
          </span>
        </template>
        <template v-slot:cell(date)="data">
          <span>{{ data.item.date |  moment('MM/DD/YYYY hh:mm a') }}</span>
        </template>
        <template v-slot:cell(actor)="data">
          <span>{{ caption(data.item.user.name) }}</span>
        </template>
        <template v-slot:cell(message)="data">
          <span>{{ caption(data.item.action) }}</span>
        </template>
        <template v-slot:cell(data)="data">
          <span :id=generateId(data.index)>{...}</span>
          <b-popover :target=generateId(data.index) triggers="hover" placement="left">
            <div>
              <pre>{{ JSON.stringify(data.item.data, null, 2) }}</pre>
            </div>
          </b-popover>
        </template>
      </b-table>
      <nav
              class="d-flex justify-content-center"
              v-if="paginationDoc.total > paginationDoc.page_size && paginationDoc.items.length > 0"
      >
        <b-pagination
                :total-rows="paginationDoc.total"
                :per-page="paginationDoc.page_size"
                v-model="paginationDoc.page_current"
                prev-text="Prev"
                next-text="Next"
                hide-goto-end-buttons
                @change="
          paginationDoc.page_current = $event
          loadData()
        "
                hide-ellipsis
        />
      </nav>
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
  name: 'MWSellerEnforcementHistories',
  data() {
    return {
      paginationDoc: {
        items: [],
        page_count: 0,
        page_current: 1,
        page_size: 0,
        total: 0
      },
      fields: [
        {
          key: 'date',
          label: 'Date'
        },
        {
          key: 'actor',
          label: 'Actor'
        },
        {
          key: 'message',
          label: 'Message'
        },
        {
          key: 'data',
          label: 'Data'
        }
      ],
      nav: _nav
    }
  },
  mixins: [vToasted],
  methods: {
    ...mapActions({
      fetchHistory: `mw/sellerEnforcements/${TYPE.FETCH_LIST_SELLER_ENFORCEMENT_HISTORY}`
    }),
    backToListSeller() {
      this.$router.push({ name: 'MWListSellerEnforcements', params: { client_id: this.nav.clientId } })
    },
    async loadData() {
      await this.fetchData()
      const limit = this.paginationDoc.page_size ? this.paginationDoc.page_size : '10'
      const page = this.paginationDoc.page_current ? this.paginationDoc.page_current : '1'
      this.$router.replace({
        query: {
          limit: limit,
          page: page
        }
      })
    },
    async fetchData() {
      const limit = this.paginationDoc.page_size ? this.paginationDoc.page_size : '10'
      const page = this.paginationDoc.page_current ? this.paginationDoc.page_current : '1'
      const result = await this.fetchHistory({params: {
        limit: limit,
        page: page
      },
      id: this.$route.params.id})
      this.$set(this.paginationDoc, 'items', result.items)
      this.$set(this.paginationDoc, 'page_count', result.page_count)
      this.$set(this.paginationDoc, 'page_current', result.page_current)
      this.$set(this.paginationDoc, 'page_size', result.page_size)
      this.$set(this.paginationDoc, 'total', result.total)
    },
    caption(text) {
      return _.startCase(_.lowerCase(text))
    },
    generateId(index) {
      return `row-${index}`
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: `mw/${TYPE.GET_PERMISSIONS}`
    })
  },
  async created() {
    if (!this.$route.params.id) {
      this.backToListSeller()
      return
    }
    try {
      if (this.$route.query.page) {
        this.paginationDoc.page_current = this.$route.query.page
      }
      await this.loadData()
    } catch (error) {
      this.vToasted('error', error)
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
