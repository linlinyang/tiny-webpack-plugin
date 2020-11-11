/*
 * @Author: Yang Lin
 * @Description: 工具方法
 * @Date: 2020-11-03 20:17:50
 * @LastEditTime: 2020-11-11 15:17:49
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\src\utils\index.ts
 */
const DOMAINS = [
    'tinyjpg.com',
	'tinypng.com'
];

const id: string = 'TinyWebpackPlugin';

const IMGEXP: RegExp = /\.(jpe?g|png)/;

function randomDomain(): string{
    return DOMAINS[(Math.random() * 2) | 0];
}

function byteSize(byte: number): string {
    if(byte === 0){
        return '0 B';
    }
    const symbols: string[] = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let index: number = Math.floor(Math.log(byte) / Math.log(1024));

    return `${(byte / Math.pow(1024, index)).toFixed(2)}${symbols[index]}`;
}

export {
    byteSize,
    randomDomain,
    id,
    IMGEXP
};