/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

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

const pic1 = __webpack_require__(1);

console.log(pic1);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

throw new Error("Module build failed: TypeError [ERR_INVALID_ARG_TYPE]: The \"from\" argument must be of type string. Received undefined\n    at validateString (internal/validators.js:121:11)\n    at Object.relative (path.js:437:5)\n    at Object.loader (D:\\demos\\webpack\\tiny-webpack-plugin\\node_modules\\file-loader\\dist\\index.js:78:72)\n    at Object.loader (D:\\demos\\webpack\\tiny-webpack-plugin\\node_modules\\url-loader\\dist\\index.js:127:19)");

/***/ })
/******/ ]);