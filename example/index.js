/*
 * @Author: Yang Lin
 * @Description: 简介
 * @Date: 2020-10-30 16:44:36
 * @LastEditTime: 2020-11-03 15:17:19
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\src\index.js
 */
import homeSrc from './assets/home.jpg';
import loginSrc from './assets/login.jpg';

function loadImg(src){
    const img = new Image();
    img.onload = function(){
        document.body.appendChild(img);
    };
    img.src = src;
}

[homeSrc, loginSrc].forEach(src => loadImg(src));