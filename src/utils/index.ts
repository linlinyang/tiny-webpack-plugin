/*
 * @Author: Yang Lin
 * @Description: 工具方法
 * @Date: 2020-11-03 20:17:50
 * @LastEditTime: 2020-11-04 15:16:57
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\src\utils\index.ts
 */
import https from 'https';
import {
    OutgoingHttpHeaders
} from 'http';

const DOMAINS = [
    'tinyjpg.com',
	'tinypng.com'
];

function genRandomIp(): string{
    const ret: number[] = [];
    let len: number = 4;

    while(len--){
        ret.push((Math.random() * 256) | 0);
    }

    return ret.join('.');
}

function randomHeader(): https.RequestOptions{
    const ip: string = genRandomIp();
    const domain: string = DOMAINS[(Math.random() * 2) | 0];
    return {
        headers: {
            'Cache-Control': 'no-cache',
            "Content-Type": "application/x-www-form-urlencoded",
			"Postman-Token": Date.now(),
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
			"X-Forwarded-For": ip
        } as OutgoingHttpHeaders,
        hostname: domain,
        method: 'POST',
        path: '/web/shrink',
        rejectUnauthorized: false
    };
}

export {
    randomHeader
};