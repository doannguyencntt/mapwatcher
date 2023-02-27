import {DashboardViolatorTitle, DashboardWidgetId} from '@/constants/Dashboard'

const sellerViolation = {
  grid: {
    x: 6,
    y: 60,
    w: 6,
    h: 40,
    i: 2
  },
  autoHeight: false,
  widget_id: DashboardWidgetId.seller_violation,
  widget: {
    title: {
      text: DashboardViolatorTitle.seller_violation,
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
      type: 'cbpo-element-chart',
      config: {
        dataSource: 'mw_dashboard_seller_violations_7d',
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
          limit: 9999,
          type: 'buttons'
        },
        sizeSettings: {
          defaultMinSize: 250,
          warningText: 'The area is too small for this visualization.'
        },
        sorting: [
          { column: 'violated_item_count', direction: 'desc' }
        ],
        grouping: {
        },
        formats: {
        },
        messages: {
          no_data_at_all: 'No Violations',
          no_data_found: 'No Violations'
        },
        charts: [{
          options: {
            legend: {
              widthPercent: 50
            }
          },
          series: [
            {
              type: 'pie',
              name: 'Seller Violation',
              data: {
                x: 'seller_name',
                y: 'violated_item_count'
              }
            }
          ]
        }]
      }
    }
  ],
  filter: {
    form: {
      config: {
        controls: [],
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
export default sellerViolation
