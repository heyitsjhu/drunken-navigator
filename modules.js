// Game module keeps track of the game's status.
var $game = function() {
    var gameOver = false;
    
    return {
        isNotOver: function() {
            if(gameOver === false) return true;
            return false;
        },
        
        // Sets gameOver to true if the game ends.
        hasEnded: function() {
            gameOver = true;
        },
        
        // Sets gameOver variable back to false.
        reset: function() {
            gameOver = false;
        }
    };
};

var $board = function() {
    var anchor, count, currentBoard, newBoard;
    var gridSize = 7;
    
    return {
        // Creates new div#board HTML element and
        // inserts the element into the HTML document.
        create: function() {
            // Inserts new div#board into HTML body.
            newBoard = document.createElement("div");
            newBoard.id = "board";
            anchor = document.querySelector("#modules-script");
            document.body.insertBefore(newBoard, anchor);
        },
        
        // Setups the game baord by targeting the div#board
        // and running the generateSquares() method.
        setup: function() {
            currentBoard = document.querySelector("#board");
            count = 1;
            this.generateSquares();
        },
        
        // Removes the current board.
        discard: function() {
            currentBoard = document.querySelector("#board");
            if(currentBoard) currentBoard.remove();
        },
        
        // Generates the individual squares on the board.
        generateSquares: function() {
            var squareSize = 500 / gridSize;
            
            for (var x = 1; x <= gridSize; x++) {
                for (var y = 1; y <= gridSize; y++) {
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
        },
        
        // Generates a pair of random positions.
        // One for the starting position (the drunk).
        // The other for the ending position (the home).
        generateStartingPositions: function() {
            var noOfSquares = Math.pow(gridSize, 2);
            
            while(start === end) {
                var start = Math.floor(Math.random() * (noOfSquares - 1) + 1);
                var end = Math.floor(Math.random() * (noOfSquares - 1) + 1);
            }
            
            document.getElementById(start).classList.add("current-position");
            document.getElementById(end).classList.add("target-goal");
        },
        
        // Sets the grid size count.
        setGridSize: function(size) {
            gridSize = size;
        },
        
        // Returns current grid size.
        getGridSize: function() {
            return gridSize;
        }
    };
};

// Timer module that contains the state
// of the countdown timer and provides
// methods that change the timer's state.
var $clock = function() {
    var isRunning = false;
    var currentCount = 10;
    
    return {
        // Sets to true to indicate
        // the timer is running.
        start: function() {
            isRunning = true;
        },
        
        // Sets to false to indicate
        // the timer is running.
        stop: function() {
            isRunning = false;
        },
        
        // Returns true if clock is running.
        isRunning: function() {
            return isRunning === true;
        },
        
        // Returns true if clock is NOT running.
        isNotRunning: function() {
            return isRunning === false;
        },
        
        // Counts down by one second.
        currentCount: function() {
            return currentCount--;
        },
        
        // Resets the current count to 10.
        resetTimer: function() {
            currentCount = 10;
        }
    };
};

// Marquee module keeps track of the
// text content within the HTML marquee
// element and provides methods that allow
// the element's text and display settings 
// to be changed.
var $marquee = function() {
    var marqueeContainer = document.querySelector(".marquee");
    var marqueeMessage = document.querySelector(".marquee__message");
    
    return {
        // Set a new text value to the marquee.
        setMessage: function(message) {
            marqueeMessage.textContent = message;
            if (this.isNotBlank) this.setDisplay("flex");
        },
        
        // Returns true if the marquee's text content is NOT blank.
        isNotBlank: function() {
            return marqueeMessage.textContent !== "";
        },
        
        // Changes the marquee container's CSS display property.
        setDisplay: function(display) {
            marqueeContainer.style.display = display;
        }
    };
};