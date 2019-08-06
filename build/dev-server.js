const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const path = require('path')
const config = require('../config')

const app = express()
const webpackConfig = require('./webpack.base.conf.js')
const compiler = webpack(webpackConfig)

let devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
})

let hotMiddleware = webpackHotMiddleware(compiler, {
    log: false,
    path: "/__hmr",
    heartbeat: 2000
})

app.use(devMiddleware)

app.use(hotMiddleware)

// 用于 Ping 服务是否启动
app.use("/ping", (req, res) => {
    res.sendStatus(200)
})

// 拼接静态资源的路径。posix 是指可移植操作系统接口，path.posix.join 是兼容性好的 path.join
var staticPath = path.posix.join(
    config.dev.assetsPublicPath,
    config.base.assetsSubDirectory
)

/* 前面是一个虚拟路径，后面是一个相对于前面真实的路径。但后面也是用 webpack-hot-middleware 产生的虚拟路径。
    后面的路径是静态资源存放的路径。
    前面因为 webpack.base.js 的 loader 把静态资源位置转移了
*/
app.use(staticPath, express.static('./static'))

console.log('>>>>>>>>>>>>>>>>>> compiling')
// 在构建成功时调用
devMiddleware.waitUntilValid(() => {
    console.log(`linstening on ${config.dev.host}:${config.dev.port}`)
})

app.listen(9000, () => {
    console.log("port", config.dev.port)
})

