const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')

module.exports = merge(baseConfig, {
    plugins: [
        new BundleAnalyzerPlugin({
            openAnalyzer: false
        })
    ]
})