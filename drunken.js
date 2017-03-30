// Valid key strokes.
var validKeys = ["ArrowUp",
                 "ArrowRight",
                 "ArrowDown",
                 "ArrowLeft"
]

// Initialize board
var board = document.querySelector("#board");
var boardSize = 25;
var gridSize = Math.sqrt(boardSize);
var count = 1;

for(var y = 1; y <= gridSize; y++){
    for(var x = 1; x <= gridSize; x++){
        var newSquare = document.createElement("div");
        newSquare.className = "square row" + y + " col" + x;
        newSquare.id = "sq"+(count);
        board.append(newSquare);
        count++
    }
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