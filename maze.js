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
    const processChunk = parseInt(window.input);
    let result = [];
    let chunk= [];
    Array.from($(".grid")).forEach((block, idx) => {
      if (block.children.length > 0) {
        if (block.children[0].id === "start") {
          chunk.push(new Square({start: true}));
          let location = [result.length, chunk.length - 1];
          this.start = location;
        } else {
          chunk.push(new Square({end: true}));
          let location = [result.length, chunk.length - 1];
          this.end = location;
        }
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
        if (piece instanceof Square) {
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


    orthogonal.forEach(location => {
      console.log(location);
      if (Math.min(...location) < 0 || Math.max(...location) > input - 1) {
        return;
      }

      if ((this.maze[location[0]][location[1]] instanceof Square) && this.openList.includes(JSON.stringify(location))) {

        if (this.maze[pos[0]][pos[1]].g + 10 < this.maze[location[0]][location[1]].g) {
          this.maze[location[0]][location[1]].g = 10 + this.maze[pos[0]][pos[1]].g;
          this.maze[location[0]][location[1]].parent = pos;
          this.maze[location[0]][location[1]].f = this.maze[location[0]][location[1]].g + this.maze[location[0]][location[1]].h;
        }
      } else if (this.maze[location[0]][location[1]] instanceof Square && !this.closedList.includes(JSON.stringify(location))) {

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

    let formatPath = pathway.map(pos => { return JSON.parse(pos);});
    console.log(pathway);
    let divToChange = [];
    formatPath.forEach(arr => {
      let sum = parseInt(`${arr[0]}${arr[1]}`);
      divToChange.push(sum);
    });
    console.log(divToChange);
    divToChange.forEach(block => {
      $(`#${block}`).addClass("blue");
    });
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

    return position;
  }

  calculateH(currentPos, endPoint) {
    return (Math.abs(currentPos[0] - endPoint[0]) + Math.abs(currentPos[currentPos.length - 1] - endPoint[endPoint.length - 1])) * 10;
  }

}

export default Maze;
