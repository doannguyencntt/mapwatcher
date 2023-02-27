const dev = require('./config/dev')
const prod = require('./config/prod')
const base = require('./config/base')

// config environment variable with prefix "VUE_APP_"
require('./config/env')

module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      ...base.plugins,
      ...(process.env.BABEL_ENV === 'development' ? prod.plugins : []),
      ...(process.env.BABEL_ENV === 'production' ? dev.plugins : [])
    ]
  }
}
