import Maze from "./maze.js";
import Square from "./square.js";

document.addEventListener('DOMContentLoaded', () => {

  function newGrid() {
    var container = $("#container");

    var cheight = container.height();
    var cwidth = container.width();

    var input = prompt("What grid size do you want? (Max: 50)");
    while (input > 200) {
      alert("Sorry, the max grid size is 50. Please choose a lower number.");
      input = prompt("What grid size do you want?");
    }
    var gheight = cheight / input;
    var gwidth = cwidth / input;

    console.log(gheight);
    console.log(gwidth);

    window.input = input;

    var gridCount = input * input;

    // $(".start-end").append('<div id="start" draggable="true" ondragstart="drag(event)"></div>');
    // $(".start-end").append('<div id="end" draggable="true" ondragstart="drag(event)"></div>');

    for (var i = 0; i < gridCount; i++){
        $("#container").append(`<div class='grid fakeImage' id=${i} ondrop="drop(event)" ondragover="allowDrop(event)"></div>`);
    }

    $(".grid").height(gheight + "px").width(gwidth + "px");
    $("#start").height(gheight + "px").width(gwidth + "px");
    $("#end").height(gheight + "px").width(gwidth + "px");

    $(".grid").on("click", function() {
      $(this).toggleClass("black");
    });

    var image = null;

      $('.fakeImage').on('mouseover', function(e) {
        console.log(e.currentTarget);
          image = $(e.currentTarget);
      });

      $('.fakeImage').on('mouseout', function(e) {
          image = null;
      });

      $(document).keypress(function(e) {

          if (e.which == 98 && image) {
              $(`#${image.attr('id')}`).toggleClass("black");
          } else if (e.which == 115 && image) {
            $(`#${image.attr('id')}`).append('<div id="start" draggable="true" ondragstart="drag(event)"></div>').toggleClass("green");
          } else if (e.which == 101 && image) {
            $(`#${image.attr('id')}`).append('<div id="end" draggable="true" ondragstart="drag(event)"></div>').toggleClass("red");
          }
      });
  }

  $(".create-grid").on("click", function() {
    $(".grid").remove();
    newGrid();
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
    $(".grid").removeClass("blue purple yellow black green red");
  });

  $(".fillgrid").on("click", function() {
    Array.from($(".grid")).forEach((block, idx) => {
      if (Math.floor(Math.random() * 10) < 5) {
        $(`#${idx}`).addClass("black");
      }
    });
  });











});
