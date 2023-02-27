import { DOWNLOAD_NEW_REPEAT_VIOLATORS } from '@/actionTypes.js'
import {DashboardViolatorTitle, DashboardWidgetId} from '@/constants/Dashboard'

const newRepeatViolators = {
  grid: {
    x: 0,
    y: 150,
    w: 7,
    h: 60,
    i: 6
  },
  autoHeight: false,
  widget_id: DashboardWidgetId.new_repeat_violators,
  widget: {
    title: {
      text: DashboardViolatorTitle.new_repeat_violators,
      enabled: true
    },
    class: 'bold-title'
  },
  menu: { enabled: false },
  action: {
    elements: [{
      type: 'cbpo-element-button',
      config: {
        id: DOWNLOAD_NEW_REPEAT_VIOLATORS,
        label: {
          text: 'Download'
        },
        icons: {
          css: 'fa fa-download'
        },
        events: {
          click: function() {
            if (window.CBPO && window.CBPO.$bus) {
              window.CBPO.$bus.$emit(`trigger_button_${DOWNLOAD_NEW_REPEAT_VIOLATORS}`)
            }
          }
        }
      }
    }]
  },
  elements: [
    {
      type: 'cbpo-element-table',
      config: {
        dataSource: 'mw_dashboard_new_repeat_violators',
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
            name: 'sku',
            displayName: 'SKU',
            sortable: {
              enabled: true
            }
          },
          {
            name: 'upc/ean',
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
            name: 'map',
            displayName: 'MAP',
            sortable: {
              enabled: true
            },
            cell: {
              format: {
                type: 'currency',
                common: {
                  html: {
                    nil: '<span class="d-null">null</span>',
                    empty: '<span>n/a</span>',
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
            }
          },
          {
            name: 'diff_percent',
            displayName: 'Off MAP',
            sortable: {
              enabled: true
            },
            cell: {
              format: {
                type: 'numeric',
                common: {
                  suffix: ' %',
                  html: {
                    nil: '<span class="d-null">null</span>',
                    empty: '<span class="d-na">n/a</span>',
                    na: '<span class="d-na">n/a</span>'
                  }
                },
                config: {
                  comma: true,
                  precision: 2,
                  siPrefix: false
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
        sorting: []
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
              dataSource: 'mw_dashboard_new_repeat_violators',
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
                options: [
                ]
              }
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

export default newRepeatViolators
