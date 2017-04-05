var game = $game();
var board = $board();
var marquee = $marquee();
var clock = $clock();

var resetButton = document.querySelector("#resetButton");
var easyButton = document.querySelector("#easyButton");
var hardButton = document.querySelector("#hardButton");
var marqueeXButton = document.querySelector("#marqueeX");
var timerElement = document.querySelector("#timer");
    timerElement.innerHTML = clock.currentCount();

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
    if (game.isNotOver) {
        // Find current position
        var currentPosition = document.querySelector(".current-position");
        
        // If key pressed is valid, move to next position
        for (var validKey in data) {
            if (e.key === validKey && currentPosition.getAttribute(data[validKey].edge) === "false") {
                moveToNextPosition(currentPosition, validKey).classList.add("current-position");
                
                if (clock.isNotRunning()) clock.start();
                    
                // Remove class from old position.
                currentPosition.classList.remove("current-position");
            }
        }
        
        remapControls();
        
        // Check if new position is at the goal
        currentPosition = document.querySelector(".current-position");
        if (currentPosition.classList.contains("target-goal")) {
            game.hasEnded();
            marquee.setMessage("Congratulations! You made it!");
            resetButton.textContent = "Play again?";
        } 
    }
});
    
resetButton.addEventListener("click", newGame);

easyButton.addEventListener("click", function(){
    board.setGridSize(7); 
    newGame();
    buttonSelected(this, hardButton);
});

hardButton.addEventListener("click", function(){
    board.setGridSize(10); 
    newGame();
    buttonSelected(this, easyButton);
});

function buttonSelected(buttonOn, buttonOff) {
    if (!buttonOn.classList.contains("button--selected")) {
        buttonOn.classList.toggle("button--selected");
        if (buttonOff.classList.contains("button--selected")) buttonOff.classList = "";   
    }
}

marqueeXButton.addEventListener("click", function() {
    marquee.setDisplay("none");
});

/**
 ** FUNCTIONS
 **/

function newGame(){
    // Reset the text inside the button
    if (resetButton.textContent !== "Restart") resetButton.textContent = "Restart";
    board.discard();
    game.reset();
    clock.stop();
    clock.resetTimer();
    timerElement.innerHTML = clock.currentCount();
    marquee.setMessage("");  
    board.create();
    board.setup();
    board.generateStartingPositions();
    mapControls();
    marquee.setDisplay("none");
}

// Move to next position on board based on current position
function moveToNextPosition(current, keypressed) {
    return document.getElementById(Number(current.id) + data[keypressed].move);    
}

// Initiate countdown timer
setInterval(function() {
    if (game.isNotOver() && clock.isRunning()) {
        timerElement.innerHTML = clock.currentCount();    
        
        // Game ends if timer reaches zero
        if (timerElement.innerHTML == 0) {
            game.hasEnded();
            marquee.setMessage("Sorry! You didn't make it in time.");
            resetButton.textContent = "Play again?";
        }
    }
}, 1000);

// Map arrow keys to a random direction
function mapControls() {

    var controlData = [ 
        { edge: "top-edge", move: -board.getGridSize()}, 
        { edge: "right-edge", move: 1},
        { edge: "bottom-edge", move: board.getGridSize()},
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
    if (board.getGridSize() === 10) setInterval(mapControls(), 500);
}