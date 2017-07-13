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

    for (var i = 0; i < gridCount; i++){
        $("#container").append(`<div class='grid gridImage' id=${i}></div>`);
    }

    $(".grid").height(gheight + "px").width(gwidth + "px");
    $("#start").height(gheight + "px").width(gwidth + "px");
    $("#end").height(gheight + "px").width(gwidth + "px");

    $(".grid").on("click", function() {
      $(this).toggleClass("black");
    });

    var gridBlock = null;

      $('.gridImage').on('mouseover', function(e) {
          gridBlock = $(e.currentTarget);
      });

      $('.gridImage').on('mouseout', function(e) {
          gridBlock = null;
      });

      $(document).keypress(function(e) {
          if ((e.which == 98 || e.which == 66) && gridBlock) {
              $(`#${gridBlock.attr('id')}`).toggleClass("black");
          } else if ((e.which == 115 || e.which == 83) && gridBlock && !gridBlock.attr("class").includes("black")) {
            $(`#${window.green}`).removeClass("green");
            $(`#${gridBlock.attr('id')}`).addClass("green");
            window.green = gridBlock.attr('id');
          } else if ((e.which == 101 || e.which == 69) && gridBlock && !gridBlock.attr("class").includes("black")) {
            $(`#${window.red}`).removeClass("red");
            $(`#${gridBlock.attr('id')}`).addClass("red");
            window.red = gridBlock.attr('id');
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
  });

  $(".visualsolve").on("click", function() {
    let maze = new Maze();
    maze.processMaze();
    maze.solve("visual");
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
});
