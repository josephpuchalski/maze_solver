import Square from "./square.js";

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
    // Array.from($(".grid")).forEach((block, idx) => {
    //   if (block.children.length > 0) {
    //     if (block.children[0].id === "start") {
    //       chunk.push(new Square({start: true}));
    //       let location = [result.length, chunk.length - 1];
    //       this.start = location;
    //     } else {
    //       chunk.push(new Square({end: true}));
    //       let location = [result.length, chunk.length - 1];
    //       this.end = location;
    //     }
    //   } else if (block.className.includes("black")) {
    //     chunk.push(null);
    //   } else {
    //     chunk.push(new Square());
    //   }
    //
    //   if (chunk.length === processChunk) {
    //     result.push(chunk);
    //     chunk = [];
    //   }
    // });

    Array.from($(".grid")).forEach((block, idx) => {
      if (block.className.includes("green")) {
        chunk.push(new Square({start: true}));
        let location = [result.length, chunk.length - 1];
        this.start = location;
      } else if (block.className.includes("red")) {
        chunk.push(new Square({end: true}));
        let location = [result.length, chunk.length - 1];
        this.end = location;
      } else if (block.className.includes("black")) {
        chunk.push(null);
      } else {
        chunk.push(new Square());
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
    this.diagonal(pos, []);
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
      if ((newSquare instanceof Square) && this.openList.includes(JSON.stringify(location))) {
        if (parentSquare.g + 14 < newSquare.g) {
          newSquare.g = 14 + parentSquare.g;
          newSquare.parent = pos;
          newSquare.f = newSquare.g + newSquare.h;
        }
      } else if (newSquare instanceof Square && !this.closedList.includes(JSON.stringify(location))) {
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

      if ((newSquare instanceof Square) && this.openList.includes(JSON.stringify(location))) {

        if (parentSquare.g + 10 < newSquare.g) {
          newSquare.g = 10 + parentSquare.g;
          newSquare.parent = pos;
          newSquare.f = newSquare.g + newSquare.h;
        }
      } else if (newSquare instanceof Square && !this.closedList.includes(JSON.stringify(location))) {
        newSquare.parent = pos;
        newSquare.g = 10 + parentSquare.g;
        newSquare.h = this.calculateH(location, this.end);
        newSquare.f = newSquare.g + newSquare.h;
        this.openList.push(JSON.stringify(location));
      }
    });
    return ignorePos;
  }


  path(type) {
    let pathway = [];
    let parent = this.end;

    while (!pathway.includes(JSON.stringify(this.start))) {
      pathway.push(JSON.stringify(parent));
      parent = this.maze[parent[0]][parent[1]].parent;
    }

    if (type === "basic") {
      this.colorizeList(pathway, "blue", 25);
    } else {
      this.colorizeList(this.closedList, "purple", 0);
      this.colorizeList(this.openList, "yellow", 0);
      this.colorizeList(pathway, "blue", 25);
    }
  }

  sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  colorizeList(list, color, timer) {
    let toColorize = list.map(pos => { return JSON.parse(pos);});

    let divToColor = [];
    toColorize.forEach(arr => {
      let sum = arr[0] * input + arr[1];
      divToColor.push(sum);
    });
    let i = 0;
    if (color === "blue") {
      divToColor = divToColor.reverse();
    }
    divToColor.forEach(block => {
      if (color === "fill") {
        $(`#${block}`).addClass(color);
      } else {
      // let change = document.getElementById(`${block}`);
      this.sleep(i).then(() => {$(`#${block}`).addClass(color);});
      i += timer;
    }
    });
  }


  solve(type) {
    this.openList.push(JSON.stringify(this.start));
    this.calculateOpenAdjacentSquares(JSON.parse(this.openList[0]));
    this.closedList.push(this.openList.shift());
    while (!this.openList.includes(JSON.stringify(this.end))) {
      if (this.openList.length === 0) {
        this.colorizeList(this.closedList, "fill", 0);
        Array.from($(".grid")).forEach((block, idx) => {
          if (!block.className.includes("fill")) {
            $(`#${idx}`).addClass("black");
          }
        });
        $(".grid").removeClass("purple red green");
      }
      let nextMove = this.lowestFCost();
      let nextMoveIndex = this.openList.indexOf(JSON.stringify(nextMove));
      let removedPos = this.openList.splice(nextMoveIndex, 1);
      this.closedList.push(removedPos[0]);
      this.calculateOpenAdjacentSquares(nextMove);
    }

    console.log(this.openList.length);
    console.log(this.closedList.length);
    this.path(type);
  }

  setup() {

  }

  lowestFCost() {
    let position;
    let lowest = 1000000000000;
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

export default Maze;
