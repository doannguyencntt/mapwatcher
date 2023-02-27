const config = {
  direction: 'column',
  style: {
    padding: '0.5rem'
  },
  widgets: [
    {
      style: {
        height: '600px'
      },
      scale: 100,
      type: 'cbpo-widget',
      config: {
        widget: {
          title: {
            text: 'Demo table with basic widget filter',
            enabled: true
          },
          widget: {
            title: {
              enabled: true,
              text: ''
            }
          },
          id: 'id-bc8e5b12-f96e-45a2-80c0-272c8fa676c3'
        },
        filter: {
          controls: [
            {
              type: 'cbpo-filter-control-select',
              config: {
                label: {
                  text: 'Seller Name'
                },
                common: {
                  column: {
                    name: 'column1',
                    type: 'string'
                  },
                  operator: '==',
                  value: '...'
                },
                selection: {
                  empty: {
                    label: 'Please select',
                    value: null
                  },
                  options: [
                    {
                      label: 'Amazon.com',
                      value: 'Amazon.com'
                    },
                    {
                      label: 'Google.com',
                      value: 'Google.com'
                    },
                    {
                      label: 'Facebook.com',
                      value: 'Facebook.com'
                    },
                    {
                      label: 'Alibaba.com',
                      value: 'Alibaba.com'
                    }
                  ]
                },
                widget: {
                  title: {
                    enabled: true,
                    text: ''
                  }
                },
                id: 'id-e99fc8aa-06dd-462d-979f-479fbd54bea0'
              }
            },
            {
              type: 'cbpo-filter-control-select',
              config: {
                label: {
                  text: 'Date'
                },
                common: {
                  column: {
                    name: 'column12',
                    type: 'string'
                  },
                  operator: '==',
                  value: '...'
                },
                selection: {
                  empty: {
                    label: 'Please select',
                    value: null
                  },
                  options: [
                    {
                      label: '12-05-2019',
                      value: '12-05-2019'
                    },
                    {
                      label: '15-05-2019',
                      value: '15-05-2019'
                    },
                    {
                      label: '18-05-2019',
                      value: '18-05-2019'
                    },
                    {
                      label: '20-05-2019',
                      value: '20-05-2019'
                    },
                    {
                      label: '25-05-2019',
                      value: '25-05-2019'
                    }
                  ]
                },
                widget: {
                  title: {
                    enabled: true,
                    text: ''
                  }
                },
                id: 'id-4653f11f-4ca2-443c-8173-897c6e190665'
              }
            }
          ],
          id: 'id-b0d443ab-e2c8-4606-a664-c450a18dfc65'
        },
        elements: [
          {
            type: 'cbpo-element-table',
            config: {
              dataSource: 'mw_dashboard_main_daily_visitors',
              widget: {
                title: {
                  enabled: false,
                  text: 'Simple Table'
                }
              },
              fiter: {},
              pagination: {
                limit: 30,
                type: 'input',
                current: 1,
                total: 5,
                buttons: {
                  first: {
                    visibility: true,
                    label: 'First',
                    style: {}
                  },
                  last: {
                    visibility: true,
                    label: 'Last',
                    style: {}
                  },
                  prev: {
                    visibility: true,
                    label: 'Previous',
                    style: {}
                  },
                  next: {
                    visibility: true,
                    label: 'Next',
                    style: {}
                  }
                },
                numbers: {
                  beforeCurrent: 2,
                  afterCurrent: 2
                },
                default: 'auto',
                widget: {
                  title: {
                    enabled: true,
                    text: ''
                  }
                },
                id: 'id-db1f1348-8771-445c-b34b-5589e5b92b00'
              },
              columns: [
                {
                  name: 'seller_name',
                  displayName: 'Seller Name',
                  sortable: {
                    enabled: true
                  },
                  header: {
                    style: {
                      color: '#006600'
                    },
                    format: {},
                    aggrFormat: {}
                  },
                  cell: {
                    style: {
                      color: 'green'
                    },
                    format: {},
                    aggrFormat: {},
                    width: 100,
                    aggrFormats: null
                  }
                },
                {
                  name: 'sku',
                  displayName: 'SKU',
                  sortable: {
                    enabled: true
                  },
                  header: {
                    style: {
                      color: '#006600'
                    },
                    format: {},
                    aggrFormat: {}
                  },
                  cell: {
                    style: {
                      color: 'green'
                    },
                    format: {},
                    aggFormat: {},
                    width: 100,
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
                  name: 'column5',
                  displayName: 'Seller Price',
                  sortable: {
                    enabled: false
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
                          inCents: true
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
                  name: 'column6',
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
                          inCents: true
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
                  name: 'column7',
                  displayName: '$ DIFF',
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
                          inCents: true
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
                  name: 'column8',
                  displayName: 'Off MAP',
                  sortable: {
                    enabled: false
                  },
                  cell: {
                    style: {
                      'color': '#FF0000',
                      'font-weight': '500'
                    },
                    format: {
                      type: 'numeric',
                      common: {
                        suffix: '%',
                        plain: {
                          nil: 'NULL',
                          empty: 'EMPTY',
                          na: 'N/A'
                        },
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
                  name: 'column9',
                  displayName: 'Link',
                  sortable: {
                    enabled: true
                  },
                  cell: {
                    format: {
                      type: 'link',
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
                  name: 'column10',
                  displayName: 'Screenshot',
                  sortable: {
                    enabled: true
                  },
                  cell: {
                    format: {
                      type: 'link',
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
                  name: 'column11',
                  displayName: 'Seller Offer',
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
                  name: 'column12',
                  displayName: 'Date Violated',
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
                }
              ],
              sorting: [],
              grouping: {},
              formats: {
                aggrs: {}
              },
              messages: {
                no_data_at_all: 'No Violations',
                no_data_found: 'No Violations'
              },
              id: 'id-45c8afe4-2230-4edd-9d65-53940ce03d10'
            }
          }
        ],
        column: {
          name: '',
          type: ''
        },
        operator: '==',
        value: '',
        id: 'id-71a12286-33de-47d8-978f-0a9da45b336e'
      }
    },
    {
      style: {
        marginTop: '1rem',
        height: '680px'
      },
      scale: 100,
      type: 'cbpo-layout',
      config: {
        direction: 'row',
        style: {
          alignItems: 'flex-start',
          height: '100%'
        },
        widgets: [
          {
            style: {
              height: '100%'
            },
            scale: 50,
            type: 'cbpo-widget',
            config: {
              widget: {
                title: {
                  text: 'Demo grouped table with filter',
                  enabled: true
                },
                widget: {
                  title: {
                    enabled: true,
                    text: ''
                  }
                },
                id: 'id-9327fde1-746a-4aa4-86f8-fac876d40c6b'
              },
              filter: {
                controls: [
                  {
                    type: 'cbpo-filter-control-select',
                    config: {
                      label: {
                        text: 'Seller Name'
                      },
                      common: {
                        column: {
                          name: 'column1',
                          type: 'string'
                        },
                        operator: '==',
                        value: '...'
                      },
                      selection: {
                        empty: {
                          label: 'Please select',
                          value: null
                        },
                        options: [
                          {
                            label: '62254-9-D',
                            value: '62254-9-D'
                          },
                          {
                            label: '28017-7.5-D',
                            value: '28017-7.5-D'
                          },
                          {
                            label: '13866-12-D',
                            value: '13866-12-D'
                          },
                          {
                            label: '13241-10-D',
                            value: '13241-10-D'
                          },
                          {
                            label: '12250-7.5-M',
                            value: '12250-7.5-M'
                          }
                        ]
                      },
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-54643480-275b-4674-8f0b-680b2a738df3'
                    }
                  },
                  {
                    type: 'cbpo-filter-control-select',
                    config: {
                      label: {
                        text: 'Seller Name'
                      },
                      common: {
                        column: {
                          name: 'column2',
                          type: 'text'
                        },
                        operator: '==',
                        value: '...'
                      },
                      selection: {
                        empty: {
                          label: 'Please select',
                          value: null
                        },
                        options: [
                          {
                            label: 'Danner-B0',
                            value: 'Danner-B0'
                          },
                          {
                            label: 'Danner-B1',
                            value: 'Danner-B1'
                          },
                          {
                            label: 'Danner-B2',
                            value: 'Danner-B2'
                          },
                          {
                            label: 'Danner-B3',
                            value: 'Danner-B3'
                          },
                          {
                            label: 'Danner-B4',
                            value: 'Danner-B4'
                          },
                          {
                            label: 'Danner-B5',
                            value: 'Danner-B5'
                          }
                        ]
                      },
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-eaaa7aef-f415-4a5a-aa69-9e83ff7964a1'
                    }
                  }
                ],
                id: 'id-55bcab2c-55b2-4909-9b08-4b24e83c3ecd'
              },
              elements: [
                {
                  type: 'cbpo-element-table',
                  config: {
                    dataSource: 'mw_dashboard_main_daily_visitors',
                    widget: {
                      title: {
                        enabled: false,
                        text: 'Group Table'
                      }
                    },
                    filter: {},
                    grouping: {
                      columns: [
                        {
                          name: 'column1'
                        }
                      ],
                      aggregations: [
                        {
                          column: 'column2',
                          aggregation: 'concat',
                          alias: 'column2'
                        },
                        {
                          column: 'column3',
                          aggregation: 'concat',
                          alias: 'column3'
                        },
                        {
                          column: 'column4',
                          aggregation: 'sum',
                          alias: 'column4'
                        }
                      ]
                    },
                    pagination: {
                      limit: 30,
                      type: 'numbers',
                      current: 1,
                      total: 35,
                      buttons: {
                        first: {
                          visibility: true,
                          label: 'First',
                          style: {}
                        },
                        last: {
                          visibility: true,
                          label: 'Last',
                          style: {}
                        },
                        prev: {
                          visibility: true,
                          label: 'Previous',
                          style: {}
                        },
                        next: {
                          visibility: true,
                          label: 'Next',
                          style: {}
                        }
                      },
                      numbers: {
                        beforeCurrent: 2,
                        afterCurrent: 2
                      },
                      default: 'auto',
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-7c727896-21f2-4de9-8810-63c7e9bb6b09'
                    },
                    columns: [
                      {
                        name: 'column1',
                        displayName: 'SKU',
                        sortable: {
                          enabled: true
                        },
                        header: {
                          style: {},
                          format: null
                        },
                        cell: {
                          width: 133.0995,
                          style: {},
                          format: null,
                          aggrFormats: null
                        }
                      },
                      {
                        name: 'column2',
                        displayName: 'Seller',
                        sortable: {
                          enabled: true
                        },
                        header: {
                          style: {},
                          format: null
                        },
                        cell: {
                          width: 133.0995,
                          style: {},
                          format: null,
                          aggrFormats: null
                        }
                      },
                      {
                        name: 'column3',
                        displayName: 'Product Title',
                        sortable: {
                          enabled: true
                        },
                        header: {
                          style: {},
                          format: null
                        },
                        cell: {
                          width: 133.0995,
                          style: {},
                          format: null,
                          aggrFormats: null
                        }
                      },
                      {
                        name: 'column4',
                        displayName: 'Count',
                        sortable: {
                          enabled: false
                        },
                        header: {
                          style: {},
                          format: null
                        },
                        cell: {
                          width: 133.0995,
                          style: {},
                          format: null,
                          aggrFormats: null
                        }
                      }
                    ],
                    sorting: [],
                    formats: {
                      aggrs: {}
                    },
                    messages: {
                      no_data_at_all: 'No Violations',
                      no_data_found: 'No Violations'
                    },
                    id: 'id-cb4071b1-339a-41e8-a565-9444dd2a894a'
                  }
                }
              ],
              column: {
                name: '',
                type: ''
              },
              operator: '==',
              value: '',
              id: 'id-2c5854b3-a374-4b02-8d9f-7dd88a247bac'
            }
          },
          {
            style: {
              marginLeft: '0.5rem',
              height: '100%'
            },
            scale: 50,
            type: 'cbpo-layout',
            config: {
              direction: 'column',
              style: {
                height: '100%'
              },
              widgets: [
                {
                  style: {
                    height: '50%'
                  },
                  scale: 100,
                  type: 'cbpo-widget',
                  config: {
                    widget: {
                      title: {
                        text: 'Demo grouped table with filter',
                        enabled: true
                      },
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-e849f731-d85b-44ab-a235-b1bf142dbe1a'
                    },
                    filter: {
                      controls: [
                        {
                          type: 'cbpo-filter-control-select',
                          config: {
                            label: {
                              text: 'Seller Name'
                            },
                            common: {
                              column: {
                                name: 'column1',
                                type: 'string'
                              },
                              operator: '==',
                              value: '...'
                            },
                            selection: {
                              empty: {
                                label: 'Please select',
                                value: null
                              },
                              options: [
                                {
                                  label: '62254-9-D',
                                  value: '62254-9-D'
                                },
                                {
                                  label: '28017-7.5-D',
                                  value: '28017-7.5-D'
                                },
                                {
                                  label: '13866-12-D',
                                  value: '13866-12-D'
                                },
                                {
                                  label: '13241-10-D',
                                  value: '13241-10-D'
                                },
                                {
                                  label: '12250-7.5-M',
                                  value: '12250-7.5-M'
                                }
                              ]
                            },
                            widget: {
                              title: {
                                enabled: true,
                                text: ''
                              }
                            },
                            id: 'id-8d44a3e7-058f-4298-bae6-133f0ebb13c1'
                          }
                        },
                        {
                          type: 'cbpo-filter-control-select',
                          config: {
                            label: {
                              text: 'Seller Name'
                            },
                            common: {
                              column: {
                                name: 'column2',
                                type: 'text'
                              },
                              operator: '==',
                              value: '...'
                            },
                            selection: {
                              empty: {
                                label: 'Please select',
                                value: null
                              },
                              options: [
                                {
                                  label: 'Danner-B0',
                                  value: 'Danner-B0'
                                },
                                {
                                  label: 'Danner-B1',
                                  value: 'Danner-B1'
                                },
                                {
                                  label: 'Danner-B2',
                                  value: 'Danner-B2'
                                },
                                {
                                  label: 'Danner-B3',
                                  value: 'Danner-B3'
                                },
                                {
                                  label: 'Danner-B4',
                                  value: 'Danner-B4'
                                },
                                {
                                  label: 'Danner-B5',
                                  value: 'Danner-B5'
                                }
                              ]
                            },
                            widget: {
                              title: {
                                enabled: true,
                                text: ''
                              }
                            },
                            id: 'id-5d9dbfcb-dfe9-4052-becb-98fe231e07bc'
                          }
                        }
                      ],
                      id: 'id-47394e7a-48ba-4935-9cff-7e54f448f990'
                    },
                    elements: [
                      {
                        type: 'cbpo-element-table',
                        config: {
                          dataSource: 'mw_dashboard_main_daily_visitors',
                          widget: {
                            title: {
                              enabled: false,
                              text: 'Group Table'
                            }
                          },
                          filter: {},
                          grouping: {
                            columns: [
                              {
                                name: 'column1'
                              }
                            ],
                            aggregations: [
                              {
                                column: 'column2',
                                aggregation: 'concat',
                                alias: 'column2'
                              },
                              {
                                column: 'column3',
                                aggregation: 'concat',
                                alias: 'column3'
                              },
                              {
                                column: 'column4',
                                aggregation: 'sum',
                                alias: 'column4'
                              }
                            ]
                          },
                          pagination: {
                            limit: 30,
                            type: 'numbers',
                            current: 1,
                            total: 35,
                            buttons: {
                              first: {
                                visibility: true,
                                label: 'First',
                                style: {}
                              },
                              last: {
                                visibility: true,
                                label: 'Last',
                                style: {}
                              },
                              prev: {
                                visibility: true,
                                label: 'Previous',
                                style: {}
                              },
                              next: {
                                visibility: true,
                                label: 'Next',
                                style: {}
                              }
                            },
                            numbers: {
                              beforeCurrent: 2,
                              afterCurrent: 2
                            },
                            default: 'auto',
                            widget: {
                              title: {
                                enabled: true,
                                text: ''
                              }
                            },
                            id: 'id-8d391b8d-8d74-4a1b-87d9-be1cf12e3be6'
                          },
                          columns: [
                            {
                              name: 'column1',
                              displayName: 'SKU',
                              sortable: {
                                enabled: true
                              },
                              header: {
                                style: {},
                                format: null
                              },
                              cell: {
                                width: 133.0995,
                                style: {},
                                format: null,
                                aggrFormats: null
                              }
                            },
                            {
                              name: 'column2',
                              displayName: 'Seller',
                              sortable: {
                                enabled: true
                              },
                              header: {
                                style: {},
                                format: null
                              },
                              cell: {
                                width: 133.0995,
                                style: {},
                                format: null,
                                aggrFormats: null
                              }
                            },
                            {
                              name: 'column3',
                              displayName: 'Product Title',
                              sortable: {
                                enabled: true
                              },
                              header: {
                                style: {},
                                format: null
                              },
                              cell: {
                                width: 133.0995,
                                style: {},
                                format: null,
                                aggrFormats: null
                              }
                            },
                            {
                              name: 'column4',
                              displayName: 'Count',
                              sortable: {
                                enabled: false
                              },
                              header: {
                                style: {},
                                format: null
                              },
                              cell: {
                                width: 133.0995,
                                style: {},
                                format: null,
                                aggrFormats: null
                              }
                            }
                          ],
                          sorting: [],
                          formats: {
                            aggrs: {}
                          },
                          messages: {
                            no_data_at_all: 'No Violations',
                            no_data_found: 'No Violations'
                          },
                          id: 'id-3d74d44f-f61b-4401-93ca-a5b84dcebf63'
                        }
                      }
                    ],
                    column: {
                      name: '',
                      type: ''
                    },
                    operator: '==',
                    value: '',
                    id: 'id-4fcc4d95-7c2a-4979-8242-d817b7e0c4f6'
                  }
                },
                {
                  style: {
                    height: '50%',
                    paddingTop: '5px'
                  },
                  scale: 100,
                  type: 'cbpo-widget',
                  config: {
                    widget: {
                      title: {
                        text: 'Demo table with progress bar',
                        enabled: true
                      },
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-dfd40fe5-77ab-43a3-8b5a-cb58e07beb88'
                    },
                    filter: {
                      controls: [],
                      id: 'id-cd1c0de2-c2ea-4564-b949-3c80f87dfe13'
                    },
                    elements: [
                      {
                        type: 'cbpo-element-table',
                        config: {
                          dataSource: 'mw_dashboard_main_daily_visitors',
                          widget: {
                            title: {
                              enabled: false
                            }
                          },
                          pagination: {
                            limit: 30,
                            type: 'input',
                            current: 1,
                            total: 1,
                            buttons: {
                              first: {
                                visibility: true,
                                label: 'First',
                                style: {}
                              },
                              last: {
                                visibility: true,
                                label: 'Last',
                                style: {}
                              },
                              prev: {
                                visibility: true,
                                label: 'Previous',
                                style: {}
                              },
                              next: {
                                visibility: true,
                                label: 'Next',
                                style: {}
                              }
                            },
                            numbers: {
                              beforeCurrent: 2,
                              afterCurrent: 2
                            },
                            default: 'auto',
                            widget: {
                              title: {
                                enabled: true,
                                text: ''
                              }
                            },
                            id: 'id-4b9e7f75-cfe9-4b75-9835-ee5b6a0f490b'
                          },
                          columns: [
                            {
                              name: 'column1',
                              displayName: 'Seller Name',
                              sortable: {
                                enabled: true
                              },
                              header: {
                                style: {
                                  color: '#006600'
                                },
                                format: {},
                                aggrFormat: {}
                              },
                              cell: {
                                style: {
                                  color: 'green'
                                },
                                format: {},
                                aggrFormat: {},
                                width: 177.466,
                                aggrFormats: null
                              }
                            },
                            {
                              name: '',
                              displayName: '',
                              cell: {
                                format: {
                                  type: 'numeric',
                                  common: {
                                    suffix: '%',
                                    plain: {
                                      nil: 'NULL',
                                      empty: 'EMPTY',
                                      na: 'N/A'
                                    },
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
                                width: 177.466,
                                style: {},
                                aggrFormats: null
                              },
                              sortable: {
                                enabled: false
                              },
                              header: {
                                style: {},
                                format: null
                              }
                            },
                            {
                              name: 'column3',
                              displayName: 'Value',
                              cell: {
                                format: {
                                  type: 'progress',
                                  config: {
                                    base: 1,
                                    visualization: 'bar'
                                  }
                                },
                                width: 177.466,
                                style: {},
                                aggrFormats: null
                              },
                              sortable: {
                                enabled: true
                              },
                              header: {
                                style: {},
                                format: null
                              }
                            }
                          ],
                          sorting: [],
                          grouping: {},
                          formats: {
                            aggrs: {}
                          },
                          messages: {
                            no_data_at_all: 'No Violations',
                            no_data_found: 'No Violations'
                          },
                          id: 'id-36e0eef6-d142-425a-94c4-35ad48950dde'
                        }
                      }
                    ],
                    column: {
                      name: '',
                      type: ''
                    },
                    operator: '==',
                    value: '',
                    id: 'id-b15f12d4-b097-4ff2-89a2-f1d24394703b'
                  }
                }
              ],
              widget: {
                title: {
                  enabled: true,
                  text: ''
                }
              },
              id: 'id-b0850fd9-59f9-41b5-a3f4-cfadb8d6ee69'
            }
          }
        ],
        widget: {
          title: {
            enabled: true,
            text: ''
          }
        },
        id: 'id-4850a9fa-8191-4ce1-a8ca-2acae5d4a44a'
      }
    },
    {
      style: {
        marginTop: '1rem',
        height: '500px'
      },
      scale: 100,
      type: 'cbpo-widget',
      config: {
        widget: {
          title: {
            text: 'Demo grouped table with filter',
            enabled: true
          },
          widget: {
            title: {
              enabled: true,
              text: ''
            }
          },
          id: 'id-76adde45-c4e2-4244-9d1f-38ae832dc4cc'
        },
        filter: {
          controls: [
            {
              type: 'cbpo-filter-control-select',
              config: {
                label: {
                  text: 'Seller Name'
                },
                common: {
                  column: {
                    name: 'column1',
                    type: 'string'
                  },
                  operator: '==',
                  value: '...'
                },
                selection: {
                  empty: {
                    label: 'Please select',
                    value: null
                  },
                  options: [
                    {
                      label: '62254-9-D',
                      value: '62254-9-D'
                    },
                    {
                      label: '28017-7.5-D',
                      value: '28017-7.5-D'
                    },
                    {
                      label: '13866-12-D',
                      value: '13866-12-D'
                    },
                    {
                      label: '13241-10-D',
                      value: '13241-10-D'
                    },
                    {
                      label: '12250-7.5-M',
                      value: '12250-7.5-M'
                    }
                  ]
                },
                widget: {
                  title: {
                    enabled: true,
                    text: ''
                  }
                },
                id: 'id-c8ba1c7b-f79c-46d2-ab41-396fb70df56a'
              }
            },
            {
              type: 'cbpo-filter-control-select',
              config: {
                label: {
                  text: 'Seller Name'
                },
                common: {
                  column: {
                    name: 'column2',
                    type: 'text'
                  },
                  operator: '==',
                  value: '...'
                },
                selection: {
                  empty: {
                    label: 'Please select',
                    value: null
                  },
                  options: [
                    {
                      label: 'Danner-B0',
                      value: 'Danner-B0'
                    },
                    {
                      label: 'Danner-B1',
                      value: 'Danner-B1'
                    },
                    {
                      label: 'Danner-B2',
                      value: 'Danner-B2'
                    },
                    {
                      label: 'Danner-B3',
                      value: 'Danner-B3'
                    },
                    {
                      label: 'Danner-B4',
                      value: 'Danner-B4'
                    },
                    {
                      label: 'Danner-B5',
                      value: 'Danner-B5'
                    }
                  ]
                },
                widget: {
                  title: {
                    enabled: true,
                    text: ''
                  }
                },
                id: 'id-fa5823cb-8c4c-449f-acda-16a8ff5f22e8'
              }
            }
          ],
          id: 'id-8779a9da-cb43-4ab1-8e19-0ef859cf4830'
        },
        elements: [
          {
            type: 'cbpo-element-table',
            config: {
              dataSource: 'mw_dashboard_main_daily_visitors',
              widget: {
                title: {
                  enabled: false,
                  text: 'Group Table'
                }
              },
              filter: {},
              grouping: {
                columns: [
                  {
                    name: 'column1'
                  }
                ],
                aggregations: [
                  {
                    column: 'column2',
                    aggregation: 'concat',
                    alias: 'column2'
                  },
                  {
                    column: 'column3',
                    aggregation: 'concat',
                    alias: 'column3'
                  },
                  {
                    column: 'column4',
                    aggregation: 'sum',
                    alias: 'column4'
                  }
                ]
              },
              pagination: {
                limit: 30,
                type: 'numbers',
                current: 1,
                total: 35,
                buttons: {
                  first: {
                    visibility: true,
                    label: 'First',
                    style: {}
                  },
                  last: {
                    visibility: true,
                    label: 'Last',
                    style: {}
                  },
                  prev: {
                    visibility: true,
                    label: 'Previous',
                    style: {}
                  },
                  next: {
                    visibility: true,
                    label: 'Next',
                    style: {}
                  }
                },
                numbers: {
                  beforeCurrent: 2,
                  afterCurrent: 2
                },
                default: 'auto',
                widget: {
                  title: {
                    enabled: true,
                    text: ''
                  }
                },
                id: 'id-5a39f94a-94c6-4dcf-93aa-9ceb04e8b03c'
              },
              columns: [
                {
                  name: 'column1',
                  displayName: 'SKU',
                  sortable: {
                    enabled: true
                  },
                  header: {
                    style: {},
                    format: null
                  },
                  cell: {
                    width: 269.2,
                    style: {},
                    format: null,
                    aggrFormats: null
                  }
                },
                {
                  name: 'column2',
                  displayName: 'Seller',
                  sortable: {
                    enabled: true
                  },
                  header: {
                    style: {},
                    format: null
                  },
                  cell: {
                    width: 269.2,
                    style: {},
                    format: null,
                    aggrFormats: null
                  }
                },
                {
                  name: 'column3',
                  displayName: 'Product Title',
                  sortable: {
                    enabled: true
                  },
                  header: {
                    style: {},
                    format: null
                  },
                  cell: {
                    width: 269.2,
                    style: {},
                    format: null,
                    aggrFormats: null
                  }
                },
                {
                  name: 'column4',
                  displayName: 'Count',
                  sortable: {
                    enabled: false
                  },
                  header: {
                    style: {},
                    format: null
                  },
                  cell: {
                    width: 269.2,
                    style: {},
                    format: null,
                    aggrFormats: null
                  }
                }
              ],
              sorting: [],
              formats: {
                aggrs: {}
              },
              messages: {
                no_data_at_all: 'No Violations',
                no_data_found: 'No Violations'
              },
              id: 'id-c8338656-cbeb-4f73-bc8d-dbcf780f5a5d'
            }
          }
        ],
        column: {
          name: '',
          type: ''
        },
        operator: '==',
        value: '',
        id: 'id-c440477f-3b0f-4b26-bc96-cc41cccc046d'
      }
    },
    {
      style: {
        marginTop: '1rem',
        height: '600px'
      },
      scale: 100,
      type: 'cbpo-widget',
      config: {
        widget: {
          title: {
            text: 'Demo table with basic widget filter',
            enabled: true
          },
          widget: {
            title: {
              enabled: true,
              text: ''
            }
          },
          id: 'id-c748587a-e8f8-4a15-b072-8efeb03ecd55'
        },
        filter: {
          controls: [
            {
              type: 'cbpo-filter-control-select',
              config: {
                label: {
                  text: 'Seller Name'
                },
                common: {
                  column: {
                    name: 'column1',
                    type: 'string'
                  },
                  operator: '==',
                  value: '...'
                },
                selection: {
                  empty: {
                    label: 'Please select',
                    value: null
                  },
                  options: [
                    {
                      label: 'Amazon.com',
                      value: 'Amazon.com'
                    },
                    {
                      label: 'Google.com',
                      value: 'Google.com'
                    },
                    {
                      label: 'Facebook.com',
                      value: 'Facebook.com'
                    },
                    {
                      label: 'Alibaba.com',
                      value: 'Alibaba.com'
                    }
                  ]
                },
                widget: {
                  title: {
                    enabled: true,
                    text: ''
                  }
                },
                id: 'id-f20cfe68-bcb7-4b13-999a-e2b5c407a136'
              }
            },
            {
              type: 'cbpo-filter-control-select',
              config: {
                label: {
                  text: 'Date'
                },
                common: {
                  column: {
                    name: 'column12',
                    type: 'string'
                  },
                  operator: '==',
                  value: '...'
                },
                selection: {
                  empty: {
                    label: 'Please select',
                    value: null
                  },
                  options: [
                    {
                      label: '12-05-2019',
                      value: '12-05-2019'
                    },
                    {
                      label: '15-05-2019',
                      value: '15-05-2019'
                    },
                    {
                      label: '18-05-2019',
                      value: '18-05-2019'
                    },
                    {
                      label: '20-05-2019',
                      value: '20-05-2019'
                    },
                    {
                      label: '25-05-2019',
                      value: '25-05-2019'
                    }
                  ]
                },
                widget: {
                  title: {
                    enabled: true,
                    text: ''
                  }
                },
                id: 'id-1bcfa351-b118-4ac7-82bd-362a8611cda4'
              }
            }
          ],
          id: 'id-dbc034fe-009b-4bfa-86f1-0bea40c11712'
        },
        elements: [
          {
            type: 'cbpo-element-table',
            config: {
              dataSource: 'mw_dashboard_main_daily_visitors',
              widget: {
                title: {
                  enabled: false,
                  text: 'Simple Table'
                }
              },
              fiter: {},
              pagination: {
                limit: 30,
                type: 'input',
                current: 1,
                total: 5,
                buttons: {
                  first: {
                    visibility: true,
                    label: 'First',
                    style: {}
                  },
                  last: {
                    visibility: true,
                    label: 'Last',
                    style: {}
                  },
                  prev: {
                    visibility: true,
                    label: 'Previous',
                    style: {}
                  },
                  next: {
                    visibility: true,
                    label: 'Next',
                    style: {}
                  }
                },
                numbers: {
                  beforeCurrent: 2,
                  afterCurrent: 2
                },
                default: 'auto',
                widget: {
                  title: {
                    enabled: true,
                    text: ''
                  }
                },
                id: 'id-53743797-1412-4026-b322-38c0c5f11098'
              },
              columns: [
                {
                  name: 'column1',
                  displayName: 'Seller Name',
                  sortable: {
                    enabled: true
                  },
                  header: {
                    style: {
                      color: '#006600'
                    },
                    format: {},
                    aggrFormat: {}
                  },
                  cell: {
                    style: {
                      color: 'green'
                    },
                    format: {},
                    aggrFormat: {},
                    width: 100,
                    aggrFormats: null
                  }
                },
                {
                  name: 'column2',
                  displayName: 'SKU',
                  sortable: {
                    enabled: true
                  },
                  header: {
                    style: {
                      color: '#006600'
                    },
                    format: {},
                    aggrFormat: {}
                  },
                  cell: {
                    style: {
                      color: 'green'
                    },
                    format: {},
                    aggFormat: {},
                    width: 100,
                    aggrFormats: null
                  }
                },
                {
                  name: 'column3',
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
                  name: 'column4',
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
                  name: 'column5',
                  displayName: 'Seller Price',
                  sortable: {
                    enabled: false
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
                          inCents: true
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
                  name: 'column6',
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
                          inCents: true
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
                  name: 'column7',
                  displayName: '$ DIFF',
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
                          inCents: true
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
                  name: 'column8',
                  displayName: 'Off MAP',
                  sortable: {
                    enabled: false
                  },
                  cell: {
                    style: {
                      'color': '#FF0000',
                      'font-weight': '500'
                    },
                    format: {
                      type: 'numeric',
                      common: {
                        suffix: '%',
                        plain: {
                          nil: 'NULL',
                          empty: 'EMPTY',
                          na: 'N/A'
                        },
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
                  name: 'column9',
                  displayName: 'Link',
                  sortable: {
                    enabled: true
                  },
                  cell: {
                    format: {
                      type: 'link',
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
                  name: 'column10',
                  displayName: 'Screenshot',
                  sortable: {
                    enabled: true
                  },
                  cell: {
                    format: {
                      type: 'link',
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
                  name: 'column11',
                  displayName: 'Seller Offer',
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
                  name: 'column12',
                  displayName: 'Date Violated',
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
                }
              ],
              sorting: [],
              grouping: {},
              formats: {
                aggrs: {}
              },
              messages: {
                no_data_at_all: 'No Violations',
                no_data_found: 'No Violations'
              },
              id: 'id-8ba6f3bf-cc20-4578-96d6-66fc28a0d4af'
            }
          }
        ],
        column: {
          name: '',
          type: ''
        },
        operator: '==',
        value: '',
        id: 'id-6f47c52b-dd88-4771-9f3c-8478df5d39c7'
      }
    },
    {
      style: {
        marginTop: '1rem'
      },
      scale: 100,
      type: 'cbpo-layout',
      config: {
        direction: 'row',
        style: {
          height: '400px'
        },
        widgets: [
          {
            style: {
              marginRight: '0.5rem'
            },
            scale: 70,
            type: 'cbpo-widget',
            config: {
              widget: {
                title: {
                  text: 'Demo table with basic widget filter',
                  enabled: true
                },
                widget: {
                  title: {
                    enabled: true,
                    text: ''
                  }
                },
                id: 'id-fd1858bb-5314-45ff-8334-446990e8516e'
              },
              filter: {
                controls: [
                  {
                    type: 'cbpo-filter-control-select',
                    config: {
                      label: {
                        text: 'Seller Name'
                      },
                      common: {
                        column: {
                          name: 'column1',
                          type: 'string'
                        },
                        operator: '==',
                        value: '...'
                      },
                      selection: {
                        empty: {
                          label: 'Please select',
                          value: null
                        },
                        options: [
                          {
                            label: 'Amazon.com',
                            value: 'Amazon.com'
                          },
                          {
                            label: 'Google.com',
                            value: 'Google.com'
                          },
                          {
                            label: 'Facebook.com',
                            value: 'Facebook.com'
                          },
                          {
                            label: 'Alibaba.com',
                            value: 'Alibaba.com'
                          }
                        ]
                      },
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-f64b2d51-9242-4bfe-9f06-6722b568b838'
                    }
                  },
                  {
                    type: 'cbpo-filter-control-select',
                    config: {
                      label: {
                        text: 'Date'
                      },
                      common: {
                        column: {
                          name: 'column12',
                          type: 'string'
                        },
                        operator: '==',
                        value: '...'
                      },
                      selection: {
                        empty: {
                          label: 'Please select',
                          value: null
                        },
                        options: [
                          {
                            label: '12-05-2019',
                            value: '12-05-2019'
                          },
                          {
                            label: '15-05-2019',
                            value: '15-05-2019'
                          },
                          {
                            label: '18-05-2019',
                            value: '18-05-2019'
                          },
                          {
                            label: '20-05-2019',
                            value: '20-05-2019'
                          },
                          {
                            label: '25-05-2019',
                            value: '25-05-2019'
                          }
                        ]
                      },
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-e9655f54-5716-4391-8f78-56f55bd70759'
                    }
                  }
                ],
                id: 'id-e8a10ffc-3b8a-473a-a4b8-ef747c697440'
              },
              elements: [
                {
                  type: 'cbpo-element-table',
                  config: {
                    dataSource: 'mw_dashboard_main_daily_visitors',
                    widget: {
                      title: {
                        enabled: false,
                        text: 'Simple Table'
                      }
                    },
                    fiter: {},
                    pagination: {
                      limit: 30,
                      type: 'input',
                      current: 1,
                      total: 5,
                      buttons: {
                        first: {
                          visibility: true,
                          label: 'First',
                          style: {}
                        },
                        last: {
                          visibility: true,
                          label: 'Last',
                          style: {}
                        },
                        prev: {
                          visibility: true,
                          label: 'Previous',
                          style: {}
                        },
                        next: {
                          visibility: true,
                          label: 'Next',
                          style: {}
                        }
                      },
                      numbers: {
                        beforeCurrent: 2,
                        afterCurrent: 2
                      },
                      default: 'auto',
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-09c6206f-0413-4f1f-8987-bd6caad22bb3'
                    },
                    columns: [
                      {
                        name: 'column1',
                        displayName: 'Seller Name',
                        sortable: {
                          enabled: true
                        },
                        header: {
                          style: {
                            color: '#006600'
                          },
                          format: {},
                          aggrFormat: {}
                        },
                        cell: {
                          style: {
                            color: 'green'
                          },
                          format: {},
                          aggrFormat: {},
                          width: 100,
                          aggrFormats: null
                        }
                      },
                      {
                        name: 'column2',
                        displayName: 'SKU',
                        sortable: {
                          enabled: true
                        },
                        header: {
                          style: {
                            color: '#006600'
                          },
                          format: {},
                          aggrFormat: {}
                        },
                        cell: {
                          style: {
                            color: 'green'
                          },
                          format: {},
                          aggFormat: {},
                          width: 100,
                          aggrFormats: null
                        }
                      },
                      {
                        name: 'column3',
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
                        name: 'column4',
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
                        name: 'column5',
                        displayName: 'Seller Price',
                        sortable: {
                          enabled: false
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
                                inCents: true
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
                        name: 'column6',
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
                                inCents: true
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
                        name: 'column7',
                        displayName: '$ DIFF',
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
                                inCents: true
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
                        name: 'column8',
                        displayName: 'Off MAP',
                        sortable: {
                          enabled: false
                        },
                        cell: {
                          style: {
                            'color': '#FF0000',
                            'font-weight': '500'
                          },
                          format: {
                            type: 'numeric',
                            common: {
                              suffix: '%',
                              plain: {
                                nil: 'NULL',
                                empty: 'EMPTY',
                                na: 'N/A'
                              },
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
                        name: 'column9',
                        displayName: 'Link',
                        sortable: {
                          enabled: true
                        },
                        cell: {
                          format: {
                            type: 'link',
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
                        name: 'column10',
                        displayName: 'Screenshot',
                        sortable: {
                          enabled: true
                        },
                        cell: {
                          format: {
                            type: 'link',
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
                        name: 'column11',
                        displayName: 'Seller Offer',
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
                        name: 'column12',
                        displayName: 'Date Violated',
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
                      }
                    ],
                    sorting: [],
                    grouping: {},
                    formats: {
                      aggrs: {}
                    },
                    messages: {
                      no_data_at_all: 'No Violations',
                      no_data_found: 'No Violations'
                    },
                    id: 'id-28f33fad-3594-4e76-a6f9-fb62e22f026d'
                  }
                }
              ],
              column: {
                name: '',
                type: ''
              },
              operator: '==',
              value: '',
              id: 'id-2e1af512-24a3-4975-abc2-4e6edd2b9dfa'
            }
          },
          {
            style: {
              marginTop: '1rem',
              height: '680px'
            },
            scale: 100,
            type: 'cbpo-layout',
            config: {
              direction: 'row',
              style: {
                alignItems: 'flex-start',
                height: '100%'
              },
              widgets: [
                {
                  style: {
                    height: '100%'
                  },
                  scale: 50,
                  type: 'cbpo-widget',
                  config: {
                    widget: {
                      title: {
                        text: 'Demo grouped table with filter',
                        enabled: true
                      },
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-9327fde1-746a-4aa4-86f8-fac876d40c6b'
                    },
                    filter: {
                      controls: [
                        {
                          type: 'cbpo-filter-control-select',
                          config: {
                            label: {
                              text: 'Seller Name'
                            },
                            common: {
                              column: {
                                name: 'column1',
                                type: 'string'
                              },
                              operator: '==',
                              value: '...'
                            },
                            selection: {
                              empty: {
                                label: 'Please select',
                                value: null
                              },
                              options: [
                                {
                                  label: '62254-9-D',
                                  value: '62254-9-D'
                                },
                                {
                                  label: '28017-7.5-D',
                                  value: '28017-7.5-D'
                                },
                                {
                                  label: '13866-12-D',
                                  value: '13866-12-D'
                                },
                                {
                                  label: '13241-10-D',
                                  value: '13241-10-D'
                                },
                                {
                                  label: '12250-7.5-M',
                                  value: '12250-7.5-M'
                                }
                              ]
                            },
                            widget: {
                              title: {
                                enabled: true,
                                text: ''
                              }
                            },
                            id: 'id-54643480-275b-4674-8f0b-680b2a738df3'
                          }
                        },
                        {
                          type: 'cbpo-filter-control-select',
                          config: {
                            label: {
                              text: 'Seller Name'
                            },
                            common: {
                              column: {
                                name: 'column2',
                                type: 'text'
                              },
                              operator: '==',
                              value: '...'
                            },
                            selection: {
                              empty: {
                                label: 'Please select',
                                value: null
                              },
                              options: [
                                {
                                  label: 'Danner-B0',
                                  value: 'Danner-B0'
                                },
                                {
                                  label: 'Danner-B1',
                                  value: 'Danner-B1'
                                },
                                {
                                  label: 'Danner-B2',
                                  value: 'Danner-B2'
                                },
                                {
                                  label: 'Danner-B3',
                                  value: 'Danner-B3'
                                },
                                {
                                  label: 'Danner-B4',
                                  value: 'Danner-B4'
                                },
                                {
                                  label: 'Danner-B5',
                                  value: 'Danner-B5'
                                }
                              ]
                            },
                            widget: {
                              title: {
                                enabled: true,
                                text: ''
                              }
                            },
                            id: 'id-eaaa7aef-f415-4a5a-aa69-9e83ff7964a1'
                          }
                        }
                      ],
                      id: 'id-55bcab2c-55b2-4909-9b08-4b24e83c3ecd'
                    },
                    elements: [
                      {
                        type: 'cbpo-element-table',
                        config: {
                          dataSource: 'mw_dashboard_main_daily_visitors',
                          widget: {
                            title: {
                              enabled: false,
                              text: 'Group Table'
                            }
                          },
                          filter: {},
                          grouping: {
                            columns: [
                              {
                                name: 'column1'
                              }
                            ],
                            aggregations: [
                              {
                                column: 'column2',
                                aggregation: 'concat',
                                alias: 'column2'
                              },
                              {
                                column: 'column3',
                                aggregation: 'concat',
                                alias: 'column3'
                              },
                              {
                                column: 'column4',
                                aggregation: 'sum',
                                alias: 'column4'
                              }
                            ]
                          },
                          pagination: {
                            limit: 30,
                            type: 'numbers',
                            current: 1,
                            total: 35,
                            buttons: {
                              first: {
                                visibility: true,
                                label: 'First',
                                style: {}
                              },
                              last: {
                                visibility: true,
                                label: 'Last',
                                style: {}
                              },
                              prev: {
                                visibility: true,
                                label: 'Previous',
                                style: {}
                              },
                              next: {
                                visibility: true,
                                label: 'Next',
                                style: {}
                              }
                            },
                            numbers: {
                              beforeCurrent: 2,
                              afterCurrent: 2
                            },
                            default: 'auto',
                            widget: {
                              title: {
                                enabled: true,
                                text: ''
                              }
                            },
                            id: 'id-7c727896-21f2-4de9-8810-63c7e9bb6b09'
                          },
                          columns: [
                            {
                              name: 'column1',
                              displayName: 'SKU',
                              sortable: {
                                enabled: true
                              },
                              header: {
                                style: {},
                                format: null
                              },
                              cell: {
                                width: 133.0995,
                                style: {},
                                format: null,
                                aggrFormats: null
                              }
                            },
                            {
                              name: 'column2',
                              displayName: 'Seller',
                              sortable: {
                                enabled: true
                              },
                              header: {
                                style: {},
                                format: null
                              },
                              cell: {
                                width: 133.0995,
                                style: {},
                                format: null,
                                aggrFormats: null
                              }
                            },
                            {
                              name: 'column3',
                              displayName: 'Product Title',
                              sortable: {
                                enabled: true
                              },
                              header: {
                                style: {},
                                format: null
                              },
                              cell: {
                                width: 133.0995,
                                style: {},
                                format: null,
                                aggrFormats: null
                              }
                            },
                            {
                              name: 'column4',
                              displayName: 'Count',
                              sortable: {
                                enabled: false
                              },
                              header: {
                                style: {},
                                format: null
                              },
                              cell: {
                                width: 133.0995,
                                style: {},
                                format: null,
                                aggrFormats: null
                              }
                            }
                          ],
                          sorting: [],
                          formats: {
                            aggrs: {}
                          },
                          messages: {
                            no_data_at_all: 'No Violations',
                            no_data_found: 'No Violations'
                          },
                          id: 'id-cb4071b1-339a-41e8-a565-9444dd2a894a'
                        }
                      }
                    ],
                    column: {
                      name: '',
                      type: ''
                    },
                    operator: '==',
                    value: '',
                    id: 'id-2c5854b3-a374-4b02-8d9f-7dd88a247bac'
                  }
                },
                {
                  style: {
                    marginLeft: '0.5rem',
                    height: '100%'
                  },
                  scale: 50,
                  type: 'cbpo-layout',
                  config: {
                    direction: 'column',
                    style: {
                      height: '100%'
                    },
                    widgets: [
                      {
                        style: {
                          height: '50%'
                        },
                        scale: 100,
                        type: 'cbpo-widget',
                        config: {
                          widget: {
                            title: {
                              text: 'Demo grouped table with filter',
                              enabled: true
                            },
                            widget: {
                              title: {
                                enabled: true,
                                text: ''
                              }
                            },
                            id: 'id-e849f731-d85b-44ab-a235-b1bf142dbe1a'
                          },
                          filter: {
                            controls: [
                              {
                                type: 'cbpo-filter-control-select',
                                config: {
                                  label: {
                                    text: 'Seller Name'
                                  },
                                  common: {
                                    column: {
                                      name: 'column1',
                                      type: 'string'
                                    },
                                    operator: '==',
                                    value: '...'
                                  },
                                  selection: {
                                    empty: {
                                      label: 'Please select',
                                      value: null
                                    },
                                    options: [
                                      {
                                        label: '62254-9-D',
                                        value: '62254-9-D'
                                      },
                                      {
                                        label: '28017-7.5-D',
                                        value: '28017-7.5-D'
                                      },
                                      {
                                        label: '13866-12-D',
                                        value: '13866-12-D'
                                      },
                                      {
                                        label: '13241-10-D',
                                        value: '13241-10-D'
                                      },
                                      {
                                        label: '12250-7.5-M',
                                        value: '12250-7.5-M'
                                      }
                                    ]
                                  },
                                  widget: {
                                    title: {
                                      enabled: true,
                                      text: ''
                                    }
                                  },
                                  id: 'id-8d44a3e7-058f-4298-bae6-133f0ebb13c1'
                                }
                              },
                              {
                                type: 'cbpo-filter-control-select',
                                config: {
                                  label: {
                                    text: 'Seller Name'
                                  },
                                  common: {
                                    column: {
                                      name: 'column2',
                                      type: 'text'
                                    },
                                    operator: '==',
                                    value: '...'
                                  },
                                  selection: {
                                    empty: {
                                      label: 'Please select',
                                      value: null
                                    },
                                    options: [
                                      {
                                        label: 'Danner-B0',
                                        value: 'Danner-B0'
                                      },
                                      {
                                        label: 'Danner-B1',
                                        value: 'Danner-B1'
                                      },
                                      {
                                        label: 'Danner-B2',
                                        value: 'Danner-B2'
                                      },
                                      {
                                        label: 'Danner-B3',
                                        value: 'Danner-B3'
                                      },
                                      {
                                        label: 'Danner-B4',
                                        value: 'Danner-B4'
                                      },
                                      {
                                        label: 'Danner-B5',
                                        value: 'Danner-B5'
                                      }
                                    ]
                                  },
                                  widget: {
                                    title: {
                                      enabled: true,
                                      text: ''
                                    }
                                  },
                                  id: 'id-5d9dbfcb-dfe9-4052-becb-98fe231e07bc'
                                }
                              }
                            ],
                            id: 'id-47394e7a-48ba-4935-9cff-7e54f448f990'
                          },
                          elements: [
                            {
                              type: 'cbpo-element-table',
                              config: {
                                dataSource: 'mw_dashboard_main_daily_visitors',
                                widget: {
                                  title: {
                                    enabled: false,
                                    text: 'Group Table'
                                  }
                                },
                                filter: {},
                                grouping: {
                                  columns: [
                                    {
                                      name: 'column1'
                                    }
                                  ],
                                  aggregations: [
                                    {
                                      column: 'column2',
                                      aggregation: 'concat',
                                      alias: 'column2'
                                    },
                                    {
                                      column: 'column3',
                                      aggregation: 'concat',
                                      alias: 'column3'
                                    },
                                    {
                                      column: 'column4',
                                      aggregation: 'sum',
                                      alias: 'column4'
                                    }
                                  ]
                                },
                                pagination: {
                                  limit: 30,
                                  type: 'numbers',
                                  current: 1,
                                  total: 35,
                                  buttons: {
                                    first: {
                                      visibility: true,
                                      label: 'First',
                                      style: {}
                                    },
                                    last: {
                                      visibility: true,
                                      label: 'Last',
                                      style: {}
                                    },
                                    prev: {
                                      visibility: true,
                                      label: 'Previous',
                                      style: {}
                                    },
                                    next: {
                                      visibility: true,
                                      label: 'Next',
                                      style: {}
                                    }
                                  },
                                  numbers: {
                                    beforeCurrent: 2,
                                    afterCurrent: 2
                                  },
                                  default: 'auto',
                                  widget: {
                                    title: {
                                      enabled: true,
                                      text: ''
                                    }
                                  },
                                  id: 'id-8d391b8d-8d74-4a1b-87d9-be1cf12e3be6'
                                },
                                columns: [
                                  {
                                    name: 'column1',
                                    displayName: 'SKU',
                                    sortable: {
                                      enabled: true
                                    },
                                    header: {
                                      style: {},
                                      format: null
                                    },
                                    cell: {
                                      width: 133.0995,
                                      style: {},
                                      format: null,
                                      aggrFormats: null
                                    }
                                  },
                                  {
                                    name: 'column2',
                                    displayName: 'Seller',
                                    sortable: {
                                      enabled: true
                                    },
                                    header: {
                                      style: {},
                                      format: null
                                    },
                                    cell: {
                                      width: 133.0995,
                                      style: {},
                                      format: null,
                                      aggrFormats: null
                                    }
                                  },
                                  {
                                    name: 'column3',
                                    displayName: 'Product Title',
                                    sortable: {
                                      enabled: true
                                    },
                                    header: {
                                      style: {},
                                      format: null
                                    },
                                    cell: {
                                      width: 133.0995,
                                      style: {},
                                      format: null,
                                      aggrFormats: null
                                    }
                                  },
                                  {
                                    name: 'column4',
                                    displayName: 'Count',
                                    sortable: {
                                      enabled: false
                                    },
                                    header: {
                                      style: {},
                                      format: null
                                    },
                                    cell: {
                                      width: 133.0995,
                                      style: {},
                                      format: null,
                                      aggrFormats: null
                                    }
                                  }
                                ],
                                sorting: [],
                                formats: {
                                  aggrs: {}
                                },
                                messages: {
                                  no_data_at_all: 'No Violations',
                                  no_data_found: 'No Violations'
                                },
                                id: 'id-3d74d44f-f61b-4401-93ca-a5b84dcebf63'
                              }
                            }
                          ],
                          column: {
                            name: '',
                            type: ''
                          },
                          operator: '==',
                          value: '',
                          id: 'id-4fcc4d95-7c2a-4979-8242-d817b7e0c4f6'
                        }
                      },
                      {
                        style: {
                          height: '50%',
                          paddingTop: '5px'
                        },
                        scale: 100,
                        type: 'cbpo-widget',
                        config: {
                          widget: {
                            title: {
                              text: 'Demo table with progress bar',
                              enabled: true
                            },
                            widget: {
                              title: {
                                enabled: true,
                                text: ''
                              }
                            },
                            id: 'id-dfd40fe5-77ab-43a3-8b5a-cb58e07beb88'
                          },
                          filter: {
                            controls: [],
                            id: 'id-cd1c0de2-c2ea-4564-b949-3c80f87dfe13'
                          },
                          elements: [
                            {
                              type: 'cbpo-element-table',
                              config: {
                                dataSource: 'mw_dashboard_main_daily_visitors',
                                widget: {
                                  title: {
                                    enabled: false
                                  }
                                },
                                pagination: {
                                  limit: 30,
                                  type: 'input',
                                  current: 1,
                                  total: 1,
                                  buttons: {
                                    first: {
                                      visibility: true,
                                      label: 'First',
                                      style: {}
                                    },
                                    last: {
                                      visibility: true,
                                      label: 'Last',
                                      style: {}
                                    },
                                    prev: {
                                      visibility: true,
                                      label: 'Previous',
                                      style: {}
                                    },
                                    next: {
                                      visibility: true,
                                      label: 'Next',
                                      style: {}
                                    }
                                  },
                                  numbers: {
                                    beforeCurrent: 2,
                                    afterCurrent: 2
                                  },
                                  default: 'auto',
                                  widget: {
                                    title: {
                                      enabled: true,
                                      text: ''
                                    }
                                  },
                                  id: 'id-4b9e7f75-cfe9-4b75-9835-ee5b6a0f490b'
                                },
                                columns: [
                                  {
                                    name: 'column1',
                                    displayName: 'Seller Name',
                                    sortable: {
                                      enabled: true
                                    },
                                    header: {
                                      style: {
                                        color: '#006600'
                                      },
                                      format: {},
                                      aggrFormat: {}
                                    },
                                    cell: {
                                      style: {
                                        color: 'green'
                                      },
                                      format: {},
                                      aggrFormat: {},
                                      width: 177.466,
                                      aggrFormats: null
                                    }
                                  },
                                  {
                                    name: '',
                                    displayName: '',
                                    cell: {
                                      format: {
                                        type: 'numeric',
                                        common: {
                                          suffix: '%',
                                          plain: {
                                            nil: 'NULL',
                                            empty: 'EMPTY',
                                            na: 'N/A'
                                          },
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
                                      width: 177.466,
                                      style: {},
                                      aggrFormats: null
                                    },
                                    sortable: {
                                      enabled: false
                                    },
                                    header: {
                                      style: {},
                                      format: null
                                    }
                                  },
                                  {
                                    name: 'column3',
                                    displayName: 'Value',
                                    cell: {
                                      format: {
                                        type: 'progress',
                                        config: {
                                          base: 1,
                                          visualization: 'bar'
                                        }
                                      },
                                      width: 177.466,
                                      style: {},
                                      aggrFormats: null
                                    },
                                    sortable: {
                                      enabled: true
                                    },
                                    header: {
                                      style: {},
                                      format: null
                                    }
                                  }
                                ],
                                sorting: [],
                                grouping: {},
                                formats: {
                                  aggrs: {}
                                },
                                messages: {
                                  no_data_at_all: 'No Violations',
                                  no_data_found: 'No Violations'
                                },
                                id: 'id-36e0eef6-d142-425a-94c4-35ad48950dde'
                              }
                            }
                          ],
                          column: {
                            name: '',
                            type: ''
                          },
                          operator: '==',
                          value: '',
                          id: 'id-b15f12d4-b097-4ff2-89a2-f1d24394703b'
                        }
                      }
                    ],
                    widget: {
                      title: {
                        enabled: true,
                        text: ''
                      }
                    },
                    id: 'id-b0850fd9-59f9-41b5-a3f4-cfadb8d6ee69'
                  }
                }
              ],
              widget: {
                title: {
                  enabled: true,
                  text: ''
                }
              },
              id: 'id-4850a9fa-8191-4ce1-a8ca-2acae5d4a44a'
            }
          },
          {
            style: {
              marginTop: '1rem',
              height: '500px'
            },
            scale: 100,
            type: 'cbpo-widget',
            config: {
              widget: {
                title: {
                  text: 'Demo grouped table with filter',
                  enabled: true
                },
                widget: {
                  title: {
                    enabled: true,
                    text: ''
                  }
                },
                id: 'id-76adde45-c4e2-4244-9d1f-38ae832dc4cc'
              },
              filter: {
                controls: [
                  {
                    type: 'cbpo-filter-control-select',
                    config: {
                      label: {
                        text: 'Seller Name'
                      },
                      common: {
                        column: {
                          name: 'column1',
                          type: 'string'
                        },
                        operator: '==',
                        value: '...'
                      },
                      selection: {
                        empty: {
                          label: 'Please select',
                          value: null
                        },
                        options: [
                          {
                            label: '62254-9-D',
                            value: '62254-9-D'
                          },
                          {
                            label: '28017-7.5-D',
                            value: '28017-7.5-D'
                          },
                          {
                            label: '13866-12-D',
                            value: '13866-12-D'
                          },
                          {
                            label: '13241-10-D',
                            value: '13241-10-D'
                          },
                          {
                            label: '12250-7.5-M',
                            value: '12250-7.5-M'
                          }
                        ]
                      },
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-c8ba1c7b-f79c-46d2-ab41-396fb70df56a'
                    }
                  },
                  {
                    type: 'cbpo-filter-control-select',
                    config: {
                      label: {
                        text: 'Seller Name'
                      },
                      common: {
                        column: {
                          name: 'column2',
                          type: 'text'
                        },
                        operator: '==',
                        value: '...'
                      },
                      selection: {
                        empty: {
                          label: 'Please select',
                          value: null
                        },
                        options: [
                          {
                            label: 'Danner-B0',
                            value: 'Danner-B0'
                          },
                          {
                            label: 'Danner-B1',
                            value: 'Danner-B1'
                          },
                          {
                            label: 'Danner-B2',
                            value: 'Danner-B2'
                          },
                          {
                            label: 'Danner-B3',
                            value: 'Danner-B3'
                          },
                          {
                            label: 'Danner-B4',
                            value: 'Danner-B4'
                          },
                          {
                            label: 'Danner-B5',
                            value: 'Danner-B5'
                          }
                        ]
                      },
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-fa5823cb-8c4c-449f-acda-16a8ff5f22e8'
                    }
                  }
                ],
                id: 'id-8779a9da-cb43-4ab1-8e19-0ef859cf4830'
              },
              elements: [
                {
                  type: 'cbpo-element-table',
                  config: {
                    dataSource: 'mw_dashboard_main_daily_visitors',
                    widget: {
                      title: {
                        enabled: false,
                        text: 'Group Table'
                      }
                    },
                    filter: {},
                    grouping: {
                      columns: [
                        {
                          name: 'column1'
                        }
                      ],
                      aggregations: [
                        {
                          column: 'column2',
                          aggregation: 'concat',
                          alias: 'column2'
                        },
                        {
                          column: 'column3',
                          aggregation: 'concat',
                          alias: 'column3'
                        },
                        {
                          column: 'column4',
                          aggregation: 'sum',
                          alias: 'column4'
                        }
                      ]
                    },
                    pagination: {
                      limit: 30,
                      type: 'numbers',
                      current: 1,
                      total: 35,
                      buttons: {
                        first: {
                          visibility: true,
                          label: 'First',
                          style: {}
                        },
                        last: {
                          visibility: true,
                          label: 'Last',
                          style: {}
                        },
                        prev: {
                          visibility: true,
                          label: 'Previous',
                          style: {}
                        },
                        next: {
                          visibility: true,
                          label: 'Next',
                          style: {}
                        }
                      },
                      numbers: {
                        beforeCurrent: 2,
                        afterCurrent: 2
                      },
                      default: 'auto',
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-5a39f94a-94c6-4dcf-93aa-9ceb04e8b03c'
                    },
                    columns: [
                      {
                        name: 'column1',
                        displayName: 'SKU',
                        sortable: {
                          enabled: true
                        },
                        header: {
                          style: {},
                          format: null
                        },
                        cell: {
                          width: 269.2,
                          style: {},
                          format: null,
                          aggrFormats: null
                        }
                      },
                      {
                        name: 'column2',
                        displayName: 'Seller',
                        sortable: {
                          enabled: true
                        },
                        header: {
                          style: {},
                          format: null
                        },
                        cell: {
                          width: 269.2,
                          style: {},
                          format: null,
                          aggrFormats: null
                        }
                      },
                      {
                        name: 'column3',
                        displayName: 'Product Title',
                        sortable: {
                          enabled: true
                        },
                        header: {
                          style: {},
                          format: null
                        },
                        cell: {
                          width: 269.2,
                          style: {},
                          format: null,
                          aggrFormats: null
                        }
                      },
                      {
                        name: 'column4',
                        displayName: 'Count',
                        sortable: {
                          enabled: false
                        },
                        header: {
                          style: {},
                          format: null
                        },
                        cell: {
                          width: 269.2,
                          style: {},
                          format: null,
                          aggrFormats: null
                        }
                      }
                    ],
                    sorting: [],
                    formats: {
                      aggrs: {}
                    },
                    messages: {
                      no_data_at_all: 'No Violations',
                      no_data_found: 'No Violations'
                    },
                    id: 'id-c8338656-cbeb-4f73-bc8d-dbcf780f5a5d'
                  }
                }
              ],
              column: {
                name: '',
                type: ''
              },
              operator: '==',
              value: '',
              id: 'id-c440477f-3b0f-4b26-bc96-cc41cccc046d'
            }
          },
          {
            style: {
              marginTop: '1rem',
              height: '600px'
            },
            scale: 100,
            type: 'cbpo-widget',
            config: {
              widget: {
                title: {
                  text: 'Demo table with basic widget filter',
                  enabled: true
                },
                widget: {
                  title: {
                    enabled: true,
                    text: ''
                  }
                },
                id: 'id-c748587a-e8f8-4a15-b072-8efeb03ecd55'
              },
              filter: {
                controls: [
                  {
                    type: 'cbpo-filter-control-select',
                    config: {
                      label: {
                        text: 'Seller Name'
                      },
                      common: {
                        column: {
                          name: 'column1',
                          type: 'string'
                        },
                        operator: '==',
                        value: '...'
                      },
                      selection: {
                        empty: {
                          label: 'Please select',
                          value: null
                        },
                        options: [
                          {
                            label: 'Amazon.com',
                            value: 'Amazon.com'
                          },
                          {
                            label: 'Google.com',
                            value: 'Google.com'
                          },
                          {
                            label: 'Facebook.com',
                            value: 'Facebook.com'
                          },
                          {
                            label: 'Alibaba.com',
                            value: 'Alibaba.com'
                          }
                        ]
                      },
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-f20cfe68-bcb7-4b13-999a-e2b5c407a136'
                    }
                  },
                  {
                    type: 'cbpo-filter-control-select',
                    config: {
                      label: {
                        text: 'Date'
                      },
                      common: {
                        column: {
                          name: 'column12',
                          type: 'string'
                        },
                        operator: '==',
                        value: '...'
                      },
                      selection: {
                        empty: {
                          label: 'Please select',
                          value: null
                        },
                        options: [
                          {
                            label: '12-05-2019',
                            value: '12-05-2019'
                          },
                          {
                            label: '15-05-2019',
                            value: '15-05-2019'
                          },
                          {
                            label: '18-05-2019',
                            value: '18-05-2019'
                          },
                          {
                            label: '20-05-2019',
                            value: '20-05-2019'
                          },
                          {
                            label: '25-05-2019',
                            value: '25-05-2019'
                          }
                        ]
                      },
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-1bcfa351-b118-4ac7-82bd-362a8611cda4'
                    }
                  }
                ],
                id: 'id-dbc034fe-009b-4bfa-86f1-0bea40c11712'
              },
              elements: [
                {
                  type: 'cbpo-element-table',
                  config: {
                    dataSource: 'mw_dashboard_main_daily_visitors',
                    widget: {
                      title: {
                        enabled: false,
                        text: 'Simple Table'
                      }
                    },
                    fiter: {},
                    pagination: {
                      limit: 30,
                      type: 'input',
                      current: 1,
                      total: 5,
                      buttons: {
                        first: {
                          visibility: true,
                          label: 'First',
                          style: {}
                        },
                        last: {
                          visibility: true,
                          label: 'Last',
                          style: {}
                        },
                        prev: {
                          visibility: true,
                          label: 'Previous',
                          style: {}
                        },
                        next: {
                          visibility: true,
                          label: 'Next',
                          style: {}
                        }
                      },
                      numbers: {
                        beforeCurrent: 2,
                        afterCurrent: 2
                      },
                      default: 'auto',
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-53743797-1412-4026-b322-38c0c5f11098'
                    },
                    columns: [
                      {
                        name: 'column1',
                        displayName: 'Seller Name',
                        sortable: {
                          enabled: true
                        },
                        header: {
                          style: {
                            color: '#006600'
                          },
                          format: {},
                          aggrFormat: {}
                        },
                        cell: {
                          style: {
                            color: 'green'
                          },
                          format: {},
                          aggrFormat: {},
                          width: 100,
                          aggrFormats: null
                        }
                      },
                      {
                        name: 'column2',
                        displayName: 'SKU',
                        sortable: {
                          enabled: true
                        },
                        header: {
                          style: {
                            color: '#006600'
                          },
                          format: {},
                          aggrFormat: {}
                        },
                        cell: {
                          style: {
                            color: 'green'
                          },
                          format: {},
                          aggFormat: {},
                          width: 100,
                          aggrFormats: null
                        }
                      },
                      {
                        name: 'column3',
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
                        name: 'column4',
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
                        name: 'column5',
                        displayName: 'Seller Price',
                        sortable: {
                          enabled: false
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
                                inCents: true
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
                        name: 'column6',
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
                                inCents: true
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
                        name: 'column7',
                        displayName: '$ DIFF',
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
                                inCents: true
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
                        name: 'column8',
                        displayName: 'Off MAP',
                        sortable: {
                          enabled: false
                        },
                        cell: {
                          style: {
                            'color': '#FF0000',
                            'font-weight': '500'
                          },
                          format: {
                            type: 'numeric',
                            common: {
                              suffix: '%',
                              plain: {
                                nil: 'NULL',
                                empty: 'EMPTY',
                                na: 'N/A'
                              },
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
                        name: 'column9',
                        displayName: 'Link',
                        sortable: {
                          enabled: true
                        },
                        cell: {
                          format: {
                            type: 'link',
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
                        name: 'column10',
                        displayName: 'Screenshot',
                        sortable: {
                          enabled: true
                        },
                        cell: {
                          format: {
                            type: 'link',
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
                        name: 'column11',
                        displayName: 'Seller Offer',
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
                        name: 'column12',
                        displayName: 'Date Violated',
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
                      }
                    ],
                    sorting: [],
                    grouping: {},
                    formats: {
                      aggrs: {}
                    },
                    messages: {
                      no_data_at_all: 'No Violations',
                      no_data_found: 'No Violations'
                    },
                    id: 'id-8ba6f3bf-cc20-4578-96d6-66fc28a0d4af'
                  }
                }
              ],
              column: {
                name: '',
                type: ''
              },
              operator: '==',
              value: '',
              id: 'id-6f47c52b-dd88-4771-9f3c-8478df5d39c7'
            }
          },
          {
            style: {
              marginTop: '1rem'
            },
            scale: 100,
            type: 'cbpo-layout',
            config: {
              direction: 'row',
              style: {
                height: '400px'
              },
              widgets: [
                {
                  style: {
                    marginRight: '0.5rem'
                  },
                  scale: 70,
                  type: 'cbpo-widget',
                  config: {
                    widget: {
                      title: {
                        text: 'Demo table with basic widget filter',
                        enabled: true
                      },
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-fd1858bb-5314-45ff-8334-446990e8516e'
                    },
                    filter: {
                      controls: [
                        {
                          type: 'cbpo-filter-control-select',
                          config: {
                            label: {
                              text: 'Seller Name'
                            },
                            common: {
                              column: {
                                name: 'column1',
                                type: 'string'
                              },
                              operator: '==',
                              value: '...'
                            },
                            selection: {
                              empty: {
                                label: 'Please select',
                                value: null
                              },
                              options: [
                                {
                                  label: 'Amazon.com',
                                  value: 'Amazon.com'
                                },
                                {
                                  label: 'Google.com',
                                  value: 'Google.com'
                                },
                                {
                                  label: 'Facebook.com',
                                  value: 'Facebook.com'
                                },
                                {
                                  label: 'Alibaba.com',
                                  value: 'Alibaba.com'
                                }
                              ]
                            },
                            widget: {
                              title: {
                                enabled: true,
                                text: ''
                              }
                            },
                            id: 'id-f64b2d51-9242-4bfe-9f06-6722b568b838'
                          }
                        },
                        {
                          type: 'cbpo-filter-control-select',
                          config: {
                            label: {
                              text: 'Date'
                            },
                            common: {
                              column: {
                                name: 'column12',
                                type: 'string'
                              },
                              operator: '==',
                              value: '...'
                            },
                            selection: {
                              empty: {
                                label: 'Please select',
                                value: null
                              },
                              options: [
                                {
                                  label: '12-05-2019',
                                  value: '12-05-2019'
                                },
                                {
                                  label: '15-05-2019',
                                  value: '15-05-2019'
                                },
                                {
                                  label: '18-05-2019',
                                  value: '18-05-2019'
                                },
                                {
                                  label: '20-05-2019',
                                  value: '20-05-2019'
                                },
                                {
                                  label: '25-05-2019',
                                  value: '25-05-2019'
                                }
                              ]
                            },
                            widget: {
                              title: {
                                enabled: true,
                                text: ''
                              }
                            },
                            id: 'id-e9655f54-5716-4391-8f78-56f55bd70759'
                          }
                        }
                      ],
                      id: 'id-e8a10ffc-3b8a-473a-a4b8-ef747c697440'
                    },
                    elements: [
                      {
                        type: 'cbpo-element-table',
                        config: {
                          dataSource: 'mw_dashboard_main_daily_visitors',
                          widget: {
                            title: {
                              enabled: false,
                              text: 'Simple Table'
                            }
                          },
                          fiter: {},
                          pagination: {
                            limit: 30,
                            type: 'input',
                            current: 1,
                            total: 5,
                            buttons: {
                              first: {
                                visibility: true,
                                label: 'First',
                                style: {}
                              },
                              last: {
                                visibility: true,
                                label: 'Last',
                                style: {}
                              },
                              prev: {
                                visibility: true,
                                label: 'Previous',
                                style: {}
                              },
                              next: {
                                visibility: true,
                                label: 'Next',
                                style: {}
                              }
                            },
                            numbers: {
                              beforeCurrent: 2,
                              afterCurrent: 2
                            },
                            default: 'auto',
                            widget: {
                              title: {
                                enabled: true,
                                text: ''
                              }
                            },
                            id: 'id-09c6206f-0413-4f1f-8987-bd6caad22bb3'
                          },
                          columns: [
                            {
                              name: 'column1',
                              displayName: 'Seller Name',
                              sortable: {
                                enabled: true
                              },
                              header: {
                                style: {
                                  color: '#006600'
                                },
                                format: {},
                                aggrFormat: {}
                              },
                              cell: {
                                style: {
                                  color: 'green'
                                },
                                format: {},
                                aggrFormat: {},
                                width: 100,
                                aggrFormats: null
                              }
                            },
                            {
                              name: 'column2',
                              displayName: 'SKU',
                              sortable: {
                                enabled: true
                              },
                              header: {
                                style: {
                                  color: '#006600'
                                },
                                format: {},
                                aggrFormat: {}
                              },
                              cell: {
                                style: {
                                  color: 'green'
                                },
                                format: {},
                                aggFormat: {},
                                width: 100,
                                aggrFormats: null
                              }
                            },
                            {
                              name: 'column3',
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
                              name: 'column4',
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
                              name: 'column5',
                              displayName: 'Seller Price',
                              sortable: {
                                enabled: false
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
                                      inCents: true
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
                              name: 'column6',
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
                                      inCents: true
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
                              name: 'column7',
                              displayName: '$ DIFF',
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
                                      inCents: true
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
                              name: 'column8',
                              displayName: 'Off MAP',
                              sortable: {
                                enabled: false
                              },
                              cell: {
                                style: {
                                  'color': '#FF0000',
                                  'font-weight': '500'
                                },
                                format: {
                                  type: 'numeric',
                                  common: {
                                    suffix: '%',
                                    plain: {
                                      nil: 'NULL',
                                      empty: 'EMPTY',
                                      na: 'N/A'
                                    },
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
                              name: 'column9',
                              displayName: 'Link',
                              sortable: {
                                enabled: true
                              },
                              cell: {
                                format: {
                                  type: 'link',
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
                              name: 'column10',
                              displayName: 'Screenshot',
                              sortable: {
                                enabled: true
                              },
                              cell: {
                                format: {
                                  type: 'link',
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
                              name: 'column11',
                              displayName: 'Seller Offer',
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
                              name: 'column12',
                              displayName: 'Date Violated',
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
                            }
                          ],
                          sorting: [],
                          grouping: {},
                          formats: {
                            aggrs: {}
                          },
                          messages: {
                            no_data_at_all: 'No Violations',
                            no_data_found: 'No Violations'
                          },
                          id: 'id-28f33fad-3594-4e76-a6f9-fb62e22f026d'
                        }
                      }
                    ],
                    column: {
                      name: '',
                      type: ''
                    },
                    operator: '==',
                    value: '',
                    id: 'id-2e1af512-24a3-4975-abc2-4e6edd2b9dfa'
                  }
                },
                {
                  style: {},
                  scale: 30,
                  type: 'cbpo-element-table',
                  config: {
                    dataSource: 'mw_dashboard_main_daily_visitors',
                    widget: {
                      title: {
                        enabled: false,
                        text: 'Simple Table'
                      }
                    },
                    fiter: {},
                    pagination: {
                      limit: 30,
                      type: 'input',
                      current: 1,
                      total: 5,
                      buttons: {
                        first: {
                          visibility: true,
                          label: 'First',
                          style: {}
                        },
                        last: {
                          visibility: true,
                          label: 'Last',
                          style: {}
                        },
                        prev: {
                          visibility: true,
                          label: 'Previous',
                          style: {}
                        },
                        next: {
                          visibility: true,
                          label: 'Next',
                          style: {}
                        }
                      },
                      numbers: {
                        beforeCurrent: 2,
                        afterCurrent: 2
                      },
                      default: 'auto',
                      widget: {
                        title: {
                          enabled: true,
                          text: ''
                        }
                      },
                      id: 'id-84313ac2-cccf-4689-979b-d4e8b9e79ca6'
                    },
                    columns: [
                      {
                        name: 'column1',
                        displayName: 'Seller Name',
                        sortable: {
                          enabled: true
                        },
                        header: {
                          style: {
                            color: '#006600'
                          },
                          format: {},
                          aggrFormat: {}
                        },
                        cell: {
                          style: {
                            color: 'green'
                          },
                          format: {},
                          aggrFormat: {},
                          width: 100,
                          aggrFormats: null
                        }
                      },
                      {
                        name: 'column2',
                        displayName: 'SKU',
                        sortable: {
                          enabled: true
                        },
                        header: {
                          style: {
                            color: '#006600'
                          },
                          format: {},
                          aggrFormat: {}
                        },
                        cell: {
                          style: {
                            color: 'green'
                          },
                          format: {},
                          aggFormat: {},
                          width: 100,
                          aggrFormats: null
                        }
                      },
                      {
                        name: 'column3',
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
                        name: 'column4',
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
                        name: 'column5',
                        displayName: 'Seller Price',
                        sortable: {
                          enabled: false
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
                                inCents: true
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
                        name: 'column6',
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
                                inCents: true
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
                        name: 'column7',
                        displayName: '$ DIFF',
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
                                inCents: true
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
                        name: 'column8',
                        displayName: 'Off MAP',
                        sortable: {
                          enabled: false
                        },
                        cell: {
                          style: {
                            'color': '#FF0000',
                            'font-weight': '500'
                          },
                          format: {
                            type: 'numeric',
                            common: {
                              suffix: '%',
                              plain: {
                                nil: 'NULL',
                                empty: 'EMPTY',
                                na: 'N/A'
                              },
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
                        name: 'column9',
                        displayName: 'Link',
                        sortable: {
                          enabled: true
                        },
                        cell: {
                          format: {
                            type: 'link',
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
                        name: 'column10',
                        displayName: 'Screenshot',
                        sortable: {
                          enabled: true
                        },
                        cell: {
                          format: {
                            type: 'link',
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
                        name: 'column11',
                        displayName: 'Seller Offer',
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
                        name: 'column12',
                        displayName: 'Date Violated',
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
                      }
                    ],
                    sorting: [],
                    grouping: {},
                    formats: {
                      aggrs: {}
                    },
                    messages: {
                      no_data_at_all: 'No Violations',
                      no_data_found: 'No Violations'
                    },
                    id: 'id-6c1007c2-bfec-46d4-bfb5-49259fe9675f'
                  }
                }
              ],
              widget: {
                title: {
                  enabled: true,
                  text: ''
                }
              },
              id: 'id-4cefc9c5-b296-4934-aaf9-a51e2ebef8f6'
            }
          }
        ],
        widget: {
          title: {
            enabled: true,
            text: ''
          }
        },
        id: 'id-4cefc9c5-b296-4934-aaf9-a51e2ebef8f6'
      }
    }
  ],
  id: 'id-d1ad75ff-7910-436f-a26a-f472fae9a07d',
  widget: {
    title: {
      enabled: true,
      text: ''
    }
  }
}

export default config
