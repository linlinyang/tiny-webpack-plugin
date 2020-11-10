"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawSource = exports.getWebpackVersion = void 0;
/*
 * @Author: Yang Lin
 * @Description: webpack 兼容性属性
 * @Date: 2020-11-06 17:07:44
 * @LastEditTime: 2020-11-10 17:28:53
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\src\utils\webpack.ts
 */
const webpack_1 = require("webpack");
const webpack_sources_1 = require("webpack-sources");
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
const RawSource = (webpack_1.sources === null || webpack_1.sources === void 0 ? void 0 : webpack_1.sources.RawSource) || webpack_sources_1.RawSource;
exports.RawSource = RawSource;
//# sourceMappingURL=webpack.js.map