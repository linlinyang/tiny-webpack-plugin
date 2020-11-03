/*
 * @Author: Yang Lin
 * @Description: 插件入口页
 * @Date: 2020-11-03 15:43:27
 * @LastEditTime: 2020-11-03 17:38:31
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\src\index.ts
 */
import Options from './options';
import {
    validate
} from 'schema-utils';
import schema from './schema';
import {
    Compiler,
    Compilation
} from 'webpack';

const defaultOptions: Options = {
    log: false,
    enable: true
};

console.log(schema);

const id: string = 'TinyWebpackPlugin';

class TinyWebpackPlugin {
    opt: Options;

    constructor(opt: Options){
        const options = Object.assign(defaultOptions, opt);
        validate({
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
        }, options, {
            name: id,
            baseDataPath: 'options'
        });

        this.opt = options;
    }

    apply(compiler: Compiler){
        compiler.hooks.emit.tap(id, (compilation: Compilation) => {
            console.log('some codes');
        });
    }
}

export default TinyWebpackPlugin;