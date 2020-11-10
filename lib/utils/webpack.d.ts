import { Compiler, Compilation, sources } from 'webpack';
interface CompilerAdap extends Compiler {
    plugin?: (eventHook: string, syncHook?: (compilation: Compilation, callback: () => void) => void) => void;
}
declare function getWebpackVersion(tag?: number): string;
declare const RawSource: typeof sources.RawSource;
export { CompilerAdap as Compiler, getWebpackVersion, RawSource };
