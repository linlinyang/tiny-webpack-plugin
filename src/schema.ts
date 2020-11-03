/*
 * @Author: Yang Lin
 * @Description: schema 插件参数验证
 * @Date: 2020-11-03 16:02:27
 * @LastEditTime: 2020-11-03 17:40:58
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\src\schema.ts
 */
import {
    Schema
} from 'schema-utils/declarations/validate';

const schema: Schema =  {
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
}

export default schema;