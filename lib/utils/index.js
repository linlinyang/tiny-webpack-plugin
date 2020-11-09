"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomHeader = void 0;
const DOMAINS = [
    'tinyjpg.com',
    'tinypng.com'
];
function genRandomIp() {
    const ret = [];
    let len = 4;
    while (len--) {
        ret.push((Math.random() * 256) | 0);
    }
    return ret.join('.');
}
function randomHeader() {
    const ip = genRandomIp();
    const domain = DOMAINS[(Math.random() * 2) | 0];
    return {
        headers: {
            'Cache-Control': 'no-cache',
            "Content-Type": "application/x-www-form-urlencoded",
            "Postman-Token": Date.now(),
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36",
            "X-Forwarded-For": ip
        },
        hostname: domain,
        method: 'POST',
        path: '/web/shrink',
        rejectUnauthorized: false
    };
}
exports.randomHeader = randomHeader;
//# sourceMappingURL=index.js.map