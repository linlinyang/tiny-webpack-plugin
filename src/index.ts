/*
 * @Author: Yang Lin
 * @Description: 插件入口页
 * @Date: 2020-11-03 15:43:27
 * @LastEditTime: 2020-11-10 17:29:24
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
    compressData
} from './utils/response';
import {
    Compiler,
    getWebpackVersion,
    RawSource
} from './utils/webpack';
import {
    byteSize,
    id,
    IMGEXP
} from './utils/index';
import colors from 'colors';

const defaultOptions: Options = {
    log: false,
    enable: true
};

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

    handleImg (compilation: Compilation): Promise<void>{
        let imgPaths: string[];
        if (compilation.getAssets) { // webpack >= 5
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
        if (total === 0) {
            return Promise.resolve();
        }

        const {
            log
        } = this.opt;
        let successCounter = 0;
        log && console.log('[tiny-webpack-plugin] 开始压缩图片...');
        return new Promise((resolve, reject) => {
            let totalOriginSize: number = 0;
            let totalCompressedSize: number = 0;
            for (let i: number = 0; i < total; i++) {
                const path: string = imgPaths[i];
                const source: sources.Source = compilation.getAsset
                    ? compilation.getAsset(path).source
                    : compilation.assets[path];

                if(!source){
                    continue ;
                }

                compress(source).then((data: compressData) => {
                    if(log){
                        const successTips: string = colors.green(`${path} 压缩成功！`);
                        const originSize: string = colors.blue(byteSize(data.originSize));
                        const compressedSize: string = colors.blue(byteSize(data.size));
                        const ratio: string = ((1 - data.ratio) * 100).toFixed(2);
                        const ratioTips: string = colors.green(`压缩率：${ratio}%`);
                        console.log(`[tiny-webpack-plugin] ${successTips} ${originSize} -> ${compressedSize}（${ratioTips}）`);
                    }
                    totalOriginSize += data.originSize;
                    totalCompressedSize += data.size;
                    if (compilation.updateAsset) {
                        compilation.updateAsset(
                            path,
                            new RawSource(Buffer.alloc(data.file.length, data.file, 'binary'), false)
                        );
                    } else {
                        compilation.assets[path] = new RawSource(Buffer.alloc(data.file.length, data.file, 'binary'), false);
                    }
                    if (++successCounter === total) {
                        if(log){
                            const finishedTips: string = colors.green('所有图片全部压缩完成！');
                            const totalOriginSizeTips: string = colors.blue(byteSize(totalOriginSize));
                            const totalCompressedSizeTips: string = colors.blue(byteSize(totalCompressedSize));
                            const ratio: string = totalOriginSize === 0 
                                ? '0'
                                : ((1 - (totalCompressedSize / totalOriginSize)) * 100).toFixed(2)
                            const totalRatioTips: string = colors.green(`压缩率：${ratio}%`);
                            console.log(`[tiny-webpack-plugin] ${finishedTips} ${totalOriginSizeTips} -> ${totalCompressedSizeTips}（${totalRatioTips}）`);
                        }
                        resolve();
                    }
                }, error => {
                    if (log) {
                        console.log(`[tiny-webpack-plugin] ${colors.red(`${path} 压缩失败！`)}`);
                    }
                    reject(error);
                });
            }
        });
    }
}

export {
    TinyWebpackPlugin,
    Options
};