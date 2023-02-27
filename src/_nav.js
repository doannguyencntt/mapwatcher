import concat from 'lodash/concat'
import get from 'lodash/get'
const DUMMY_CLIENT_ID = process.env.VUE_APP_MW_DEV_CLIENT_ID || ''

export default {
  name: 'mw',
  clientId: DUMMY_CLIENT_ID,
  _items: [
    {
      title: true,
      name: 'MAP WATCHER',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      },
      permissions: []
    },
    {
      name: 'Dashboard',
      icon: 'icon-speedometer',
      to: {name: 'MWDashboardMain', params: {client_id: DUMMY_CLIENT_ID}},
      badge: {
        variant: 'primary'
      },
      permissions: []
    },
    {
      name: 'Reports',
      icon: 'icon-tag',
      to: {name: 'MWListReports', params: {client_id: DUMMY_CLIENT_ID}},
      badge: {
        variant: 'primary'
      },
      permissions: []
    },
    {
      name: 'Seller Enforcement',
      icon: 'fa fa-user-circle-o',
      to: {name: 'MWListSellerEnforcements', params: {client_id: DUMMY_CLIENT_ID}},
      badge: {
        variant: 'primary'
      },
      permissions: []
    },
    {
      name: 'MAP Pricing',
      icon: 'icon-book-open',
      to: {name: 'MWListMaps', params: {client_id: DUMMY_CLIENT_ID}},
      badge: {
        variant: 'primary'
      },
      permissions: []
    },
    {
      name: 'MAP Pricing (gs)',
      icon: 'icon-book-open',
      to: {name: 'MWGSListMaps', params: {client_id: DUMMY_CLIENT_ID}},
      badge: {
        variant: 'primary'
      },
      permissions: []
    },
    {
      title: true,
      name: 'SELLERS & INVESTIGATIONS',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      },
      meta: {
        isSIParent: true
      },
      permissions: ['siview']
    },
    {
      name: 'Dashboard',
      icon: 'icon-speedometer',
      to: {name: 'MWSellerDashboardIndex', params: {client_id: DUMMY_CLIENT_ID}},
      badge: {
        variant: 'primary'
      },
      permissions: ['siview']
    },
    {
      name: 'Sellers',
      icon: 'fa fa-user-circle-o',
      to: {name: 'MWSISellerList', params: {client_id: DUMMY_CLIENT_ID}},
      badge: {
        variant: 'primary'
      },
      permissions: ['siview']
    },
    {
      name: 'Listings',
      icon: 'icon-list',
      to: {name: 'MWSIListings', params: {client_id: DUMMY_CLIENT_ID}},
      badge: {
        variant: 'primary'
      },
      permissions: ['siview']
    },
    {
      title: true,
      name: 'ADMINISTRATOR',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      },
      permissions: ['adminman']
    },
    {
      name: 'Settings',
      icon: 'icon-settings',
      to: {name: 'MWSettings', params: {client_id: DUMMY_CLIENT_ID}},
      badge: {
        variant: 'primary'
      },
      permissions: ['adminman']
    }
  ],
  set setItem (clientID) {
    let self = this
    self._items = self._items.map(item => {
      if (get(item, 'to.params')) {
        item.to.params.client_id = clientID
      }
      return item
    })
    self.clientId = clientID
  },
  get items () {
    return this._items
  },
  set addItems (arr) {
    if (arr && arr.length) {
      this._items = concat(arr, this._items)
    }
  }
}
