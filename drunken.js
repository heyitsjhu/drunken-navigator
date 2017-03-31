var data = {
    "ArrowUp": { edge: "top-edge" },
    "ArrowRight": { edge: "right-edge" },
    "ArrowDown": { edge: "bottom-edge" },
    "ArrowLeft": { edge: "left-edge" }
};
var resetButton = document.querySelector("#resetButton");
var easyButton = document.querySelector("#easyButton");
var hardButton = document.querySelector("#hardButton");
var difficulty = "hard";
var gameOver = false;

// Initialization
var gridSize;

init();


/**
 ** EVENT LISTENERS
 **/

// Add event listener to document
document.body.addEventListener("keydown", function(e){
    if(gameOver === false){
        // Find current position
        var currentPosition = document.querySelector(".current-position");
        
        // If key pressed is valid, move to next position
        for(var validKey in data){
            if(e.key === validKey && currentPosition.getAttribute(data[validKey].edge) === "false"){
                moveToNextPosition(currentPosition, validKey).classList.add("current-position");
                
                // Remove class from old position
                currentPosition.classList.remove("current-position");
            }
        }
        
        
        // Check if new position is at the goal
        currentPosition = document.querySelector(".current-position");
        if(currentPosition.classList.contains("end")){
            gameOver = true;
            var marqueeMessage = document.querySelector(".marquee__message");
            
            marqueeMessage.textContent = "Congratulations! You made it!";
            resetButton.textContent = "Play again?";
        }
    }
});
    
resetButton.addEventListener("click", function(){
    // Reset the text inside the button
    if(this.textContent !== "Restart") this.textContent = "Restart";
    
    // Restart the game, if necessary
    if(gameOver !== false) gameOver = false;
    
    // Reset message in marquee
    var marqueeMessage = document.querySelector(".marquee__message");
    if(marqueeMessage.textContent !== "") marqueeMessage.textContent = "";        
    
    // Remove and recreate board
    document.querySelector("#board").remove();
    init();
});

hardButton.addEventListener("click", function(){
    difficulty = "hard";
    // Remove and recreate board
    document.querySelector("#board").remove();
    init();
});

easyButton.addEventListener("click", function(){
    difficulty = "easy";
    // Remove and recreate board
    document.querySelector("#board").remove();    
    init();
});

/**
 ** FUNCTIONS
 **/

function init(){
    createBoard();
    setupBoard();
    pickStartAndEnd();
}

function createBoard(){
    var newBoard = document.createElement("div");
    newBoard.id = "board";
    var container = document.querySelector("#drunken-script");
    document.body.insertBefore(newBoard, container);
}

function setupBoard(){
    var board = document.querySelector("#board");
    var count = 1;
    
    if(difficulty === "easy"){
        var boardSize = 25;
    } else if(difficulty === "hard"){
        var boardSize = 100;
    }
    gridSize = Math.sqrt(boardSize);    
    
    for(var x = 1; x <= gridSize; x++){
        for(var y = 1; y <= gridSize; y++){
            var squareSize = 500 / gridSize;
            var newSquare = document.createElement("div");
            newSquare.className = "square row" + x + " col" + y;
            newSquare.id = count;
            newSquare.style.width = squareSize + "px";
            newSquare.style.height = squareSize + "px";
            
            // Assign HTML data attributes identifying whether a square is at the edge of the board.
            x === 1 ? newSquare.setAttribute("top-edge", true) : newSquare.setAttribute("top-edge", false);
            // True if square is on left edge of board.
            y === 1 ? newSquare.setAttribute("left-edge", true) : newSquare.setAttribute("left-edge", false);
            // True if square is on bottom edge of board.
            x === gridSize ? newSquare.setAttribute("bottom-edge", true) : newSquare.setAttribute("bottom-edge", false);
            // True if square is on right edge of board.
            y === gridSize ? newSquare.setAttribute("right-edge", true) : newSquare.setAttribute("right-edge", false);
            
            board.append(newSquare);
            count++;
        }
    }
}

function pickStartAndEnd() {
    // Select random start and end squares.
    // Start square
    var startPosition = Math.floor(Math.random() * 5 + 1);
    document.getElementById(startPosition).classList.add("start", "current-position");
    
    // End square
    var endPosition = Math.floor(Math.random() * 5 + 1) + 20;
    console.log(endPosition);
    document.getElementById(endPosition).classList.add("end");
}

// Move to next position on board based on current position
function moveToNextPosition(current, keypressed){
    if(keypressed === "ArrowUp"){
        return document.getElementById(Number(current.id) - gridSize);    
    } else if(keypressed === "ArrowDown"){
        return document.getElementById(Number(current.id) + gridSize);    
    } else if(keypressed === "ArrowLeft"){
        return document.getElementById(Number(current.id) - 1);    
    } else {
        return document.getElementById(Number(current.id) + 1);    
    }
}