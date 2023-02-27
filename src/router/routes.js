/* eslint-disable */
import MWAddReports from '@/components/page/reports/Add'
import MWEditReports from '@/components/page/reports/Edit'
import MWListReports from '@/components/page/reports/List'
import MWListSellerEnforcements from '@/components/page/sellerEnforcements/List'
import MWEditSellerEnforcements from '@/components/page/sellerEnforcements/Edit'
import MWSellerEnforcementContacts from '@/components/page/sellerEnforcements/Contacts'
import MWSellerEnforcementHistories from '@/components/page/sellerEnforcements/Histories'
import MWAddSellerEnforcements from '@/components/page/sellerEnforcements/Add'
import MWReportMarketplaceHistory from '@/components/page/reports/MarketplaceHistoryList'
import MWReportInventoryHistory from '@/components/page/reports/InventoryHistoryList'
import MWShareDashboardHistorical from '@/components/page/dashboard/DashboardHistorical'
import MWDashboardHistorical from '@/components/page/dashboard/DashboardHistorical'
import MWDashboardIndex from '@/components/page/dashboard/DashboardIndex'
import MWShareDashboardIndex from '@/components/page/dashboard/DashboardIndex'
import MWDashboardMain from '@/components/page/dashboard/DashboardMain'
import MWShareDashboardMain from '@/components/page/dashboard/DashboardMain'
import MWEditMaps from '@/components/page/maps/Edit'
import MWGSListMaps from '@/components/page/gs-maps/List'
import MWEditGSMaps from '@/components/page/gs-maps/Edit'
import MWImportGSMaps from '@/components/page/gs-maps/import-sdk/import'
import MWProcessGSMaps from '@/components/page/gs-maps/import-sdk/process'
import MWResultGSMaps from '@/components/page/gs-maps/import-sdk/result'
import MWValidateGSMaps from '@/components/page/gs-maps/import-sdk/validate'
import MWSIListings from '@/components/page/sellers/Listings'
import MWSISellerList from '@/components/page/sellers/SellerList'
import MWSIAddListing from '@/components/page/sellers/ManageListing'
import MWSIEditListing from '@/components/page/sellers/ManageListing'
import MWSIAddSeller from '@/components/page/sellers/ManageSeller'
import MWSIEditSeller from '@/components/page/sellers/ManageSeller'
import MWSellerDashboardIndex from '@/components/page/sellerDashboard/DashboardIndex'
import MWShareSellerDashboardIndex from '@/components/page/sellerDashboard/DashboardIndex'
// plat-import-lib
//// Sellers
import SIImportStep1Upload from '@/components/page/sellers/importSellers/SIImportStep1Upload'
import SIImportStep2Validate from '@/components/page/sellers/importSellers/SIImportStep2Validate'
import SIImportStep3Process from '@/components/page/sellers/importSellers/SIImportStep3Process'
import SIImportStep4Result from '@/components/page/sellers/importSellers/SIImportStep4Result'
//// Listings
import SIListingsImportStep1Upload from '@/components/page/sellers/importListings/SIListingsImportStep1Upload'
import SIListingsImportStep2Validate from '@/components/page/sellers/importListings/SIListingsImportStep2Validate'
import SIListingsImportStep3Process from '@/components/page/sellers/importListings/SIListingsImportStep3Process'
import SIListingsImportStep4Result from '@/components/page/sellers/importListings/SIListingsImportStep4Result'
//// Amazon
import MWImportAmazonMaps from '@/components/page/maps/import-amazon/import'
import MWProcessAmazonMaps from '@/components/page/maps/import-amazon/process'
import MWResultAmazonMaps from '@/components/page/maps/import-amazon/result'
import MWValidateAmazonMaps from '@/components/page/maps/import-amazon/validate'

import MWListMaps from '@/components/page/maps/List'
import MWShareEditMaps from '@/components/page/maps/Edit'
import MWShareImportMaps from '@/components/page/maps/Import'
import MWShareListMaps from '@/components/page/maps/List'
import MWSettings from '@/components/page/settings/Setting'
import defaultRoutes from './_routerConfig'
import _ from 'lodash'

const routes = {
  MWListMaps,
  MWListReports,
  MWReportMarketplaceHistory,
  MWReportInventoryHistory,
  MWDashboardMain,
  MWDashboardHistorical,
  MWDashboardIndex,
  MWAddReports,
  MWEditReports,
  MWSettings,
  MWEditMaps,
  MWShareDashboardMain,
  MWShareDashboardIndex,
  MWShareDashboardHistorical,
  MWShareEditMaps,
  MWShareImportMaps,
  MWShareListMaps,
  MWImportGSMaps,
  MWProcessGSMaps,
  MWResultGSMaps,
  MWValidateGSMaps,
  MWGSListMaps,
  MWEditGSMaps,
  MWSIListings,
  SIImportStep1Upload,
  SIImportStep2Validate,
  SIImportStep3Process,
  SIImportStep4Result,
  ////Listings
  SIListingsImportStep1Upload,
  SIListingsImportStep2Validate,
  SIListingsImportStep3Process,
  SIListingsImportStep4Result,
  MWSIAddListing,
  MWSIEditListing,
  MWSISellerList,
  MWSIAddSeller,
  MWSIEditSeller,
  MWSellerDashboardIndex,
  MWShareSellerDashboardIndex,
  MWImportAmazonMaps,
  MWProcessAmazonMaps,
  MWResultAmazonMaps,
  MWValidateAmazonMaps,
  ////Seller Enforcements
  MWListSellerEnforcements,
  MWEditSellerEnforcements,
  MWAddSellerEnforcements,
  MWSellerEnforcementContacts,
  MWSellerEnforcementHistories
}

_.forEach(defaultRoutes, (route, key) => {
  _.forEach(route.children, (report, ke2) => {
    report.component = routes[report.name]
    if (report.children) {
      _.forEach(report.children, (report2, key3) => {
        report2.component = routes[report2.name]
      })
    }
  })
})

export default defaultRoutes
export const routerRender = defaultRoutes.reduce((newRoutes, routes) => newRoutes.concat(routes.children), [])
