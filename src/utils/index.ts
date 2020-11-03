/*
 * @Author: Yang Lin
 * @Description: 工具方法
 * @Date: 2020-11-03 20:17:50
 * @LastEditTime: 2020-11-03 20:30:22
 * @FilePath: f:\sourcecode\tiny-webpack-plugin\src\utils\index.ts
 */
import https from 'https';

const DOMAINS = [
    'tinyjpg.com',
	'tinypng.com'
];

function genRandomIp(){
    const ret: number[] = [];
    let len = 4;

    while(len--){
        ret.push((Math.random() * 256) | 0);
    }

    return ret.join('.');
}

function randomHeader(): https.RequestOptions{
    const ip: string = genRandomIp();
    const domain: string = DOMAINS[(Math.random() * 2) | 0];
    return {
        headers: {},
        hostname: domain,
        method: 'POST',
        path: '/web/shrink',
        rejectUnauthorized: false
    };
}

export {
    randomHeader
};