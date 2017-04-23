// Marquee module keeps track of the text content within the HTML marquee
// element and provides methods that allow the element's text and display
// settings to be changed.
var $marquee = function() {
    var marqueeContainer = document.querySelector(".marquee");
    var marqueeMessage = document.querySelector(".marquee__message");

    // Returns true if the marquee's text content is empty.
    function isEmpty() {return marqueeMessage.textContent === "";}

    // Show marquee element.
    function show() {marqueeContainer.style.display = "flex";}

    // Hide marquee element.
    function hide() {marqueeContainer.style.display = "none";}

    return {
        // Set marquee text content. Displays or hides marquee accordingly.
        setMessage: function(message) {
            marqueeMessage.textContent = message;
            isEmpty() ? hide() : show();
        }
    };
};