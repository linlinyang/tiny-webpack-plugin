/*
 * @Author: Yang Lin
 * @Description: http请求响应结果
 * @Date: 2020-11-04 10:51:14
 * @LastEditTime: 2020-11-04 17:07:25
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\src\utils\response.ts
 */

export enum AllowTypes {
    jpeg = 'image/jpg',
    jpg = 'image/jpg',
    png = 'image/png'
};

type Input = {
    size: number;
    type: AllowTypes
};

type Output = {
    width: number;
    height: number;
    ratio: number;
    url: string
} & Input;

export type responseData = {
    input: Input;
    output: Output
}

export type errorData = {
    error: string,
    message: string
}

export interface compressData extends Input {
    originType: AllowTypes;
    originSize: number;
    width: number;
    height: number;
    ratio: number;
    file: string;
};
