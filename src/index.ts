/*
 * @Author: Yang Lin
 * @Description: 插件入口页
 * @Date: 2020-11-03 15:43:27
 * @LastEditTime: 2020-11-03 17:41:14
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

const id: string = 'TinyWebpackPlugin';

class TinyWebpackPlugin {
    opt: Options;

    constructor(opt: Options){
        const options = Object.assign(defaultOptions, opt);
        validate(schema, options, {
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