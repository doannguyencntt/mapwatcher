import _nav from '@/_nav'

const CLIENT_ID = () => _nav.clientId || process.env.VUE_APP_MW_DEV_CLIENT_ID

// reports
export const GET_POST_REPORTS = () => `/v1/clients/${CLIENT_ID()}/reports`
export const GET_POST_SELLER_ENFORCEMENT = () => `/v1/clients/${CLIENT_ID()}/seller-enforcements`
export const GET_POST_MANUAL_SEND_MAIL_SELLER_ENFORCEMENT = (id) => `/v1/clients/${CLIENT_ID()}/seller-enforcements/${id}/send/manually`
export const GET_SELLER_ENFORCEMENT_HISTORY_DATE = (id) => `/v1/clients/${CLIENT_ID()}/seller-enforcements/${id}/violation-dates`
export const EDIT_AND_REMOVE_REPORTS = (params) =>
  `/v1/clients/${CLIENT_ID()}/reports/${params}`
export const EDIT_AND_REMOVE_SELLER_ENFORCEMENT = (params) =>
  `/v1/clients/${CLIENT_ID()}/seller-enforcements/${params}`
export const RUN_A_REPORT = (reportId) =>
  `/v1/clients/${CLIENT_ID()}/reports/${reportId}/jobs/run`
export const RUN_A_GS_REPORT = (reportId) =>
  `/v1/clients/${CLIENT_ID()}/reports/${reportId}/gs-jobs/run`
export const CANCEL_A_REPORT = (reportId, marketplace) =>
  `/v1/clients/${CLIENT_ID()}/reports/${reportId}/marketplaces/${marketplace}/jobs/cancel`
export const FORCE_RUN_A_REPORT = (reportId) =>
  `/v1/clients/${CLIENT_ID()}/reports/${reportId}/jobs/force-run`
export const CHECK_STATUS_RUN_A_REPORT = (reportId) =>
  `/v1/clients/${CLIENT_ID()}/reports/${reportId}`
export const GET_ONE_REPORT_BY_ID = (id) =>
  `/v1/clients/${CLIENT_ID()}/reports/${id}`
export const GET_VALID_AMAZON_REPORT = () => `/v1/clients/${CLIENT_ID()}/reports/amazon-valid-only`
export const GET_VALID_GS_REPORT = () => `/v1/clients/${CLIENT_ID()}/reports/google-shopping-valid-only`
export const RUN_AN_INVENTORY = (reportId, marketplace) =>
  `/v1/clients/${CLIENT_ID()}/reports/${reportId}/marketplaces/${marketplace}/inventory-schedules/run`
export const CANCEL_AN_INVENTORY = (reportId, marketplace) =>
  `/v1/clients/${CLIENT_ID()}/reports/${reportId}/marketplaces/${marketplace}/inventory-schedules/cancel`
export const FETCH_INVENTORY_HISTORY = (reportId, marketplace) =>
  `/v1/clients/${CLIENT_ID()}/reports/${reportId}/marketplaces/${marketplace}/inventory-schedules/history`
export const FETCH_INVENTORY_SCHEDULES = (reportId, marketplace) =>
  `/v1/clients/${CLIENT_ID()}/reports/${reportId}/marketplaces/${marketplace}/inventory-schedules`
export const REMOVE_INVENTORY_SCHEDULE = (reportId, marketplace, id) =>
  `/v1/clients/${CLIENT_ID()}/reports/${reportId}/marketplaces/${marketplace}/inventory-schedules/${id}`
export const CHANGE_REPORT_SCHEDULE_MODE = (reportId, marketplace) =>
  `/v1/clients/${CLIENT_ID()}/reports/${reportId}/marketplaces/${marketplace}/report-schedule-mode`

// map price
export const GET_MAPS = () => `/v1/clients/${CLIENT_ID()}/maps`
export const GET_SELLER_ENFORCEMENTS = () => `/v1/clients/${CLIENT_ID()}/seller-enforcements`
export const GET_SELLER_ENFORCEMENT_HISTORIES = (id) => `/v1/clients/${CLIENT_ID()}/seller-enforcements/${id}/histories`
export const GET_GS_MAPS = () => `/v1/clients/${CLIENT_ID()}/gs-maps`
export const GET_REPORT_MARKETPLACE_HISTORY = (reportId, marketplace) => `/v1/clients/${CLIENT_ID()}/reports/${reportId}/marketplaces/${marketplace}/history`
export const PUT_IMPORT_MAPS = () => `/v1/clients/${CLIENT_ID()}/maps/import`
export const GET_EXPORT_MAP = () => `/v1/clients/${CLIENT_ID()}/maps/export`
export const GET_EXPORT_SI_SELLER_LIST = () => `/v1/clients/${CLIENT_ID()}/si_sellers/export`
export const GET_EXPORT_GS_MAP = () => `/v1/clients/${CLIENT_ID()}/gs-maps/export`
export const GET_EDIT_AND_REMOVE_A_MAP = (id) => `/v1/clients/${CLIENT_ID()}/maps/${id}`
export const GET_EDIT_AND_REMOVE_A_GS_MAP = (id) => `/v1/clients/${CLIENT_ID()}/gs-maps/${id}`
export const ACCEPT_DISCOVERED_GPID = (id) => `/v1/clients/${CLIENT_ID()}/gs-maps/${id}/discovered_gpids/accept`
export const DENIED_DISCOVERED_GPID = (id) => `/v1/clients/${CLIENT_ID()}/gs-maps/${id}/discovered_gpids/deny`
export const REMOVE_DISCOVERED_GPID = (id) => `/v1/clients/${CLIENT_ID()}/gs-maps/${id}/gpids/remove`
export const POST_POLICY_NOTIFICATION = () => `/v1/clients/${CLIENT_ID()}/seller-enforcements/notify-map-policy-update`
export const GET_VIOLATION_MARKETPLACE_HISTORY = () => `/v1/clients/${CLIENT_ID()}/reports/daily-violators/renew-if-needed`
export const GET_BRAND_NAMES = () => `/v1/clients/${CLIENT_ID()}/maps/brand-names`
export const GET_GS_BRAND_NAMES = () => `/v1/clients/${CLIENT_ID()}/gs-maps/brand-names`
export const PUT_GPID_DISCOVERY_NEEDED = (id) => `v1/clients/${CLIENT_ID()}/gs-maps/${id}/gpid-discovery-needed`

// setting
export const GET_SETTINGS = () => `/v1/settings/${CLIENT_ID()}`
export const PUT_SETTINGS = () => `/v1/settings/${CLIENT_ID()}`

// images
export const POST_IMAGES = '/v1/upload'
export const POST_FILES = () => `/v1/clients/${CLIENT_ID()}/upload-file`

// download job
export const DOWNLOAD_JOB_BY_ID = (id) =>
  `/v1/clients/${CLIENT_ID()}/reports/download`

//
export const DAILY_VIOLATORS = () =>
  `/v1/clients/${CLIENT_ID()}/reports/daily-violators`
export const DAILY_ALL_WIDGET = () =>
  `/v1/clients/${CLIENT_ID()}/reports/dashboard/all`
export const DAILY_VIOLATORS_WITH_INVENTORY = () =>
  `/v1/clients/${CLIENT_ID()}/reports/daily-violators-with-inventory`
// top violated products 7 days
export const TOP_VIOLATED_PRODUCTS = () =>
  `/v1/clients/${CLIENT_ID()}/reports/top-violated-products-7d`
// New 1st time violators
export const NEW_1ST_TIME_VIOLATORS = () =>
  `/v1/clients/${CLIENT_ID()}/reports/daily-violators-1st-time`
// New 2nd time violators
export const NEW_2ND_TIME_VIOLATORS = () =>
  `/v1/clients/${CLIENT_ID()}/reports/daily-violators-2nd-time`
// Seller violations 7d
export const SELLER_VIOLATIONS_7D = () =>
  `/v1/clients/${CLIENT_ID()}/reports/seller-violations-7d`
// Average percentage off MAP
export const AVG_PERCENTAGE_OFF_MAP = () =>
  `/v1/clients/${CLIENT_ID()}/reports/average-percentage-off-map`
// New repeat violators
export const NEW_REPEAT_VIOLATORS = () =>
  `/v1/clients/${CLIENT_ID()}/reports/new-repeat-violators`
// All repeat offenders
export const ALL_REPEAT_OFFENDERS = () =>
  `/v1/clients/${CLIENT_ID()}/reports/all-repeat-offenders`
// Historical Data Table
export const HISTORICAL_DATA_TABLE = ``
// Number of violations
export const DATE_HISTORICAL = () =>
  `/v1/clients/${CLIENT_ID()}/reports/history/dates`
// Number of violations
export const NUMBER_OF_VIOLATIONS = () =>
  `/v1/clients/${CLIENT_ID()}/reports/number-of-violations`
// Number of violations and violators
export const NUMBER_OF_VIOLATIONS_VIOLATORS = () =>
  `/v1/clients/${CLIENT_ID()}/reports/number-of-violations-and-violators`

// Download Violations
export const DOWNLOAD_VIOLATIONS = () =>
  `/v1/clients/${CLIENT_ID()}/reports/daily-violators/download`
export const DOWNLOAD_VIOLATIONS_WITH_INVENTORY = () =>
  `/v1/clients/${CLIENT_ID()}/reports/daily-violators-with-inventory/download`
// Download New Repeat Violators
export const DOWNLOAD_NEW_REPEAT_VIOLATORS = () =>
  `/v1/clients/${CLIENT_ID()}/reports/new-repeat-violators/download`

// get data source map
export const DS_MAPS = () => `v1/clients/${CLIENT_ID()}/ds-map`

// permissions
export const FETCH_PERMISSIONS = () =>
  `/v1/clients/${CLIENT_ID()}/setting/permissions`
export const FETCH_IS_OE_USER = () =>
  `/v1/clients/${CLIENT_ID()}/setting/is_oe_user`

// ------------------------------------ SELLERS & INVESTIGATIONS ------------------------------------//
// ------ MANAGE SELLER ------//
export const GET_SI_SELLER_LIST = (clientID, params) => `/v1/clients/${clientID}/si_sellers${params}`
export const GET_ONE_SI_SELLER = (clientID, sellerID) => `/v1/clients/${clientID}/si_sellers/${sellerID}`
export const CREATE_SI_SELLER = (clientID) => `/v1/clients/${clientID}/si_sellers`
export const UPDATE_SI_SELLER = (clientID, sellerID) => `/v1/clients/${clientID}/si_sellers/${sellerID}`
export const DELETE_SI_SELLER = (clientID, sellerID) => `/v1/clients/${clientID}/si_sellers/${sellerID}`
// ------------------------------------ //
// ------ MANAGE SELLER ------//
export const GET_SI_LISTINGS = (clientID, params) => `/v1/clients/${clientID}/si_listings${params}`
export const GET_ONE_SI_LISTING = (clientID, listingID) => `/v1/clients/${clientID}/si_listings/${listingID}`
export const CREATE_SI_LISTING = (clientID) => `/v1/clients/${clientID}/si_listings`
export const UPDATE_SI_LISTING = (clientID, listingID) => `/v1/clients/${clientID}/si_listings/${listingID}`
export const DELETE_SI_LISTING = (clientID, listingID) => `/v1/clients/${clientID}/si_listings/${listingID}`
// ------------------------------------ //
// ------ MANAGE SELLER ------//
export const GET_SI_DASHBOARD_COMPLIED_ACTIVE_ROGUE = (clientID, params) => `/v1/clients/${CLIENT_ID()}/si_dashboards/complied_active_rogue`
export const GET_SI_DASHBOARD_COMPLETION = (clientID, params) => `/v1/clients/${CLIENT_ID()}/si_dashboards/completion`
export const GET_SI_DASHBOARD_GMR = (clientID, params) => `/v1/clients/${CLIENT_ID()}/si_dashboards/gmr`
export const GET_SI_DASHBOARD_ARBITRAGE = (clientID, params) => `/v1/clients/${CLIENT_ID()}/si_dashboards/arbitrage`
export const GET_SI_DASHBOARD_TOTAL_LISTING = (clientID, params) => `/v1/clients/${CLIENT_ID()}/si_dashboards/total_listing`
export const GET_SI_DASHBOARD_SELLER_STATUS = (clientID, params) => `/v1/clients/${CLIENT_ID()}/si_dashboards/seller_status`

// -------------------------------------Error Handle----------------------------------- //
export const GET_GLOBAL_TOAST_INFO = 'GET_GLOBAL_TOAST_INFO'
export const SAVE_GLOBAL_TOAST_INFO = 'SAVE_GLOBAL_TOAST_INFO'
export const SAVE_ERROR_NETWORK_TOAST_INFO = 'SAVE_ERROR_NETWORK_TOAST_INFO'
