import Square from "./square.js";

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

  }


  fill_squares() {

  }

}

export default Maze;
