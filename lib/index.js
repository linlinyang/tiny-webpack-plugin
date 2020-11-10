"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinyWebpackPlugin = void 0;
const schema_utils_1 = require("schema-utils");
const schema_1 = __importDefault(require("./schema"));
const compress_1 = __importDefault(require("./compress"));
const webpack_1 = require("./utils/webpack");
const index_1 = require("./utils/index");
const colors_1 = __importDefault(require("colors"));
const defaultOptions = {
    log: false,
    enable: true
};
class TinyWebpackPlugin {
    constructor(opt) {
        const options = Object.assign(defaultOptions, opt);
        schema_utils_1.validate(schema_1.default, options, {
            name: index_1.id,
            baseDataPath: 'options'
        });
        this.opt = options;
    }
    apply(compiler) {
        const { enable } = this.opt;
        // 不启动图片压缩
        if (!enable) {
            return;
        }
        if (compiler.hooks) { // webpack >= 4
            if (webpack_1.getWebpackVersion() === '4') { // webpack 4~5
                compiler.hooks.emit.tapAsync(index_1.id, (compilation, callback) => {
                    this.handleImg(compilation).then(() => {
                        callback();
                    }, error => {
                        compilation.errors.push(...error);
                    });
                });
            }
            else { // webpack >= 5
                compiler.hooks.compilation.tap(index_1.id, (compilation) => {
                    compilation.hooks.processAssets.tapPromise(index_1.id, () => this.handleImg(compilation).catch(error => {
                        compilation.errors.push(...error);
                    }));
                });
            }
        }
        else if (compiler.plugin) {
            // webpack < 4
            compiler.plugin('emit', (compilation, callback) => {
                this.handleImg(compilation).then(callback, error => {
                    compilation.errors.push(...error);
                });
            });
        }
        else { // 不支持的版本
            console.log('tiny-webpack-plugin插件不支持当前webpack版本');
        }
    }
    handleImg(compilation) {
        let imgPaths;
        if (compilation.getAssets) { // webpack >= 5
            imgPaths = compilation.getAssets().reduce((acc, asset) => {
                if (index_1.IMGEXP.test(asset.name)) {
                    acc.push(asset.name);
                }
                return acc;
            }, []);
        }
        else {
            imgPaths = Object.keys(compilation.assets).filter(name => index_1.IMGEXP.test(name));
        }
        const total = imgPaths.length;
        if (total === 0) {
            return Promise.resolve();
        }
        const { log } = this.opt;
        let successCounter = 0;
        log && console.log('[tiny-webpack-plugin] 开始压缩图片...');
        return new Promise((resolve, reject) => {
            let totalOriginSize = 0;
            let totalCompressedSize = 0;
            for (let i = 0; i < total; i++) {
                const path = imgPaths[i];
                const source = compilation.getAsset
                    ? compilation.getAsset(path).source
                    : compilation.assets[path];
                if (!source) {
                    continue;
                }
                compress_1.default(source).then((data) => {
                    if (log) {
                        const successTips = colors_1.default.green(`${path} 压缩成功！`);
                        const originSize = colors_1.default.blue(index_1.byteSize(data.originSize));
                        const compressedSize = colors_1.default.blue(index_1.byteSize(data.size));
                        const ratio = ((1 - data.ratio) * 100).toFixed(2);
                        const ratioTips = colors_1.default.green(`压缩率：${ratio}%`);
                        console.log(`[tiny-webpack-plugin] ${successTips} ${originSize} -> ${compressedSize}（${ratioTips}）`);
                    }
                    totalOriginSize += data.originSize;
                    totalCompressedSize += data.size;
                    if (compilation.updateAsset) {
                        compilation.updateAsset(path, new webpack_1.RawSource(Buffer.alloc(data.file.length, data.file, 'binary'), false));
                    }
                    else {
                        compilation.assets[path] = new webpack_1.RawSource(Buffer.alloc(data.file.length, data.file, 'binary'), false);
                    }
                    if (++successCounter === total) {
                        if (log) {
                            const finishedTips = colors_1.default.green('所有图片全部压缩完成！');
                            const totalOriginSizeTips = colors_1.default.blue(index_1.byteSize(totalOriginSize));
                            const totalCompressedSizeTips = colors_1.default.blue(index_1.byteSize(totalCompressedSize));
                            const ratio = totalOriginSize === 0
                                ? '0'
                                : ((1 - (totalCompressedSize / totalOriginSize)) * 100).toFixed(2);
                            const totalRatioTips = colors_1.default.green(`压缩率：${ratio}%`);
                            console.log(`[tiny-webpack-plugin] ${finishedTips} ${totalOriginSizeTips} -> ${totalCompressedSizeTips}（${totalRatioTips}）`);
                        }
                        resolve();
                    }
                }, error => {
                    if (log) {
                        console.log(`[tiny-webpack-plugin] ${colors_1.default.red(`${path} 压缩失败！`)}`);
                    }
                    reject(error);
                });
            }
        });
    }
}
exports.TinyWebpackPlugin = TinyWebpackPlugin;
//# sourceMappingURL=index.js.map