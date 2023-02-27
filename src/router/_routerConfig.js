import DefaultContainer from '@/containers/DefaultContainer'
import EmptyContainer from '@/containers/EmptyContainer'

const maps = [
  {
    path: 'maps/list',
    name: 'MWListMaps',
    meta: {
      label: 'MAP Pricing',
      title: 'Table of MAPs',
      tableName: 'Table of MAPs',
      reloadPermissions: true
    },
    component: { template: `<MWListMaps></MWListMaps>` }
  },
  {
    path: 'amazon-maps/import',
    name: 'MWImportAmazonMaps',
    meta: {
      label: 'Amazon import',
      title: 'Amazon import',
      reloadPermissions: true
    },
    component: { template: `<MWImportAmazonMaps></MWImportAmazonMaps>` }
  },
  {
    path: 'amazon-maps/validate/:import_id',
    name: 'MWValidateAmazonMaps',
    meta: {
      label: 'Amazon import validate',
      title: 'Amazon import validate'
    },
    component: { template: `<MWValidateAmazonMaps></MWValidateAmazonMaps>` }
  },
  {
    path: 'amazon-maps/process/:import_id',
    name: 'MWProcessAmazonMaps',
    meta: {
      label: 'Amazon import process',
      title: 'Amazon import process'
    },
    component: { template: `<MWProcessAmazonMaps></MWProcessAmazonMaps>` }
  },
  {
    path: 'amazon-maps/result/:import_id',
    name: 'MWResultAmazonMaps',
    meta: {
      label: 'Amazon import result',
      title: 'Amazon import result'
    },
    component: { template: `<MWResultAmazonMaps></MWResultAmazonMaps>` }
  },
  {
    path: 'maps/edit/:id',
    name: 'MWEditMaps',
    meta: {
      label: 'Manage MAPs',
      title: 'Edit MAPs'
    },
    props: true,
    component: { template: `<MWEditMaps></MWEditMaps>` }
  }
]

const listings = [
  {
    path: 'si-listings/dashboard',
    name: 'MWSellerDashboardIndex',
    meta: {
      label: 'Listings Dashboard',
      title: 'Listings Dashboard',
      reloadPermissions: true
    },
    permissions: ['siview'],
    component: { template: `<MWSellerDashboardIndex></MWSellerDashboardIndex>` }
  },
  {
    path: 'listings',
    name: 'MWSIListings',
    meta: {
      label: 'Listings',
      reloadPermissions: true,
      title: 'Listings'
    },
    permissions: ['siview'],
    component: { template: `<MWSIListings></MWSIListings>` }
  },
  {
    path: 'listings/add',
    name: 'MWSIAddListing',
    meta: {
      label: 'Add Listing',
      reloadPermissions: true,
      title: 'Add Listing'
    },
    permissions: ['siman'],
    component: { template: `<MWSIAddListing></MWSIAddListing>` }
  },
  {
    path: 'listings/:listing_id',
    meta: {
      label: 'Edit Listing',
      reloadPermissions: true,
      title: 'Edit Listing'
    },
    permissions: ['siman'],
    name: 'MWSIEditListing',
    component: { template: `<MWSIEditListing></MWSIEditListing>` }
  },
  {
    path: 'sellers',
    meta: {
      label: 'Sellers',
      reloadPermissions: true,
      title: 'Sellers'
    },
    name: 'MWSISellerList',
    permissions: ['siview'],
    component: { template: `<MWSISellerList></MWSISellerList>` }
  },
  {
    path: 'sellers/add',
    meta: {
      label: 'Add Seller',
      reloadPermissions: false,
      title: 'Add Seller'
    },
    name: 'MWSIAddSeller',
    permissions: ['siman'],
    component: { template: `<MWSIAddSeller></MWSIAddSeller>` }
  },
  {
    path: 'sellers/:seller_id',
    meta: {
      label: 'Edit Seller',
      reloadPermissions: true,
      title: 'Edit Seller'
    },
    name: 'MWSIEditSeller',
    permissions: ['siman'],
    component: { template: `<MWSIEditSeller></MWSIEditSeller>` }
  },
  {
    path: 'si-sellers/import/upload',
    name: 'SIImportStep1Upload',
    meta: {
      label: 'Seller Upload',
      reloadPermissions: true,
      title: 'Seller Upload'
    },
    permissions: ['siman'],
    component: { template: `<SIImportStep1Upload></SIImportStep1Upload>` }
  },
  {
    path: 'si-sellers/import/validate/:import_id',
    meta: {
      label: 'Seller Validate',
      reloadPermissions: true,
      title: 'Seller Validate'
    },
    permissions: ['siman'],
    name: 'SIImportStep2Validate',
    component: { template: `<SIImportStep2Validate></SIImportStep2Validate>` }
  },
  {
    path: 'si-sellers/import/process/:import_id',
    meta: {
      label: 'Seller Process',
      reloadPermissions: true,
      title: 'Seller Process'
    },
    permissions: ['siman'],
    name: 'SIImportStep3Process',
    component: { template: `<SIImportStep3Process></SIImportStep3Process>` }
  },
  {
    path: 'si-sellers/import/result/:import_id',
    meta: {
      label: 'Seller Result',
      reloadPermissions: true,
      title: 'Seller Result'
    },
    permissions: ['siman'],
    name: 'SIImportStep4Result',
    component: { template: `<SIImportStep4Result></SIImportStep4Result>` }
  },
  {
    path: 'si-listings/import/upload',
    meta: {
      label: 'Listing Upload',
      reloadPermissions: true,
      title: 'Listing Upload'
    },
    permissions: ['siman'],
    name: 'SIListingsImportStep1Upload',
    component: { template: `<SIListingsImportStep1Upload></SIListingsImportStep1Upload>` }
  },
  {
    path: 'si-listings/import/validate/:import_id',
    meta: {
      label: 'Listing Validate',
      reloadPermissions: true,
      title: 'Listing Validate'
    },
    permissions: ['siman'],
    name: 'SIListingsImportStep2Validate',
    component: { template: `<SIListingsImportStep2Validate></SIListingsImportStep2Validate>` }
  },
  {
    path: 'si-listings/import/process/:import_id',
    meta: {
      label: 'Listing Process',
      reloadPermissions: true,
      title: 'Listing Process'
    },
    permissions: ['siman'],
    name: 'SIListingsImportStep3Process',
    component: { template: `<SIListingsImportStep3Process></SIListingsImportStep3Process>` }
  },
  {
    path: 'si-listings/import/result/:import_id',
    meta: {
      label: 'Listing Result',
      reloadPermissions: true,
      title: 'Listing Result'
    },
    permissions: ['siman'],
    name: 'SIListingsImportStep4Result',
    component: { template: `<SIListingsImportStep4Result></SIListingsImportStep4Result>` }
  }
]

const gsMaps = [
  {
    path: 'gs-maps/list',
    name: 'MWGSListMaps',
    meta: {
      label: 'GS MAP Pricing',
      title: 'Table of GS MAPs',
      tableName: 'Table of GS MAPs',
      reloadPermissions: true
    },
    component: { template: `<MWGSListMaps></MWGSListMaps>` }
  },
  {
    path: 'gs-maps/edit/:id',
    name: 'MWEditGSMaps',
    meta: {
      label: 'Manage MAPs',
      title: 'Edit MAPs'
    },
    props: true,
    component: { template: `<MWEditGSMaps></MWEditGSMaps>` }
  },
  {
    path: 'gs-maps/import',
    name: 'MWImportGSMaps',
    meta: {
      label: 'Google Shopping MAP Pricing Import',
      title: 'Google Shopping MAP Pricing Import',
      reloadPermissions: true
    },
    component: { template: `<MWImportGSMaps></MWImportGSMaps>` }
  },
  {
    path: 'gs-maps/validate/:import_id',
    name: 'MWValidateGSMaps',
    meta: {
      label: 'Google Shopping MAP Pricing Validate',
      title: 'Google Shopping MAP Pricing Validate'
    },
    component: { template: `<MWValidateGSMaps></MWValidateGSMaps>` }
  },
  {
    path: 'gs-maps/process/:import_id',
    name: 'MWProcessGSMaps',
    meta: {
      label: 'Google Shopping MAP Pricing Process',
      title: 'Google Shopping MAP Pricing Process'
    },
    component: { template: `<MWProcessGSMaps></MWProcessGSMaps>` }
  },
  {
    path: 'gs-maps/result/:import_id',
    name: 'MWResultGSMaps',
    meta: {
      label: 'Google Shopping MAP Pricing Result',
      title: 'Google Shopping MAP Pricing Result'
    },
    component: { template: `<Step4Result></Step4Result>` }
  }
]

const dashboard = [
  {
    path: 'dashboard',
    name: 'MWDashboardIndex',
    meta: {
      label: 'Dashboard',
      title: 'Dashboard'
    },
    // redirect: '/mw/dashboard/main',
    component: { template: `<MWDashboardIndex></MWDashboardIndex>` },
    children: [{
      path: 'main',
      name: 'MWDashboardMain',
      meta: {
        label: 'Main',
        title: 'Dashboard / Main',
        reloadPermissions: true
      },
      component: { template: `<MWDashboardMain></MWDashboardMain>` }
    }, {
      path: 'history',
      name: 'MWDashboardHistorical',
      meta: {
        label: 'History',
        title: 'Dashboard / History'
      },
      component: { template: `<MWDashboardHistorical></MWDashboardHistorical>` }
    }]
  }
]

const sharableDashboard = [
  {
    path: 'dashboard',
    name: 'MWShareDashboardIndex',
    meta: {
      label: 'Dashboard',
      title: 'Dashboard'
    },
    // redirect: '/mw/dashboard/main',
    component: { template: `<MWShareDashboardIndex></MWShareDashboardIndex>` },
    children: [{
      path: 'main',
      name: 'MWShareDashboardMain',
      meta: {
        label: 'Main',
        title: 'Dashboard / Main'
      },
      component: { template: `<MWShareDashboardMain></MWShareDashboardMain>` }
    }, {
      path: 'history',
      name: 'MWShareDashboardHistorical',
      meta: {
        label: 'History',
        title: 'Dashboard / History'
      },
      component: { template: `<MWShareDashboardHistorical></MWShareDashboardHistorical>` }
    }]
  }
]

const reports = [
  {
    path: 'reports/list',
    name: 'MWListReports',
    meta: {
      label: 'Manage Reports',
      title: 'List of Monitored Reports',
      tableName: 'List of Monitored Reports',
      reloadPermissions: true
    },
    component: { template: `<MWListReports></MWListReports>` }
  },
  {
    path: 'reports/marketplace/history',
    name: 'MWReportMarketplaceHistory',
    meta: {
      label: 'History Marketplace',
      title: 'List of History Marketplace',
      tableName: 'List of History Marketplace',
      reloadPermissions: true
    },
    component: { template: `<MWReportMarketplaceHistory></MWReportMarketplaceHistory>` }
  },
  {
    path: 'reports/inventory/history',
    name: 'MWReportInventoryHistory',
    meta: {
      label: 'Inventory Investigation History',
      title: 'List of History Inventory',
      tableName: 'List of History Inventory',
      reloadPermissions: true
    },
    component: { template: `<MWReportInventoryHistory></MWReportInventoryHistory>` }
  },
  {
    path: 'reports/add',
    name: 'MWAddReports',
    meta: {
      label: 'Manage Reports',
      title: 'Add a new Report'
    },
    component: { template: `<MWAddReports></MWAddReports>` }
  },
  {
    path: 'reports/edit/:id',
    name: 'MWEditReports',
    meta: {
      label: 'Manage Reports',
      title: 'Edit Report'
    },
    props: true,
    component: { template: `<MWEditReports></MWEditReports>` }
  }
]

const sellerEnforcements = [
  {
    path: 'seller-enforcements/list',
    name: 'MWListSellerEnforcements',
    meta: {
      label: 'Manage Seller Enforcements',
      title: 'Seller Enforcement',
      tableName: 'Seller Enforcement',
      reloadPermissions: true
    },
    component: { template: `<MWListSellerEnforcements></MWListSellerEnforcements>` }
  },
  {
    path: 'seller-enforcements/edit/:id',
    name: 'MWEditSellerEnforcements',
    meta: {
      label: 'Manage Seller Enforcements',
      title: 'Edit Seller Enforcement',
      tableName: 'Edit Seller Enforcement',
      reloadPermissions: true
    },
    props: true,
    component: { template: `<MWEditSellerEnforcements></MWEditSellerEnforcements>` }
  },
  {
    path: 'seller-enforcements/:id/contacts',
    name: 'MWSellerEnforcementContacts',
    meta: {
      label: 'Manage Seller Enforcements',
      title: 'Manage Seller Enforcement Contacts',
      tableName: 'Manage Seller Enforcement Contacts',
      reloadPermissions: true
    },
    props: true,
    component: { template: `<MWSellerEnforcementContacts></MWSellerEnforcementContacts>` }
  },
  {
    path: 'seller-enforcements/:id/histories',
    name: 'MWSellerEnforcementHistories',
    meta: {
      label: 'Manage Seller Enforcements',
      title: 'List of Seller Enforcement History',
      tableName: 'List of Seller Enforcement History',
      reloadPermissions: true
    },
    props: true,
    component: { template: `<MWSellerEnforcementContacts></MWSellerEnforcementContacts>` }
  },
  {
    path: 'seller-enforcements/add',
    name: 'MWAddSellerEnforcements',
    meta: {
      label: 'Manage Seller Enforcements',
      title: 'Add Seller Enforcement',
      tableName: 'Add Seller Enforcement',
      reloadPermissions: true
    },
    component: { template: `<MWAddSellerEnforcements></MWAddSellerEnforcements>` }
  }
]

const settings = [
  {
    path: 'settings/edit',
    name: 'MWSettings',
    meta: {
      label: 'Settings',
      title: 'Settings',
      tableName: 'Settings',
      reloadPermissions: true
    },
    component: { template: `<MWSettings></MWSettings>` }
  }
]

const sharableMaps = [
  {
    path: 'maps/list',
    name: 'MWShareListMaps',
    meta: {
      label: 'MAP Pricing',
      title: 'Table of MAPs',
      tableName: 'Table of MAPs',
      reloadPermissions: true
    },
    component: { template: `<MWShareListMaps></MWShareListMaps>` }
  },
  {
    path: 'maps/import',
    name: 'MWShareImportMaps',
    meta: {
      label: 'MAPs Pricing Import',
      title: 'Import MAPs'
    },
    component: { template: `<MWShareImportMaps></MWShareImportMaps>` }
  },
  {
    path: 'maps/edit/:id',
    name: 'MWShareEditMaps',
    meta: {
      label: 'Manage MAPs',
      title: 'Edit MAPs'
    },
    props: true,
    component: { template: `<MWShareEditMaps></MWShareEditMaps>` }
  }
]
const sharableSellerDashboards = [
  {
    path: 'si-listings/dashboard',
    name: 'MWShareSellerDashboardIndex',
    meta: {
      label: 'Listings Dashboard',
      title: 'Listings Dashboard',
      reloadPermissions: true
    },
    component: { template: `<MWShareSellerDashboardIndex></MWShareSellerDashboardIndex>` }
  }
]

const mwRoutes = [{
  path: '/mw/:client_id',
  component: DefaultContainer,
  name: 'MWDefaultContainer',
  meta: {
    label: 'Home'
  },
  redirect: { name: 'MWDashboardMain' },
  children: [...gsMaps, ...maps, ...dashboard, ...reports, ...settings, ...listings, ...sellerEnforcements]
}, {
  path: '/share/mw/:client_id',
  component: EmptyContainer,
  name: 'MWEmptyContainer',
  meta: {
    label: 'Home'
  },
  children: [...sharableMaps, ...sharableDashboard, ...sharableSellerDashboards]
}]

const routes = mwRoutes

export default routes
