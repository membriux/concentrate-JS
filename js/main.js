
// ––––– BoardSquare object + logic –––––
class BoardSquare {

    constructor(element, color) {
        this.element = element;

        this.element.addEventListener("click", this, false);

        this.isFaceUp = false;
        this.isMatched = false;
        this.setColor(color);
    }

    // Function to set color
    setColor(color) {
        // Access DOM element of faceup
        const faceUpElement = this.element.getElementsByClassName('faceup')[0];

        faceUpElement.classList.remove(this.color);
        // set BoardSquare object with new color class
        this.color = color;
        // Add CSS color class
        faceUpElement.classList.add(color);
    }

    handleEvent(event) {
        switch (event.type) {
            case "click":
                // If already face up or matched
                if (this.isFaceUp || this.isMatched) {

                    return;
                }
                // Flip the square otherwise
                this.isFaceUp = true;
                this.element.classList.add('flipped');

                // Logic to handle flipping.
                squareFlipped(this);
        }
    }

    reset() {
        this.isFaceUp = false;
        this.isMatched = false;
        this.element.classList.remove('flipped');
    }

    matchFound() {
        this.isFaceUp = true;
        this.isMatched = true;
    }

}


function generateBoardSquares() {
    const squares = 16;
    let squaresHTML = '';

    // Generate HTML board squares
    for (let i=0; i < squares; i++) {
        squaresHTML +=
            '<div class="col-3 board-square">\n' +
            '<div class="face-container">\n' +
            '<div class="facedown"></div>\n' +
            '<div class="faceup"></div>\n' +
            '</div>\n' +
            '</div>\n';
    }
    // Insert squaresHTML
    const boardElement = document.getElementById('gameboard');
    boardElement.innerHTML = squaresHTML;
}


// ––––– Generate random color pairs and squares –––––
const colorPairs = [];

function generateColorPairs() {
    if (colorPairs.length > 0) {
        return colorPairs;
    } else {
        // generates matching pair for each color
        for (let i = 0; i < 8; i++) {
            colorPairs.push('color-' + i);
            colorPairs.push('color-' + i);
        }

        return colorPairs;
    }
}

function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there are elements to be shuffled...
    while (0 != currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffleColors() {
    const colorPairs = generateColorPairs();
    return shuffle(colorPairs);
}


// ––––– Generate game –––––
const boardSquares = [];

function setupGame() {
    generateBoardSquares();

    const randomColorPairs = shuffleColors();
    // Get square element objects
    const squareElements = document.getElementsByClassName("board-square");

    // Create respective board object
    for (let i = 0; i < squareElements.length; i++) {
        const element = squareElements[i];
        const color = randomColorPairs[i];
        // Create new board square object using the element and color
        const square = new BoardSquare(element, color);

        // Add new square to boardSquares array
        boardSquares.push(square)


    }

}

setupGame();



// ––––– Game logic –––––
let firstFaceupSquare = null;

function squareFlipped(square) {

    if (firstFaceupSquare === null) {
        firstFaceupSquare = square;
        return
    }

    if (firstFaceupSquare.color === square.color) {
        firstFaceupSquare.matchFound();
        square.matchFound();

        firstFaceupSquare = null;
    } else {
        const a = firstFaceupSquare;
        const b = square;

        firstFaceupSquare = null;

        setTimeout(function() {
            a.reset();
            b.reset();
        }, 400);

    }
}


// ––––– Reset game –––––

// Create Reference to reset button
const resetButton = document.getElementById("reset-button");

// Add event listener for clicks
resetButton.addEventListener("click", () => {
    resetGame();
})

function resetGame() {

    // Reset the first square
    firstFaceupSquare = null;

    // Reset each square
    boardSquares.forEach((square) => {
        square.reset()
    });

    // Delay the animation to NOT interrupt the flipping
    setTimeout(() => {
        // Shuffle and randomize new color pairs
        const randomColorPairs = shuffleColors();

        // Set each new squares with new colors
        for (let i = 0; i < boardSquares.length; i++) {
            const newColor = randomColorPairs[i];
            const square = boardSquares[i];

            square.setColor(newColor);
        }
    }, 500);

}













//
