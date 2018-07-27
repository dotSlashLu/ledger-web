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

"use strict";


var _util = __webpack_require__(1);

__webpack_require__(2);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// document.ready                                  
function ready(callback) {
    // in case the document is already rendered    
    if (document.readyState != 'loading') callback();
    // modern browsers                             
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
        // IE <= 8
        else document.attachEvent('onreadystatechange', function () {
                if (document.readyState == 'complete') callback();
            });
}

exports.ready = ready;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _util = __webpack_require__(1);

var $form, $price, $cost, $count;

function calcTotal(e) {
	$cost.value = $price.value * $count.value;
}

(0, _util.ready)(function () {
	console.log("bind total");
	$form = document.querySelector("#main-add form");
	$price = $form.querySelector("input[name=price]");
	$count = $form.querySelector("input[name=count]");
	$cost = $form.querySelector("input[name=cost]");

	$price.onchange = calcTotal;
	$count.onchange = calcTotal;
});

exports.default = function () {};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDhmZjEwMjJkZmFhMjE2MDEzNTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9hZGQvaW5kZXguanMiXSwibmFtZXMiOlsicmVhZHkiLCJjYWxsYmFjayIsImRvY3VtZW50IiwicmVhZHlTdGF0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsIiRmb3JtIiwiJHByaWNlIiwiJGNvc3QiLCIkY291bnQiLCJjYWxjVG90YWwiLCJlIiwidmFsdWUiLCJjb25zb2xlIiwibG9nIiwicXVlcnlTZWxlY3RvciIsIm9uY2hhbmdlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7QUM3REE7O0FBQ0EsdUI7Ozs7Ozs7Ozs7OztBQ0RBO0FBQ0EsU0FBU0EsS0FBVCxDQUFlQyxRQUFmLEVBQXlCO0FBQ3JCO0FBQ0EsUUFBSUMsU0FBU0MsVUFBVCxJQUFxQixTQUF6QixFQUFvQ0Y7QUFDcEM7QUFEQSxTQUVFLElBQUlDLFNBQVNFLGdCQUFiLEVBQ0pGLFNBQVNFLGdCQUFULENBQTBCLGtCQUExQixFQUE4Q0gsUUFBOUM7QUFDRTtBQUZFLGFBR0dDLFNBQVNHLFdBQVQsQ0FBcUIsb0JBQXJCLEVBQTJDLFlBQVU7QUFDdEQsb0JBQUlILFNBQVNDLFVBQVQsSUFBcUIsVUFBekIsRUFBcUNGO0FBQ3hDLGFBRkk7QUFHUjs7UUFFUUQsSyxHQUFBQSxLOzs7Ozs7Ozs7Ozs7O0FDYlQ7O0FBRUEsSUFBSU0sS0FBSixFQUFXQyxNQUFYLEVBQW1CQyxLQUFuQixFQUEwQkMsTUFBMUI7O0FBRUEsU0FBU0MsU0FBVCxDQUFtQkMsQ0FBbkIsRUFBc0I7QUFDckJILE9BQU1JLEtBQU4sR0FBY0wsT0FBT0ssS0FBUCxHQUFlSCxPQUFPRyxLQUFwQztBQUNBOztBQUVELGlCQUFNLFlBQU07QUFDWEMsU0FBUUMsR0FBUixDQUFZLFlBQVo7QUFDQVIsU0FBUUosU0FBU2EsYUFBVCxDQUF1QixnQkFBdkIsQ0FBUjtBQUNBUixVQUFTRCxNQUFNUyxhQUFOLENBQW9CLG1CQUFwQixDQUFUO0FBQ0FOLFVBQVNILE1BQU1TLGFBQU4sQ0FBb0IsbUJBQXBCLENBQVQ7QUFDQVAsU0FBUUYsTUFBTVMsYUFBTixDQUFvQixrQkFBcEIsQ0FBUjs7QUFFQVIsUUFBT1MsUUFBUCxHQUFrQk4sU0FBbEI7QUFDQUQsUUFBT08sUUFBUCxHQUFrQk4sU0FBbEI7QUFDQSxDQVREOztrQkFXZSxZQUFNLENBRXBCLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZDhmZjEwMjJkZmFhMjE2MDEzNTgiLCJpbXBvcnQgeyByZWFkeSB9IGZyb20gXCIuL3V0aWxzL3V0aWxcIlxuaW1wb3J0IFwiLi9hZGRcIlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwiLy8gZG9jdW1lbnQucmVhZHkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG5mdW5jdGlvbiByZWFkeShjYWxsYmFjaykgeyAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAvLyBpbiBjYXNlIHRoZSBkb2N1bWVudCBpcyBhbHJlYWR5IHJlbmRlcmVkICAgIFxuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlIT0nbG9hZGluZycpIGNhbGxiYWNrKCk7XG4gICAgLy8gbW9kZXJuIGJyb3dzZXJzICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcblx0ZWxzZSBpZiAoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikgXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGNhbGxiYWNrKTtcbiAgICAvLyBJRSA8PSA4XG4gICAgZWxzZSBkb2N1bWVudC5hdHRhY2hFdmVudCgnb25yZWFkeXN0YXRlY2hhbmdlJywgZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGU9PSdjb21wbGV0ZScpIGNhbGxiYWNrKCk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCB7IHJlYWR5IH1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvdXRpbC5qcyIsImltcG9ydCB7IHJlYWR5IH0gZnJvbSBcIi4uL3V0aWxzL3V0aWxcIlxuXG52YXIgJGZvcm0sICRwcmljZSwgJGNvc3QsICRjb3VudFxuXG5mdW5jdGlvbiBjYWxjVG90YWwoZSkge1xuXHQkY29zdC52YWx1ZSA9ICRwcmljZS52YWx1ZSAqICRjb3VudC52YWx1ZVxufVxuXG5yZWFkeSgoKSA9PiB7XG5cdGNvbnNvbGUubG9nKFwiYmluZCB0b3RhbFwiKVxuXHQkZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbi1hZGQgZm9ybVwiKVxuXHQkcHJpY2UgPSAkZm9ybS5xdWVyeVNlbGVjdG9yKFwiaW5wdXRbbmFtZT1wcmljZV1cIilcblx0JGNvdW50ID0gJGZvcm0ucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9Y291bnRdXCIpXG5cdCRjb3N0ID0gJGZvcm0ucXVlcnlTZWxlY3RvcihcImlucHV0W25hbWU9Y29zdF1cIilcblxuXHQkcHJpY2Uub25jaGFuZ2UgPSBjYWxjVG90YWxcblx0JGNvdW50Lm9uY2hhbmdlID0gY2FsY1RvdGFsXG59KVxuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG5cbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvYWRkL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==