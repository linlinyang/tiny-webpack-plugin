import Options from './options';
import { Compilation } from 'webpack';
import { Compiler } from './utils/webpack';
declare class TinyWebpackPlugin {
    opt: Options;
    constructor(opt: Options);
    apply(compiler: Compiler): void;
    handleImg(compilation: Compilation): Promise<void>;
}
export { TinyWebpackPlugin, Options };
