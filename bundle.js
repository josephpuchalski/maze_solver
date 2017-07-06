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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__square_js__ = __webpack_require__(1);


class Maze {

  constructor() {
    this.maze = [];
    this.open_list = [];
    this.closed_list = [];
    this.start = null;
    this.end = null;
  }

  preProcess() {

  }

  processMaze() {
    const processChunk = parseInt(window.input);
    let result = [];
    let chunk= [];
    Array.from($(".grid")).forEach((block, idx) => {
      if (block.children.length > 0) {
        if (block.children[0].id === "start") {
          chunk.push(new __WEBPACK_IMPORTED_MODULE_0__square_js__["a" /* default */]({start: true}));
          let location = [result.length, chunk.length - 1];
          this.start = location;
        } else {
          chunk.push(new __WEBPACK_IMPORTED_MODULE_0__square_js__["a" /* default */]({end: true}));
          let location = [result.length, chunk.length - 1];
          this.end = location;
        }
      } else if (block.className.includes("black")) {
        chunk.push(null);
      } else {
        chunk.push(new __WEBPACK_IMPORTED_MODULE_0__square_js__["a" /* default */]());
      }

      if (chunk.length === processChunk) {
        result.push(chunk);
        chunk = [];
      }
    });

    this.maze = result;

    // let block = 0;
    // let open = 0;
    // let start = 0;
    // let end = 0;
    //
    // for (var i = 0; i < this.maze.length; i++) {
    //   for (var j = 0; j < this.maze[i].length; j++) {
    //     switch (this.maze[i][j]) {
    //       case "block":
    //         block += 1;
    //         break;
    //       case "open":
    //         open += 1;
    //         break;
    //       case "start":
    //         start += 1;
    //         break;
    //       case "end":
    //         end += 1;
    //         break;
    //     }
    //   }
    // }
    // console.log(`There are ${block} blocks, ${open} open spaces, ${start} start and ${end} end`);
  }


  display() {

  }


  fill_squares() {

  }

}

/* harmony default export */ __webpack_exports__["a"] = (Maze);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Square {
  constructor(options = {}) {
    this.parent = options.parent;
    this.start = options.start;
    this.end = options.end;
    this.f = 0;
    this.g = 0;
    this.h = 0;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Square);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__maze_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__square_js__ = __webpack_require__(1);



document.addEventListener('DOMContentLoaded', () => {

  function newGrid() {
    var container = $("#container");

    var cheight = container.height();
    var cwidth = container.width();

    var input = prompt("How many grids do you want?");

    var gheight = cheight / input;
    var gwidth = cwidth / input;

    console.log(gheight);
    console.log(gwidth);

    window.input = input;

    var gridCount = input * input;

    $("body").append('<div id="start" draggable="true" ondragstart="drag(event)"></div>');
    $("body").append('<div id="end" draggable="true" ondragstart="drag(event)"></div>');

    for (var i = 0; i < gridCount; i++){
        $("#container").append(`<div class='grid' id=${i} ondrop="drop(event)" ondragover="allowDrop(event)"></div>`);
    }

    $(".grid").height(gheight + "px").width(gwidth + "px");
    $("#start").height(gheight + "px").width(gwidth + "px");
    $("#end").height(gheight + "px").width(gwidth + "px");

    $(".grid").on("click", function() {
      $(this).toggleClass("black");
    });
  }

  $(".create-grid").on("click", function() {
    $(".grid").remove();
    newGrid();
  });

  $(".solve").on("click", function() {
    let maze = new __WEBPACK_IMPORTED_MODULE_0__maze_js__["a" /* default */]();
    maze.processMaze();
    console.log(maze);
  });

var a = new __WEBPACK_IMPORTED_MODULE_1__square_js__["a" /* default */]({});
a.parent = "Joseph";
console.log(a);

























});


/***/ })
/******/ ]);