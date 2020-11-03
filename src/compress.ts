/*
 * @Author: Yang Lin
 * @Description: 图片压缩函数
 * @Date: 2020-11-03 19:49:34
 * @LastEditTime: 2020-11-03 20:52:52
 * @FilePath: f:\sourcecode\tiny-webpack-plugin\src\compress.ts
 */
import {
    sources
} from 'webpack';
import https from 'https';

function compress(
    assets: Record<string, sources.Source>,
    src: string,
    asyncCallback: (resolved: boolean) => void
): void{
    const file = assets[src];
    if(!file){ // 未匹配到对应的图片
        asyncCallback(false);
        return ;
    }

    
}

function uploadImg(
    file: sources.Source
){
    const options = ;
}

export default compress;