/*
 * @Author: Yang Lin
 * @Description: webpack 兼容性属性
 * @Date: 2020-11-06 17:07:44
 * @LastEditTime: 2020-11-11 15:59:47
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\src\utils\webpack.ts
 */

import {
    Compiler,
    Compilation,
    version,
    sources
} from 'webpack';
import {
    RawSource as originRawSource
} from 'webpack-sources';

interface CompilerAdap extends Compiler {
    plugin?: (
        eventHook: string,
        syncHook?: (
            compilation: Compilation,
            callback: () => void
        ) => void
    ) => void
}

function getWebpackVersion (tag: number = 4): string {
    const versionArr = version.split('.');
    if (tag & 4) {
        return versionArr[0];
    } else if (tag & 2) {
        return versionArr[2];
    } else if (tag & 1) {
        return version[3];
    } else {
        return version;
    }
}

const RawSource = sources?.RawSource || originRawSource;

export {
    CompilerAdap as Compiler,
    getWebpackVersion,
    RawSource
};