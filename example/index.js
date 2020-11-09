/*
 * @Author: Yang Lin
 * @Description: 简介
 * @Date: 2020-10-30 16:44:36
 * @LastEditTime: 2020-11-09 17:33:34
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\example\index.js
 */
/* import pic1 from './assets/pic1.png';
import pic2 from './assets/pic2.jpg';
//import pic3 from './assets/pic3.jpg';
import pic4 from './assets/pic4.jpg';
import pic5 from './assets/pic5.svg';
import pic6 from './assets/pic6.png';
//import pic7 from './assets/pic7.jpg';

function loadImg(src){
    const img = new Image();
    img.onload = function(){
        document.body.appendChild(img);
    };
    img.src = src;
}

[
    pic1,
    pic2,
    //pic3,
    pic4,
    pic5,
    pic6,
    //pic7
].forEach(src => loadImg(src)); */

const pic1 = require('./assets/pic1.png');

console.log(pic1);