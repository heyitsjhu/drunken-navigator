// Valid key strokes.
var validKeys = [
    "ArrowUp",
    "ArrowRight",
    "ArrowDown",
    "ArrowLeft"
];

// Initialization
var resetButton = document.querySelector("#reset");
var gameOver = false;
var gridSize;

createBoard();
setupBoard();
pickStartAndEnd();

// Add event listener to document.
document.body.addEventListener("keydown", function(e){
        
    if(gameOver === false){
        // Find current position.
        var currentPosition = document.querySelector(".current-position");
        
        // Check if key pressed is an arrow key.
        for(var i = 0; i < validKeys.length; i++){
            if(e.key === validKeys[i]){
                console.log(e);
                
                // Find next location based on key stroke and apply proper class.
                // Check if currentPosition is at the edge of the board.
                if(e.key === "ArrowUp" && currentPosition.getAttribute("top-edge") === "false"){
                    // move up
                    var nextPosition = document.getElementById(Number(currentPosition.id) - gridSize);
                    nextPosition.classList.add("current-position");
                    
                    // Remove class from old position.
                    currentPosition.classList.remove("current-position");
                }
                
                if(e.key === "ArrowLeft" && currentPosition.getAttribute("left-edge") === "false"){
                    // move left
                    var nextPosition = document.getElementById(Number(currentPosition.id) - 1);
                    nextPosition.classList.add("current-position");
                    
                    // Remove class from old position.
                    currentPosition.classList.remove("current-position");
                }
                
                if(e.key === "ArrowDown" && currentPosition.getAttribute("bottom-edge") === "false"){
                    // move down
                    var nextPosition = document.getElementById(Number(currentPosition.id) + gridSize);
                    nextPosition.classList.add("current-position");
                    
                    // Remove class from old position.
                    currentPosition.classList.remove("current-position");
                }
                
                if(e.key === "ArrowRight" && currentPosition.getAttribute("right-edge") === "false"){
                    // move right
                    var nextPosition = document.getElementById(Number(currentPosition.id) + 1);
                    nextPosition.classList.add("current-position");
                    
                    // Remove class from old position.
                    currentPosition.classList.remove("current-position");
                }
            }
        }
        
        // Check if new position is at the goal.
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
    var marqueeMessage = document.querySelector(".marquee__message");
    marqueeMessage.textContent = "";
    this.textContent = "Restart";
    gameOver = false;
    redrawBoard();
});

function createBoard(){
    var newBoard = document.createElement("div");
    newBoard.id = "board";
    var container = document.querySelector("#drunken-script");
    document.body.insertBefore(newBoard, container);
}

function setupBoard(){
    var board = document.querySelector("#board");
    var boardSize = 25;
    gridSize = Math.sqrt(boardSize);
    var count = 1;
    
    for(var x = 1; x <= gridSize; x++){
        for(var y = 1; y <= gridSize; y++){
            var newSquare = document.createElement("div");
            newSquare.className = "square row" + x + " col" + y;
            newSquare.id = count;
            
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

function redrawBoard(){
    // Remove the current board
    document.querySelector("#board").remove();
    
    createBoard();
    setupBoard();
    pickStartAndEnd();
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