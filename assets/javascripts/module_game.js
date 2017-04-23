// Game module keeps track of the game's status.
var $game = function() {
    var gameOver = false;

    return {
        isNotOver: function() {
            return gameOver === false ? true : false;
        },

        // Sets gameOver to true if the game ends.
        hasEnded: function() {gameOver = true;},

        // Sets gameOver variable back to false.
        reset: function() {gameOver = false;},

        new: function() {
            // Reset the text inside the button
            if (resetButton.textContent !== "Restart") resetButton.textContent = "Restart";
            board.remove();
            game.reset();
            timer.stopAndReset();
            timerElement.innerHTML = timer.currentCount();
            marquee.setMessage("");
            board.create();
            mapControls();
        }
    };
};
