"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_utils_1 = require("schema-utils");
const schema_1 = __importDefault(require("./schema"));
const defaultOptions = {
    log: false,
    enable: true
};
const id = 'TinyWebpackPlugin';
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
        compiler.hooks.emit.tap(id, (compilation) => {
            console.log('some codes');
        });
    }
}
exports.default = TinyWebpackPlugin;
//# sourceMappingURL=index.js.map