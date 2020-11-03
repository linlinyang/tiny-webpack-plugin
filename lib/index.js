"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validateOptions = require('schema-utils');
const schema_1 = __importDefault(require("./schema"));
const defaultOptions = {
    log: false,
    enable: true
};
const id = 'TinyWebpackPlugin';
class TinyWebpackPlugin {
    constructor(opt) {
        this.opt = Object.assign(defaultOptions, opt);
        validateOptions(schema_1.default, this.opt, {
            name: id
        });
    }
    apply(compiler) {
        compiler.hooks.emit.tap(id, (compilation) => {
            console.log('Executed right before emitting assets to output dir');
        });
    }
}
exports.default = TinyWebpackPlugin;
//# sourceMappingURL=index.js.map