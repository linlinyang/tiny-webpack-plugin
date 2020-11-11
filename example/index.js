/*
 * @Author: Yang Lin
 * @Description: 简介
 * @Date: 2020-10-30 16:44:36
 * @LastEditTime: 2020-11-11 10:53:27
 * @FilePath: d:\demos\webpack\tiny-webpack-plugin\example\index.js
 */
import pic1 from './assets/pic1.jpg';
import pic2 from './assets/pic2.jpg';
import pic3 from './assets/pic3.jpg';
import pic4 from './assets/pic4.jpg';
import pic5 from './assets/pic5.svg';
import pic6 from './assets/pic6.png';
import pic7 from './assets/pic7.jpg';
import pic8 from './assets/pic8.jpg';
import pic9 from './assets/pic9.jpg';
import pic10 from './assets/pic10.jpg';
import pic11 from './assets/pic11.png';
import pic12 from './assets/pic12.jpg';
import pic13 from './assets/pic13.jpg';

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
    pic3,
    pic4,
    pic5,
    pic6,
    pic7,
    pic8,
    pic9,
    pic10,
    pic11,
    pic12,
    pic13
].forEach(src => loadImg(src));
