// Hangman Game
// Author: Andrew Ulm

// Array of words used for the game
var wordList = [
    'dog',
    'cat',
    'bird'
    ];

// Setting global level variables
const guessesMax = 10;          // SET this number to raise or lower the difficulty
var guessesRemaining = 0;       // Guesses remaining before user loses

var guessingLetters = [];       // STORES guesses made by the user
var guessingWord = [];          // Word to match to the current word

var wordIndex;                  // Index of the current word
var gameStarted = false;        // Sentinel value for starting game
var gameFinished = false;       // Sentinel value for ending game
var totalWins = 0;              // Track the total number of wins

// Reset all values of the game before game start
function gameReset () {
    guessesRemaining = guessesMax;          // Reset the guesses remaining to equal guesses allowed
    gameStarted = false;                    // Reset game start to false

    wordIndex = Math.floor(Math.random() * (wordList.length));          // Set an index value to pull word from list

    for ( var i = 0; i < wordList[wordIndex].length; i++ ) {            // Generate hash marks for word to guess
        guessingWord.push('_');
    }

    document.getElementById('pressKeyTryAgain').style.cssText= "display:none";  // Hide until needed
    document.getElementById('gameover-image').style.cssText= "display:none";    // Hide until needed
    document.getElementById('youwin-image').style.cssText= "display:none";      // Hide until needed


    updateDisplay();
}

function updateDisplay() {

    document.getElementById('totalWins').innerText = totalWins;         // Display total wins
    document.getElementById('currentWord').innerText = '';              // ----------------------------------

    for ( var i = 0; i < guessingWord.length; i++ ) {
        document.getElementById('currentWord').innerText += guessingWord[i]         // Display hash marks
    }

    document.getElementById('remainingGuesses').innerText = guessesRemaining;       // Display guesses remaining
    document.getElementById('guessedLetters').innerText = guessingLetters;          // Display letters guessed

    if ( guessesRemaining <= 0 ) {
        document.getElementById('gameover-image').style.cssText = "display: block";
        document.getElementById('pressKeyTryAgain').style.cssText = "display: block";
        gameFinished = true;
    }
}

document.onkeydown = function(event) {
    if ( gameFinished ) {              // Check if game has finished, if so reset game
        gameReset();
        gameFinished = false;
    } else {            // Verify key a-z was pressed, then send to makeGuess
        if ( event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
};

function makeGuess (letter) {
    if ( guessesRemaining > 0 ) {
        if ( !gameStarted ) {           // Start the game
            gameStarted = true;
        }

        if ( guessingLetters.indexOf(letter) === -1 ) {         // Check to verify letter has not been used
            guessingLetters.push(letter);
            evaluateGuess(letter);
        }
    }

    updateDisplay();
    checkWin();
}

function evaluateGuess (letter) {
    var positions = [];

    for ( var i = 0; i < wordList[wordIndex].length; i++ ) {
        if ( wordList[wordIndex][i] === letter) {
            positions.push(i);
        }
    }

    if ( positions.length <= 0) {
        guessesRemaining--;
    } else {
        for ( var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
}

function checkWin () {
    if ( guessingWord.indexOf('_') === -1 ) {
        document.getElementById('youwin-image').style.cssText = "display: block";
        document.getElementById('pressKeyTryAgain').style.cssText = "display: block";
        totalWins++;
        gameFinished = true;
    }

}





