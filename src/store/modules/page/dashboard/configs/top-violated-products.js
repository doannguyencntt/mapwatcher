import {DashboardViolatorTitle, DashboardWidgetId} from '@/constants/Dashboard'

const topViolatedProducts = {
  grid: {
    x: 0,
    y: 60,
    w: 6,
    h: 80,
    i: 1
  },
  autoHeight: false,
  widget_id: DashboardWidgetId.top_violated_products,
  widget: {
    title: {
      text: DashboardViolatorTitle.top_violated_products,
      enabled: true
    },
    class: 'bold-title'
  },
  menu: { enabled: false },
  action: {
    elements: []
  },
  elements: [
    {
      type: 'cbpo-element-table',
      config: {
        dataSource: 'mw_dashboard_top_violated',
        widget: {
          title: {
            enabled: false,
            text: null
          }
        },
        bulkActions: {
          enabled: false,
          controls: []
        },
        pagination: {
          limit: 30,
          type: 'buttons'
        },
        columns: [
          {
            name: 'sku',
            displayName: 'SKU',
            sortable: {
              enabled: true
            }
          },
          {
            name: 'seller_name',
            displayName: 'Seller Name',
            sortable: {
              enabled: true
            }
          },
          {
            name: 'title',
            displayName: 'Product Title',
            sortable: {
              enabled: true
            }
          },
          {
            name: 'count',
            displayName: 'Count',
            sortable: {
              enabled: true
            }
          }
        ],
        sizeSettings: {
          defaultMinSize: 250,
          warningText: 'The area is too small for this visualization.'
        },
        sorting: [],
        grouping: {
          columns: [
            {
              name: 'sku'
            }
          ],
          aggregations: [
            {
              column: 'seller_name',
              aggregation: 'concat',
              alias: 'seller_name'
            },
            {
              column: 'title',
              aggregation: 'concat',
              alias: 'title'
            },
            {
              column: 'count',
              aggregation: 'sum',
              alias: 'count'
            }
          ]
        },
        formats: {
        },
        messages: {
          no_data_at_all: 'No Violations',
          no_data_found: 'No Violations'
        }
      }
    }
  ],
  filter: {
    form: {
      config: {
        controls: [
          {
            type: 'cbpo-filter-control-select',
            config: {
              label: {
                text: 'Select Seller'
              },
              loadedDataSource: true,
              dataSource: 'mw_dashboard_top_violated',
              common: {
                column: {
                  name: 'seller_name',
                  type: 'string'
                },
                operator: '=='
              },
              selection: {
                empty: {
                  label: 'All Sellers',
                  value: null
                },
                options: []
              },
              widget: {
                title: {
                  enabled: true,
                  text: ''
                }
              },
              id: 'id-54643480-275b-4674-8f0b-680b2a738df3'
            }
          }
        ],
        query: {}
      }
    },
    base: {
      config: {
        query: {}
      }
    },
    builder: {
      enabled: false,
      config: {}
    }
  },
  columnManager: {
    enabled: false,
    config: {}
  },
  export: {
    enabled: false,
    config: {}
  }
}
export default topViolatedProducts
