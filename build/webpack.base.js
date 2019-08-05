const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve("./", "dist"),
        filename: "[name].bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "react 模板",
            template: "./src/index.html"
        })
    ],
    module: {
        rules: [{
            test: /\.tsx/,
            use: "ts-loader",
            exclude: /node_modules/
        }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    devtool: 'inline-source-map'
}