/*
 * @Author: Yang Lin
 * @Description: 简介
 * @Date: 2020-11-03 15:17:42
 * @LastEditTime: 2020-11-03 16:40:40
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\webpack.config.js
 */

const path = require('path');
const pathResolve = filename => path.resolve(__dirname,filename);
//const TinyimgPlugin = pathResolve('./lib/index.js');

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
                    name: '[name].[ext]',
                    outputPath: 'images'
                }
            }]
        }]
    },
    plugins: [
        /* new TinyimgPlugin({
            enabled: true,
            logged: true
        }) */
    ]
};