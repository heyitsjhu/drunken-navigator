// MODULE_TIMER.JS

/**
    The timer module keeps track of the game's countdown timer. Use its methods to check or modify the state of the timer.
 */
var $timer = function() {
    var isRunning = false;
    var currentCount = 10;

    return {
        // Returns true if clock is running.
        isRunning: function() { return isRunning === true; },

        // Set to true to indicate the timer is running.
        start: function() { isRunning = true; },

        // Set to false to indicate the timer is running.
        stop: function() { isRunning = false; },

        // Counts down by one second.
        currentCount: function() { return currentCount--; },

        // Resets the current count to 10.
        reset: function() { currentCount = 10; },

        stopAndReset: function() {
            this.stop();
            this.reset();
        }
    };
};