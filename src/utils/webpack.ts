/*
 * @Author: Yang Lin
 * @Description: webpack 兼容性属性
 * @Date: 2020-11-06 17:07:44
 * @LastEditTime: 2020-11-09 13:41:18
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\src\utils\webpack.ts
 */
import {
    Compiler,
    Compilation,
    version
} from 'webpack';

interface CompilerAdap extends Compiler {
    plugin?: (
        eventHook: string,
        syncHook?: (
            compilation: Compilation,
            callback: () => void
        ) => void
    ) => void
}

function getWebpackVersion(tag: number = 4): string{
    const versionArr = version.split('.');
    if(tag & 4){
        return versionArr[0];
    } else if (tag & 2) {
        return versionArr[2];
    } else if (tag & 1) {
        return version[3];
    } else {
        return version;
    }
}

export {
    CompilerAdap as Compiler,
    getWebpackVersion
};