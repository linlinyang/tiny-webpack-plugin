import { sources } from 'webpack';
declare function compress(file: sources.Source, retryTimes?: number): Promise<any>;
export default compress;
