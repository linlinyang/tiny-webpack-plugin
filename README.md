### Tiny Img Webpack Plugin

使用webpack构建项目时，自动压缩项目中的.png，.jpg，.jpeg图片，优化项目体积。

#### 开始使用

插件安装：

```shell
npm install tiny-img-webpack-plugin --save-dev
```

配置webpack：webpack.config.js

```javascript
const {
    TinyWebpackPlugin
} = require("tiny-webpack-plugin");
const path = require('path');
const pathResolve = filename => path.resolve(__dirname,filename);

module.exports = {
    entry: pathResolve('src/index.js'),
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
        new TinyWebpackPlugin({
            enable: true,
            log: true
        })
    ]
};
```

项目中引入图片示例：

```javascript
import pic1 from './assets/pic1.jpg';
import pic2 from './assets/pic2.jpg';
import pic3 from './assets/pic3.jpg';

function loadImg(src){
    const img = new Image();
    img.onload = function(){
        document.body.appendChild(img);
    };
    img.src = src;
}

[
    pic1,
    pic2,
    pic3
].forEach(src => loadImg(src));
```

图片压缩后会存放至设置目标路径。

插件参数：

| 名称   | 类型    | 说明             | 默认值 |
| ------ | ------- | ---------------- | ------ |
| log    | boolean | 是否打印压缩信息 | false  |
| enable | boolean | 是否启动压缩     | true   |

