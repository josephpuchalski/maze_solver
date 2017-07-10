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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__square_js__ = __webpack_require__(0);


class Maze {

  constructor() {
    this.maze = [];
    this.openList = [];
    this.closedList = [];
    this.start = null;
    this.end = null;
  }

  processMaze() {
    $(".grid").removeClass("blue purple yellow");
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
  }


  north(pos) {
    let x, y;
    [x, y] = pos;
    return [x - 1, y];
  }

  northeast(pos) {
    let x, y;
    [x, y] = pos;
    return [x - 1, y + 1];
  }

  northwest(pos) {
    let x, y;
    [x, y] = pos;
    return [x - 1, y - 1];
  }

  south(pos) {
    let x, y;
    [x, y] = pos;
    return [x + 1, y];
  }

  southeast(pos) {
    let x, y;
    [x, y] = pos;
    return [x + 1, y + 1];
  }

  southwest(pos) {
    let x, y;
    [x, y] = pos;
    return [x + 1, y - 1];
  }

  west(pos) {
    let x, y;
    [x, y] = pos;
    return [x, y - 1];
  }

  east(pos) {
    let x, y;
    [x, y] = pos;
    return [x, y + 1];
  }

  calculateOpenAdjacentSquares(pos) {
    let ignorePos = this.orthogonal(pos);
    this.diagonal(pos, ignorePos);
  }

  diagonal(pos, ignorePos) {
    let diagonal = [this.northwest(pos), this.southwest(pos), this.southeast(pos), this.northeast(pos)];

    diagonal.forEach(location => {
      if (Math.min(...location) < 0 || Math.max(...location) > input - 1) {
        return;
      } else if (ignorePos.includes(JSON.stringify(location))) {
        return;
      }

      let newSquare = this.maze[location[0]][location[1]];
      let parentSquare = this.maze[pos[0]][pos[1]];
      if ((newSquare instanceof __WEBPACK_IMPORTED_MODULE_0__square_js__["a" /* default */]) && this.openList.includes(JSON.stringify(location))) {
        if (parentSquare.g + 14 < newSquare.g) {
          newSquare.g = 14 + parentSquare.g;
          newSquare.parent = pos;
          newSquare.f = newSquare.g + newSquare.h;
        }
      } else if (newSquare instanceof __WEBPACK_IMPORTED_MODULE_0__square_js__["a" /* default */] && !this.closedList.includes(JSON.stringify(location))) {
        // if (newSquare.start !== true) {
          newSquare.parent = pos;
        // }
        newSquare.g = 14 + parentSquare.g;
        newSquare.h = this.calculateH(location, this.end);
        newSquare.f = newSquare.g + newSquare.h;
        this.openList.push(JSON.stringify(location));
      }
    });
  }

  orthogonal(pos) {
    let orthogonal = [this.north(pos), this.south(pos), this.west(pos), this.east(pos)];
    let ignorePos = [];
    orthogonal.forEach((location, idx) => {
      if (Math.min(...location) < 0 || Math.max(...location) > input - 1) {
        return;
      }
      let newSquare = this.maze[location[0]][location[1]];
      let parentSquare = this.maze[pos[0]][pos[1]];

      if (newSquare === null) {
        switch (idx) {
          case 0:
            ignorePos.push(JSON.stringify(this.northwest(pos)), JSON.stringify(this.northeast(pos)));
            break;
          case 1:
            ignorePos.push(JSON.stringify(this.southwest(pos)), JSON.stringify(this.southeast(pos)));
            break;
          case 2:
            ignorePos.push(JSON.stringify(this.northwest(pos)), JSON.stringify(this.southwest(pos)));
            break;
          case 3:
            ignorePos.push(JSON.stringify(this.northeast(pos)), JSON.stringify(this.southeast(pos)));
            break;
        }
      }

      if ((newSquare instanceof __WEBPACK_IMPORTED_MODULE_0__square_js__["a" /* default */]) && this.openList.includes(JSON.stringify(location))) {

        if (parentSquare.g + 10 < newSquare.g) {
          newSquare.g = 10 + parentSquare.g;
          newSquare.parent = pos;
          newSquare.f = newSquare.g + newSquare.h;
        }
      } else if (newSquare instanceof __WEBPACK_IMPORTED_MODULE_0__square_js__["a" /* default */] && !this.closedList.includes(JSON.stringify(location))) {
        newSquare.parent = pos;
        newSquare.g = 10 + parentSquare.g;
        newSquare.h = this.calculateH(location, this.end);
        newSquare.f = newSquare.g + newSquare.h;
        this.openList.push(JSON.stringify(location));
      }
    });
    return ignorePos;
  }


  path() {
    let pathway = [];
    let parent = this.end;

    while (!pathway.includes(JSON.stringify(this.start))) {
      pathway.push(JSON.stringify(parent));
      parent = this.maze[parent[0]][parent[1]].parent;
    }

    this.colorizeList(this.closedList, "purple");
    this.colorizeList(this.openList, "yellow");
    this.colorizeList(pathway, "blue");
  }

  colorizeList(list, color) {
    let toColorize = list.map(pos => { return JSON.parse(pos);});

    let divToColor = [];
    toColorize.forEach(arr => {
      let sum = arr[0] * input + arr[1];
      divToColor.push(sum);
    });

    divToColor.forEach(block => {
      $(`#${block}`).addClass(color);
    });
  }


  solve() {
    this.openList.push(JSON.stringify(this.start));
    this.calculateOpenAdjacentSquares(JSON.parse(this.openList[0]));
    this.closedList.push(this.openList.shift());

    while (!this.openList.includes(JSON.stringify(this.end))) {
      let nextMove = this.lowestFCost();
      let nextMoveIndex = this.openList.indexOf(JSON.stringify(nextMove));
      let removedPos = this.openList.splice(nextMoveIndex, 1);
      this.closedList.push(removedPos[0]);
      this.calculateOpenAdjacentSquares(nextMove);
    }

    console.log(this.openList);
    console.log(this.closedList);
    this.path();
  }

  setup() {

  }

  lowestFCost() {
    let position;
    let lowest = 1000000;
    this.openList.forEach(pos => {
      pos = JSON.parse(pos);
      if (this.maze[pos[0]][pos[1]].f < lowest) {
        lowest = this.maze[pos[0]][pos[1]].f;
        position = pos;
      }
    });

    return position;
  }

  calculateH(currentPos, endPoint) {
    return (Math.abs(currentPos[0] - endPoint[0]) + Math.abs(currentPos[currentPos.length - 1] - endPoint[endPoint.length - 1])) * 10;
  }


}

/* harmony default export */ __webpack_exports__["a"] = (Maze);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__maze_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__square_js__ = __webpack_require__(0);



document.addEventListener('DOMContentLoaded', () => {

  function newGrid() {
    var container = $("#container");

    var cheight = container.height();
    var cwidth = container.width();

    var input = prompt("What grid size do you want? (Max: 50)");
    while (input > 50) {
      prompt("Sorry, the max grid size is 50. Please choose a lower number.")
      input = prompt("What grid size do you want?")
    }
    var gheight = cheight / input;
    var gwidth = cwidth / input;

    console.log(gheight);
    console.log(gwidth);

    window.input = input;

    var gridCount = input * input;

    $(".start-end").append('<div id="start" draggable="true" ondragstart="drag(event)"></div>');
    $(".start-end").append('<div id="end" draggable="true" ondragstart="drag(event)"></div>');

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
    maze.solve();
    console.log(maze);



  });

  $(".clear").on("click", function() {
    $(".grid").removeClass("blue purple yellow");
  });


  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, 50, 50);






// test code to see how many areas are blocked(null)
// for (var i = 0; i < maze.maze.length; i++) {
//   for (var j = 0; j < maze.maze[i].length; j++) {
//     if (maze.maze[i][j] === null) {
//       console.log("empty");
//     }
//   }
// }















});


/***/ })
/******/ ]);