const path = require('path')
/* 
这里导入一个文件夹能够成功是因为：node.js 模块系统里面。如果导入一个不带'./'之类的，会先到本级目录 node_modules 
下面寻找，然后再继续往上级目录中的 node_modules 寻找。如果带 './' ,则会寻找相对应的文件。如果路径最后不是以文件结尾，
则会寻找该目录下的 index.js
 */
const config  = require('../config')

module.exports = {
    // 该函数用于处理静态资源的名称
    assetsPath: (name) => {
        // 将路径和 name 拼接起来
        return path.resolve(config.base.assetsSubDirectory, name)
    },
    resolve: (name) => {
        // 这里加上 .. ，是因为要先从 `dev-server.js` 出来到根目录
        return path.join(__dirname, '..', name)
    }
}