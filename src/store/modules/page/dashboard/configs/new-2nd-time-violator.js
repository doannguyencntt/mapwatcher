import { DashboardWidgetId } from '@/constants/Dashboard'

const configNew2ndTimeViolator = (
  dataSourceId,
  queryFilter,
  title,
  ignoreColumnNames,
  emptyDataColumnNames,
  exportFileName
) => {
  const baseColumns = [
    {
      name: 'seller_name',
      displayName: 'Seller Name',
      sortable: {
        enabled: true
      }
    },
    {
      name: 'sku',
      displayName: 'SKU',
      sortable: {
        enabled: true
      }
    },
    {
      name: 'upc',
      displayName: 'UPC/EAN',
      sortable: {
        enabled: true
      },
      cell: {
        format: {
          type: 'text',
          common: {
            html: {
              nil: '<span class="d-null">null</span>',
              empty: '<span>n/a</span>',
              na: '<span class="d-na">n/a</span>'
            }
          }
        },
        width: 120,
        aggrFormats: null
      }
    },
    {
      name: 'asin',
      displayName: 'ASIN',
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
      name: 'seller_price',
      displayName: 'Seller Price',
      sortable: {
        enabled: true
      },
      cell: {
        format: {
          type: 'currency',
          config: {
            numeric: {
              comma: true,
              precision: 2,
              siPrefix: false
            },
            currency: {
              symbol: '$',
              symbolPrefix: true,
              inCents: false
            }
          }
        }
      }
    },
    {
      name: 'map_price',
      displayName: 'MAP',
      sortable: {
        enabled: true
      },
      cell: {
        format: {
          type: 'currency',
          config: {
            numeric: {
              comma: true,
              precision: 2,
              siPrefix: false
            },
            currency: {
              symbol: '$',
              symbolPrefix: true,
              inCents: false
            }
          },
          common: {
            html: {
              nil: '<span class="d-null">null</span>',
              empty: '<span>n/a</span>',
              na: '<span class="d-na">n/a</span>'
            }
          }
        }
      }
    },
    {
      name: 'violation_date',
      displayName: 'Date Violated',
      sortable: {
        enabled: true
      },
      cell: {
        format: {
          type: 'text',
          common: {
            plain: {
              nil: 'NULL', // default NULL
              empty: 'EMPTY', // default EMPTY
              na: 'N/A'
            },
            html: {
              nil: '<span class="d-null">null</span>',
              empty: '<span>n/a</span>',
              na: '<span class="d-na">n/a</span>'
            },
            prefix: null,
            suffix: null
          }
        }
      }
    }
  ]
  let columns = baseColumns.filter(
    (ele) => !ignoreColumnNames.includes(ele.name)
  )

  columns = columns.map((ele) => {
    if (emptyDataColumnNames.includes(ele.name)) {
      return {
        ...ele,
        cell: {
          format: {
            type: 'override',
            config: {
              format: {
                text: '-'
              }
            }
          }
        }
      }
    } else {
      return ele
    }
  })

  return {
    grid: {
      x: 0,
      y: 145,
      w: 12,
      h: 5,
      i: 6
    },
    autoHeight: true,
    widget_id: DashboardWidgetId.new_2nd_time_violator,
    widget: {
      title: {
        text: title,
        enabled: true
      },
      class: 'bold-title'
    },
    menu: { enabled: true },
    action: {},
    elements: [
      {
        type: 'cbpo-element-table',
        config: {
          dataSource: dataSourceId,
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
            limit: 10,
            type: 'numbers'
          },
          messages: {
            no_data_at_all: 'No Violations',
            no_data_found: 'No Violations'
          },
          columns,
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
          query: queryFilter
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
      config: {},
      fileName: exportFileName
    }
  }
}

export default configNew2ndTimeViolator
