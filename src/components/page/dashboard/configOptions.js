const activeReports = [
  {
    value: null,
    text: 'all'
  },
  {
    value: false,
    text: 'not active'
  },
  {
    value: true,
    text: 'active'
  }
]

const marketplace = [{ value: 'A', text: 'Amazon' }]

const subTitle = 'Amazon - Rogue Sellers'

export const marketplaceFields = [
  {
    label: 'Amazon',
    value: 'amazon_com'
  },
  {
    label: 'Amazon Canada',
    value: 'amazon_ca'
  },
  {
    label: 'Google Shopping',
    value: 'google_shopping'
  }
]

export const allSellers = { label: 'All Sellers', value: '' }
export const sellersTypeFields = [
  { label: 'Authorized Sellers', value: 'authorized_sellers' },
  { label: 'Rogue Sellers', value: 'rogue_sellers' }
]

export const coverValueToLabelForReport = {
  amazon_com: 'Amazon',
  amazon_ca: 'Amazon Canada',
  google_shopping: 'Google Shopping',
  authorized_sellers: 'Authorized Sellers',
  rogue_sellers: 'Rogue Sellers',
  all_sellers: 'All Sellers'
}

export default {
  marketplace,
  activeReports,
  subTitle
}
