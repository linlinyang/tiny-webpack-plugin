/*
 * @Author: Yang Lin
 * @Description: 简介
 * @Date: 2020-11-03 15:17:42
 * @LastEditTime: 2020-11-11 15:03:33
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\webpack.config.js
 */

const path = require('path');
const pathResolve = filename => path.resolve(__dirname,filename);
const { TinyWebpackPlugin } = require('./lib/index');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: pathResolve('example/index.js'),
    output: {
        filename: 'boundle.js',
        path: pathResolve('dist')
    },
    module: {
        rules: [{
            test: /\.(png|jpg|gif|svg|webp)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192, //小于8192字节图片转为base64
                    name: '[name].[hash].[ext]',
                    outputPath: 'images'
                }
            }]
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new TinyWebpackPlugin({
            log: true,
            enable: true
        })
    ],
    mode: 'development'
};