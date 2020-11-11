/*
 * @Author: Yang Lin
 * @Description: 图片压缩函数
 * @Date: 2020-11-03 19:49:34
 * @LastEditTime: 2020-11-11 15:25:50
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\src\compress.ts
 */
import {
    sources
} from 'webpack';
import https from 'https';
import http from 'http';
import httpUrl from 'url';
import {
    randomDomain
} from './utils/index';
import {
    responseData,
    errorData,
    compressData
} from './utils/response';

async function compress (
    file: sources.Source,
    retryTimes: number = 2
): Promise<any> {
    let failedTimes: number = 0;
    const upload = async function(): Promise<any>{
        try {
            return await uploadImg(file);
        } catch (error) {
            if(++failedTimes < retryTimes){ // 上传失败后尝试再次上传
                return await upload();
            }else{
                return Promise.reject(error);
            }
        }
    };
    
    try {
        const {
            output: {
                size,
                type,
                width,
                height,
                ratio,
                url: downloadUrl
            },
            input: {
                size: originSize,
                type: originType
            }
        } = await upload() as responseData;
        
        const fileData = await downloadImg(downloadUrl);
        return {
            size,
            type,
            width,
            height,
            ratio,
            originSize,
            originType,
            file: fileData
        } as compressData;
    } catch (error) { // 上传失败
        return Promise.reject(error);
    }
}

function downloadImg (url: string): Promise<any> {
    const options: httpUrl.URL = new httpUrl.URL(url);
    return new Promise ((resolve, reject) => {
        const req = https.request(options, (res: http.IncomingMessage) => {
            res.setEncoding('binary');
            let file = '';
            res.on('data', chunk => file += chunk);
            res.on('end', () => resolve(file));
        });
        req.on('error', (error: Error) => {
            reject(error);
        });
        req.end();
    });
}

/**
 * 图片上传压缩
 * @param file { Object } ; 被压缩的图片资源
 */
function uploadImg (
    file: sources.Source
): Promise<any> {
    const options: https.RequestOptions = {
        headers: {
            'Cache-Control': 'no-cache',
            "Content-Type": "application/x-www-form-urlencoded",
			"Postman-Token": Date.now(),
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
        },
        hostname: randomDomain(),
        method: 'POST',
        path: '/web/shrink',
        rejectUnauthorized: false
    };
    return new Promise((resolve, reject) => {
        const request = https.request(options, (res: http.IncomingMessage) => {
            res.on('data', data => {
                const response: responseData | errorData = JSON.parse(data.toString());
                if((<errorData>response).error){
                    reject(response as errorData);
                }else{
                    resolve(response as responseData);
                }
            });
        });
        request.write(file.source(), 'binary');
        request.on('error', (error: Error) => {
            reject(error as Error);
        });
        request.end();
    });
}

export default compress;