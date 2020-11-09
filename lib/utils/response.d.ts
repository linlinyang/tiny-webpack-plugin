export declare enum AllowTypes {
    jpeg = "image/jpg",
    jpg = "image/jpg",
    png = "image/png"
}
declare type Input = {
    size: number;
    type: AllowTypes;
};
declare type Output = {
    width: number;
    height: number;
    ratio: number;
    url: string;
} & Input;
export declare type responseData = {
    input: Input;
    output: Output;
};
export declare type errorData = {
    error: string;
    message: string;
};
export interface compressData extends Input {
    originType: AllowTypes;
    originSize: number;
    width: number;
    height: number;
    ratio: number;
    file: string;
}
export {};
