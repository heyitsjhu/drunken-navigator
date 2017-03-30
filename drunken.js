// Valid key strokes.
var validKeys = ["ArrowUp",
                 "ArrowRight",
                 "ArrowDown",
                 "ArrowLeft"
]

// Initialize board
var board = document.querySelector("#board");
var boardSize = 25;

for(var i = 0; i < boardSize; i++){
    var newSquare = document.createElement("div");
    newSquare.className = "square";
    newSquare.id = "sq"+(i+1);
    board.append(newSquare);
}

var testBox = document.querySelector("#sq4");
// Add event listener to document.
document.body.addEventListener("keydown", function(e){

    // Checks if key pressed is an arrow key.
    for(var i = 0; i < validKeys.length; i++){
        if(e.key === validKeys[i]){
            console.log(e);
            
            // Executes an action when an arrow key is pressed.
            testBox.classList.toggle("current-position");
            console.log(testBox);
        }
    }
})

randomizeStartAndEnd();

function randomizeStartAndEnd() {
    // Select random start and end squares.
    // Start square
    var startPosition = Math.floor(Math.random() * 5 + 1);
    document.querySelector("#sq" + startPosition).classList.add("start");
    
    // End square
    var endPosition = Math.floor(Math.random() * 5 + 1) + 20;
    console.log(endPosition);
    document.querySelector("#sq" + endPosition).classList.add("end");
}