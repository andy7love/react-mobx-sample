const merge = require('webpack-merge');
const webpackCommon = require('./webpack-common.config');
const webpack = require('webpack');

module.exports = merge(webpackCommon, {
    devtool: 'none',
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
                screw_ie8: true
            }
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
            DEV: JSON.stringify(false)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            minChunks: 2,
            name: 'vendor'
        })
    ]
});