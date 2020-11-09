import { Compiler, Compilation } from 'webpack';
interface CompilerAdap extends Compiler {
    plugin?: (eventHook: string, syncHook?: (compilation: Compilation, callback: () => void) => void) => void;
}
declare function getWebpackVersion(tag?: number): string;
export { CompilerAdap as Compiler, getWebpackVersion };
