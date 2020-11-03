/*
 * @Author: Yang Lin
 * @Description: 插件入口页
 * @Date: 2020-11-03 15:43:27
 * @LastEditTime: 2020-11-03 16:39:14
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\src\index.ts
 */
import Options from './options';
const validateOptions = require('schema-utils');
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
        this.opt = Object.assign(defaultOptions, opt);
        validateOptions(schema, this.opt, {
            name: id
        });
    }

    apply(compiler: Compiler){
        compiler.hooks.emit.tap(id, (compilation: Compilation) => {
            console.log('Executed right before emitting assets to output dir');
        });
    }
}

export default TinyWebpackPlugin;