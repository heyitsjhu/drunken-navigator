var game = $game();
var board = $board();
var marquee = $marquee();
var timer = $timer();

var resetButton = document.querySelector("#resetButton");
var easyButton = document.querySelector("#easyButton");
var hardButton = document.querySelector("#hardButton");
var timerElement = document.querySelector("#timer");
    timerElement.innerHTML = timer.currentCount;

var data = {
        "ArrowUp": {},
        "ArrowRight": {},
        "ArrowDown": {},
        "ArrowLeft": {}
    };

// Initialization
game.new();

/**
 ** EVENT LISTENERS
 **/

// Add event listener to document
document.body.addEventListener("keydown", function(e){
    if (game.isNotOver()) {
        moveCharacter(e);
        if (board.getGridSize() === 10) remapControls();
        checkWinCondition();
    }
});

resetButton.addEventListener("click", game.new);

easyButton.addEventListener("click", function(){
    board.setGridSize(7);
    game.new();
    buttonSelected(this, hardButton);
});

hardButton.addEventListener("click", function(){
    board.setGridSize(10);
    game.new();
    buttonSelected(this, easyButton);
});


/**
 ** FUNCTIONS
 **/

// Highlights active difficulty button.
function buttonSelected(buttonOn, buttonOff) {
    if (!buttonOn.classList.contains("button--selected")) {
        buttonOn.classList.toggle("button--selected");
        if (buttonOff.classList.contains("button--selected")) buttonOff.classList = "";
    }
}

function moveCharacter(e) {
    // Find current position
    var currentPosition = document.querySelector(".current-position");

    // If key pressed is valid, move to next position
    for (var validKey in data) {
        if (e.key === validKey && currentPosition.getAttribute(data[validKey].edge) === "false") {
            moveToNextPosition(currentPosition, validKey).classList.add("current-position");

            if (!timer.isRunning()) timer.start();

            // Remove class from old position.
            currentPosition.classList.remove("current-position");
        }
    }
}

// Move to next position on board based on current position
function moveToNextPosition(current, keypressed) {
    return document.getElementById(Number(current.id) + data[keypressed].move);
}

function checkWinCondition() {
    // Check if new position is at the goal
    var currentPosition = document.querySelector(".current-position");
    if (currentPosition.classList.contains("target-goal")) {
        game.hasEnded();
        marquee.setMessage("Congratulations! You made it!");
        resetButton.textContent = "Play again?";
    }
}

// Initiate countdown timer
setInterval(function() {
    if (game.isNotOver() && timer.isRunning()) {
        timerElement.innerHTML = timer.currentCount();

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

// Remap arrow keys every 3/4 second
function remapControls() {setInterval(mapControls(), 750);}