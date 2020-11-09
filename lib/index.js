"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TinyWebpackPlugin = void 0;
const schema_utils_1 = require("schema-utils");
const schema_1 = __importDefault(require("./schema"));
const webpack_1 = require("webpack");
const compress_1 = __importDefault(require("./compress"));
const webpack_sources_1 = require("webpack-sources");
const webpack_2 = require("./utils/webpack");
const defaultOptions = {
    log: false,
    enable: true
};
const id = 'TinyWebpackPlugin';
const IMGEXP = /\.(jpe?g|png)/;
const RawSource = (webpack_1.sources === null || webpack_1.sources === void 0 ? void 0 : webpack_1.sources.RawSource) || webpack_sources_1.RawSource;
class TinyWebpackPlugin {
    constructor(opt) {
        const options = Object.assign(defaultOptions, opt);
        schema_utils_1.validate(schema_1.default, options, {
            name: id,
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
            if (webpack_2.getWebpackVersion() === '4') { // webpack 4~5
                compiler.hooks.emit.tapAsync(id, (compilation, callback) => {
                    this.handleImg(compilation).then(() => {
                        callback();
                    }, error => {
                        compilation.errors.push(...error);
                    });
                });
            }
            else { // webpack >= 5
                compiler.hooks.compilation.tap(id, (compilation) => {
                    compilation.hooks.processAssets.tapPromise(id, () => this.handleImg(compilation).catch(error => {
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
        return __awaiter(this, void 0, void 0, function* () {
            let imgPaths;
            if (compilation.getAssets) { // webpack >= 5
                imgPaths = compilation.getAssets().reduce((acc, asset) => {
                    if (IMGEXP.test(asset.name)) {
                        acc.push(asset.name);
                    }
                    return acc;
                }, []);
            }
            else {
                imgPaths = Object.keys(compilation.assets).filter(name => IMGEXP.test(name));
            }
            const total = imgPaths.length;
            if (total === 0) {
                return Promise.resolve();
            }
            let errs = [];
            for (let i = 0; i < total; i++) {
                const path = imgPaths[i];
                const source = compilation.getAsset
                    ? compilation.getAsset(path).source
                    : compilation.assets[path];
                    
                if (!source) {
                    continue;
                }
                try {
                    const data = yield compress_1.default(source);
                    if (compilation.updateAsset) {
                        compilation.updateAsset(path, new RawSource(Buffer.alloc(data.file.length, data.file, 'binary'), false));
                    }
                    else {
                        compilation.assets[path] = new RawSource(Buffer.alloc(data.file.length, data.file, 'binary'), false);
                    }
                }
                catch (error) {
                    errs.push(error);
                }
            }
            if (errs.length > 0) {
                return Promise.reject(errs);
            }
        });
    }
}
exports.TinyWebpackPlugin = TinyWebpackPlugin;
//# sourceMappingURL=index.js.map