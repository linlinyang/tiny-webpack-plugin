/*
 * @Author: Yang Lin
 * @Description: 插件入口页
 * @Date: 2020-11-03 15:43:27
 * @LastEditTime: 2020-11-09 16:38:36
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\src\index.ts
 */
import Options from './options';
import {
    validate
} from 'schema-utils';
import schema from './schema';
import {
    sources,
    Compilation
} from 'webpack';
import compress from './compress';
import {
    errorData,
    compressData
} from './utils/response';
import {
    RawSource as originRawSource
} from 'webpack-sources';
import {
    Compiler,
    getWebpackVersion
} from './utils/webpack';

const defaultOptions: Options = {
    log: false,
    enable: true
};

const id: string = 'TinyWebpackPlugin';

const IMGEXP = /\.(jpe?g|png)/;

const RawSource = sources?.RawSource || originRawSource;

class TinyWebpackPlugin {
    opt: Options;

    constructor (opt: Options) {
        const options = Object.assign(defaultOptions, opt);
        validate(schema, options, {
            name: id,
            baseDataPath: 'options'
        });

        this.opt = options;
    }

    apply (compiler: Compiler) {
        const {
            enable
        } = this.opt;

        // 不启动图片压缩
        if (!enable) {
            return ;
        }
        
        if (compiler.hooks) { // webpack >= 4
            if(getWebpackVersion() === '4'){ // webpack 4~5
                compiler.hooks.emit.tapAsync(
                    id,
                    (compilation: Compilation, callback) => {
                        this.handleImg(compilation).then(() => {
                            callback();
                        }, error => {
                            compilation.errors.push(...error);
                        })
                    }
                );
            } else {  // webpack >= 5
                compiler.hooks.compilation.tap(
                    id,
                    (compilation: Compilation) => {
                        compilation.hooks.processAssets.tapPromise(
                            id,
                            () => this.handleImg(compilation).catch(error => {
                                compilation.errors.push(...error);
                            })
                        );
                    }
                );
            }
        } else if (compiler.plugin) {
            // webpack < 4
            compiler.plugin('emit', (compilation: Compilation, callback) => {
                this.handleImg(compilation).then(callback, error => {
                    compilation.errors.push(...error);
                });
            });
        } else { // 不支持的版本
            console.log('tiny-webpack-plugin插件不支持当前webpack版本');
        }
    }

    async handleImg (compilation: Compilation) {
        let imgPaths: string[];
        if(compilation.getAssets){ // webpack >= 5
            imgPaths = compilation.getAssets().reduce((acc: string[],asset) => {
                if(IMGEXP.test(asset.name)){
                    acc.push(asset.name);
                }
                return acc;
            }, []);
        } else {
            imgPaths = Object.keys(compilation.assets).filter(name => IMGEXP.test(name));
        }
        
        const total: number = imgPaths.length;
        if(total === 0){
            return Promise.resolve();
        }

        let errs: Array<Error | errorData> = [];
        for(let i: number = 0; i < total; i++){
            const path: string = imgPaths[i];
            const source: sources.Source = compilation.getAsset 
                ? compilation.getAsset(path).source 
                : compilation.assets[path];
            if (!source) {
                continue;
            }
            try {
                const data: compressData = await compress(source);
                if (compilation.updateAsset) {
                    compilation.updateAsset(
                        path,
                        new RawSource(Buffer.alloc(data.file.length, data.file, 'binary'), false)
                    );
                } else {
                    compilation.assets[path] = new RawSource(Buffer.alloc(data.file.length, data.file, 'binary'), false);
                }
            } catch (error) {
                errs.push(error);
            }
        }

        if (errs.length > 0) {
            return Promise.reject(errs);
        }
    }
}

export {
    TinyWebpackPlugin,
    Options
};