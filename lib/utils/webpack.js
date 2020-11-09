"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpackVersion = void 0;
/*
 * @Author: Yang Lin
 * @Description: webpack 兼容性属性
 * @Date: 2020-11-06 17:07:44
 * @LastEditTime: 2020-11-09 13:41:18
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\src\utils\webpack.ts
 */
const webpack_1 = require("webpack");
function getWebpackVersion(tag = 4) {
    const versionArr = webpack_1.version.split('.');
    if (tag & 4) {
        return versionArr[0];
    }
    else if (tag & 2) {
        return versionArr[2];
    }
    else if (tag & 1) {
        return webpack_1.version[3];
    }
    else {
        return webpack_1.version;
    }
}
exports.getWebpackVersion = getWebpackVersion;
//# sourceMappingURL=webpack.js.map