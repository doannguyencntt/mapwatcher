<template>
  <div class="animated fadeIn">
    <b-card>
      <template v-slot:header>
        <div class="pull-left align-middle">
          <span class="align-middle mt-2">
            <i class="fa fa-user-circle-o"></i>
            <span class="ml-2">
              <strong>Sellers</strong>
            </span>
          </span>
        </div>
        <div class="pull-right align-middle" v-if="managePermission">
          <router-link
            class="btn btn-primary btn-sm mr-1 pull-right"
            :to="{ name: 'MWSIAddSeller'}"
          >
            <i class="icon-plus"></i> Add
          </router-link>
        </div>
        <div class="pull-right align-middle" v-if="managePermission">
          <router-link
            class="btn btn-primary btn-sm mr-1 pull-right"
            :to="{ name: 'SIImportStep1Upload'}"
          >
            <i class="icon-cloud-upload"></i> Import
          </router-link>
        </div>
        <div class="pull-right align-middle mr-1">
          <b-button variant="primary" size="sm" @click="() => {handleOpenModelDownload()}">
            <i class="icons icon-cloud-download"></i> Export
            <b-spinner v-if="$store.state.mw.sellers.loadingDownload" label="Spinning" class="icon- btn-loader"></b-spinner>
          </b-button>
        </div>
      </template>
      <b-row>
        <b-col md="4" offset-md="4" class="mt-0 mb-4">
          <b-form-group class="mb-0">
            <b-input-group class="search cancel-action">
              <b-form-input placeholder="Search keyword" v-model="inputSearch" ref="inputSearch" @keypress.enter="currentPage = 1; handleSearchSellerData()"></b-form-input>
              <i v-show="inputSearch" @click="inputSearch = ''; currentPage = 1; handleSearchSellerData()" class="icon-close cancel-icon"></i>
              <b-input-group-append>
                <b-button @click="handleSearchSellerData()">
                  <i class="icons icon-magnifier"></i>
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-table
        outlined
        striped
        thead-class="thead-light"
        :items="getSellers.items"
        :fields="getSellerFields"
        no-local-sorting
        @sort-changed="handleSearchSellerData($event)"
        show-empty
      >
        <template v-slot:empty>
          <LoadingSpinner :isLoading="sellerLoading" v-if="sellerLoading"/>
          <div class="align-middle d-flex justify-content-center align-items-center" v-else>There is no data</div>
        </template>
        <template v-slot:cell(status)="row">
          <span>{{row.item.status | convertToStartCaseWithCustom}}</span>
        </template>
        <template v-slot:cell(source)="row">
          <span>{{row.item.source | convertToStartCaseWithCustom}}</span>
        </template>
        <template v-slot:cell(link)="row">
          <span v-if="row.item.link"><a :href="row.item.link" target="_blank" :title="row.item.link"><u>Open Link</u></a></span>
        </template>
        <template v-slot:cell(actions)="row" v-if="managePermission">
          <!-- <b-dropdown variant="primary" class="mr-1 small-dropdown" size="sm">
            <template v-slot:button-content>
              <i class="icon-settings"></i> Manage
            </template>
            <b-dropdown-item-button @click="editSeller(row.item)">
              <i class="icon-note text-primary"></i> Edit
            </b-dropdown-item-button>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item-button
              @click="idSellerDelete = row.item._id"
              v-b-modal.delete-confirm
            >
                <i class="icon-close text-danger"></i> Remove
            </b-dropdown-item-button>
          </b-dropdown> -->
          <div>
          <b-dropdown variant="primary" size="sm" split text="Edit" @click="editSeller(row.item)" class="drp-actions">
            <b-dropdown-item variant="danger" @click="idSellerDelete = row.item._id" v-b-modal.delete-confirm>
              <i class="icon-trash cls-icon-trash"></i>Remove
            </b-dropdown-item>
          </b-dropdown>
        </div>
        </template>
      </b-table>
      <b-modal id="delete-confirm" variant="danger" centered title="Please confirm">
        <p>Are you sure you want to delete this seller?</p>
        <template v-slot:modal-footer>
          <b-button variant="warning" @click="handleDeleteSeller(idSellerDelete)">
            <i class="icon-check"></i> Yes, I understand &amp; confirm!
          </b-button>
          <b-button variant @click="$bvModal.hide('delete-confirm')">
            <i class="icon-close"></i> No
          </b-button>
        </template>
      </b-modal>
      <nav v-if="getSellers && getSellers.total && getSellers.total > 10">
        <b-pagination
          align="center"
          @click.native="goToPage(currentPage)"
          :total-rows="getSellers.total"
          :per-page="getSellers.page_size"
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
import _ from 'lodash'
import * as TYPE from '@/actionTypes.js'
import LoadingSpinner from '@/components/common/LoadingSpinner'

export default {
  name: 'MWSISellerList',
  mixins: [toastMixin, PermissionsMixin],
  data: function () {
    return {
      nav: _nav,
      currentPage: 1,
      currentPageSize: 10,
      idSellerDelete: null,
      inputSearch: null,
      tempCurrentPage: 1,
      sortBy: 'seller_name',
      sortDir: 1
    }
  },
  filters: {
    convertToStartCaseWithCustom: function(str) {
      return _.startCase(str).replace('Sku', 'SKU').replace('Gmr', 'GMR')
    }
  },
  computed: {
    ...mapGetters({
      getSellers: `mw/sellers/getSellers`,
      getSellerFields: `mw/sellers/getSellerFields`,
      getPermissions: `mw/${TYPE.GET_PERMISSIONS}`,
      sellerLoading: `mw/sellers/${TYPE.GET_SELLER_LOADING}`
    }),
    managePermission: function() {
      if (this.getPermissions && this.getPermissions.permissions) {
        return this.getPermissions.permissions.siman
      }
      return false
    }
  },
  components: {
    LoadingSpinner
  },
  methods: {
    ...mapActions({
      fetchPermissions: `mw/${TYPE.FETCH_PERMISSIONS}`,
      getSellersData: `mw/sellers/getSellersData`,
      deleteSeller: `mw/sellers/deleteSeller`,
      fetchUrlDownload: `mw/sellers/${TYPE.FETCH_SI_SELLER_URL_EXPORT}`
    }),
    goToPage: function(page) {
      if (this.tempCurrentPage !== this.currentPage) {
        this.currentPage = page
        this.tempCurrentPage = this.currentPage
        this.handleGetSellersData()
      } else {
        this.currentPage = page
        this.tempCurrentPage = this.currentPage
      }
    },
    async handleSearchSellerData(ctx) {
      this.sortBy = ctx ? ctx.sortBy : this.sortBy
      this.sortDir = ctx ? ctx.sortDesc === true ? -1 : 1 : this.sortDir
      this.currentPage = 1
      await this.handleGetSellersData()
    },
    async handleGetSellersData() {
      let payload = {
        s: this.inputSearch,
        limit: this.currentPageSize,
        page: this.currentPage,
        sort_by: this.sortBy,
        sort_dir: this.sortDir,
        clientID: this.$route.params.client_id
      }
      await this.getSellersData(payload)
    },
    async handleOpenModelDownload() {
      try {
        const res = await this.fetchUrlDownload()
        window.location.href = res.url
      } catch (error) {
        this.vToasted('error', error.message)
      }
    },
    async handleDeleteSeller(e) {
      let payload = {
        clientID: this.$route.params.client_id,
        sellerID: this.idSellerDelete
      }
      console.log('this ', this)
      try {
        let result = await this.deleteSeller(payload)
        if (result === 200) {
          this.currentPage = 1
          this.vueToast('Seller has been deleted successfully.', 'success')
          await this.handleGetSellersData()
          this.$bvModal.hide('delete-confirm')
        } else {
          this.vueToast('Seller has not been deleted. Please retry or contact administrator.', 'error')
        }
      } catch (e) {
        this.vueToast('Seller has not been deleted. Please retry or contact administrator.', 'error')
      }
    },
    editSeller(item) {
      this.$router.push({
        name: 'MWSIEditSeller',
        params: {
          client_id: this.$route.params.client_id,
          seller_id: item.id ? item.id : item._id
        }
      })
    }
  },
  async created() {
    // await this.fetchPermissions()
    // if no permission -> return Home page
    if (this.getPermissions.permissions) {
      this.gotoGlobalHomePageIfNoPermission(this.getPermissions.permissions)
      await this.handleGetSellersData()
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
.btn-loader {
  width: 12px !important;
  height: 12px !important;
  border-width: 1px !important;
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
::v-deep .col-seller-manage {
  width: 90px;
}
</style>
