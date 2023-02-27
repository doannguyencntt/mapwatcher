import {DashboardViolatorTitle, DashboardWidgetId} from '@/constants/Dashboard'

const numberOfViolationsViolators = {
  grid: {
    x: 6,
    y: 60,
    w: 6,
    h: 60,
    i: 2
  },
  autoHeight: false,
  widget_id: DashboardWidgetId.number_of_violations_violators,
  widget: {
    title: {
      text: DashboardViolatorTitle.number_of_violations_violators,
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
        dataSource: 'mw_historical_number_of_violation_violator',
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
          { name: 'num_of_violations', type: 'int' },
          { name: 'num_of_violators', type: 'int' }
        ],
        bulkActions: {
          enabled: false,
          controls: []
        },
        widget: {
          title: {
            enabled: false,
            text: null
          }
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
                    labelString: 'Number of Violator'
                  },
                  ticks: {
                    beginAtZero: true
                  }
                },
                {
                  type: 'linear',
                  id: 'y1',
                  display: true,
                  position: 'right',
                  scaleLabel: {
                    display: true,
                    labelString: 'Number of Seller Violators'
                  }
                }
              ]
            },
            options: {
              legend: {
                display: true,
                widthPercent: 50,
                position: 'bottom'
              }
            },
            series: [
              {
                type: 'bar',
                name: 'Total number of Violation',
                axis: {
                  x: 'x0',
                  y: 'y0'
                },
                data: {
                  x: 'date_iso',
                  y: 'num_of_violations'
                }
              },
              {
                type: 'line',
                name: 'Total Seller Violator',
                axis: {
                  x: 'x0',
                  y: 'y1'
                },
                data: {
                  x: 'date_iso',
                  y: 'num_of_violators'
                }
              }]
          }
        ]
      }
    }
  ],
  columnManager: {
    enabled: false,
    config: {}
  },
  export: {
    enabled: false,
    config: {}
  }
}
export default numberOfViolationsViolators
