"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Yang Lin
 * @Description: schema 插件参数验证
 * @Date: 2020-11-03 16:02:27
 * @LastEditTime: 2020-11-03 16:12:21
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\src\schema.ts
 */
exports.default = {
    type: 'object',
    properties: {
        log: {
            description: '是否打印日志信息',
            type: 'bolean'
        },
        enable: {
            description: '是否开启图片压缩',
            type: 'bolean'
        }
    }
};
//# sourceMappingURL=schema.js.map