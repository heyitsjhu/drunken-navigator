// Timer module that contains the state of the countdown timer and provides
// methods that change the timer's state.
var $timer = function() {
    var isRunning = false;
    var currentCount = 10;

    return {
        // Returns true if clock is running.
        isRunning: function() {return isRunning === true;},

        // Sets to true to indicate the timer is running.
        start: function() {isRunning = true;},

        // Sets to false to indicate the timer is running.
        stop: function() {isRunning = false;},

        // Counts down by one second.
        currentCount: function() {return currentCount--;},

        // Resets the current count to 10.
        reset: function() {currentCount = 10;},

        stopAndReset: function() {
            this.stop();
            this.reset();
        }
    };
};