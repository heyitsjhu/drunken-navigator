// FUNCTIONS.JS

/**
    The following functions are used to either add functionality or manipulate elements on the page that are NOT-specific to the game.
 */

var cardContainer = document.querySelector(".card__container");
var listItemsPopUpText = [
    document.querySelector(".instructions__text"),
    document.querySelector(".about-chip__text"),
    document.querySelector(".about-the-house__text")
]

// When the page loads, an initial greeting or display card is shown.
// This removes the card when the user clicks anywhere on the page.
cardContainer.addEventListener("click", function() {
    this.remove();
});

// Removes display card when the user clicks on the button within the card.
function removeCard() {
    cardContainer.remove();
}

/**
    EVENT LISTENERS
 */

// When window width is equal to or less than 800px, calculates the distance
// needed to offset item from bottom of page and applies it to the item's
// CSS 'top' property.
listItemsPopUpText.forEach(function(item) {
    var footerHeight = document.querySelector(".footer").clientHeight;
    item.addEventListener("mouseenter", function() {
        if(window.innerWidth < 801) {
            this.style.top = -(this.clientHeight + (footerHeight * 0.75)) + "px";
        }
    });
});

// When window width is greater than 800px, checks and changes item's 'top'
// CSS property to '0px'.
window.addEventListener("resize", function() {
    if(window.innerWidth > 800) {
        listItemsPopUpText.forEach(function(item) {
            if(item.style.top !== "0px") {
                item.style.top = 0;
            }
        });
    }
});