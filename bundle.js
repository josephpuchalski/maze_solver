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
    this.openList = [];
    this.closedList = [];
    this.start = null;
    this.end = null;
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
    this.maze.forEach((section) => {
      section.forEach((piece) => {
        if (piece instanceof __WEBPACK_IMPORTED_MODULE_0__square_js__["a" /* default */]) {
          if (piece.start === true) {
            piece = "S";
          } else if (piece.end === true) {
            piece = "E";
          } else {
            piece = "O";
          }
        } else {
          piece = "#";
        }
        console.log(`${piece} `);
      });
      console.log("\n");
    });
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

    // let diagonal = [northwest(pos), southwest(pos), southeast(pos), northeast(pos)];
    let orthogonal = [this.north(pos), this.south(pos), this.west(pos), this.east(pos)];

    // let stringedOpenList = this.openList.map(pos => {
    //   pos = JSON.stringify(pos);
    //   return pos;
    // });
    //
    // let stringedClosedList = this.closedList.map(pos => {
    //   pos = JSON.stringify(pos);
    //   return pos;
    // });

    debugger;
    orthogonal.forEach(location => {
      if ((this.maze[location[0]][location[1]] instanceof __WEBPACK_IMPORTED_MODULE_0__square_js__["a" /* default */]) && this.openList.includes(JSON.stringify(location))) {

        if (this.maze[pos[0]][pos[1]].g + 10 < this.maze[location[0]][location[1]].g) {
          this.maze[location[0]][location[1]].g = 10 + this.maze[pos[0]][pos[1]].g;
          this.maze[location[0]][location[1]].parent = pos;
          this.maze[location[0]][location[1]].f = this.maze[location[0]][location[1]].g + this.maze[location[0]][location[1]].h;
        }
      } else if (this.maze[location[0]][location[1]] instanceof __WEBPACK_IMPORTED_MODULE_0__square_js__["a" /* default */] && !this.closedList.includes(JSON.stringify(location))) {
        this.maze[location[0]][location[1]].parent = pos;
        this.maze[location[0]][location[1]].g = 10 + this.maze[pos[0]][pos[1]].g;
        this.maze[location[0]][location[1]].h = this.calculateH(location, this.end);
        this.maze[location[0]][location[1]].f = this.maze[location[0]][location[1]].g + this.maze[location[0]][location[1]].h;
        this.openList.push(JSON.stringify(location));

      }
    });
  }

  path() {
    let pathway = [];
    let parent = this.end;

    // stringedPathway = pathway.map(pos => {
    //   pos = JSON.stringify(pos);
    //   return pos;
    // });

    while (!pathway.includes(JSON.stringify(this.start))) {
      pathway.push(JSON.stringify(parent));
      parent = this.maze[parent[0]][parent[1]].parent;
    }

    return pathway;
  }

  solve() {
    this.openList.push(JSON.stringify(this.start));
    this.calculateOpenAdjacentSquares(JSON.parse(this.openList[0]));
    this.closedList.push(this.openList.shift());

    // let stringedOpenList = this.openList.map(pos => {
    //   pos = JSON.stringify(pos);
    //   return pos;
    // });


    while (!this.openList.includes(JSON.stringify(this.end))) {
      let nextMove = this.lowestFCost();
      let nextMoveIndex = this.openList.indexOf(JSON.stringify(nextMove));
      let removedPos = this.openList.splice(nextMoveIndex, 1);
      this.closedList.push(removedPos[0]);
      this.calculateOpenAdjacentSquares(nextMove);
    }

    console.log(this.path());
  }

  lowestFCost() {
    let position;
    // let lowest = this.maze[this.openList[0][0]][this.openList[0][1]].f;
    let lowest = 1000000;
    this.openList.forEach(pos => {
      pos = JSON.parse(pos);
      if (this.maze[pos[0]][pos[1]].f < lowest) {
        lowest = this.maze[pos[0]][pos[1]].f;
        position = pos;
      }
    });
    debugger;
    return position;
  }

  calculateH(currentPos, endPoint) {
    return (Math.abs(currentPos[0] - endPoint[0]) + Math.abs(currentPos[currentPos.length - 1] - endPoint[endPoint.length - 1])) * 10;
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
    maze.solve();
    console.log(maze);
    // maze.display();



  });

var a = new __WEBPACK_IMPORTED_MODULE_1__square_js__["a" /* default */]({});
a.parent = "Joseph";
console.log(a);









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