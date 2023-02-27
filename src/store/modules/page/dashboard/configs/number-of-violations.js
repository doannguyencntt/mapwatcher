import {DashboardViolatorTitle, DashboardWidgetId} from '@/constants/Dashboard'

const numberOfViolations = {
  grid: {
    x: 0,
    y: 60,
    w: 6,
    h: 60,
    i: 1
  },
  autoHeight: false,
  widget_id: DashboardWidgetId.number_of_violations_per_seller,
  widget: {
    title: {
      text: DashboardViolatorTitle.number_of_violations_per_seller,
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
        dataSource: 'mw_historical_number_of_violations',
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
        library: 'highcharts',
        pagination: {
          limit: 9999,
          current: 1,
          type: 'numbers'
        },
        messages: {
          no_data_at_all: 'No Violations',
          no_data_found: 'No Violations'
        },
        columns: [
          {
            name: 'date_iso',
            type: 'string',
            format: {
              type: 'temporal',
              config: {
                format: 'MMM YYYY'
              }
            }
          },
          {name: 'seller_name', type: 'string'},
          {name: 'num_of_violations', type: 'int'}
        ],
        grouping: {
          columns: [{name: 'date_iso'}],
          aggregations: [
            {column: 'seller_name', alias: 'seller_name', aggregation: 'count'},
            {column: 'num_of_violations', alias: 'num_of_violations', aggregation: 'sum'}
          ]
        },
        sizeSettings: {
          defaultMinSize: 250,
          warningText: 'The area is too small for this visualization.'
        },
        sorting: [
          {
            column: 'date_iso',
            direction: 'asc'
          }
        ],
        charts: [
          {
            axis: {
              x: [
                {
                  scaleLabel: {
                    display: true,
                    labelString: 'Month & Year'
                  },
                  format: {
                    type: 'temporal',
                    config: {
                      format: 'MMM YYYY'
                    }
                  }
                }
              ],
              y: [
                {
                  type: 'linear',
                  id: 'y0',
                  display: true,
                  position: 'left',
                  stacked: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Number of Violations'
                  },
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            },
            options: {
              legend: {
                display: true,
                widthPercent: 50,
                position: 'bottom'
              },
              column: {
                stacking: 'normal'
              }
            },
            series: [
              {
                type: 'bar',
                name: 'Total Violated Products',
                axis: {
                  x: 'x0',
                  y: 'y0'
                },
                data: {
                  x: 'date_iso',
                  y: 'num_of_violations'
                }
              }]
          }]
      }
    }
  ],
  filter: {
    form: {
      config: {
        controls: [{
          type: 'cbpo-filter-control-select',
          config: {
            label: {
              text: 'Select Seller'
            },
            loadedDataSource: true,
            dataSource: 'mw_historical_number_of_violations',
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
            }
          }
        }],
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
export default numberOfViolations
