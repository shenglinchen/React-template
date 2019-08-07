const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const utils = require('./utils')
const config = require('../config')
const HappyPack = require('happypack')
const os = require('os') // 用于获取系统 cpu 内核数
// 使用线程共享池，压缩线程空闲时间
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})
// ts 检查
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

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
            title: config.base.title,
            template: path.join(__dirname, '..', "src/template/index.ejs"),
            inject: true,
            filename: 'index.html'
        }),
        // 每个插件都会占用性能
        // new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HappyPack({
            // id 需要和 loader 配置里面的 id 对应
            id: 'js',
            loaders: [
                {loader: 'babel-loader'}
            ],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        }),
        new HappyPack({
            // id 需要和 loader 配置里面的 id 对应
            id: 'tsx',
            loaders: [
                { 
                    loader: 'ts-loader',
                    options: { 
                        // 不进行静态类型检查，提升速度，需要使用  fork-ts-checker-webpack-plugin 来类型检查
                        transpileOnly: true, 
                        // 使用 happypack 进行编译提速
                        happyPackMode: true 
                    }
                }
            ],
            //共享进程池
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
            
        }),
        new ForkTsCheckerWebpackPlugin({
            // happyPack 时使用，在 hppyPack 时，不会进行 syntactic check，加上这个就会了
            checkSyntacticErrors: true
        }),
        new ProgressBarPlugin({
            complete: "😡"
        })
    ],
    module: {
        rules: [
            {
                test: /\.tsx$/,
                // use: "ts-loader",
                loader: 'happypack/loader?id=tsx',
                exclude: /node_modules/
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                // loader: 'babel-loader',
                loader: 'happypack/loader?id=js'
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
        extensions: ['.tsx', '.ts', '.js', 'json'],
        alias: {
            '@src': utils.resolve('src'),
            '@modules': utils.resolve('src/modules'),
            '@components': utils.resolve('src/components'),
            '@store': utils.resolve('src/store'),
            '@style': utils.resolve('src/style'),
            '@library': utils.resolve('src/library'),
        }
    },
    devtool: 'inline-source-map',
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
}