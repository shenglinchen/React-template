const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); 

module.exports = merge(baseConfig, {
    plugins: [
        new BundleAnalyzerPlugin({
            openAnalyzer: false
        }),
        new FriendlyErrorsWebpackPlugin()
    ]
})