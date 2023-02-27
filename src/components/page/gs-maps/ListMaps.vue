<template>
  <div class="animated fadeIn">
    <b-card :header="caption">
      <template v-slot:header>
        <p class="po-list-title my-0 pull-left align-middle map-list-title">
          <strong><i class="icon-book-open icons"></i> {{ caption }}</strong>
          <span v-if="listMaps && listMaps.total">
            (Total:
            {{ new Number(listMaps.total || 0).toLocaleString('en') }})</span
          >
          <span v-else> (Total: 0)</span>
        </p>
        <div class="pull-right">
          <b-button-group>
            <router-link
              v-if="
                getPermissions.module_enabled &&
                getPermissions.permissions.gsmapman
              "
              :to="{
                name: 'MWImportGSMaps',
                params: { client_id: nav.clientId }
              }"
              tag="button"
              class="btn btn-primary btn-sm"
            >
              <i class="icons icon-cloud-upload"></i> Import
            </router-link>
            <b-button
              variant="primary"
              size="sm"
              @click="
                () => {
                  handleOpenModelDownload()
                }
              "
            >
              <i class="icons icon-cloud-download"></i> Export
              <b-spinner
                v-if="$store.state.mw.maps.loadingDownload"
                label="Spinning"
                class="icon- btn-loader"
              ></b-spinner>
            </b-button>
          </b-button-group>
        </div>
      </template>
      <b-row>
        <b-col class="mb-4 col-1">
          <b-dropdown
            v-if="selectedMaps.length"
            text="Actions"
            class="dropdown-action"
          >
            <b-dropdown-item-button
              :disabled="
                !getPermissions.module_enabled &&
                !getPermissions.permissions.gsmapman
              "
              @click="$bvModal.show('modal-confirm-remove-multi')"
            >
              <i class="icon-close"></i> Remove
            </b-dropdown-item-button>
          </b-dropdown>
        </b-col>
        <b-col class="mb-4 col-11">
          <b-form-group class="mb-0">
            <b-input-group class="search cancel-action align-items-center">
              <!-- Report -->
              <label class="d-inline mb-0 pr-2">Report:</label>
              <b-form-select
                @change="
                  params.page = 1
                  reportChange()
                "
                v-model="params.report_id"
                :options="reportOptions"
              >
                <template v-slot:first>
                  <option :value="null">All Reports</option>
                </template>
              </b-form-select>
              <!-- Brand -->
              <label class="d-inline mb-0 pr-2 ml-5">Brand:</label>
              <b-form-select
                @change="
                  params.page = 1
                  paramsChange()
                "
                v-model="params.brand_name"
                :options="brandOptions"
              >
                <template v-slot:first>
                  <option :value="null">All Brands</option>
                </template>
              </b-form-select>
              <!-- Search -->
              <label class="d-inline mb-0 pr-2 pl-2 ml-5">Search:</label>
              <b-form-input
                @keyup.enter="
                  params.page = 1
                  paramsChange()
                "
                placeholder="Enter keyword"
                ref="inputSearch"
                v-model.trim="params.search"
              ></b-form-input>
              <i
                v-show="params.search"
                @click="
                  params.page = 1
                  params.search = ''
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
              <!-- Review Status -->
              <label class="d-inline mb-0 pr-2 ml-5">Review:</label>
              <b-form-select :options="reviewStatusValueOptions" v-model="params.review_status" @change="params.page = 1; paramsChange()">
                <template v-slot:first>
                  <option :value="null">All Reviews</option>
                </template>
              </b-form-select>
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
      >
        <template v-slot:empty>
          <LoadingSpinner :isLoading="mapPricingGsLoading" v-if="mapPricingGsLoading"/>
          <div class="align-middle d-flex justify-content-center align-items-center" v-else>No MAP</div>
        </template>
        <template v-slot:head(selected)>
          <b-form-checkbox v-model="allSelected" />
        </template>
        <template v-slot:cell(selected)="row">
          <b-form-checkbox
            :key="row.index"
            :value="row.item.id"
            v-model="selectedMaps"
          />
        </template>
        <template class="align-items-baseline" v-slot:cell(sku)="{ item }">
          {{ item.sku }} <br>
          <div class="badge badge-secondary text-wrap font-weight-normal text-left">
            <span>Color: {{ item.color || item.hint.color || 'None' }}<br></span>
            <span>Size: {{ item.size || item.hint.size || 'None' }}<br></span>
            <span>Department: {{ item.department || item.hint.department || 'None' }}<br></span>
            <span>Inseam Size: {{ item.hint.inseam_size ? item.hint.inseam_size : 'None' }}</span>
          </div>
        </template>
        <template class="align-items-baseline" v-slot:cell(asin)="data">
          <span class="mr-1">{{ data.item.asin }}</span>
          <a
            class="text-decoration-none text-wrap d-inline-block"
            target="_blank"
            v-if="data.item.asin"
            :href="generateAmazonLink(data.item.asin)"
            >A<i class="fa fa-link" aria-hidden="true"></i
          ></a><br>
          <div class="badge badge-secondary text-wrap font-weight-normal text-left" v-if="data.item.amazon_title">
            {{ data.item.amazon_title }}
          </div>
        </template>
        <template class="align-items-baseline" v-slot:cell(price)="data"
          >${{ data.item.price | formatNumber }}</template
        >
        <template v-slot:cell(gpid)="{ item }">
          <div v-if="item.gpid">
            <div class="badge badge-info">
              <span>{{ item.gpid }}</span>
            </div>
            <div class="badge badge-secondary text-wrap font-weight-normal text-left" v-if="item.title">
              {{ item.title }}
            </div><br>
            <a
              v-if="item.gpid && item.link"
              class="mr-2 text-decoration-none text-wrap d-inline-block"
              target="_blank"
              :href="item.link"
              >G<i class="fa fa-link" aria-hidden="true"></i
            ></a>
            <button
              @click="updateCurrentMapItem(item), handleRemoveDiscoveredGpid()"
              v-if="item.gpid"
              type="button"
              class="btn btn-secondary btn-sm"
            >
              <i class="fa fa-ban" aria-hidden="true"></i>
            </button>
          </div>
          <div class="mb-0 w-100 p-0" v-for="(itemGpid, indexGpid) in item.discovered_gpids" :key="indexGpid">
            <div v-if="itemGpid.status === GoogleShoppingMapStatus.ACCEPTED && item.gpid !== itemGpid.gpid">
              <div class="badge badge-info">
                <span>{{ itemGpid.gpid }}</span>
              </div>
              <div class="badge badge-secondary text-wrap font-weight-normal text-left" v-if="itemGpid.title">
                {{ itemGpid.title }}
              </div><br>
              <a
                v-if="itemGpid.gpid && itemGpid.link"
                class="mr-2 text-decoration-none text-wrap d-inline-block"
                target="_blank"
                :href="itemGpid.link"
                >G<i class="fa fa-link" aria-hidden="true"></i
              ></a>
              <button
                @click="updateCurrentMapItem(item, itemGpid), handleRemoveDiscoveredGpid()"
                v-if="itemGpid.gpid"
                type="button"
                class="btn btn-secondary btn-sm"
              >
                <i class="fa fa-ban" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </template>
        <template v-slot:cell(discovered_gpids)="{ item }">
          <b-button
            :variant="item.reviewButtonVariant"
            size="sm"
            class="w-100"
            :disabled="item.discovered_gpids.length === 0"
            :class="(item.checkAccepted.length <= 1 && item.checkNormal.length <= 1) || item.reviewNormalButton ? 'font-weight-normal' : 'font-weight-bold'"
            @click="handleReviewDiscoveredGpids(item.discovered_gpids, item)"
          >
            <i class="icon-note"></i>
            <span v-if="item.checkAccepted.length >= 1"> Review ({{ item.checkAccepted.length }}/{{ item.discovered_gpids.length }})</span>
            <span v-else> Review ({{ item.checkNormal.length }}/{{ item.discovered_gpids.length }})</span>
          </b-button>
          <b-form-checkbox class="mt-2" v-model="item.gpid_discovery_needed" switch @change="updateDiscoveryGpidNeeded(item.id, $event)">Discovery</b-form-checkbox>
        </template>
        <template v-slot:cell(active)="row">
          <b-form-checkbox
            v-model="row.item.active"
            :disabled="true"
          ></b-form-checkbox>
        </template>
        <template v-slot:cell(last_violation_checked)="data">
          <div class="float-left" v-if="data.item.has_processed">
            {{ data.item.last_violation_checked | moment('MM/DD/YYYY') }}
          </div>
          <div class="float-left" v-else>N/A</div>
          <i
            v-if="data.item.has_processed"
            class="
              icon-check
              icons
              rounded-circle
              bg-success
              custom_icon
              float-left
              ml-2
            "
          ></i>
          <i
            v-if="!data.item.has_processed"
            class="
              icon-clock
              icons
              rounded-circle
              bg-secondary
              custom_icon
              float-left
              ml-2
            "
          ></i>
        </template>
        <template
          v-slot:cell(actions)="row"
          v-if="getPermissions.module_enabled && getPermissions.permissions.gsmapman"
        >
          <div>
            <b-dropdown variant="primary" size="sm" split text="Edit" @click="handleEditMap(row.item.id)" class="drp-actions">
              <b-dropdown-item variant="danger" @click="$bvModal.show('modal-confirm-delete-map'), mapId = row.item.id">
                <i class="icon-trash cls-icon-trash"></i>Remove
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </template>
        <template v-slot:view>
          <b-button class="mr-1 my-1" variant="primary">
            <i class="fa fa-window-restore fa-lg"></i> Revision
          </b-button>
        </template>
      </b-table>
      <b-modal
        title="Please confirm"
        centered
        id="modal-confirm-denied-gpid"
        @ok="handleDeniedDiscoveredGpid()"
        ok-variant="danger"
      >
        Are you sure you want to deny this GPID?
        <template v-slot:modal-footer="{ ok, cancel }">
          <b-button variant="warning" @click="ok()">
            <i class="icon-check"></i> Yes, I understand &amp; confirm!
          </b-button>
          <b-button variant @click="cancel()">
            <i class="icon-close"></i> No
          </b-button>
        </template>
      </b-modal>
      <b-modal
        title="Please confirm"
        centered
        id="modal-confirm-remove-discovered-gpid"
        @ok="handleRemoveDiscoveredGpid()"
        ok-variant="danger"
      >
        Are you sure you want to remove this GPID?
        <template v-slot:modal-footer="{ ok, cancel }">
          <b-button variant="warning" @click="ok()">
            <i class="icon-check"></i> Yes, I understand &amp; confirm!
          </b-button>
          <b-button variant @click="cancel()">
            <i class="icon-close"></i> No
          </b-button>
        </template>
      </b-modal>
      <b-modal
        title="Please confirm"
        centered
        id="modal-confirm-clone-gpid"
        @ok="handleAcceptDiscoveredGpid()"
        ok-variant="danger"
      >
        Are you sure you want to confirm this GPID is 100% correct?
        <template v-slot:modal-footer="{ ok, cancel }">
          <b-button variant="warning" @click="ok()">
            <i class="icon-check"></i> Yes, I understand &amp; confirm!
          </b-button>
          <b-button variant @click="cancel()">
            <i class="icon-close"></i> No
          </b-button>
        </template>
      </b-modal>
      <b-modal
        title="Please confirm"
        centered
        id="modal-confirm-delete-map"
        @ok="handleremoveGSMap(mapId)"
        ok-variant="danger"
      >
        Are you sure you want to remove this MAP?
        <template v-slot:modal-footer="{ ok, cancel }">
          <b-button variant="warning" @click="ok()">
            <i class="icon-check"></i> Yes, I understand &amp; confirm!
          </b-button>
          <b-button variant @click="cancel()">
            <i class="icon-close"></i> No
          </b-button>
        </template>
      </b-modal>
      <b-modal
        title="Please confirm"
        centered
        id="modal-confirm-remove-multi"
        @ok="handleRemoveMulti"
      >
        Are you sure you want to remove all selected MAPs?
        <template v-slot:modal-footer="{ ok, cancel }">
          <b-button variant="danger" @click="ok()">
            <i class="icon-check"></i> Yes, I understand &amp; confirm!
          </b-button>
          <b-button variant @click="cancel()">
            <i class="icon-close"></i> No
          </b-button>
        </template>
      </b-modal>
      <b-modal
        :title="'Review Discovered GPID(s) of SKU: ' + review.sku + ', ASIN: ' + review.asin + ' and UPC: ' + review.upc"
        centered
        v-model="review.isOpenReview"
        id="modal-discovered-gpid"
        ok-variant="danger"
        size="xl"
      >
        <div v-if="review.price">
          MAP: <span>${{ review.price | formatNumber }}</span>
        </div>
        <p class="cls-amazon-title" v-if="review.amazon_title">
          Amazon: <span class="badge text-wrap badge-secondary text-left">{{ review.amazon_title }}</span>
          <a
            v-if="review.reviewMapItem.asin && review.reviewMapItem.asin != ''"
            target="_blank"
            class="ml-1"
            :href="generateAmazonLink(review.reviewMapItem.asin)"
            >A<i class="fa fa-link" aria-hidden="true"></i>
          </a>
          <a :href="review.amazon_image_uri" v-if="review.amazon_image_uri" target="_blank">
            <img :src="review.amazon_image_uri" width="80" class="ml-2 mr-2">
          </a>
        </p>
        <div class="d-flex mb-2">
          <div class="d-flex cls-select-options align-items-center">
            <span class="cls-option-title">Show: </span>
            <b-form-select :options="valueOptions" v-model="review.selectedOption" class="drp-option"></b-form-select>
          </div>
          <div class="cls-filter-title d-flex align-items-center ml-3">
            <span class="cls-option-title mr-1">Title: </span>
            <b-form-input v-model="review.textTitle" placeholder="Enter your title"></b-form-input>
          </div>
        </div>
        <div class="tbl-review">
          <b-table
            :dark="dark"
            :hover="hover"
            striped
            :small="small"
            outlined
            responsive="sm"
            thead-class="thead-light text-nowrap"
            :items="getListDiscoveredGPID"
            :fields="fieldsReview"
            class="overflow-auto"
            show-empty
          >
            <template v-slot:empty>
              <div class="align-middle d-flex justify-content-center align-items-center">No Google Products</div>
            </template>

            <template v-slot:cell(index)="data">
              {{ data.index + 1 }}
            </template>

            <template v-slot:cell(gpid)="{ item }">
              <div v-if="!item.status || item.status === GoogleShoppingMapStatus.NORMAL" class="badge badge-info font-weight-normal">
                {{ item.gpid }}
              </div>
              <div v-if="item.status === GoogleShoppingMapStatus.DENIED" class="badge badge-info cls-denied font-weight-normal">
                {{ item.gpid }}
              </div>
              <div v-if="item.status === GoogleShoppingMapStatus.ACCEPTED" class="badge badge-info">
                {{ item.gpid }}
              </div>
            </template>

            <template v-slot:cell(date)="{ item }">
              <div v-if="!item.status || item.status === GoogleShoppingMapStatus.NORMAL" class="font-weight-normal">
                {{ item.date | moment('MM/DD/YYYY') }}
              </div>
              <div v-if="item.status === GoogleShoppingMapStatus.DENIED" class="cls-denied font-weight-normal">
                {{ item.date | moment('MM/DD/YYYY') }}
              </div>
              <div v-if="item.status === GoogleShoppingMapStatus.ACCEPTED" class="font-weight-bold">
                {{ item.date | moment('MM/DD/YYYY') }}
              </div>
            </template>

            <template v-slot:cell(title)="{ item }">
              <div class="font-weight-normal text-wrap" :class="{'cls-denied': item.status === GoogleShoppingMapStatus.DENIED, 'font-weight-bold': item.status === GoogleShoppingMapStatus.ACCEPTED}">
                <div class="d-flex">
                  <a target="_blank" :href="item.image_uri" v-if="item.image_uri" class="mr-2">
                    <img :src="item.image_uri" width="80" />
                  </a>
                  <div>
                    <span class="mr-1">{{ item.title }}</span>
                    <div v-if="item.is_similar_to_amazon_title" class="badge badge-info font-weight-normal mr-1">
                      Similar to Amazon Title
                    </div>
                    <div class="badge badge-info font-weight-normal">
                      <span>{{ item.similar_to_amazon_title_score | formatPercentBase1}}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template v-slot:cell(price)="{ item }">
              <div v-if="item.price" class="font-weight-normal text-wrap" :class="{'cls-denied': item.status === GoogleShoppingMapStatus.DENIED, 'font-weight-bold': item.status === GoogleShoppingMapStatus.ACCEPTED}">
                  <span>${{ item.price | formatNumber }}</span>
              </div>
            </template>

            <template v-slot:cell(link)="{ item }">
              <a
                v-if="item.gpid && item.link && item.link !== ''"
                target="_blank"
                :href="item.link"
                >G<i class="fa fa-link" aria-hidden="true"></i
              ></a>
            </template>

            <template v-slot:cell(actions)="row">
              <b-button-group class="d-flex flex-row">
                <button
                    type="button"
                    @click="
                      updateCurrentMapItem(review.reviewMapItem, row.item)
                      handleAcceptDiscoveredGpid()
                    "
                    class="btn btn-success btn-sm"
                  >
                    <i class="fa fa-check text-white" aria-hidden="true"></i>
                  </button>
                  <button
                    @click="
                      updateCurrentMapItem(review.reviewMapItem, row.item)
                      checkDenied()
                    "
                    type="button"
                    class="btn btn-secondary btn-sm"
                  >
                    <i class="fa fa-ban" aria-hidden="true"></i>
                  </button>
            </b-button-group>
          </template>
          </b-table>
        </div>
        <template v-slot:modal-footer="{ cancel }">
          <b-button variant @click="cancel()">
            <i class="icon-close"></i> Close
          </b-button>
        </template>
      </b-modal>
      <nav
        class="d-flex justify-content-center"
        v-if="listMaps.total > listMaps.page_size && listMaps.items.length > 0"
      >
        <b-pagination
          :total-rows="listMaps.total"
          :per-page="params.limit"
          v-model="params.page"
          prev-text="Prev"
          next-text="Next"
          hide-goto-end-buttons
          @change=";(params.page = $event), paramsChange()"
          limit="10"
          hide-ellipsis
        />
      </nav>
    </b-card>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import vToasted from '@/shared/notification'
import * as TYPE from '@/actionTypes.js'
import { GoogleShoppingGPIDStatus } from '@/constants/Map'
import _ from 'lodash'
import _nav from '@/_nav'
import LoadingSpinner from '@/components/common/LoadingSpinner'

export default {
  name: 'c-table',
  inheritAttrs: false,
  mixins: [vToasted],
  components: {
    LoadingSpinner
  },
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
    }
  },
  data: () => {
    return {
      GoogleShoppingMapStatus: GoogleShoppingGPIDStatus,
      params: null,
      validReports: [],
      brandNames: [],
      nav: _nav,
      mapId: null,
      currentItem: {
        currentMapItem: null,
        currentDiscoveredGpidItem: null
      },
      selectedMaps: [],
      review: {
        isOpenReview: false,
        discoveredGpidList: [],
        reviewMapItem: null,
        asin: '',
        upc: '',
        sku: '',
        price: '',
        selectedOption: {},
        textTitle: '',
        amazon_title: '',
        amazon_image_uri: '',
        listGPID: []
      },
      fieldsReview: [
        {
          key: 'index',
          label: '#',
          thClass: 'th-index'
        },
        {
          key: 'gpid',
          label: 'GPID'
        },
        {
          key: 'date',
          label: 'Date'
        },
        {
          key: 'title',
          label: 'Title'
        },
        {
          key: 'price',
          label: 'Price',
          thClass: 'th-price'
        },
        {
          key: 'link',
          label: 'Link',
          thClass: 'th-link'
        },
        {
          key: 'actions',
          label: 'Actions',
          thClass: 'th-action'
        }
      ],
      discoveredGPIDOptions: [
        {
          value: 'positive',
          name: 'Positive'
        },
        {
          value: 'matched',
          name: 'Title or Brand Matched'
        },
        {
          value: 'notmatched',
          name: 'Title and Brand Not Matched'
        },
        {
          value: 'accepted',
          name: 'Accepted'
        },
        {
          value: 'denied',
          name: 'Denied'
        },
        {
          value: 'all',
          name: 'All'
        }
      ],
      reviewStatusOptions: [
        {
          value: 'no_accepted_gpid',
          name: 'No accepted gpid'
        },
        {
          value: 'need_review',
          name: 'Need review'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      getPermissions: `mw/${TYPE.GET_PERMISSIONS}`,
      defaultParams: `mw/maps/${TYPE.GET_DEFAULT_PARAMS}`,
      defaultAmazonMapParams: `mw/maps/${TYPE.GET_DEFAULT_AMAZON_MAP_PARAMS}`,
      reportList: `mw/reports/${TYPE.GET_LIST_REPORTS}`,
      gsReportList: `mw/reports/${TYPE.GET_VALID_GS_REPORTS}`,
      listMaps: `mw/maps/${TYPE.GET_GS_MAPS}`,
      mapPricingGsLoading: `mw/maps/${TYPE.GET_MAP_PRICING_GS_LOADING}`,
      listDiscoveredGPID: `mw/maps/${TYPE.GET_LIST_DISCOVERED_GPID}`
    }),
    captions: function () {
      const { fields } = this
      return fields
    },
    getItems: function () {
      return (this.listMaps.items || []).map(item => {
        this.$set(item, 'checkAccepted', item.discovered_gpids.filter(element => {
          return element.status === GoogleShoppingGPIDStatus.ACCEPTED
        }))
        this.$set(item, 'checkNormal', item.discovered_gpids.filter(element => {
          return (element.is_similar_to_amazon_title || element.is_similar_to_brand_name) && element.status === GoogleShoppingGPIDStatus.NORMAL
        }))

        const goodScoreItems = item.discovered_gpids.filter(element => {
          return element.status === GoogleShoppingGPIDStatus.NORMAL && element.similar_to_amazon_title_score >= 0.6
        })
        const acceptedItems = item.discovered_gpids.filter(element => {
          return element.status === GoogleShoppingGPIDStatus.ACCEPTED
        })
        const topScoreItems = item.discovered_gpids.filter(element => {
          return element.status === GoogleShoppingGPIDStatus.NORMAL && element.similar_to_amazon_title_score >= 0.8
        })
        const normalItems = item.discovered_gpids.filter(element => {
          return element.status === GoogleShoppingGPIDStatus.NORMAL
        })
        if (goodScoreItems.length === 0 && acceptedItems.length === 0) {
          this.$set(item, 'reviewButtonVariant', 'secondary')
        } else if (goodScoreItems.length > 0 && acceptedItems.length === 0 && topScoreItems.length !== 1) {
          this.$set(item, 'reviewButtonVariant', 'danger')
        } else {
          this.$set(item, 'reviewButtonVariant', 'primary')
        }

        if (normalItems.length === 0) {
          this.$set(item, 'reviewNormalButton', true)
        } else {
          this.$set(item, 'reviewNormalButton', false)
        }
        return item
      })
    },
    allSelected: {
      get: function () {
        let items = this.getItems
        return !_.isEmpty(items) && items.length === this.selectedMaps.length
      },
      set: function (newValue) {
        let items = this.getItems
        this.selectedMaps = newValue ? items.map((item) => item.id) : items.length === this.selectedMaps.length ? [] : this.selectedMaps
      }
    },
    reportOptions() {
      return this.validReports.map((item) => ({
        value: item._id,
        text: item.name_in_dashboard
      }))
    },
    brandOptions() {
      return this.brandNames.map((name) => ({
        value: name === '' ? -1 : name,
        text: name
      }))
    },
    getListDiscoveredGPID() {
      if (!_.isEmpty(this.listDiscoveredGPID)) {
        if (this.review.selectedOption === 'matched') {
          const filterListMatched = this.listDiscoveredGPID.filter(item => item.is_similar_to_amazon_title || item.is_similar_to_brand_name).filter(item => {
            return item.title.toLowerCase().includes(this.review.textTitle.toLowerCase())
          })
          return _.orderBy(filterListMatched, ['similar_to_amazon_title_score'], ['desc'])
        } else if (this.review.selectedOption === 'notmatched') {
          const filterListNotmatched = this.listDiscoveredGPID.filter(item => !item.is_similar_to_amazon_title && !item.is_similar_to_brand_name).filter(item => {
            return item.title.toLowerCase().includes(this.review.textTitle.toLowerCase())
          })
          return _.orderBy(filterListNotmatched, ['similar_to_amazon_title_score'], ['desc'])
        } else if (this.review.selectedOption === 'accepted') {
          const filterListAccepted = this.listDiscoveredGPID.filter(item => item.status === this.GoogleShoppingMapStatus.ACCEPTED).filter(item => {
            return item.title.toLowerCase().includes(this.review.textTitle.toLowerCase())
          })
          return _.orderBy(filterListAccepted, ['similar_to_amazon_title_score'], ['desc'])
        } else if (this.review.selectedOption === 'denied') {
          const filterListDenied = this.listDiscoveredGPID.filter(item => item.status === this.GoogleShoppingMapStatus.DENIED).filter(item => {
            return item.title.toLowerCase().includes(this.review.textTitle.toLowerCase())
          })
          return _.orderBy(filterListDenied, ['similar_to_amazon_title_score'], ['desc'])
        } else if ((this.review.selectedOption === 'positive')) {
          const filterListPositive = this.listDiscoveredGPID.filter(item => item.status === this.GoogleShoppingMapStatus.ACCEPTED || item.similar_to_amazon_title_score >= 0.6).filter(item => {
            return item.title.toLowerCase().includes(this.review.textTitle.toLowerCase())
          })
          return _.orderBy(filterListPositive, ['similar_to_amazon_title_score'], ['desc'])
        } else {
          const filterListDiscoveredGPID = this.listDiscoveredGPID.filter(item => {
            return item.title.toLowerCase().includes(this.review.textTitle.toLowerCase())
          })
          return _.orderBy(filterListDiscoveredGPID, ['similar_to_amazon_title_score'], ['desc'])
        }
      }
      const filterDiscoveredGpidList = this.review.discoveredGpidList.filter(item => {
        return item.title.toLowerCase().includes(this.review.textTitle.toLowerCase())
      })
      return _.orderBy(filterDiscoveredGpidList, ['similar_to_amazon_title_score'], ['desc'])
    },
    getTotalList() {
      let newList = []
      if (!_.isEmpty(this.listDiscoveredGPID)) {
        this.discoveredGPIDOptions.map(item => {
          let option = item.value
          if (option === 'matched') {
            const filterListMatched = this.listDiscoveredGPID.filter(item => item.is_similar_to_amazon_title || item.is_similar_to_brand_name).filter(item => {
              return item.title.toLowerCase().includes(this.review.textTitle.toLowerCase())
            })
            const filterListMatchedDenied = filterListMatched.filter(element => element.status === 'denied').length
            newList.push({
              total: filterListMatched.length,
              option,
              totalDenied: filterListMatchedDenied
            })
          } else if (option === 'notmatched') {
            const filterListNotmatched = this.listDiscoveredGPID.filter(item => !item.is_similar_to_amazon_title && !item.is_similar_to_brand_name).filter(item => {
              return item.title.toLowerCase().includes(this.review.textTitle.toLowerCase())
            })
            const filterListNotmatchedDenied = filterListNotmatched.filter(element => element.status === 'denied').length
            newList.push({
              total: filterListNotmatched.length,
              option,
              totalDenied: filterListNotmatchedDenied
            })
          } else if (option === 'accepted') {
            const filterListAccepted = this.listDiscoveredGPID.filter(item => item.status === this.GoogleShoppingMapStatus.ACCEPTED).filter(item => {
              return item.title.toLowerCase().includes(this.review.textTitle.toLowerCase())
            })
            const filterListAcceptedDenied = filterListAccepted.filter(element => element.status === 'denied').length
            newList.push({
              total: filterListAccepted.length,
              option,
              totalDenied: filterListAcceptedDenied
            })
          } else if (option === 'denied') {
            const filterListDenied = this.listDiscoveredGPID.filter(item => item.status === this.GoogleShoppingMapStatus.DENIED).filter(item => {
              return item.title.toLowerCase().includes(this.review.textTitle.toLowerCase())
            })
            const filterListDeniedDenied = filterListDenied.filter(element => element.status === 'denied').length
            newList.push({
              total: filterListDenied.length,
              option,
              totalDenied: filterListDeniedDenied
            })
          } else if ((option === 'positive')) {
            const filterListPositive = this.listDiscoveredGPID.filter(item => item.status === this.GoogleShoppingMapStatus.ACCEPTED || item.similar_to_amazon_title_score >= 0.6).filter(item => {
              return item.title.toLowerCase().includes(this.review.textTitle.toLowerCase())
            })
            const filterListPositiveDenied = filterListPositive.filter(element => element.status === 'denied').length
            newList.push({
              total: filterListPositive.length,
              option,
              totalDenied: filterListPositiveDenied
            })
          } else {
            const filterListDiscoveredGPID = this.listDiscoveredGPID.filter(item => {
              return item.title.toLowerCase().includes(this.review.textTitle.toLowerCase())
            })
            const filterListDiscoveredGPIDDenied = filterListDiscoveredGPID.filter(element => element.status === 'denied').length
            newList.push({
              total: filterListDiscoveredGPID.length,
              option,
              totalDenied: filterListDiscoveredGPIDDenied
            })
          }
        })
      }
      return newList
    },
    valueOptions() {
      return this.discoveredGPIDOptions.map((item) => ({
        value: item.value,
        text: item.name + ` (${_.get(this.getTotalList.find(element => element.option === item.value), 'total', 0)})`
      }))
    },
    checkJumpToNextOption() {
      const findValuePositive = this.getTotalList.find(element => element.total > 0 && element.option === 'positive' && element.total !== element.totalDenied)
      const findValueMatched = this.getTotalList.find(element => element.total > 0 && element.option === 'matched' && element.total !== element.totalDenied)
      const findValueAll = this.getTotalList.find(element => element.total > 0 && element.option === 'all')
      if (findValuePositive) return _.get(findValuePositive, 'option', 0)
      else if (findValueMatched) return _.get(findValueMatched, 'option', 0)
      else return _.get(findValueAll, 'option', 0)
    },
    reviewStatusValueOptions() {
      return this.reviewStatusOptions.map((item) => ({
        value: item.value,
        text: item.name
      }))
    }
  },
  methods: {
    ...mapMutations({
      resetMapItem: `mw/maps/${TYPE.RESET_LIST_DISCOVERED_GPID}`
    }),
    ...mapActions({
      fetchMaps: `mw/maps/${TYPE.FETCH_LIST_GS_MAPS}`,
      fetchReports: `mw/reports/${TYPE.FETCH_LIST_REPORTS}`,
      fetchValidGSReport: `mw/reports/${TYPE.GET_VALID_GS_REPORTS}`,
      removeGSMap: `mw/maps/${TYPE.REMOVE_GS_MAP}`,
      acceptDiscoveredGpid: `mw/maps/${TYPE.ACCEPT_DISCOVERED_GPID}`,
      removeDiscoveredGpid: `mw/maps/${TYPE.REMOVE_DISCOVERED_GPID}`,
      deniedDiscoveredGpid: `mw/maps/${TYPE.DENIED_DISCOVERED_GPID}`,
      fetchUrlDownload: `mw/maps/${TYPE.FETCH_URL_GS_MAP_EXPORT}`,
      updateTotalGSMap: `mw/maps/${TYPE.UPDATE_TOTAL_GS_MAP}`,
      fetchGSBrandNames: `mw/maps/${TYPE.GET_GS_BRAND_NAMES}`,
      editDiscoveryGpidNeeded: `mw/maps/${TYPE.EDIT_GPID_DISCOVERY_NEEDED}`
    }),
    updateCurrentMapItem(currentMapItem, currentDiscoveredGpidItem) {
      this.currentItem.currentMapItem = currentMapItem
      this.currentItem.currentDiscoveredGpidItem = currentDiscoveredGpidItem
      this.currentItem.gpid = currentDiscoveredGpidItem ? currentDiscoveredGpidItem.gpid : currentMapItem.gpid
    },
    generateAmazonLink(asin) {
      return `https://www.amazon.com/gp/offer-listing/${asin}`
    },
    sortChange(event) {
      this.params.searchort_by = event.sortBy
      if (event.sortBy) {
        this.params.searchort_dir = event.sortDesc ? 'desc' : 'asc'
      } else {
        this.params.searchort_dir = null
      }
      this.paramsChange()
    },
    syncParams() {
      this.paramsChange()
    },
    async paramsChange() {
      await this.fetchMaps(this.params)
      this.$router.push(
        {
          params: {
            client_id: this.nav.clientId
          },
          query: {
            search: this.params.search,
            report_id: this.params.report_id,
            brand_name: this.params.brand_name,
            limit: this.params.limit ? this.params.limit : 100,
            page: this.params.page ? this.params.page : 1,
            review_status: this.params.review_status
          }
        },
        () => {}
      )
    },
    async reportChange() {
      this.params.brand_name = null
      await this.reloadBrandNames()
      await this.paramsChange()
    },
    async fetchUniqReportId() {
      this.validReports = await this.fetchValidGSReport()
      this.reloadBrandNames()
    },
    async reloadBrandNames() {
      this.brandNames = await this.fetchGSBrandNames({
        report_id: this.params.report_id
      })
    },
    async handleOpenModelDownload() {
      try {
        const res = await this.fetchUrlDownload({ search: this.$route.query.search, report_id: this.$route.query.report_id, brand_name: this.$route.query.brand_name })
        window.location.href = res.url
      } catch (error) {
        this.vToasted('error', error.message)
      }
    },
    handleEditMap(mapId) {
      this.$router.push({
        name: 'MWEditGSMaps',
        params: { client_id: this.nav.clientId, id: mapId },
        query: { ...this.$router.history.current.query }
      })
    },
    async checkIfNeedShowPopup() {
      const map = this.currentItem.currentMapItem
      /* eslint-disable */
      const { gpid, discovered_gpids } = map
      if (!_.find(discovered_gpids, { gpid: gpid })) {
        this.$root.$emit('bv::show::modal', 'modal-confirm-denied-gpid')
      } else {
        await this.handleDeniedDiscoveredGpid()
      }
    },
    async handleDeniedDiscoveredGpid() {
      try {
        const map = this.currentItem.currentMapItem
        const { gpid, status } = this.currentItem.currentDiscoveredGpidItem
        await this.deniedDiscoveredGpid({ gpid: gpid, id: map.id })
        // const gpid = map.gpid
        // this.currentItem.currentMapItem.gpid = ''
        // this.currentItem.currentMapItem.title = ''
        // this.currentItem.currentMapItem.link = ''
        this.currentItem.currentDiscoveredGpidItem.status = this.GoogleShoppingMapStatus.DENIED
        if (status === this.GoogleShoppingMapStatus.NORMAL || status === this.GoogleShoppingMapStatus.ACCEPTED) {
          this.vToasted('success', `Discovered GPID ${gpid} has been marked as denied.`, 'top-right')
        }
        if (status === this.GoogleShoppingMapStatus.DENIED) {
          this.vToasted('success', `Discovered GPID ${gpid} has been marked as normal.`, 'top-right')
        }
      } catch (error) {
        // this.vToasted('error', error.data.message)
        this.vToasted('error', error)
      }
    },
    async handleRemoveDiscoveredGpid() {
      try {
        const map = this.currentItem.currentMapItem
        const gpid = this.currentItem.gpid
        const mapIndex = _.findIndex(this.listMaps.items, item => item.id === map.id)
        const newItem = await this.removeDiscoveredGpid({ gpid: gpid, id: map.id })
        // if (status === this.GoogleShoppingMapStatus.ACCEPTED) {
        //   await this.handleDeniedDiscoveredGpid()
        // }
        if (this.currentItem.currentMapItem.gpid !== gpid) {
          this.currentItem.currentDiscoveredGpidItem.status = this.GoogleShoppingMapStatus.NORMAL
        }
        else {
          this.currentItem.currentMapItem.gpid = ''
        }
        this.$set(this.listMaps.items, mapIndex, newItem)
        this.vToasted('success', `GPID ${gpid} has been removed.`)
      } catch (error) {
        // this.vToasted('error', error.data.message)
        this.vToasted('error', error)
      }
    },
    async handleAcceptDiscoveredGpid() {
      try {
        const map = this.currentItem.currentMapItem
        const { gpid, title, link, status } = this.currentItem.currentDiscoveredGpidItem
        await this.acceptDiscoveredGpid({ gpid: gpid, id: map.id })
        this.currentItem.currentDiscoveredGpidItem.gpid = gpid
        this.currentItem.currentDiscoveredGpidItem.status = this.GoogleShoppingMapStatus.ACCEPTED
        // this.currentItem.currentMapItem.title = this.currentItem.currentDiscoveredGpidItem.title
        // this.currentItem.currentMapItem.gpid = gpid
        // this.currentItem.currentMapItem.title = title
        // this.currentItem.currentMapItem.link = link
        if (status === this.GoogleShoppingMapStatus.NORMAL || status === this.GoogleShoppingMapStatus.DENIED) {
          this.vToasted('success', `Discovered GPID ${gpid} has been cloned to the GPID column.`, 'top-right')
        }
        if (status === this.GoogleShoppingMapStatus.ACCEPTED) {
          this.vToasted('success', `Discovered GPID ${gpid} has been marked as normal.`, 'top-right')
        }
      } catch (error) {
        // this.vToasted('error', error.data.message)
        this.vToasted('error', error)
      }
    },
    async handleremoveGSMap(mapId) {
      try {
        await this.removeGSMap(mapId)
        this.vToasted('success', `This MAP has been removed successfully.`)
      } catch (error) {
        // this.vToasted('error', error.data.message)
        this.vToasted('error', error)
      }
    },
    handleRemoveMulti() {
      let allRemove = this.selectedMaps.map((mapId) => this.removeGSMap(mapId))
      Promise.all(allRemove)
        .then((values) => {
          const newTotalGSmaps = this.listMaps.total - this.selectedMaps.length
          this.updateTotalGSMap(newTotalGSmaps)
          this.vToasted(
            'success',
            `All selected MAPs have been removed successfully.`
          )
          this.selectedMaps = []
        })
        .catch((error) => {
          this.vToasted('error', error.data.message)
        })
    },
    handleReviewDiscoveredGpids(item, mapItem) {
      if (!this.review.isOpenReview) this.review.textTitle = ''
      this.review.selectedOption = this.valueOptions[0].value
      this.review.isOpenReview = true
      this.review.discoveredGpidList = item
      this.review.reviewMapItem = mapItem
      this.review.asin = mapItem.asin
      this.review.upc = mapItem.upc
      this.review.sku = mapItem.sku
      this.review.price = mapItem.price
      this.review.amazon_title = mapItem.amazon_title
      this.review.amazon_image_uri = mapItem.amazon_image_uri
      this.resetMapItem(this.review.discoveredGpidList)
      this.review.listGPID = item
      this.review.selectedOption = this.checkJumpToNextOption
    },
    async checkDenied() {
      const { status } = this.currentItem.currentDiscoveredGpidItem
      if (status === this.GoogleShoppingMapStatus.ACCEPTED) {
        this.$bvModal.show('modal-confirm-denied-gpid')
      }
      else {
        await this.handleDeniedDiscoveredGpid()
      }
    },
    updateDiscoveryGpidNeeded(mapId, checked) {
      try {
        this.editDiscoveryGpidNeeded({ id: mapId, data: checked })
      } catch (error) {
        this.vToasted('error', error)
      }
    }
  },
  created() {
    this.params = _.defaultsDeep(this.$route.query, this.defaultParams)
    this.syncParams()
    this.fetchUniqReportId()
  }
}
</script>

<style lang="scss" scoped>
.map-list-title {
  position: relative;
  top: 4px;
}
.dropdown-action {
  margin: 0 !important;
}
.max-width-300 {
  max-width: 300px;
}
.btn-loader {
  width: 12px !important;
  height: 12px !important;
  border-width: 1px !important;
}
.cls-denied {
  opacity: 0.5;
}
.tbl-review ::v-deep {
  max-height: 300px; 
  overflow: hidden; 
  overflow-y: auto;

  .th-index {
    width: 3%;
  }
  .th-price {
    width: 7%;
  }
  .th-link {
    width: 7%;
  }
  .th-action {
    width: 10%;
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
.cls-amazon-title {
  margin-bottom: 15px;
}
.cls-select-options ::v-deep {
  // margin-bottom: 10px;
  .cls-option-title {
    margin-bottom: 0px;
    margin-right: 5px;
  }
  // .drp-option {
  //   width: 30%;
  // }
}
</style>
