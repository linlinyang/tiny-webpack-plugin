/*
 * @Author: Yang Lin
 * @Description: 简介
 * @Date: 2020-11-11 10:33:34
 * @LastEditTime: 2020-11-11 15:03:44
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\webpack3.config.js
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
                loader: 'file-loader',
                options: {
                    name: '[name].[hash].[ext]'
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
    ]
};