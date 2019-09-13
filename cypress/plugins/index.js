const webpack = require('@cypress/webpack-preprocessor')
module.exports = (on) => {
  const options = {
    webpackOptions: require('../../config/webpack.dev'),
    watchOptions: {},
  }
  on('file:preprocessor', webpack(options))
}
