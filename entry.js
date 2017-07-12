import Maze from "./maze.js";
import Square from "./square.js";

document.addEventListener('DOMContentLoaded', () => {

  function newGrid(gridSize) {
    var container = $("#container");

    var cheight = container.height();
    var cwidth = container.width();

    var input = gridSize || prompt("What grid size do you want? (Max: 150)");
    while (input > 150) {
      alert("Sorry, the max grid size is 150. Please choose a lower number.");
      input = prompt("What grid size do you want?");
    }
    var gheight = cheight / input;
    var gwidth = cwidth / input;

    window.input = input;

    var gridCount = input * input;

    // $(".start-end").append('<div id="start" draggable="true" ondragstart="drag(event)"></div>');
    // $(".start-end").append('<div id="end" draggable="true" ondragstart="drag(event)"></div>');

    for (var i = 0; i < gridCount; i++){
        $("#container").append(`<div class='grid fakeImage' id=${i}></div>`);
    }

    $(".grid").height(gheight + "px").width(gwidth + "px");
    $("#start").height(gheight + "px").width(gwidth + "px");
    $("#end").height(gheight + "px").width(gwidth + "px");

    $(".grid").on("click", function() {
      $(this).toggleClass("black");
    });

    var image = null;

      $('.fakeImage').on('mouseover', function(e) {
          image = $(e.currentTarget);
      });

      $('.fakeImage').on('mouseout', function(e) {
          image = null;
      });

      $(document).keypress(function(e) {
          if ((e.which == 98 || e.which == 66) && image) {
              $(`#${image.attr('id')}`).toggleClass("black");
          } else if ((e.which == 115 || e.which == 83) && image && !image.attr("class").includes("black")) {
            $(`#${window.green}`).removeClass("green");
            $(`#${image.attr('id')}`).addClass("green");
            window.green = image.attr('id');
          } else if ((e.which == 101 || e.which == 69) && image && !image.attr("class").includes("black")) {
            $(`#${window.red}`).removeClass("red");
            $(`#${image.attr('id')}`).addClass("red");
            window.red = image.attr('id');
            let maze = new Maze();
            maze.processMaze();
            maze.solve("visual");
          }
      });
  }

  $(".create-grid").on("click", function() {
    let gridSize = $("#size").val();
    $("#size").val("");
    $(".grid").remove();
    newGrid(gridSize);
  });

  $(".solve").on("click", function() {
    let maze = new Maze();
    maze.processMaze();
    maze.solve("basic");
    console.log(maze);
  });

  $(".visualsolve").on("click", function() {
    let maze = new Maze();
    maze.processMaze();
    maze.solve("visual");
    console.log(maze);
  });

  $(".clear").on("click", function() {
    $(".grid").removeClass("blue purple yellow black red green");
  });


  $(".fillgrid").on("click", function() {
    $(".grid").removeClass("blue purple yellow black red green fill");
    const n =  Number(input);
    Array.from($(".grid")).forEach((block, idx) => {
      if ((Math.floor(Math.random() * 10 < 5) || idx === 1 || idx === n || idx === n + 1) && idx !== 0 && idx !== (n * n / 2 + n / 2)) {
        $(`#${idx}`).addClass("black");
      } else if (idx === 0) {
        $(`#${idx}`).addClass("red");
      } else if (idx === (n * n / 2 + n / 2)) {
        $(`#${idx}`).addClass("green");
      }
    });
    let maze = new Maze();
    maze.processMaze();
    maze.solve("fill");


  });

//   $(".fillclosedpaths").on("click", function() {
//     Array.from($(".grid")).forEach((block, idx) => {
//     if (!block.className.includes("purple")) {
//       $(`#${idx}`).addClass("black");
//     }
//   });
//   $(".grid").removeClass("purple red green");
// });









});
