import Maze from "./maze.js";
import Square from "./square.js";

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
    let maze = new Maze();
    maze.processMaze();
    maze.solve();
    console.log(maze);



  });

  $(".clear").on("click", function() {
    $(".grid").removeClass("blue purple yellow");
  });









// test code to see how many areas are blocked(null)
// for (var i = 0; i < maze.maze.length; i++) {
//   for (var j = 0; j < maze.maze[i].length; j++) {
//     if (maze.maze[i][j] === null) {
//       console.log("empty");
//     }
//   }
// }















});
