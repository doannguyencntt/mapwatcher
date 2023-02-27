import {
  DashboardViolatorTitle,
  DashboardWidgetId
} from '@/constants/Dashboard'

const dailyViolatorWithInventory = (dataSourceId, queryFilter, title, exportFileName) => {
  title = !title ? DashboardViolatorTitle.daily_violator_with_inventory : title
  return {
    grid: {
      x: 0,
      y: 240,
      w: 12,
      h: 60,
      i: 0
    },
    autoHeight: false,
    widget_id: DashboardWidgetId.daily_violator_with_inventory,
    widget: {
      title: {
        text: title,
        enabled: true
      },
      class: 'bold-title'
    },
    menu: { enabled: true },
    action: {
      elements: []
    },
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
            limit: 30,
            type: 'buttons'
          },
          columns: [
            {
              name: 'sku_vault_inventory',
              displayName: 'SKUVault Inventory',
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
              },
              header: {
                style: {},
                format: null
              }
            },
            {
              name: 'total_fba_inventory',
              displayName: 'Total FBA Inventory',
              sortable: {
                enabled: true
              },
              cell: {
                format: {
                  type: 'numeric',
                  common: {
                    html: {
                      nil: '<span class="d-null">null</span>',
                      empty: '<span>n/a</span>',
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
              },
              header: {
                style: {},
                format: null
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
                      empty: '<span class="d-na">n/a</span>',
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
              },
              header: {
                style: {},
                format: null
              },
              cell: {
                width: 100,
                style: {},
                format: null,
                aggrFormats: null
              }
            },
            {
              name: 'title',
              displayName: 'Product Title',
              sortable: {
                enabled: true
              },
              header: {
                style: {},
                format: null
              },
              cell: {
                width: 100,
                style: {},
                format: null,
                aggrFormats: null
              }
            },
            {
              name: 'map_price',
              displayName: 'MAP Price',
              sortable: {
                enabled: true
              },
              cell: {
                format: {
                  type: 'currency',
                  common: {
                    html: {
                      nil: '<span class="d-null">null</span>',
                      empty: '<span class="d-na">n/a</span>',
                      na: '<span class="d-na">n/a</span>'
                    }
                  },
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
                },
                width: 100,
                style: {},
                aggrFormats: null
              },
              header: {
                style: {},
                format: null
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
                },
                width: 100,
                style: {},
                aggrFormats: null
              },
              header: {
                style: {},
                format: null
              }
            },
            {
              name: 'oe_price',
              displayName: 'OE Price',
              sortable: {
                enabled: true
              },
              cell: {
                format: {
                  type: 'currency',
                  common: {
                    html: {
                      nil: '<span class="d-null">null</span>',
                      empty: '<span class="d-na">n/a</span>',
                      na: '<span class="d-na">n/a</span>'
                    }
                  },
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
                },
                width: 100,
                style: {},
                aggrFormats: null
              },
              header: {
                style: {},
                format: null
              }
            },
            {
              name: 'diff',
              displayName: '$ DIFF',
              sortable: {
                enabled: true
              },
              cell: {
                style: {},
                format: {
                  type: 'currency',
                  common: {
                    html: {
                      nil: '<span class="d-null">null</span>',
                      empty: '<span class="d-na">n/a</span>',
                      na: '<span class="d-na">n/a</span>'
                    }
                  },
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
                },
                width: 100,
                aggrFormats: null
              },
              header: {
                style: {},
                format: null
              }
            },
            {
              name: 'diff_percent',
              displayName: 'Off MAP',
              sortable: {
                enabled: true
              },
              cell: {
                style: {
                  color: '#FF0000',
                  'font-weight': '500'
                },
                format: {
                  type: 'numeric',
                  common: {
                    suffix: ' %',
                    html: {
                      nil: '<span class="d-null">null</span>',
                      empty: '<span class="d-na">n/a</span>',
                      na: '<span class="d-na">n/a</span>'
                    },
                    prefix: null
                  },
                  config: {
                    comma: true,
                    precision: 2,
                    siPrefix: false
                  }
                },
                width: 100,
                aggrFormats: null
              },
              header: {
                style: {},
                format: null
              }
            },
            {
              name: 'link',
              displayName: 'Link',
              sortable: {
                enabled: true
              },
              cell: {
                format: {
                  type: 'link',
                  common: {
                    plain: {
                      nil: 'NULL', // default NULL
                      empty: 'EMPTY', // default EMPTY
                      na: 'N/A'
                    },
                    html: {
                      nil: '<span class="d-null">null</span>',
                      empty: '<span class="d-na">n/a</span>',
                      na: '<span class="d-na">n/a</span>'
                    },
                    prefix: null,
                    suffix: null
                  },
                  config: {
                    text: 'Open URL',
                    target: '_blank'
                  }
                },
                width: 100,
                style: {},
                aggrFormats: null
              },
              header: {
                style: {},
                format: null
              }
            },
            {
              name: 'screenshot',
              displayName: 'Screenshot',
              sortable: {
                enabled: true
              },
              cell: {
                format: {
                  type: 'link',
                  common: {
                    html: {
                      nil: '<span class="d-null">null</span>',
                      empty: '<span class="d-na">n/a</span>',
                      na: '<span class="d-na">n/a</span>'
                    },
                    prefix: null,
                    suffix: null
                  },
                  config: {
                    text: 'Open Screenshot',
                    target: '_blank'
                  }
                },
                width: 100,
                style: {},
                aggrFormats: null
              },
              header: {
                style: {},
                format: null
              }
            },
            {
              name: 'captured_at',
              displayName: 'Date',
              type: 'temporal',
              cell: {
                format: {
                  type: 'temporal',
                  common: {
                    html: {
                      nil: '<span class="d-null">null</span>',
                      empty: '<span class="d-na">n/a</span>',
                      na: '<span class="d-na">n/a</span>'
                    },
                    prefix: null,
                    suffix: null
                  },
                  config: {
                    format: 'MM/DD/YYYY hh:mm A z',
                    timezone: 'EST'
                  }
                },
                width: 150
              },
              sortable: {
                enabled: true
              }
            },
            {
              name: 'fulfillment',
              displayName: 'Fulfillment',
              sortable: {
                enabled: true
              },
              cell: {
                width: 120,
                format: {
                  type: 'text'
                  // common: {
                  //   html: {
                  //     nil: '<span class="d-null">null</span>',
                  //     empty: '<span class="d-na">n/a</span>',
                  //     na: '<span class="d-na">n/a</span>'
                  //   },
                  //   prefix: null,
                  //   suffix: null
                  // },
                  // config: {
                  //   positive: {
                  //     html: '<span class="d-bool-p">FBA</span>'
                  //   },
                  //   negative: {
                  //     html: '<span class="d-bool-n">MFN</span>'
                  //   }
                  // }
                }
              }
            },
            {
              name: 'offered_as',
              displayName: 'Offered As',
              sortable: {
                enabled: true
              },
              cell: {
                width: 120,
                format: {
                  type: 'text'
                  // common: {
                  //   html: {
                  //     nil: '<span class="d-null">null</span>',
                  //     empty: '<span class="d-na">n/a</span>',
                  //     na: '<span class="d-na">n/a</span>'
                  //   },
                  //   prefix: null,
                  //   suffix: null
                  // },
                  // config: {
                  //   positive: {
                  //     html: '<span class="d-bool-p">PRIME</span>'
                  //   },
                  //   negative: {
                  //     html: '<span class="d-bool-n">NON-Prime</span>'
                  //   }
                  // }
                }
              }
            },
            {
              name: 'condition',
              displayName: 'Sold As',
              sortable: {
                enabled: true
              },
              header: {
                style: {},
                format: null
              },
              cell: {
                width: 100,
                style: {},
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
                      empty: '<span class="d-na">n/a</span>',
                      na: '<span class="d-na">n/a</span>'
                    },
                    prefix: null,
                    suffix: null
                  }
                },
                aggrFormats: null
              }
            }
          ],
          sizeSettings: {
            defaultMinSize: 250,
            warningText: 'The area is too small for this visualization.'
          },
          sorting: [],
          grouping: {
            columns: [],
            aggregations: []
          },
          formats: {},
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
                dataSource: dataSourceId,
                filter: queryFilter,
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
                id: 'id-90ac1f9f-e779-4155-a5b6-563d98b86c37'
              }
            }
          ],
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

export default dailyViolatorWithInventory
