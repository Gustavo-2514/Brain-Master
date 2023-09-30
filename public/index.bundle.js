/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ (() => {

eval("var initGameBtn = function initGameBtn() {\n  var inputName = document.querySelector('.inputName');\n  var select = document.querySelector('.select');\n  inputName.style.borderBottom = '1px solid black';\n  select.style.border = '1px solid black';\n  if (inputName.value === '') {\n    inputName.style.borderBottom = '1px solid red';\n    inputName.classList.add('error');\n  } else if (select.value === '') {\n    select.style.border = '1px solid red';\n  } else {\n    var values = {\n      playerName: inputName.value,\n      theme: select.value\n    };\n    localStorage.setItem('play', JSON.stringify(values));\n    window.location.href = 'game.html';\n  }\n};\nvar btnInit = document.querySelector('.initGameBtn');\nbtnInit.addEventListener('click', initGameBtn);\n\n//# sourceURL=webpack://master-brain/./src/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/index.js"]();
/******/ 	
/******/ })()
;