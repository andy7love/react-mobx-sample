const merge = require('webpack-merge');
const webpackCommon = require('./webpack-common.config');
const webpack = require('webpack');

module.exports = merge(webpackCommon, {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    publicPath: '/static/'
  },
  module: {
    preLoaders: [
      // Javascript
      { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ }
    ]
  },
  eslint: {
    failOnWarning: false,
    failOnError: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 8000,
    publicPath: '/static/',
    hot: true,
    historyApiFallback: true
  }
});