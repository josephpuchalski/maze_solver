# Joey P's Path Finder

## Background
Joey P's Path Finder utilizes the A* algorithm to solve a maze problem on the fly. A user will be able to create a maze grid on the website and then have it immediately solved. The algorithm will do its magic and solve whatever the user has created with the shortest path possible.

## Functionality & MVP

With this Path Finder, users will be able to do the following:
 - Create a custom maze based on their own grid selection
 - Grid will be fixed to a square so it is not too big for the screen
 - There will be limitations on grid amount to avoid lag issues from overloading the browser
 - Users will be able to click solve and see the shortest path from Start to End from the base they created
 - Enable code to be able to extend to other apps by utilizing the pathfinding process. This can be used for AI to find targets on a specific grid-type board.

## Wireframes

The app will be a single screen which will have various buttons to perform the many actions that they can do. The UI is still tentative but will include the following buttons:
- Create Custom Grid (Advanced) including input for Grid Size (the grid still maintain overall shape of container)
- Utilize two standard grid sizes (10 x 10, 20 x 20) for ease of use and demonstration
- Preload a variety of seed mazes for quick generation and solving
- Solve button to execute algorithm (Shortest Path)
- Visual Solve button (Show the solving process and Shortest Path)

  (IMAGE COMING SOON)

## Architecture and Technologies
  This project will implement the following technologies:
  - JavaScript
  - jQuery

## Implementation Timeline

### Day 1
Setup files and organize project. Write out a complete overview of files needed and classes to be utilized. Spend time getting acquainted with the A* algorithm and the Manhattan method.

### Day 2
Utilize previous days knowledge to write the bulk of code and apply the various algorithms. This will involve how to properly account to edge cases in the maze solving process. Also, create groundwork for user interaction on website by allowing them to generate their own grids in JavaScript.

### Day 3
Refactor code and break down long functions with helper functions. Polish UI with CSS3 to make it smooth and streamlined. Also, look for performance enhancements on time to solve larger mazes.

## Bonus Features

TBD
