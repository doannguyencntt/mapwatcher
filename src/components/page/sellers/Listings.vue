<template>
  <div class="animated fadeIn">
    <b-card>
      <template v-slot:header>
        <div class="pull-left align-middle">
          <span class="align-middle mt-2">
            <i class="icon-list"></i>
            <span class="ml-2">
              <strong>Listings</strong>
            </span>
          </span>
        </div>
        <div class="pull-right align-middle" v-if="managePermission">
          <router-link
            class="btn btn-primary btn-sm mr-1 pull-right"
            :to="{ name: 'MWSIAddListing'}"
          >
            <i class="icon-plus"></i> Add
          </router-link>
        </div>
        <div class="pull-right align-middle" v-if="managePermission">
          <router-link
            class="btn btn-primary btn-sm mr-1 pull-right"
            :to="{ name: 'SIListingsImportStep1Upload'}"
          >
            <i class="icon-cloud-upload"></i> Import
          </router-link>
        </div>
      </template>
      <b-row>
        <b-col class="mb-4 col-4"></b-col>
        <b-col class="mb-4 col-4">
          <b-form-group class="mb-0">
            <b-input-group class="search cancel-action align-items-center">
              <b-form-input placeholder="Search keyword" v-model.trim="inputSearch" ref="inputSearch" @keypress.enter="currentPage = 1; handleSearchData()"></b-form-input>
              <i v-show="inputSearch" @click="inputSearch = ''; currentPage = 1; handleSearchData()" class="icon-close cancel-icon"></i>
              <b-input-group-append>
                <b-button @click="handleSearchData()">
                  <i class="icons icon-magnifier"></i>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col class="mb-4 col-4">
          <b-form-group class="mb-0">
            <b-input-group class="search align-items-center">
              <label class="d-inline mb-0 pr-2">Status:</label>
              <b-form-select
                @change="handleSearchData()"
                v-model="statusSearch"
                :options="initStatus"
              >
                <template v-slot:first>
                  <option :value="null">All Status</option>
                </template>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        outlined
        striped
        thead-class="thead-light"
        :items="getListings.items"
        :fields="getListingFields"
        no-local-sorting
        @sort-changed="handleSearchData($event)"
        show-empty
      >
        <template v-slot:empty>
          <LoadingSpinner :isLoading="listingLoading" v-if="listingLoading"/>
          <div class="align-middle d-flex justify-content-center align-items-center" v-else>There is no data</div>
        </template>
        <template v-slot:cell(status)="row">
          <b-badge :variant="getVariant(row.item.status)">{{row.item.status | convertSnakeCaseToHumanizeWithCustom}}</b-badge>
        </template>
        <template v-slot:cell(date)="row">
          <span>{{row.item.date | moment('YYYY-MM-DD')}}</span>
        </template>
        <template v-slot:cell(actions)="row" v-if="managePermission">
          <!-- <b-dropdown variant="primary" class="mr-1 small-dropdown" size="sm">
            <template v-slot:button-content>
              <i class="icon-settings"></i> Manage
            </template>
            <b-dropdown-item-button @click="editListing(row.item)">
              <i class="icon-note text-primary"></i> Edit
            </b-dropdown-item-button>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button
              @click="idListingDelete = row.item.id"
              v-b-modal.delete-confirm
            >
                <i class="icon-close text-danger"></i> Remove
            </b-dropdown-item-button>
          </b-dropdown> -->
          <b-dropdown variant="primary" size="sm" split text="Edit" @click="editListing(row.item)" class="drp-actions">
            <b-dropdown-item variant="danger" @click="idListingDelete = row.item.id" v-b-modal.delete-confirm>
              <i class="icon-trash cls-icon-trash"></i>Remove
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>
      <b-modal id="delete-confirm" variant="danger" centered title="Please confirm">
        <p>Are you sure you want to delete this listing?</p>
        <template v-slot:modal-footer>
          <b-button variant="warning" @click="handleDeleteListing(idListingDelete)">
            <i class="icon-check"></i> Yes, I understand &amp; confirm!
          </b-button>
          <b-button variant @click="$bvModal.hide('delete-confirm')">
            <i class="icon-close"></i> No
          </b-button>
        </template>
      </b-modal>
      <nav v-if="getListings && getListings.total && getListings.total > 10">
        <b-pagination
          align="center"
          @click.native="goToPage(currentPage)"
          :total-rows="getListings.total"
          :per-page="getListings.page_size"
          v-model="currentPage"
          hide-goto-end-buttons
          prev-text="Prev"
          next-text="Next"
          hide-ellipsis
        >
        </b-pagination>
      </nav>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import toastMixin from './../toastMixin'
import _nav from '@/_nav'
import PermissionsMixin from '@/components/common/PermissionsMixin'
// import _ from 'lodash'
import * as TYPE from '@/actionTypes.js'
import LoadingSpinner from '@/components/common/LoadingSpinner'

export default {
  name: 'MWSIListings',
  mixins: [toastMixin, PermissionsMixin],
  data: function () {
    return {
      nav: _nav,
      currentPage: 1,
      currentPageSize: 10,
      idListingDelete: null,
      inputSearch: null,
      tempCurrentPage: 1,
      sortBy: 'seller_name',
      sortDir: 1,
      statusSearch: null
    }
  },
  filters: {
    convertSnakeCaseToHumanizeWithCustom: function(str) {
      if (!str) return ''
      let i = str.split('_')
      let frags = str.split('_')
      for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1)
      }
      let result = frags.join(' ')
      return result.replace('Sku', 'SKU').replace('Gmr', 'GMR')
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: `mw/${TYPE.GET_PERMISSIONS}`,
      getListings: `mw/sellers/getListings`,
      getListingFields: `mw/sellers/getListingFields`,
      listingLoading: `mw/sellers/${TYPE.GET_LISTING_LOADING}`
    }),
    managePermission: function() {
      return this.getPermissions.permissions.siman
    },
    initStatus() {
      let listUniqueStatus = []
      listUniqueStatus = this.getListings.items.map(item => {
        return {
          text: item.status.charAt(0).toUpperCase() + item.status.slice(1),
          value: item.status
        }
      }).filter((element, index, self) => self.findIndex(e => (e.value === element.value)) === index).sort()
      return listUniqueStatus
    }
  },
  components: {
    LoadingSpinner
  },
  methods: {
    ...mapActions({
      fetchPermissions: `mw/${TYPE.FETCH_PERMISSIONS}`,
      getListingData: `mw/sellers/getListingData`,
      deleteListing: `mw/sellers/deleteListing`
    }),
    getVariant(status) {
      if (status === 'running') {
        return 'primary'
      } else if (status === 'success') {
        return 'success'
      } else if (status === 'error' || status === 'dead') {
        return 'danger'
      } else {
        return 'secondary'
      }
    },
    goToPage: function(page) {
      if (this.tempCurrentPage !== this.currentPage) {
        this.currentPage = page
        this.tempCurrentPage = this.currentPage
        this.handleGetListingData()
      } else {
        this.currentPage = page
        this.tempCurrentPage = this.currentPage
      }
    },
    async handleSearchData(ctx) {
      this.sortBy = ctx ? ctx.sortBy : this.sortBy
      this.sortDir = ctx ? ctx.sortDesc === true ? -1 : 1 : this.sortDir
      this.currentPage = 1
      await this.handleGetListingData()
    },
    async handleGetListingData() {
      let payload = {
        s: this.inputSearch,
        limit: this.currentPageSize,
        page: this.currentPage,
        sort_by: this.sortBy,
        sort_dir: this.sortDir,
        status: this.statusSearch,
        clientID: this.$route.params.client_id
      }
      await this.getListingData(payload)
    },
    async handleDeleteListing(e) {
      let payload = {
        clientID: this.$route.params.client_id,
        listingID: this.idListingDelete
      }
      try {
        let result = await this.deleteListing(payload)
        if (result === 200) {
          this.currentPage = 1
          this.vueToast('Listing has been deleted successfully.', 'success')
          await this.handleGetListingData()
          this.$bvModal.hide('delete-confirm')
        } else {
          this.vueToast('Listing has not been deleted. Please retry or contact administrator.', 'error')
        }
      } catch (e) {
        this.vueToast('Listing has not been deleted. Please retry or contact administrator.', 'error')
      }
    },
    editListing(item) {
      this.$router.push({
        name: 'MWSIEditListing',
        params: {
          client_id: this.$route.params.client_id,
          listing_id: item.id
        }
      })
    }
  },
  async created() {
    // await this.fetchPermissions()
    if (this.getPermissions.permissions) {
      this.gotoGlobalHomePageIfNoPermission(this.getPermissions.permissions)
      await this.handleGetListingData()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .small-dropdown {
  ul {
    min-width: 10px!important;
    li {
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
::v-deep .col-listing-manage {
  width: 90px;
}
</style>
