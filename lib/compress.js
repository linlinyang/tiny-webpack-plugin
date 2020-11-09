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
const https_1 = __importDefault(require("https"));
const url_1 = __importDefault(require("url"));
const index_1 = require("./utils/index");
function compress(file, retryTimes = 2) {
    return __awaiter(this, void 0, void 0, function* () {
        let failedTimes = 0;
        const upload = function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    return yield uploadImg(file);
                }
                catch (error) {
                    if (++failedTimes < retryTimes) { // 上传失败后尝试再次上传
                        return yield upload();
                    }
                    else {
                        return Promise.reject(error);
                    }
                }
            });
        };
        try {
            const { output: { size, type, width, height, ratio, url: downloadUrl }, input: { size: originSize, type: originType } } = yield upload();
            const fileData = yield downloadImg(downloadUrl);
            return {
                size,
                type,
                width,
                height,
                ratio,
                originSize,
                originType,
                file: fileData
            };
        }
        catch (error) { // 上传失败
            return Promise.reject(error);
        }
    });
}
function downloadImg(url) {
    const options = new url_1.default.URL(url);
    return new Promise((resolve, reject) => {
        const req = https_1.default.request(options, (res) => {
            res.setEncoding('binary');
            let file = '';
            res.on('data', chunk => file += chunk);
            res.on('end', () => resolve(file));
        });
        req.on('error', (error) => {
            reject(error);
        });
        req.end();
    });
}
/**
 * 图片上传压缩
 * @param file { Object } ; 被压缩的图片资源
 */
function uploadImg(file) {
    const options = index_1.randomHeader();
    return new Promise((resolve, reject) => {
        const request = https_1.default.request(options, (res) => {
            res.on('data', data => {
                const response = JSON.parse(data.toString());
                if (response.error) {
                    reject(response);
                }
                else {
                    resolve(response);
                }
            });
        });
        request.write(file.source(), 'binary');
        request.on('error', (error) => {
            reject(error);
        });
        request.end();
    });
}
exports.default = compress;
//# sourceMappingURL=compress.js.map