const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const utils = require('./utils')

module.exports = {
    // entry: {
    //     app: './src/app.js'
    // },
    entry: ['webpack-hot-middleware/client?path=/__hmr', './src/app.js'],
    output: {
        path: path.resolve("./", "dist"),
        filename: "[name].bundle.js",
        publicPath: "/"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "react 模板",
            template: "./src/index.html"
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.tsx$/,
                use: "ts-loader",
                exclude: /node_modules/
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }, {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath(`fonts/[name].[hash:7].[ext]`)
                }
            },{
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // 这个选项会把被匹配中的文件输出到对应位置
                    name: utils.assetsPath(`media/[name].[hash:7].[ext]`)
                }
            }, {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath(`imgs/[name].[hash:7].[ext]`)
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devtool: 'inline-source-map'
}