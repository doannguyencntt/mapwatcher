import topViolatedProducts from './configs/top-violated-products.js'
import sellerViolation from './configs/seller-violations.js'
import avgPercentage from './configs/avg-percentage-off-map'
import newRepeatViolators from './configs/new-repeat-violators'
import numberOfViolationsViolators from './configs/number-of-violations-violators.js'
import numberOfViolations from './configs/number-of-violations.js'
export const configDashBoard = {
  widget: {
    builder: {
      enabled: false
    }
  },
  widgetLayout: {
    gridConfig: {
      colNum: 12,
      rowHeight: 1,
      margin: [8, 8],
      defaultHeight: 400
    },
    widgets: [
      // TODO: dynamic func
      // {
      //   type: 'cbpo-widget',
      //   config: dailyViolator
      // },
      {
        type: 'cbpo-widget',
        config: topViolatedProducts
      },
      {
        type: 'cbpo-widget',
        config: sellerViolation
      },
      {
        type: 'cbpo-widget',
        config: avgPercentage
      },
      // {
      //   type: 'cbpo-widget',
      //   config: new1stTimeViolator
      // },
      // {
      //   type: 'cbpo-widget',
      //   config: new2ndTimeViolator
      // },
      {
        type: 'cbpo-widget',
        config: newRepeatViolators
      }
    ],
    layouts: []
  }
}

export const configHistorical = {
  widget: {
    builder: {
      enabled: false
    }
  },
  widgetLayout: {
    gridConfig: {
      colNum: 12,
      rowHeight: 1,
      margin: [8, 8],
      defaultHeight: 400
    },
    widgets: [
      // {
      //   type: 'cbpo-widget',
      //   config: historicalDataTable
      // },
      {
        type: 'cbpo-widget',
        config: numberOfViolations
      },
      {
        type: 'cbpo-widget',
        config: numberOfViolationsViolators
      }
    ],
    layouts: []
  }
}
