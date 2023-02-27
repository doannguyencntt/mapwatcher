import { DashboardViolatorTitle, DashboardWidgetId } from '@/constants/Dashboard'
const avgPercentage = {
  grid: {
    x: 6,
    y: 100,
    w: 6,
    h: 40,
    i: 3
  },
  autoHeight: false,
  widget_id: DashboardWidgetId.avg_percentage_off_map,
  widget: {
    title: {
      text: DashboardViolatorTitle.avg_percentage_off_map,
      enabled: true
    },
    class: 'bold-title'
  },
  action: {},
  elements: [
    {
      type: 'cbpo-element-table',
      config: {
        dataSource: 'mw_dashboard_avg_percentage_off_map',
        widget: {
          title: {
            enabled: false,
            text: null
          }
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
            },
            cell: {
              format: {
                type: 'text',
                common: {
                  html: {
                    nil: '<span class="d-null">null</span>',
                    empty: '<span class="d-na">n/a</span>',
                    na: '<span class="d-na">n/a</span>'
                  }
                }
              }
            }
          },
          {
            name: 'average_off_map_percent',
            displayName: 'Off MAP',
            cell: {
              format: {
                type: 'numeric',
                common: {
                  suffix: '%',
                  html: {
                    nil: '<span class="d-null">null</span>',
                    empty: '<span class="d-na">n/a</span>',
                    na: '<span class="d-na">n/a</span>'
                  }
                },
                config: {
                  comma: true,
                  precision: 1,
                  siPrefix: false
                }
              },
              width: 80
            },
            sortable: {
              enabled: false
            }
          },
          {
            name: 'average_off_map_value',
            displayName: 'Value',
            cell: {
              format: {
                type: 'progress',
                config: {
                  base: 100,
                  visualization: 'bar'
                },
                common: {
                  html: {
                    nil: '<span class="d-null">null</span>',
                    empty: '<span class="d-na">n/a</span>',
                    na: '<span class="d-na">n/a</span>'
                  }
                }
              }
            },
            sortable: {
              enabled: true
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
export default avgPercentage
