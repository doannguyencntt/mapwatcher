
const config = {
  'widget': {
    'enabled': false,
    'title': null,
    'class': ''
  },
  'style': {
    'background_color': null,
    'foreground_color': null,
    'header_background_color': null,
    'header_foreground_color': null,
    'border_width': null,
    'border_radius': null
  },
  'widgetLayout': {
    'gridConfig': {
      'colNum': 12,
      'rowHeight': 1,
      'margin': [
        8,
        8
      ],
      'defaultHeight': 4
    },
    'widgets': [
      {
        'type': 'cbpo-widget',
        'config': {
          'grid': {
            'x': 0,
            'y': 0,
            'w': 12,
            'h': 11,
            'i': 0,
            'moved': true
          },
          'autoHeight': true,
          'widget': {
            'title': {
              'text': 'Logo',
              'enabled': false,
              'edited': false
            },
            'id': 'id-3632a53b-a1db-4945-b97d-18aeb4cf9621',
            'class': '',
            'style': {
              'background_color': '#57719b',
              'foreground_color': null,
              'header_background_color': null,
              'header_foreground_color': null,
              'border_width': 0,
              'border_radius': null
            }
          },
          'action': {
            'elements': []
          },
          'elements': [
            {
              'type': 'cbpo-element-html-editor',
              'config': {
                'dataSource': '',
                'builder': {
                  'enabled': false
                },
                'sizeSettings': {
                  'defaultMinSize': 50,
                  'warningText': 'The area is too small for this visualization.'
                },
                'content': '__LOGO_CONTENT__',
                'pagination': {
                  'limit': 50,
                  'current': 1,
                  'total': null,
                  'type': 'auto',
                  'buttons': {
                    'first': {
                      'visibility': true,
                      'label': 'First'
                    },
                    'last': {
                      'visibility': true,
                      'label': 'Last'
                    },
                    'prev': {
                      'visibility': true,
                      'label': 'Previous'
                    },
                    'next': {
                      'visibility': true,
                      'label': 'Next'
                    }
                  },
                  'numbers': {
                    'beforeCurrent': 2,
                    'afterCurrent': 2
                  },
                  'default': 'auto'
                },
                'sorting': [],
                'columns': [],
                'grouping': {
                  'columns': [],
                  'aggregations': []
                },
                'bins': [],
                'options': {
                  'plugins': [
                    'advlist autolink lists link image preview anchor',
                    'searchreplace visualblocks code',
                    'insertdatetime media table paste'
                  ],
                  'toolbar': 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment'
                },
                'id': '9fe752f1-84c3-4b6b-a9b1-ea15e6d3b21d',
                'filter': {
                  'type': 'AND',
                  'conditions': [
                    {
                      'id': 'id-315362a8-9b3f-4ba1-83d6-28f69dcb0e75',
                      'level': 1,
                      'column': 'date',
                      'value': [
                        'DATE_LAST(3, \'months\')',
                        'TODAY()'
                      ],
                      'operator': 'in_range',
                      'parentId': 'id-99a75f0c-f535-4ca2-a858-c260f98a3a18'
                    }
                  ]
                }
              }
            }
          ],
          'filter': {
            'form': {
              'config': {
                'controls': []
              }
            },
            'builder': {
              'enabled': false,
              'config': {
                'trigger': {
                  'label': 'Setting Filter'
                },
                'modal': {
                  'title': 'Query Builder'
                },
                'format': {
                  'temporal': {
                    'date': 'YYYY-MM-DD',
                    'datetime': 'YYYY-MM-DD hh:mm'
                  }
                },
                'threshold': {
                  'maxLevel': 5
                },
                'query': {
                  'id': null,
                  'level': 0,
                  'type': 'AND',
                  'conditions': []
                }
              }
            },
            'globalFilter': {
              'enabled': false
            },
            'alignment': ''
          },
          'columnManager': {
            'enabled': false,
            'config': {
              'trigger': {
                'label': 'Manage Columns'
              },
              'modal': {
                'title': 'Manage Columns'
              },
              'managedColumns': []
            }
          },
          'menu': {
            'enabled': true,
            'config': {
              'label': {
                'text': ''
              },
              'icons': {
                'css': 'fa fa-ellipsis-h'
              },
              'dataSource': null,
              'selection': {
                'options': [
                  {
                    'label': 'Widget Settings',
                    'icon': 'fa fa-cog',
                    'value': 'widget-settings',
                    'type': 'item'
                  },
                  {
                    'label': 'Element Settings',
                    'icon': 'fa fa-cog',
                    'value': 'element-settings',
                    'type': 'item'
                  },
                  {
                    'label': 'Remove',
                    'icon': 'fa fa-times',
                    'value': 'remove',
                    'type': 'item'
                  },
                  {
                    'type': 'divider'
                  },
                  {
                    'label': 'Download CSV',
                    'icon': 'fa fa-download',
                    'value': 'csv',
                    'type': 'item'
                  }
                ]
              },
              'id': 'id-c5bf018b-10d4-4c49-a4a4-358192293f58',
              'widget': {
                'title': {
                  'enabled': true,
                  'text': ''
                },
                'class': ''
              }
            }
          },
          'id': 'id-25533eda-ce55-45e7-8cce-5a22a5cf1949',
          'waitingForGlobalFilter': false
        },
        'grid': {
          'x': 0,
          'y': 0,
          'w': 12,
          'h': 11,
          'i': 0,
          'moved': false
        }
      },
      {
        'type': 'cbpo-widget',
        'config': {
          'grid': {
            'x': 0,
            'y': 23,
            'w': 6,
            'h': 34,
            'i': 1,
            'moved': false
          },
          'autoHeight': false,
          'widget': {
            'title': {
              'text': 'Complied & Active Rogues',
              'enabled': true,
              'edited': true
            },
            'style': {
              'background_color': null,
              'foreground_color': null,
              'header_background_color': null,
              'header_foreground_color': null,
              'border_width': null,
              'border_radius': null
            },
            'id': 'id-427e76d5-7885-4ea9-8690-47984e5627b7',
            'class': ''
          },
          'action': {
            'elements': []
          },
          'elements': [
            {
              'type': 'cbpo-element-chart',
              'config': {
                'dataSource': 'ms_dashboard_seller_complied_active_rogue',
                'widget': {
                  'title': {
                    'enabled': false,
                    'text': 'Quantitation of [total] over [short_status]',
                    'edited': false
                  },
                  'style': {
                    'background_color': null,
                    'foreground_color': null,
                    'header_background_color': null,
                    'header_foreground_color': null,
                    'border_width': null,
                    'border_radius': null
                  }
                },
                'library': 'highcharts',
                'columns': [
                  {
                    'name': 'short_status',
                    'displayName': 'Short Status',
                    'type': 'string',
                    'format': null,
                    'aggrFormats': null
                  },
                  {
                    'name': 'total',
                    'displayName': 'Total',
                    'type': 'int',
                    'format': {
                      'common': {
                        'plain': {
                          'nil': 'NULL',
                          'empty': 'EMPTY',
                          'na': 'N/A'
                        },
                        'html': {
                          'nil': '<span class=\'d-sdk-nil\'>null</span>',
                          'empty': '<span class=\'d-sdk-empty\'>empty</span>',
                          'na': '<span class=\'d-sdk-na\'>N/A</span>'
                        },
                        'prefix': null,
                        'suffix': null
                      },
                      'type': 'numeric',
                      'config': {
                        'comma': true,
                        'precision': 0,
                        'siPrefix': false
                      }
                    },
                    'aggrFormats': null
                  }
                ],
                'sizeSettings': {
                  'defaultMinSize': 250,
                  'warningText': 'The area is too small for this visualization.'
                },
                'charts': [
                  {
                    'axis': {
                      'x': [
                        {
                          'id': 'x_id-065e7cba-15fc-4731-9d9a-f7476bdc94c2',
                          'type': 'category',
                          'display': true,
                          'format': null,
                          'scaleLabel': {
                            'display': false,
                            'labelString': ''
                          },
                          'ticks': {
                            'fontSize': 11,
                            'fontStyle': 'bold'
                          }
                        }
                      ],
                      'y': [
                        {
                          'id': 'y_id-065e7cba-15fc-4731-9d9a-f7476bdc94c2',
                          'type': 'linear',
                          'format': null,
                          'position': 'left',
                          'stack': false,
                          'ticks': {
                            'beginAtZero': true,
                            'stepSize': '',
                            'maxTicksLimit': 5,
                            'fontSize': 11,
                            'fontStyle': 'bold'
                          },
                          'scaleLabel': {
                            'display': false,
                            'labelString': ''
                          }
                        }
                      ]
                    },
                    'options': {
                      'legend': {
                        'enabled': true,
                        'position': 'bottom',
                        'widthPercent': 40,
                        'isHorizontal': false
                      },
                      'pie': {
                        'type': 'pie'
                      },
                      'borderWidth': 0
                    },
                    'series': [
                      {
                        'type': 'pie',
                        'name': 'Total (Sum)',
                        'axis': {
                          'x': 'x_id-065e7cba-15fc-4731-9d9a-f7476bdc94c2',
                          'y': 'y_id-065e7cba-15fc-4731-9d9a-f7476bdc94c2'
                        },
                        'data': {
                          'x': 'short_status',
                          'y': 'total'
                        },
                        'id': 'id-065e7cba-15fc-4731-9d9a-f7476bdc94c2'
                      }
                    ]
                  }
                ],
                'sorting': [
                  {
                    'column': 'short_status',
                    'direction': 'asc'
                  }
                ],
                'grouping': {
                  'aggregations': [
                    {
                      'column': 'total',
                      'aggregation': 'sum',
                      'alias': 'total_sum_id-065e7cba-15fc-4731-9d9a-f7476bdc94c2'
                    }
                  ],
                  'columns': [
                    {
                      'name': 'short_status'
                    }
                  ]
                },
                'bins': [],
                'pagination': {
                  'limit': 1000,
                  'current': 1,
                  'type': 'buttons'
                },
                'color_scheme': 'Google',
                'messages': {
                  'no_data_at_all': 'No data',
                  'no_data_found': 'No data found'
                },
                'id': '63395db9-e7ef-40c3-bdd7-9cacfaf82458'
              }
            }
          ],
          'filter': {
            'form': {
              'config': {
                'controls': []
              }
            },
            // 'base': {
            //   'config': {
            //     'query': {
            //       'id': 'id-6e09fa22-103e-4f43-88e5-055b65584870',
            //       'level': 0,
            //       'type': 'AND',
            //       'conditions': [
            //         {
            //           'id': 'id-fca83c77-896b-486e-96a8-404199c868a5',
            //           'level': 1,
            //           'column': 'short_status',
            //           'value': [
            //             'Rogue',
            //             'Complied'
            //           ],
            //           'operator': 'in',
            //           'parentId': 'id-6e09fa22-103e-4f43-88e5-055b65584870'
            //         }
            //       ],
            //       'parentId': null
            //     }
            //   }
            // },
            'builder': {
              'enabled': false,
              'config': {
                'trigger': {
                  'label': 'Setting Filter'
                },
                'modal': {
                  'title': 'Query Builder'
                },
                'format': {
                  'temporal': {
                    'date': 'YYYY-MM-DD',
                    'datetime': 'YYYY-MM-DD hh:mm'
                  }
                },
                'threshold': {
                  'maxLevel': 5
                },
                'query': {
                  'id': null,
                  'level': 0,
                  'type': 'AND',
                  'conditions': []
                }
              }
            },
            'globalFilter': {
              'enabled': false
            },
            'alignment': ''
          },
          'columnManager': {
            'enabled': false,
            'config': {
              'trigger': {
                'label': 'Manage Columns'
              },
              'modal': {
                'title': 'Manage Columns'
              },
              'managedColumns': []
            }
          },
          'menu': {
            'enabled': true,
            'config': {
              'label': {
                'text': ''
              },
              'icons': {
                'css': 'fa fa-ellipsis-h'
              },
              'dataSource': null,
              'selection': {
                'options': [
                  {
                    'label': 'Widget Settings',
                    'icon': 'fa fa-cog',
                    'value': 'widget-settings',
                    'type': 'item'
                  },
                  {
                    'label': 'Element Settings',
                    'icon': 'fa fa-cog',
                    'value': 'element-settings',
                    'type': 'item'
                  },
                  {
                    'label': 'Remove',
                    'icon': 'fa fa-times',
                    'value': 'remove',
                    'type': 'item'
                  },
                  {
                    'type': 'divider'
                  },
                  {
                    'label': 'Download CSV',
                    'icon': 'fa fa-download',
                    'value': 'csv',
                    'type': 'item'
                  }
                ]
              },
              'id': 'id-9e33c911-3651-46fc-9e9f-5e2082a8bc95',
              'widget': {
                'title': {
                  'enabled': true,
                  'text': ''
                },
                'class': ''
              }
            }
          },
          'waitingForGlobalFilter': false,
          'id': 'id-5d0bb4a9-a9af-46ef-8445-189d90fe970d',
          'editMode': true
        },
        'grid': {
          'x': 0,
          'y': 23,
          'w': 6,
          'h': 34,
          'i': 1,
          'moved': false
        }
      },
      {
        'type': 'cbpo-widget',
        'config': {
          'grid': {
            'x': 6,
            'y': 23,
            'w': 6,
            'h': 34,
            'i': 2,
            'moved': false
          },
          'autoHeight': false,
          'widget': {
            'title': {
              'text': 'Completion',
              'enabled': true,
              'edited': true
            },
            'style': {
              'background_color': null,
              'foreground_color': null,
              'header_background_color': null,
              'header_foreground_color': null,
              'border_width': null,
              'border_radius': null
            },
            'id': 'id-7ffaf3a7-55cb-42d5-ba62-d5a2772294d0',
            'class': ''
          },
          'action': {
            'elements': []
          },
          'elements': [
            {
              'type': 'cbpo-element-chart',
              'config': {
                'dataSource': 'ms_dashboard_seller_completion',
                'widget': {
                  'title': {
                    'enabled': false,
                    'text': 'Quantitation of [total] over [complete_status]',
                    'edited': false
                  },
                  'style': {
                    'background_color': null,
                    'foreground_color': null,
                    'header_background_color': null,
                    'header_foreground_color': null,
                    'border_width': null,
                    'border_radius': null
                  }
                },
                'library': 'highcharts',
                'columns': [
                  {
                    'name': 'complete_status',
                    'displayName': 'Complete Status',
                    'type': 'string',
                    'format': null,
                    'aggrFormats': null
                  },
                  {
                    'name': 'total',
                    'displayName': 'Total',
                    'type': 'int',
                    'format': {
                      'common': {
                        'plain': {
                          'nil': 'NULL',
                          'empty': 'EMPTY',
                          'na': 'N/A'
                        },
                        'html': {
                          'nil': '<span class=\'d-sdk-nil\'>null</span>',
                          'empty': '<span class=\'d-sdk-empty\'>empty</span>',
                          'na': '<span class=\'d-sdk-na\'>N/A</span>'
                        },
                        'prefix': null,
                        'suffix': null
                      },
                      'type': 'numeric',
                      'config': {
                        'comma': true,
                        'precision': 0,
                        'siPrefix': false
                      }
                    },
                    'aggrFormats': null
                  }
                ],
                'sizeSettings': {
                  'defaultMinSize': 250,
                  'warningText': 'The area is too small for this visualization.'
                },
                'charts': [
                  {
                    'axis': {
                      'x': [
                        {
                          'id': 'x_id-fc10f282-9c26-4a34-a791-b8f14e101b66',
                          'type': 'category',
                          'display': true,
                          'format': null,
                          'scaleLabel': {
                            'display': false,
                            'labelString': ''
                          },
                          'ticks': {
                            'fontSize': 11,
                            'fontStyle': 'bold'
                          }
                        }
                      ],
                      'y': [
                        {
                          'id': 'y_id-fc10f282-9c26-4a34-a791-b8f14e101b66',
                          'type': 'linear',
                          'format': null,
                          'position': 'left',
                          'stack': false,
                          'ticks': {
                            'beginAtZero': true,
                            'stepSize': '',
                            'maxTicksLimit': 5,
                            'fontSize': 11,
                            'fontStyle': 'bold'
                          },
                          'scaleLabel': {
                            'display': false,
                            'labelString': ''
                          }
                        }
                      ]
                    },
                    'options': {
                      'legend': {
                        'enabled': true,
                        'position': 'bottom',
                        'widthPercent': 40,
                        'isHorizontal': false
                      },
                      'pie': {
                        'type': 'pie'
                      },
                      'borderWidth': 0
                    },
                    'series': [
                      {
                        'type': 'pie',
                        'name': 'Total (Sum)',
                        'axis': {
                          'x': 'x_id-fc10f282-9c26-4a34-a791-b8f14e101b66',
                          'y': 'y_id-fc10f282-9c26-4a34-a791-b8f14e101b66'
                        },
                        'data': {
                          'x': 'complete_status',
                          'y': 'total'
                        },
                        'id': 'id-fc10f282-9c26-4a34-a791-b8f14e101b66'
                      }
                    ]
                  }
                ],
                'sorting': [
                  {
                    'column': 'complete_status',
                    'direction': 'asc'
                  }
                ],
                'grouping': {
                  'aggregations': [
                    {
                      'column': 'total',
                      'aggregation': 'sum',
                      'alias': 'total_sum_id-fc10f282-9c26-4a34-a791-b8f14e101b66'
                    }
                  ],
                  'columns': [
                    {
                      'name': 'complete_status'
                    }
                  ]
                },
                'bins': [],
                'pagination': {
                  'limit': 1000,
                  'current': 1,
                  'type': 'buttons'
                },
                'color_scheme': 'Google',
                'messages': {
                  'no_data_at_all': 'No data',
                  'no_data_found': 'No data found'
                },
                'id': '82c57efb-e596-4f5d-b3de-166a452fa2db'
              }
            }
          ],
          'filter': {
            'form': {
              'config': {
                'controls': []
              }
            },
            'builder': {
              'enabled': false,
              'config': {
                'trigger': {
                  'label': 'Setting Filter'
                },
                'modal': {
                  'title': 'Query Builder'
                },
                'format': {
                  'temporal': {
                    'date': 'YYYY-MM-DD',
                    'datetime': 'YYYY-MM-DD hh:mm'
                  }
                },
                'threshold': {
                  'maxLevel': 5
                },
                'query': {
                  'id': null,
                  'level': 0,
                  'type': 'AND',
                  'conditions': []
                }
              }
            },
            'globalFilter': {
              'enabled': false
            },
            'alignment': ''
          },
          'columnManager': {
            'enabled': false,
            'config': {
              'trigger': {
                'label': 'Manage Columns'
              },
              'modal': {
                'title': 'Manage Columns'
              },
              'managedColumns': []
            }
          },
          'menu': {
            'enabled': true,
            'config': {
              'label': {
                'text': ''
              },
              'icons': {
                'css': 'fa fa-ellipsis-h'
              },
              'dataSource': null,
              'selection': {
                'options': [
                  {
                    'label': 'Widget Settings',
                    'icon': 'fa fa-cog',
                    'value': 'widget-settings',
                    'type': 'item'
                  },
                  {
                    'label': 'Element Settings',
                    'icon': 'fa fa-cog',
                    'value': 'element-settings',
                    'type': 'item'
                  },
                  {
                    'label': 'Remove',
                    'icon': 'fa fa-times',
                    'value': 'remove',
                    'type': 'item'
                  },
                  {
                    'type': 'divider'
                  },
                  {
                    'label': 'Download CSV',
                    'icon': 'fa fa-download',
                    'value': 'csv',
                    'type': 'item'
                  }
                ]
              },
              'id': 'id-ce8ec1a9-4aa5-42e3-bab4-945a5f1d854c',
              'widget': {
                'title': {
                  'enabled': true,
                  'text': ''
                },
                'class': ''
              }
            }
          },
          'waitingForGlobalFilter': false,
          'id': 'id-cea215f1-4182-47e6-8640-745131238c5e',
          'editMode': true
        },
        'grid': {
          'x': 6,
          'y': 23,
          'w': 6,
          'h': 34,
          'i': 2,
          'moved': false
        }
      },
      {
        'type': 'cbpo-widget',
        'config': {
          'grid': {
            'x': 0,
            'y': 57,
            'w': 6,
            'h': 34,
            'i': 3,
            'moved': false
          },
          'autoHeight': false,
          'widget': {
            'title': {
              'text': 'GMR',
              'enabled': true,
              'edited': true
            },
            'style': {
              'background_color': null,
              'foreground_color': null,
              'header_background_color': null,
              'header_foreground_color': null,
              'border_width': null,
              'border_radius': null
            },
            'id': 'id-9430460e-7c56-4aa5-a2fc-3fa52c2c8cc5',
            'class': ''
          },
          'action': {
            'elements': []
          },
          'elements': [
            {
              'type': 'cbpo-element-chart',
              'config': {
                'dataSource': 'ms_dashboard_seller_gmr',
                'widget': {
                  'title': {
                    'enabled': false,
                    'text': 'Quantitation of [total] over [gmr_status]',
                    'edited': false
                  },
                  'style': {
                    'background_color': null,
                    'foreground_color': null,
                    'header_background_color': null,
                    'header_foreground_color': null,
                    'border_width': null,
                    'border_radius': null
                  }
                },
                'library': 'highcharts',
                'columns': [
                  {
                    'name': 'gmr_status',
                    'displayName': 'Gmr Status',
                    'type': 'string',
                    'format': null,
                    'aggrFormats': null
                  },
                  {
                    'name': 'total',
                    'displayName': 'Total',
                    'type': 'int',
                    'format': {
                      'common': {
                        'plain': {
                          'nil': 'NULL',
                          'empty': 'EMPTY',
                          'na': 'N/A'
                        },
                        'html': {
                          'nil': '<span class=\'d-sdk-nil\'>null</span>',
                          'empty': '<span class=\'d-sdk-empty\'>empty</span>',
                          'na': '<span class=\'d-sdk-na\'>N/A</span>'
                        },
                        'prefix': null,
                        'suffix': null
                      },
                      'type': 'numeric',
                      'config': {
                        'comma': true,
                        'precision': 0,
                        'siPrefix': false
                      }
                    },
                    'aggrFormats': null
                  }
                ],
                'sizeSettings': {
                  'defaultMinSize': 250,
                  'warningText': 'The area is too small for this visualization.'
                },
                'charts': [
                  {
                    'axis': {
                      'x': [
                        {
                          'id': 'x_id-a8a3f13c-d22e-4b09-ae5c-f243f190b23b',
                          'type': 'category',
                          'display': true,
                          'format': null,
                          'scaleLabel': {
                            'display': false,
                            'labelString': ''
                          },
                          'ticks': {
                            'fontSize': 11,
                            'fontStyle': 'bold'
                          }
                        }
                      ],
                      'y': [
                        {
                          'id': 'y_id-a8a3f13c-d22e-4b09-ae5c-f243f190b23b',
                          'type': 'linear',
                          'format': null,
                          'position': 'left',
                          'stack': false,
                          'ticks': {
                            'beginAtZero': true,
                            'stepSize': '',
                            'maxTicksLimit': 5,
                            'fontSize': 11,
                            'fontStyle': 'bold'
                          },
                          'scaleLabel': {
                            'display': false,
                            'labelString': ''
                          }
                        }
                      ]
                    },
                    'options': {
                      'legend': {
                        'enabled': true,
                        'position': 'bottom',
                        'widthPercent': 40,
                        'isHorizontal': false
                      },
                      'pie': {
                        'type': 'pie'
                      },
                      'borderWidth': 0
                    },
                    'series': [
                      {
                        'type': 'pie',
                        'name': 'Total (Sum)',
                        'axis': {
                          'x': 'x_id-a8a3f13c-d22e-4b09-ae5c-f243f190b23b',
                          'y': 'y_id-a8a3f13c-d22e-4b09-ae5c-f243f190b23b'
                        },
                        'data': {
                          'x': 'gmr_status',
                          'y': 'total'
                        },
                        'id': 'id-a8a3f13c-d22e-4b09-ae5c-f243f190b23b'
                      }
                    ]
                  }
                ],
                'sorting': [
                  {
                    'column': 'gmr_status',
                    'direction': 'asc'
                  }
                ],
                'grouping': {
                  'aggregations': [
                    {
                      'column': 'total',
                      'aggregation': 'sum',
                      'alias': 'total_sum_id-a8a3f13c-d22e-4b09-ae5c-f243f190b23b'
                    }
                  ],
                  'columns': [
                    {
                      'name': 'gmr_status'
                    }
                  ]
                },
                'bins': [],
                'pagination': {
                  'limit': 1000,
                  'current': 1,
                  'type': 'buttons'
                },
                'color_scheme': 'Google',
                'messages': {
                  'no_data_at_all': 'No data',
                  'no_data_found': 'No data found'
                },
                'id': '10c5d8c8-12be-45b9-ab00-d8b0ebb499f7'
              }
            }
          ],
          'filter': {
            'form': {
              'config': {
                'controls': []
              }
            },
            'builder': {
              'enabled': false,
              'config': {
                'trigger': {
                  'label': 'Setting Filter'
                },
                'modal': {
                  'title': 'Query Builder'
                },
                'format': {
                  'temporal': {
                    'date': 'YYYY-MM-DD',
                    'datetime': 'YYYY-MM-DD hh:mm'
                  }
                },
                'threshold': {
                  'maxLevel': 5
                },
                'query': {
                  'id': null,
                  'level': 0,
                  'type': 'AND',
                  'conditions': []
                }
              }
            },
            'globalFilter': {
              'enabled': false
            },
            'alignment': ''
          },
          'columnManager': {
            'enabled': false,
            'config': {
              'trigger': {
                'label': 'Manage Columns'
              },
              'modal': {
                'title': 'Manage Columns'
              },
              'managedColumns': []
            }
          },
          'menu': {
            'enabled': true,
            'config': {
              'label': {
                'text': ''
              },
              'icons': {
                'css': 'fa fa-ellipsis-h'
              },
              'dataSource': null,
              'selection': {
                'options': [
                  {
                    'label': 'Widget Settings',
                    'icon': 'fa fa-cog',
                    'value': 'widget-settings',
                    'type': 'item'
                  },
                  {
                    'label': 'Element Settings',
                    'icon': 'fa fa-cog',
                    'value': 'element-settings',
                    'type': 'item'
                  },
                  {
                    'label': 'Remove',
                    'icon': 'fa fa-times',
                    'value': 'remove',
                    'type': 'item'
                  },
                  {
                    'type': 'divider'
                  },
                  {
                    'label': 'Download CSV',
                    'icon': 'fa fa-download',
                    'value': 'csv',
                    'type': 'item'
                  }
                ]
              },
              'id': 'id-e2526aa2-0dd5-4929-8a6f-e8855ee7cead',
              'widget': {
                'title': {
                  'enabled': true,
                  'text': ''
                },
                'class': ''
              }
            }
          },
          'waitingForGlobalFilter': false,
          'id': 'id-d3f487c7-051d-415f-b65a-ada140ad0cbf',
          'editMode': true
        },
        'grid': {
          'x': 0,
          'y': 57,
          'w': 6,
          'h': 34,
          'i': 3,
          'moved': false
        }
      },
      {
        'type': 'cbpo-widget',
        'config': {
          'grid': {
            'x': 6,
            'y': 57,
            'w': 6,
            'h': 34,
            'i': 4,
            'moved': false
          },
          'autoHeight': false,
          'widget': {
            'title': {
              'text': 'Arbitrage',
              'enabled': true,
              'edited': true
            },
            'style': {
              'background_color': null,
              'foreground_color': null,
              'header_background_color': null,
              'header_foreground_color': null,
              'border_width': null,
              'border_radius': null
            },
            'id': 'id-31738494-c98b-4051-970c-15540239f982',
            'class': ''
          },
          'action': {
            'elements': []
          },
          'elements': [
            {
              'type': 'cbpo-element-chart',
              'config': {
                'dataSource': 'ms_dashboard_seller_arbitrage',
                'widget': {
                  'title': {
                    'enabled': false,
                    'text': 'Quantitation of [total] over [arbitrage_status]',
                    'edited': false
                  },
                  'style': {
                    'background_color': null,
                    'foreground_color': null,
                    'header_background_color': null,
                    'header_foreground_color': null,
                    'border_width': null,
                    'border_radius': null
                  }
                },
                'library': 'highcharts',
                'columns': [
                  {
                    'name': 'arbitrage_status',
                    'displayName': 'Arbitrage Status',
                    'type': 'string',
                    'format': null,
                    'aggrFormats': null
                  },
                  {
                    'name': 'total',
                    'displayName': 'Total',
                    'type': 'int',
                    'format': {
                      'common': {
                        'plain': {
                          'nil': 'NULL',
                          'empty': 'EMPTY',
                          'na': 'N/A'
                        },
                        'html': {
                          'nil': '<span class=\'d-sdk-nil\'>null</span>',
                          'empty': '<span class=\'d-sdk-empty\'>empty</span>',
                          'na': '<span class=\'d-sdk-na\'>N/A</span>'
                        },
                        'prefix': null,
                        'suffix': null
                      },
                      'type': 'numeric',
                      'config': {
                        'comma': true,
                        'precision': 0,
                        'siPrefix': false
                      }
                    },
                    'aggrFormats': null
                  }
                ],
                'sizeSettings': {
                  'defaultMinSize': 250,
                  'warningText': 'The area is too small for this visualization.'
                },
                'charts': [
                  {
                    'axis': {
                      'x': [
                        {
                          'id': 'x_id-ff209262-b40d-4c23-a2c5-92c818d0d239',
                          'type': 'category',
                          'display': true,
                          'format': null,
                          'scaleLabel': {
                            'display': false,
                            'labelString': ''
                          },
                          'ticks': {
                            'fontSize': 11,
                            'fontStyle': 'bold'
                          }
                        }
                      ],
                      'y': [
                        {
                          'id': 'y_id-ff209262-b40d-4c23-a2c5-92c818d0d239',
                          'type': 'linear',
                          'format': null,
                          'position': 'left',
                          'stack': false,
                          'ticks': {
                            'beginAtZero': true,
                            'stepSize': '',
                            'maxTicksLimit': 5,
                            'fontSize': 11,
                            'fontStyle': 'bold'
                          },
                          'scaleLabel': {
                            'display': false,
                            'labelString': ''
                          }
                        }
                      ]
                    },
                    'options': {
                      'legend': {
                        'enabled': true,
                        'position': 'bottom',
                        'widthPercent': 40,
                        'isHorizontal': false
                      },
                      'pie': {
                        'type': 'pie'
                      },
                      'borderWidth': 0
                    },
                    'series': [
                      {
                        'type': 'pie',
                        'name': 'Total (Sum)',
                        'axis': {
                          'x': 'x_id-ff209262-b40d-4c23-a2c5-92c818d0d239',
                          'y': 'y_id-ff209262-b40d-4c23-a2c5-92c818d0d239'
                        },
                        'data': {
                          'x': 'arbitrage_status',
                          'y': 'total'
                        },
                        'id': 'id-ff209262-b40d-4c23-a2c5-92c818d0d239'
                      }
                    ]
                  }
                ],
                'sorting': [
                  {
                    'column': 'arbitrage_status',
                    'direction': 'asc'
                  }
                ],
                'grouping': {
                  'aggregations': [
                    {
                      'column': 'total',
                      'aggregation': 'sum',
                      'alias': 'total_sum_id-ff209262-b40d-4c23-a2c5-92c818d0d239'
                    }
                  ],
                  'columns': [
                    {
                      'name': 'arbitrage_status'
                    }
                  ]
                },
                'bins': [],
                'pagination': {
                  'limit': 1000,
                  'current': 1,
                  'type': 'buttons'
                },
                'color_scheme': 'Google',
                'messages': {
                  'no_data_at_all': 'No data',
                  'no_data_found': 'No data found'
                },
                'id': 'a22a70a2-9042-4ca8-a269-30a4d277b7ea'
              }
            }
          ],
          'filter': {
            'form': {
              'config': {
                'controls': []
              }
            },
            'builder': {
              'enabled': false,
              'config': {
                'trigger': {
                  'label': 'Setting Filter'
                },
                'modal': {
                  'title': 'Query Builder'
                },
                'format': {
                  'temporal': {
                    'date': 'YYYY-MM-DD',
                    'datetime': 'YYYY-MM-DD hh:mm'
                  }
                },
                'threshold': {
                  'maxLevel': 5
                },
                'query': {
                  'id': null,
                  'level': 0,
                  'type': 'AND',
                  'conditions': []
                }
              }
            },
            'globalFilter': {
              'enabled': false
            },
            'alignment': ''
          },
          'columnManager': {
            'enabled': false,
            'config': {
              'trigger': {
                'label': 'Manage Columns'
              },
              'modal': {
                'title': 'Manage Columns'
              },
              'managedColumns': []
            }
          },
          'menu': {
            'enabled': true,
            'config': {
              'label': {
                'text': ''
              },
              'icons': {
                'css': 'fa fa-ellipsis-h'
              },
              'dataSource': null,
              'selection': {
                'options': [
                  {
                    'label': 'Widget Settings',
                    'icon': 'fa fa-cog',
                    'value': 'widget-settings',
                    'type': 'item'
                  },
                  {
                    'label': 'Element Settings',
                    'icon': 'fa fa-cog',
                    'value': 'element-settings',
                    'type': 'item'
                  },
                  {
                    'label': 'Remove',
                    'icon': 'fa fa-times',
                    'value': 'remove',
                    'type': 'item'
                  },
                  {
                    'type': 'divider'
                  },
                  {
                    'label': 'Download CSV',
                    'icon': 'fa fa-download',
                    'value': 'csv',
                    'type': 'item'
                  }
                ]
              },
              'id': 'id-f471e471-2b61-40e2-8472-9a45286ba8f3',
              'widget': {
                'title': {
                  'enabled': true,
                  'text': ''
                },
                'class': ''
              }
            }
          },
          'waitingForGlobalFilter': false,
          'id': 'id-15679439-0a52-4d6d-95e1-fc1c733edb46',
          'editMode': true
        },
        'grid': {
          'x': 6,
          'y': 57,
          'w': 6,
          'h': 34,
          'i': 4,
          'moved': false
        }
      },
      {
        'type': 'cbpo-widget',
        'config': {
          'grid': {
            'x': 0,
            'y': 93,
            'w': 12,
            'h': 49,
            'i': 5,
            'moved': false
          },
          'autoHeight': false,
          'widget': {
            'title': {
              'text': 'Seller Status (2 months)',
              'enabled': true,
              'edited': true
            },
            'style': {
              'background_color': null,
              'foreground_color': null,
              'header_background_color': null,
              'header_foreground_color': null,
              'border_width': null,
              'border_radius': null
            },
            'id': 'id-3803d899-ec6f-437b-a916-2ca2d5b7a8be',
            'class': ''
          },
          'action': {
            'elements': []
          },
          'elements': [
            {
              'type': 'cbpo-element-crosstab-table',
              'config': {
                'dataSource': 'ms_dashboard_seller_status',
                'sizeSettings': {
                  'defaultMinSize': 250,
                  'warningText': 'The area is too small for this visualization.'
                },
                'widget': {
                  'title': {
                    'text': 'Quantitation of [total] over [total, date]',
                    'enabled': false,
                    'edited': false
                  },
                  'style': {
                    'background_color': null,
                    'foreground_color': null,
                    'header_background_color': null,
                    'header_foreground_color': null,
                    'border_width': null,
                    'border_radius': null
                  }
                },
                'messages': {
                  'no_data_at_all': 'No data',
                  'no_data_found': 'No data found'
                },
                'globalControlOptions': {
                  'aggregation': {
                    'enabled': false
                  },
                  'globalGrouping': {
                    'enabled': false,
                    'config': {
                      'value': false
                    }
                  },
                  'grouping': {
                    'enabled': false
                  },
                  'editColumn': {
                    'enabled': false
                  },
                  'editColumnLabel': {
                    'enabled': false
                  },
                  'editColumnFormat': {
                    'enabled': false
                  },
                  'editBin': {
                    'enabled': false
                  }
                },
                'bins': [],
                'sorting': [],
                'xColumns': [
                  {
                    'name': 'investigation',
                    'displayName': 'Investigation Status',
                    'type': 'string',
                    'format': null,
                    'sortable': {
                      'enabled': true
                    }
                  }
                ],
                'tColumns': [
                  {
                    'name': 'date',
                    'displayName': 'Date',
                    'type': 'date',
                    'format': {
                      'common': {
                        'plain': {
                          'nil': 'NULL',
                          'empty': 'EMPTY',
                          'na': 'N/A'
                        },
                        'html': {
                          'nil': '<span class=\'d-sdk-nil\'>null</span>',
                          'empty': '<span class=\'d-sdk-empty\'>empty</span>',
                          'na': '<span class=\'d-sdk-na\'>N/A</span>'
                        },
                        'prefix': null,
                        'suffix': null
                      },
                      'type': 'temporal',
                      'config': {
                        'format': 'MM/DD/YYYY',
                        'date': {
                          'format': 'L'
                        },
                        'time': {
                          'format': 'LT'
                        },
                        'options': {
                          'year': 'YYYY',
                          'quarter': 'YYYY [Q]Q',
                          'month': 'YYYY MMM',
                          'week': 'YYYY [w]w',
                          'day': 'YYYY-MM-DD',
                          'hour': 'YYYY-MM-DD kk',
                          'minute': 'YYYY-MM-DD kk:mm',
                          'second': 'YYYY-MM-DD kk:mm:ss'
                        }
                      }
                    },
                    'sortable': {
                      'enabled': true
                    }
                  }
                ],
                'yColumns': [
                  {
                    'name': 'total',
                    'displayName': 'Total',
                    'type': 'int',
                    'format': null,
                    'sortable': {
                      'enabled': true
                    },
                    'aggregation': {
                      'aggregation': 'sum',
                      'alias': 'total_a89c21c6-7d9f-43b9-85ec-15a698647540'
                    }
                  }
                ],
                'pagination': {
                  'limit': 10,
                  'current': 1,
                  'total': 17,
                  'type': 'auto',
                  'buttons': {
                    'first': {
                      'visibility': true,
                      'label': 'First'
                    },
                    'last': {
                      'visibility': true,
                      'label': 'Last'
                    },
                    'prev': {
                      'visibility': true,
                      'label': 'Previous'
                    },
                    'next': {
                      'visibility': true,
                      'label': 'Next'
                    }
                  },
                  'numbers': {
                    'beforeCurrent': 2,
                    'afterCurrent': 2
                  },
                  'default': 'auto',
                  'id': 'id-3561f76c-bc2f-4448-9f8d-f36fb647590a',
                  'widget': {
                    'title': {
                      'enabled': true,
                      'text': ''
                    },
                    'class': ''
                  }
                },
                'id': '6fb7fdbd-8aa7-46b1-9d5c-3dbfeba47979'
              }
            }
          ],
          'filter': {
            'form': {
              'config': {
                'controls': [
                  {
                    'type': 'cbpo-filter-control-select',
                    'config': {
                      'label': {
                        'text': 'Status'
                      },
                      'dataSource': '',
                      'common': {
                        'id': 'id-54884e44-107a-4139-9247-9002a52a1b24',
                        'level': 1,
                        'column': {
                          'name': 'short_status',
                          'type': 'string'
                        },
                        'value': '',
                        'operator': 'contains',
                        'sort': 'asc',
                        'format': null
                      },
                      'selection': {
                        'empty': {
                          'label': 'All',
                          'value': '',
                          'enabled': true
                        },
                        'options': [
                          {
                            'label': 'New',
                            'value': 'New'
                          },
                          {
                            'label': 'Rogue',
                            'value': 'Rogue'
                          },
                          {
                            'label': 'Complied',
                            'value': 'Complied'
                          },
                          {
                            'label': 'Relisted',
                            'value': 'Relisted'
                          }
                        ]
                      },
                      'id': 'id-65243e03-ba3c-4784-8d8e-7aec499ebd49'
                    },
                    'id': 'id-feefe7c3-f146-423e-9c6a-399e486fb560'
                  }
                ],
                'query': {
                  'type': 'AND',
                  'conditions': [
                    {
                      'id': 'id-54884e44-107a-4139-9247-9002a52a1b24',
                      'level': 1,
                      'column': {
                        'name': 'short_status',
                        'type': 'string'
                      },
                      'value': '',
                      'operator': 'contains',
                      'sort': 'asc',
                      'format': null,
                      'empty': {
                        'label': 'All',
                        'value': '',
                        'enabled': true
                      }
                    }
                  ]
                },
                'id': 'id-5f5a917a-0b33-4799-b7ff-63a334de25eb'
              }
            },
            'builder': {
              'enabled': false,
              'config': {
                'trigger': {
                  'label': 'Setting Filter'
                },
                'modal': {
                  'title': 'Query Builder'
                },
                'format': {
                  'temporal': {
                    'date': 'YYYY-MM-DD',
                    'datetime': 'YYYY-MM-DD hh:mm'
                  }
                },
                'threshold': {
                  'maxLevel': 5
                },
                'query': {
                  'id': null,
                  'level': 0,
                  'type': 'AND',
                  'conditions': []
                }
              }
            },
            'globalFilter': {
              'enabled': false
            },
            'alignment': ''
          },
          'columnManager': {
            'enabled': false,
            'config': {
              'trigger': {
                'label': 'Manage Columns'
              },
              'modal': {
                'title': 'Manage Columns'
              },
              'managedColumns': []
            }
          },
          'menu': {
            'enabled': true,
            'config': {
              'label': {
                'text': ''
              },
              'icons': {
                'css': 'fa fa-ellipsis-h'
              },
              'dataSource': null,
              'selection': {
                'options': [
                  {
                    'label': 'Widget Settings',
                    'icon': 'fa fa-cog',
                    'value': 'widget-settings',
                    'type': 'item'
                  },
                  {
                    'label': 'Element Settings',
                    'icon': 'fa fa-cog',
                    'value': 'element-settings',
                    'type': 'item'
                  },
                  {
                    'label': 'Remove',
                    'icon': 'fa fa-times',
                    'value': 'remove',
                    'type': 'item'
                  },
                  {
                    'type': 'divider'
                  },
                  {
                    'label': 'Download CSV',
                    'icon': 'fa fa-download',
                    'value': 'csv',
                    'type': 'item'
                  }
                ]
              },
              'id': 'id-23eaa300-4982-449d-8c6c-94bc1f781f38',
              'widget': {
                'title': {
                  'enabled': true,
                  'text': ''
                },
                'class': ''
              }
            }
          },
          'waitingForGlobalFilter': false,
          'id': 'id-6dde66c0-5708-42a8-9af5-fd5e7f460efb',
          'editMode': true
        },
        'grid': {
          'x': 0,
          'y': 93,
          'w': 12,
          'h': 49,
          'i': 5,
          'moved': false
        }
      },
      {
        'type': 'cbpo-widget',
        'config': {
          'grid': {
            'x': 0,
            'y': 142,
            'w': 12,
            'h': 46,
            'i': 6,
            'moved': false
          },
          'autoHeight': false,
          'widget': {
            'title': {
              'text': 'Total Listings (30 Days)',
              'enabled': true,
              'edited': true
            },
            'style': {
              'background_color': null,
              'foreground_color': null,
              'header_background_color': null,
              'header_foreground_color': null,
              'border_width': null,
              'border_radius': null
            },
            'id': 'id-68437bd3-a48c-49a3-9f82-1a189fca9391',
            'class': ''
          },
          'action': {
            'elements': []
          },
          'elements': [
            {
              'type': 'cbpo-element-chart',
              'config': {
                'dataSource': 'ms_dashboard_seller_total_listing',
                'widget': {
                  'title': {
                    'enabled': false,
                    'text': 'Quantitation of [arbitrage_status] over [gmr_status]',
                    'edited': false
                  },
                  'style': {
                    'background_color': null,
                    'foreground_color': null,
                    'header_background_color': null,
                    'header_foreground_color': null,
                    'border_width': null,
                    'border_radius': null
                  }
                },
                'library': 'highcharts',
                'columns': [
                  {
                    'name': 'date',
                    'displayName': 'Date',
                    'type': 'date',
                    'format': {
                      'common': {
                        'plain': {
                          'nil': 'NULL',
                          'empty': 'EMPTY',
                          'na': 'N/A'
                        },
                        'html': {
                          'nil': '<span class=\'d-sdk-nil\'>null</span>',
                          'empty': '<span class=\'d-sdk-empty\'>empty</span>',
                          'na': '<span class=\'d-sdk-na\'>N/A</span>'
                        },
                        'prefix': null,
                        'suffix': null
                      },
                      'type': 'temporal',
                      'config': {
                        'format': 'l',
                        'date': {
                          'format': 'l'
                        },
                        'time': {
                          'format': ''
                        },
                        'options': {
                          'year': 'YYYY',
                          'quarter': 'YYYY [Q]Q',
                          'month': 'YYYY MMM',
                          'week': 'YYYY [w]w',
                          'day': 'YYYY-MM-DD',
                          'hour': 'YYYY-MM-DD kk',
                          'minute': 'YYYY-MM-DD kk:mm',
                          'second': 'YYYY-MM-DD kk:mm:ss'
                        }
                      }
                    },
                    'aggrFormats': null
                  },
                  {
                    'name': 'total',
                    'displayName': 'Total',
                    'type': 'int',
                    'format': {
                      'common': {
                        'plain': {
                          'nil': 'NULL',
                          'empty': 'EMPTY',
                          'na': 'N/A'
                        },
                        'html': {
                          'nil': '<span class=\'d-sdk-nil\'>null</span>',
                          'empty': '<span class=\'d-sdk-empty\'>empty</span>',
                          'na': '<span class=\'d-sdk-na\'>N/A</span>'
                        },
                        'prefix': null,
                        'suffix': null
                      },
                      'type': 'numeric',
                      'config': {
                        'comma': true,
                        'precision': 0,
                        'siPrefix': false
                      }
                    },
                    'aggrFormats': null
                  }
                ],
                'sizeSettings': {
                  'defaultMinSize': 250,
                  'warningText': 'The area is too small for this visualization.'
                },
                'charts': [
                  {
                    'axis': {
                      'x': [
                        {
                          'id': 'x_id-5fe087ac-04e2-44c7-b665-98f2f204f0f7',
                          'type': 'category',
                          'display': true,
                          'format': null,
                          'scaleLabel': {
                            'display': false,
                            'labelString': ''
                          },
                          'ticks': {
                            'fontSize': 11,
                            'fontStyle': 'bold'
                          }
                        }
                      ],
                      'y': [
                        {
                          'id': 'y_id-5fe087ac-04e2-44c7-b665-98f2f204f0f7',
                          'type': 'linear',
                          'format': null,
                          'position': 'left',
                          'stack': false,
                          'ticks': {
                            'beginAtZero': true,
                            'stepSize': '',
                            'maxTicksLimit': 5,
                            'fontSize': 11,
                            'fontStyle': 'bold'
                          },
                          'scaleLabel': {
                            'display': false,
                            'labelString': ''
                          }
                        }
                      ]
                    },
                    'options': {
                      'legend': {
                        'enabled': true,
                        'position': 'top',
                        'widthPercent': 40,
                        'isHorizontal': true
                      },
                      'stacking': '',
                      'isHorizontal': false
                    },
                    'series': [
                      {
                        'type': 'bar',
                        'name': 'Listings',
                        'axis': {
                          'x': 'x_id-5fe087ac-04e2-44c7-b665-98f2f204f0f7',
                          'y': 'y_id-5fe087ac-04e2-44c7-b665-98f2f204f0f7'
                        },
                        'data': {
                          'x': 'date',
                          'y': 'total'
                        },
                        'id': 'id-5fe087ac-04e2-44c7-b665-98f2f204f0f7'
                      }
                    ]
                  }
                ],
                'sorting': [
                  {
                    'column': 'date',
                    'direction': 'asc'
                  }
                ],
                'grouping': {
                  'aggregations': [
                    {
                      'column': 'total',
                      'aggregation': 'sum',
                      'alias': 'total_sum_id-5fe087ac-04e2-44c7-b665-98f2f204f0f7'
                    },
                    {
                      'column': 'date',
                      'aggregation': 'max',
                      'alias': 'date'
                    }
                  ],
                  'columns': [
                    {
                      'name': 'date_bin'
                    }
                  ]
                },
                'bins': [
                  {
                    'column': {
                      'name': 'date',
                      'type': 'date'
                    },
                    'alias': 'date_bin',
                    'options': {
                      'alg': 'uniform',
                      'uniform': {
                        'width': 1,
                        'unit': 'W'
                      }
                    }
                  }
                ],
                'pagination': {
                  'limit': 1000,
                  'current': 1,
                  'type': 'buttons'
                },
                'color_scheme': 'Google',
                'messages': {
                  'no_data_at_all': 'No data',
                  'no_data_found': 'No data found'
                },
                'id': '57bef430-d61b-41ed-aaf0-0e9603b2c404'
              }
            }
          ],
          // 'filter': {
          //   'form': {
          //     'config': {
          //       'controls': [],
          //       'query': {
          //         'type': 'AND',
          //         'conditions': []
          //       },
          //       'id': 'id-60fa5d11-858d-4e6d-87e7-44c803a956b8'
          //     }
          //   },
          //   'builder': {
          //     'enabled': false,
          //     'config': {
          //       'trigger': {
          //         'label': 'Setting Filter'
          //       },
          //       'modal': {
          //         'title': 'Query Builder'
          //       },
          //       'format': {
          //         'temporal': {
          //           'date': 'YYYY-MM-DD',
          //           'datetime': 'YYYY-MM-DD hh:mm'
          //         }
          //       },
          //       'threshold': {
          //         'maxLevel': 5
          //       },
          //       'query': {
          //         'id': null,
          //         'level': 0,
          //         'type': 'AND',
          //         'conditions': []
          //       }
          //     }
          //   },
          //   'globalFilter': {
          //     'enabled': false
          //   },
          //   'alignment': ''
          // },
          'columnManager': {
            'enabled': false,
            'config': {
              'trigger': {
                'label': 'Manage Columns'
              },
              'modal': {
                'title': 'Manage Columns'
              },
              'managedColumns': []
            }
          },
          'menu': {
            'enabled': true,
            'config': {
              'label': {
                'text': ''
              },
              'icons': {
                'css': 'fa fa-ellipsis-h'
              },
              'dataSource': null,
              'selection': {
                'options': [
                  {
                    'label': 'Widget Settings',
                    'icon': 'fa fa-cog',
                    'value': 'widget-settings',
                    'type': 'item'
                  },
                  {
                    'label': 'Element Settings',
                    'icon': 'fa fa-cog',
                    'value': 'element-settings',
                    'type': 'item'
                  },
                  {
                    'label': 'Remove',
                    'icon': 'fa fa-times',
                    'value': 'remove',
                    'type': 'item'
                  },
                  {
                    'type': 'divider'
                  },
                  {
                    'label': 'Download CSV',
                    'icon': 'fa fa-download',
                    'value': 'csv',
                    'type': 'item'
                  }
                ]
              },
              'id': 'id-28850890-6426-4901-9f3b-58e877964f26',
              'widget': {
                'title': {
                  'enabled': true,
                  'text': ''
                },
                'class': ''
              }
            }
          },
          'waitingForGlobalFilter': false,
          'id': 'id-1c88a69c-831a-488c-ba1e-0c2a61984c2e',
          'editMode': true
        },
        'grid': {
          'x': 0,
          'y': 142,
          'w': 12,
          'h': 46,
          'i': 6,
          'moved': false
        }
      }
    ],
    'layout': [
      {
        'x': 0,
        'y': 0,
        'w': 12,
        'h': 23,
        'i': 0,
        'moved': false
      },
      {
        'x': 0,
        'y': 23,
        'w': 6,
        'h': 34,
        'i': 1,
        'moved': false
      },
      {
        'x': 6,
        'y': 23,
        'w': 6,
        'h': 34,
        'i': 2,
        'moved': false
      },
      {
        'x': 0,
        'y': 57,
        'w': 6,
        'h': 34,
        'i': 3,
        'moved': false
      },
      {
        'x': 6,
        'y': 57,
        'w': 6,
        'h': 34,
        'i': 4,
        'moved': false
      },
      {
        'x': 0,
        'y': 93,
        'w': 12,
        'h': 49,
        'i': 5,
        'moved': false
      },
      {
        'x': 0,
        'y': 142,
        'w': 12,
        'h': 46,
        'i': 6,
        'moved': false
      }
    ],
    'id': 'id-0e866002-3a24-413f-b7d9-cab4651944e4'
  },
  'menu': {
    'enabled': true,
    'config': {
      'label': {
        'text': ''
      },
      'icons': {
        'css': 'fa fa-ellipsis-h'
      },
      'dataSource': null,
      'selection': {
        'options': [
          {
            'label': 'Dashboard Settings',
            'icon': 'fa fa-cog',
            'value': 'widget-settings',
            'type': 'item'
          }
        ]
      },
      'id': 'id-59e3dfe7-75db-4502-927f-33055f8a5086',
      'widget': {
        'title': {
          'enabled': true,
          'text': ''
        },
        'class': ''
      }
    }
  },
  'id': 'id-60a594a9-255c-416f-b059-310f37878e8e'
}
export default config
