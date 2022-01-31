/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Apple/index.js":
/*!***************************************!*\
  !*** ./src/components/Apple/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Apple\": () => (/* binding */ Apple)\n/* harmony export */ });\nconst Apple = ({width, height, size, ctx, color}) => {\n    let x = Math.floor(Math.random() * (width - size));\n    let y = Math.floor(Math.random() * (height - size));\n    let spawned = true;\n\n    let draw = () => {\n        ctx.fillStyle = color;\n        ctx.fillRect(x, y, size, size);\t\n    }\n\n    return { x, y, draw, spawned }\n}\n\n//# sourceURL=webpack://snake_game/./src/components/Apple/index.js?");

/***/ }),

/***/ "./src/components/Score/index.js":
/*!***************************************!*\
  !*** ./src/components/Score/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Score\": () => (/* binding */ Score)\n/* harmony export */ });\nconst Score = () => {\n    let element = document.createElement(\"div\");\n    let score = 0;\n\n    const getScore = () => score;\n    \n    const setScore = value => {\n        score = value;\n        element.innerHTML = score;\n    };\n\n    setScore(score);\n    return { element, getScore, setScore };\n};\n\n//# sourceURL=webpack://snake_game/./src/components/Score/index.js?");

/***/ }),

/***/ "./src/components/Snake/index.js":
/*!***************************************!*\
  !*** ./src/components/Snake/index.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Snake\": () => (/* binding */ Snake)\n/* harmony export */ });\nlet currentWay = \"right\";\nlet apple;\nlet parts = 5;\n\nconst appleEatSound = new Audio(\"./assets/sounds/apple_eat.wav\");\nconst gameOverSound = new Audio(\"./assets/sounds/game_over.wav\");\n\nconst validateWay = way => {\n    let isValid = false;\n    switch (way) {\n        case \"right\":\n            currentWay !== \"left\"? isValid = true : isValid = false;\n            break;\n        case \"down\":\n            currentWay !== \"up\"? isValid = true : isValid = false;\n            break;\n        case \"left\":\n            currentWay !== \"right\"? isValid = true : isValid = false;\n            break;\n        case \"up\":\n            currentWay !== \"down\"? isValid = true : isValid = false;\n            break;\n    }\n    return isValid;\n};\n\nconst increment = ({limit, step, body}) => {\n    if(limit >= body + step) {\n        return body + step;\n    } else {\n        return 0;\n    }\n};\n\nconst decrement = ({limit, step, body}) => {\n    if(body - step >= 0) {\n        return body - step;\n    } else {\n        return limit;\n    }\n};\n\nconst Snake = ({ width, height, size, ctx, color, onGrow, onDeath }) => {\n    let body = [\n        {\n            x: Math.floor(width / 2),\n            y: Math.floor(height / 2),\n        }\n    ];\n\n    const move = way => {\n        let head = body[body.length - 1];\n        let x = head.x;\n        let y = head.y;\n\n        way = validateWay(way)? way : currentWay;\n\n        switch (way) {\n            case \"right\":\n                x = increment({limit: width, step: size, body: x});\n                break;\n            case \"down\":\n                y = increment({limit: height, step: size, body: y});\n                break;\n            case \"left\":\n                x = decrement({limit: width, step: size, body: x});\n                break;\n            case \"up\":\n                y = decrement({limit: height, step: size, body: y});\n        }\n\n        if(body.find(part => part.x === x && part.y === y) !== undefined) { // body.reduce((acc, item) => {if(item.x === x && item.y === y) acc = true;}, false)\n            gameOverSound.play();\n            parts = 10;\n            if(onDeath) onDeath();\n            body = [\n                {\n                    x: Math.floor(width / 2),\n                    y: Math.floor(height / 2),\n                }\n            ]\n        } else {\n            currentWay = way;\n            body.push({x, y});\n            if(apple) {\n                if((-5 <= x - apple.x && x - apple.x <= 5) && (-5 <= y - apple.y && y - apple.y <= 5)) {\n                    grow();\n                    if(onGrow) onGrow();\n                    apple.spawned = false;\n                }\n            }\n            if(parts > 0) {\n                parts--;\n            } else {\n                body.splice(0, 1);\n            }\n        }\n    };\n\n    const grow = () => {\n        appleEatSound.play();\n        parts += 5;\n    };\n\n    const setWay = way => {\n        currentWay = validateWay(way)? way : currentWay;\n    }\n\n    const draw = () => {\n        body.forEach(part => {\n            ctx.fillStyle = color;\n            ctx.fillRect(part.x, part.y, size, size);\t\n        });\n    };\n\n    const setApple = value => apple = value;\n\n    return { body, move, grow, draw, setWay, setApple }\n}\n\n//# sourceURL=webpack://snake_game/./src/components/Snake/index.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Apple__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Apple */ \"./src/components/Apple/index.js\");\n/* harmony import */ var _components_Score__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Score */ \"./src/components/Score/index.js\");\n/* harmony import */ var _components_Snake__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Snake */ \"./src/components/Snake/index.js\");\n\n\n\n\nconst canvas = document.querySelector(\"canvas\");\nconst width = 600;\nconst height = 600;\nconst ctx = canvas.getContext(\"2d\");\nconst score = (0,_components_Score__WEBPACK_IMPORTED_MODULE_1__.Score)();\n\nconst snakeColor = \"green\";\nconst appleColor = \"red\";\nconst appleSize = 10;\nconst snakeSize = 10;\nconst fps = 20;\nlet coeficient = 1.1;\n\nlet snake;\nlet apple;\nlet loop;\n\nconst wayRules = {\n    \"ArrowDown\": \"down\",\n    \"ArrowLeft\": \"left\",\n    \"ArrowUp\": \"up\",\n    \"ArrowRight\": \"right\"\n};\n\ndocument.body.append(score.element);\n\ndocument.body.addEventListener(\"keydown\", event => {\n    if(wayRules[event.code]) {\n        snake.setWay(wayRules[event.code]);\n    }\n});\n\n\nconst clearCanvas = () => {\n    ctx.fillStyle = \"white\";\n    ctx.fillRect(0, 0, width, height);\n};\n\nconst game = () => {\n    clearCanvas();\n    if(!apple?.spawned) {\n        apple = (0,_components_Apple__WEBPACK_IMPORTED_MODULE_0__.Apple)({width, height, size: appleSize, color: appleColor, ctx});\n        snake.setApple(apple);\n    } else {\n        apple.draw();\n    }\n    snake.draw();\n    snake.move();\n};\n\nconst onGrow = () => {\n    score.setScore(score.getScore() + 1);\n    if(typeof loop != 'undefined') {\n        clearInterval(loop);\n        loop = setInterval(game, 1000 / (fps * coeficient));\n    }\n    coeficient += 0.1;\n};\n\nconst onDeath = () => {\n    score.setScore(0);\n};\n\nconst play = () => {\n    snake = (0,_components_Snake__WEBPACK_IMPORTED_MODULE_2__.Snake)({width, height, size: snakeSize, ctx, color: snakeColor, onGrow, onDeath});\n    snake.setWay('right');\n    ctx.beginPath();\n\n    if(typeof loop != 'undefined') {\n        clearInterval(loop);\n        loop = undefined;\n    }\n    else {\n        loop = setInterval(game, 1000 / fps);\n    }\n}\n\nconst playButton = document.createElement(\"button\");\nplayButton.innerText = \"Play\";\nplayButton.addEventListener(\"click\", play);\n\ndocument.body.append(playButton);\n\n// play();\n\n//# sourceURL=webpack://snake_game/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;