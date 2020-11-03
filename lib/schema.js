"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Yang Lin
 * @Description: schema 插件参数验证
 * @Date: 2020-11-03 16:02:27
 * @LastEditTime: 2020-11-03 17:37:52
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\src\schema.ts
 */
exports.default = {
    type: 'object',
    properties: {
        log: {
            description: '是否打印日志信息',
            type: 'boolean'
        },
        enable: {
            description: '是否开启图片压缩',
            type: 'boolean'
        }
    }
};
//# sourceMappingURL=schema.js.map