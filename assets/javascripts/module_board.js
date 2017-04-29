// MODULE_BOARD.JS

/**
    The board module contains the logic necessary for creating the board itself, setting appropriate HTML attributes to individual squares on the board, and changing the board size based on difficulty. Its method is primarily used when starting a new game or selecting a new difficulty.
 */

var $board = function() {
    var count, currentBoard;
    var gridSize = 7;

    // Setup the game board by generating the board's individual squares
    // inside the the div#board element.
    function setupBoard() {
        currentBoard = document.querySelector("#board");
        count = 1;
        var squareSize = 500 / gridSize;

        for (let x = 1; x <= gridSize; x++) {
            for (let y = 1; y <= gridSize; y++) {
                var newSquare = document.createElement("div");
                newSquare.className = "square row" + x + " col" + y;
                newSquare.id = count;
                newSquare.setAttribute("style", "width: " + squareSize + "px; height: " + squareSize + "px;");

                // Assign HTML data attributes identifying whether a square is at the edge of the board.
                x === 1 ? newSquare.setAttribute("top-edge", true) : newSquare.setAttribute("top-edge", false);
                // True if square is on left edge of board.
                y === 1 ? newSquare.setAttribute("left-edge", true) : newSquare.setAttribute("left-edge", false);
                // True if square is on bottom edge of board.
                x === gridSize ? newSquare.setAttribute("bottom-edge", true) : newSquare.setAttribute("bottom-edge", false);
                // True if square is on right edge of board.
                y === gridSize ? newSquare.setAttribute("right-edge", true) : newSquare.setAttribute("right-edge", false);

                currentBoard.append(newSquare);
                count++;
            } // end for loop
        } // end for loop
    }

    // Generates a pair of random positions. One for the starting position
    // (the drunk). The other for the ending position (the home).
    function generateStartingPositions() {
        // Get total number of squares by squaring the gridSize.
        var noOfSquares = Math.pow(gridSize, 2);

        // Regenerate positions if the start and end positions are the same.
        while(start === end) {
            var start = Math.floor(Math.random() * (noOfSquares - 1) + 1);
            var end = Math.floor(Math.random() * (noOfSquares - 1) + 1);
        }

        // Add the appropriate class to start and end squares.
        document.getElementById(start).classList.add("current-position");
        document.getElementById(end).classList.add("target-goal");
    }

    return {
        // Creates new div#board HTML element and inserts it before the
        // 'anchor' element in the HTML document.
        create: function() {
            // Inserts new div#board into HTML body.
            var mainElement = document.querySelector("main");
            var newBoard = document.createElement("div");
            newBoard.id = "board";
            var anchor = document.querySelector(".board__controls");
            mainElement.insertBefore(newBoard, anchor);

            setupBoard();
            generateStartingPositions();
        },

        // Removes the current board.
        remove: function() {
            currentBoard = document.querySelector("#board");
            if(currentBoard)
                currentBoard.remove();
        },

        // Sets the grid size count.
        setGridSize: function(size) {gridSize = size;},

        // Returns current grid size.
        getGridSize: function() {return gridSize;}
    };
};