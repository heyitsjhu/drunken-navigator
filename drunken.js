var resetButton = document.querySelector("#resetButton");
var easyButton = document.querySelector("#easyButton");
var hardButton = document.querySelector("#hardButton");
var marqueeX = document.querySelector("#marqueeX");
var timer = document.querySelector("#timer");
var timerStart = 10;
timer.innerHTML = timerStart;
var timerStarted = false;
var gameOver = false;
var gridCount = 7;
var data = {
        "ArrowUp": {},
        "ArrowRight": {},
        "ArrowDown": {},
        "ArrowLeft": {}
    };

// Initialization
newGame();

/**
 ** EVENT LISTENERS
 **/

// Add event listener to document
document.body.addEventListener("keydown", function(e){
    if (gameOver === false) {
        // Find current position
        var currentPosition = document.querySelector(".current-position");
        
        // If key pressed is valid, move to next position
        for (var validKey in data) {
            if (e.key === validKey && currentPosition.getAttribute(data[validKey].edge) === "false") {
                moveToNextPosition(currentPosition, validKey).classList.add("current-position");
                
                // Starts game timer
                if (timerStarted === false) timerStarted = true;
                
                // Remove class from old position
                currentPosition.classList.remove("current-position");
            }
        }
        
        remapControls();
        
        // Check if new position is at the goal
        currentPosition = document.querySelector(".current-position");
        if (currentPosition.classList.contains("target-goal")) {
            gameOver = true;
            setMarquee("Congratulations! You made it!");
            resetButton.textContent = "Play again?";
        } 
    }
});
    
resetButton.addEventListener("click", newGame);

easyButton.addEventListener("click", function(){
    gridCount = 7; 
    newGame();
    buttonSelected(this, hardButton);
});

function buttonSelected(buttonOn, buttonOff) {
    if (!buttonOn.classList.contains("button--selected")) {
        buttonOn.classList.toggle("button--selected");
        if (buttonOff.classList.contains("button--selected")) buttonOff.classList = "";   
    }
}

hardButton.addEventListener("click", function(){
    gridCount = 10; 
    newGame();
    buttonSelected(this, easyButton);
});

marqueeX.addEventListener("click", function() {
    marqueeDisplay("none");
});

/**
 ** FUNCTIONS
 **/

function newGame(){
    resetBoard();
    createEmptyBoard();
    setupBoard();
    generateStartAndEnd();
    mapControls();
    marqueeDisplay("none");
}


function createEmptyBoard(){
    var newBoard = document.createElement("div");
    newBoard.id = "board";
    var container = document.querySelector("#drunken-script");
    document.body.insertBefore(newBoard, container);
}

function setupBoard(){
    var board = document.querySelector("#board");
    var count = 1;
    var squareSize = 500 / gridCount;
    
    for (var x = 1; x <= gridCount; x++) {
        for (var y = 1; y <= gridCount; y++) {
            var newSquare = document.createElement("div");
            newSquare.className = "square row" + x + " col" + y;
            newSquare.id = count;
            newSquare.setAttribute("style", "width: " + squareSize + "px; height: " + squareSize + "px;");
            
            // Assign HTML data attributes identifying whether a square is at the edge of the board.
            x === 1 ? newSquare.setAttribute("top-edge", true) : newSquare.setAttribute("top-edge", false);
            // True if square is on left edge of board.
            y === 1 ? newSquare.setAttribute("left-edge", true) : newSquare.setAttribute("left-edge", false);
            // True if square is on bottom edge of board.
            x === gridCount ? newSquare.setAttribute("bottom-edge", true) : newSquare.setAttribute("bottom-edge", false);
            // True if square is on right edge of board.
            y === gridCount ? newSquare.setAttribute("right-edge", true) : newSquare.setAttribute("right-edge", false);
            
            board.append(newSquare);
            count++;
        }
    }
}

function resetBoard(){
    // Reset the text inside the button
    if (resetButton.textContent !== "Restart") resetButton.textContent = "Restart";
    if (gameOver !== false) gameOver = false;
    
    // Reset marquee
    setMarquee("");      
    
    // Remove and recreate board
    var board = document.querySelector("#board");
    if (board) board.remove();
    
    timerStarted = false;
    timerStart = 10;
    timer.innerHTML = timerStart;
}

function generateStartAndEnd() {
    var boardSize = Math.pow(gridCount, 2);
    
    while (start === end) {
        var start = assignRandom(1, boardSize);
        var end = assignRandom(1, boardSize);
    }
    
    // Randomly selects a startying square and goal
    document.getElementById(start).classList.add("current-position");
    document.getElementById(end).classList.add("target-goal");
}

function assignRandom(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

// Move to next position on board based on current position
function moveToNextPosition(current, keypressed) {
    return document.getElementById(Number(current.id) + data[keypressed].move);    
}

function setMarquee(string) {
    var marqueeMessage = document.querySelector(".marquee__message");
    marqueeMessage.textContent = string;
    
    if (marqueeMessage.textContent !== "") {
        marqueeDisplay("flex");
    }
}

function marqueeDisplay(type){
    var marquee = document.querySelector(".marquee");
    marquee.style.display = type;
}

// Initiate countdown timer
setInterval(function() {
    if (gameOver !== true && timerStarted === true) {
        timer.innerHTML = timerStart--;    
        
        // Game ends if timer reaches zero
        if (timer.innerHTML == 0) {
            gameOver = true;
            setMarquee("Sorry! You didn't make it in time.");
            resetButton.textContent = "Play again?";
        }
    }
}, 1000);

// Map arrow keys to a random direction
function mapControls() {

    var controlData = [ 
        { edge: "top-edge", move: -gridCount}, 
        { edge: "right-edge", move: 1},
        { edge: "bottom-edge", move: gridCount},
        { edge: "left-edge", move: -1}
    ];
    
    shuffle(controlData);
    
    for (var key in data) {
        data[key] = controlData.pop();
    }
}

function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
}

// Remap arrow keys every 1/2 second
function remapControls() {
    if (gridCount === 10) setInterval(mapControls(), 500);
}