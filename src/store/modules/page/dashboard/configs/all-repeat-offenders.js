import { DashboardViolatorTitle, DashboardWidgetId } from '@/constants/Dashboard'

const allRepearOffenders = {
  grid: {
    x: 7,
    y: 150,
    w: 5,
    h: 60,
    i: 7
  },
  widget_id: DashboardWidgetId.all_repeat_offenders,
  autoHeight: false,
  widget: {
    title: {
      text: DashboardViolatorTitle.all_repeat_offenders,
      enabled: true
    },
    class: 'bold-title'
  },
  menu: { enabled: false },
  action: {},
  elements: [
    {
      type: 'cbpo-element-table',
      config: {
        dataSource: 'mw_dashboard_all_repeat_offenders',
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
          type: 'buttons',
          buttons: {
            prev: {
              label: 'Prev'
            }
          }
        },
        messages: {
          no_data_at_all: 'No Violations',
          no_data_found: 'No Violations'
        },
        columns: [
          {
            name: 'seller_name',
            displayName: 'Seller Name',
            sortable: {
              enabled: true
            }
          },
          {
            name: 'violated_days',
            displayName: 'Day Violated',
            sortable: {
              enabled: true
            },
            cell: {
              format: {
                type: 'numeric',
                common: {
                  html: {
                    nil: '<span class="d-null">null</span>',
                    empty: '<span class="d-na">n/a</span>',
                    na: '<span class="d-na">n/a</span>'
                  },
                  prefix: null
                },
                config: {
                  comma: true,
                  precision: 0,
                  siPrefix: false
                }
              },
              width: 100,
              aggrFormats: null
            }
          },
          {
            name: 'violated_items',
            displayName: 'Items Violated',
            sortable: {
              enabled: true
            },
            cell: {
              format: {
                type: 'numeric',
                common: {
                  html: {
                    nil: '<span class="d-null">null</span>',
                    empty: '<span class="d-na">n/a</span>',
                    na: '<span class="d-na">n/a</span>'
                  },
                  prefix: null
                },
                config: {
                  comma: true,
                  precision: 0,
                  siPrefix: false
                }
              },
              width: 100,
              aggrFormats: null
            }
          }
        ],
        sizeSettings: {
          defaultMinSize: 250,
          warningText: 'The area is too small for this visualization.'
        },
        sorting: []
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
export default allRepearOffenders
