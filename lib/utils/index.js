"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMGEXP = exports.id = exports.randomDomain = exports.byteSize = exports.randomIp = void 0;
/*
 * @Author: Yang Lin
 * @Description: 工具方法
 * @Date: 2020-11-03 20:17:50
 * @LastEditTime: 2020-11-10 17:27:17
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\src\utils\index.ts
 */
const DOMAINS = [
    'tinyjpg.com',
    'tinypng.com'
];
const id = 'TinyWebpackPlugin';
exports.id = id;
const IMGEXP = /\.(jpe?g|png)/;
exports.IMGEXP = IMGEXP;
function randomIp() {
    const ret = [];
    let len = 4;
    while (len--) {
        ret.push((Math.random() * 256) | 0);
    }
    return ret.join('.');
}
exports.randomIp = randomIp;
function randomDomain() {
    return DOMAINS[(Math.random() * 2) | 0];
}
exports.randomDomain = randomDomain;
function byteSize(byte) {
    if (byte === 0) {
        return '0 B';
    }
    const symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let index = Math.floor(Math.log(byte) / Math.log(1024));
    return `${(byte / Math.pow(1024, index)).toFixed(2)}${symbols[index]}`;
}
exports.byteSize = byteSize;
//# sourceMappingURL=index.js.map