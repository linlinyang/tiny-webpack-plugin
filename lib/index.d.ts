import Options from './options';
import { Compiler } from 'webpack';
declare class TinyWebpackPlugin {
    opt: Options;
    constructor(opt: Options);
    apply(compiler: Compiler): void;
}
export default TinyWebpackPlugin;
