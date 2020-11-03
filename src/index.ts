/*
 * @Author: Yang Lin
 * @Description: 插件入口页
 * @Date: 2020-11-03 15:43:27
 * @LastEditTime: 2020-11-03 19:48:56
 * @FilePath: f:\sourcecode\tiny-webpack-plugin\src\index.ts
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

const IMGEXP = /\.(jpe?g|png)/;

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
        const {
            enable
        } = this.opt;

        // 不启动图片压缩
        if(!enable){
            return ;
        }
        compiler.hooks.emit.tapAsync(id, (compilation: Compilation, callback) => {
            const imgPaths: string[] = Object.keys(compilation.assets).filter(key => IMGEXP.test(key));
            if(imgPaths.length === 0){
                callback();
                return ;
            }

            const total = imgPaths.length;
        });
    }
}

export default TinyWebpackPlugin;