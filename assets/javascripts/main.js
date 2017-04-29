// MAIN.JS

var game = $game();
var board = $board();
var marquee = $marquee();
var timer = $timer();

var cardButton = document.querySelector("#cardButton");
var resetButton = document.querySelector("#resetButton");
var easyButton = document.querySelector("#easyButton");
var hardButton = document.querySelector("#hardButton");
var timerElement = document.querySelector("#timer");
    timerElement.innerHTML = timer.currentCount;
var cardContainer = document.querySelector(".card__container");

// The data object contains properties used to check whether a key pressed
// matches the proper arrow keys (i.e., ArrowUp, ArrowDown, etc.). Each one
// of these properties contain an object, whose properties are assigned every
// time a new game starts. These properties dictate the actual direction the
// character will move when the corresponding key is pressed. The assignment is
// performed by the mapControls() function.
var data = {
        "ArrowUp": {},
        "ArrowRight": {},
        "ArrowDown": {},
        "ArrowLeft": {}
    };

// Initialization
game.new();

/**
    EVENT LISTENERS
 */

// Listens for when key is pressed. That event is then checked to see
// if the key was an arrow key (left, right, up, or down). The first
// if-statement prevents prevents the logic from running if the game is
// over.
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

// Removes the display card that appears on page load.
cardContainer.addEventListener("click", function() {
    this.remove();
});

/**
    FUNCTIONS
 */

// Highlights active difficulty button.
function buttonSelected(buttonOn, buttonOff) {
    if (!buttonOn.classList.contains("button--selected")) {
        buttonOn.classList.toggle("button--selected");
        if (buttonOff.classList.contains("button--selected"))
            buttonOff.classList = "";
    }
}

function moveCharacter(e) {
    // Find current position.
    var currentPosition = document.querySelector(".current-position");

    for (let validKey in data) {
        // Checks if the key pressed is valid && the current position isn't at
        // the edge of the board.
        if (e.key === validKey && currentPosition.getAttribute(data[validKey].edge) === "false") {
            moveToNextPosition(currentPosition, validKey).classList.add("current-position");

            // Starts the timer if it isn't already running.
            if (!timer.isRunning()) timer.start();

            // Remove class from old position.
            currentPosition.classList.remove("current-position");
        }
    }
}

// Move to next position on board based on current position.
function moveToNextPosition(current, keypressed) {
    return document.getElementById(Number(current.id) + data[keypressed].move);
}

// Check if current position is the same as the end (goal) position.
function checkWinCondition() {
    var currentPosition = document.querySelector(".current-position");
    if (currentPosition.classList.contains("target-goal")) {
        game.hasEnded();
        marquee.setMessage("Booyah! Chip made it home. Dogs are happy. You did it!");
        resetButton.textContent = "Play again?";
    }
}

// Initiate countdown timer (updates every second).
setInterval(function() {

    // Timer runs if the game isn't over and the clock should be running.
    if (game.isNotOver() && timer.isRunning()) {
        timerElement.innerHTML = timer.currentCount();

        // Game ends if the timer reaches zero.
        if (timerElement.innerHTML == 0) {
            game.hasEnded();
            marquee.setMessage("Ugh, Chip fell asleep! He won't budge. Oh well, he's on his own, now. Poor doggies.");
            resetButton.textContent = "Play again?";
        }
    }
}, 1000);

// Randomly maps the properties of controlData to the properties of the data
// variable. These properties dictate how the character moves when the user
// presses an arrow key. For example, the ArrowDown key might be mapped in such
// a way that, when pressed, the character moves left. This simulates the
// character's drunken state!
function mapControls() {

    var controlData = [
        { edge: "top-edge", move: -board.getGridSize() },
        { edge: "right-edge", move: 1 },
        { edge: "bottom-edge", move: board.getGridSize() },
        { edge: "left-edge", move: -1 }
    ];

    shuffle(controlData);

    for (let key in data) {
        data[key] = controlData.pop();
    }
}

function shuffle(collection) {
    for (let i = collection.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [collection[i - 1], collection[j]] = [collection[j], collection[i - 1]];
    }
}

// Remap arrow keys every 3/4 second
function remapControls() { setInterval(mapControls(), 750); }

// Remove the card that shows up on page load
function removeCard() {
    cardContainer.remove();
}
