const CopyWebpackPlugin = require('copy-webpack-plugin')
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')

exports.plugins = [
  new CopyWebpackPlugin([
    {
      from: 'lib/',
      to: ''
    }
  ])
  // new HtmlWebpackExternalsPlugin({
  //   externals: [
  //     {
  //       module: 'chartfw',
  //       entry:
  //         'http://localhost/js/chartfw.js'
  //     }
  //   ]
  // }),
]
