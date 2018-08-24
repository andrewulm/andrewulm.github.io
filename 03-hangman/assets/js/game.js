// Star Wars Hangman - Game Logic
// Author: Andrew Ulm
// Description:

// Global Variables
const maxGuesses = 10;              // Set the maximum number of guesses

var remainingGuesses = 0;           // __init: Set remaining guesses to 0
var characterIndex;                 // To be used in picking random character
var guessWord = [];                 // Array to store the random character
var guessLetters = [];              // Array to store the users guesses
var gameStarted = false;            // __init: Set game start to false
var gameFinished = false;           // __init: Set game finished to false
var totalWins = 0;                  // Track total number of wins

// Set the characters to guess from
var starWarsCharacters = [
    'LukeSkywalker',
    'DarthVader',
    'Yoda',
    'ObiwanKenobi',
    'HanSolo',
    'Chewbacca',
    'Leia',
    'BobaFett',
    'JarJarBinks',
    'KyloRen',
    'DarthMaul',
    'AnakinSkywalker',
    'CountDooku',
    'QuiGonJinn',
    'JabbaTheHut',
    'PadmeAmidala'
];

// Start and Restart the game
function startGame () {

    document.getElementById('_guessWord').innerHTML = '';

    remainingGuesses = maxGuesses;          // Set remaining guesses to total of Maximum guesses
    gameStarted = false;                    // Set to false for game reset

    characterIndex = Math.floor(Math.random() * (starWarsCharacters.length));       // Choose random character from list

    guessLetters = [];
    guessWord = [];

    // Loop through length of selected Character and output the appropriate number of boxes for guessing
    for ( i = 0; i < starWarsCharacters[characterIndex].length; i++) {

        guessWord.push('');      // Add each letter to the guessWord array

        var letterRow = document.getElementById('_guessWord');      // Find appropriate container in document
        var container = document.createElement('div');              // Create a new <div> inside that row
        var letter = document.createElement('h3');                  // Create a new <h3> inside that <div>
        container.className = 'hash';                               // Assign class="hash" to <div>
        letter.id = '_' + i;                                        // Assign id="_i" to <h3>

        letterRow.append(container);                                // Add the <div> on the page
        container.append(letter);                                   // Add the <h3> inside the <div> on the page

    }

    updateScreen();                                                 // Update values on screen

    // TEST: What word was picked?
    console.log(guessWord);

}

// Update/Refresh all on screen dynamic values
function updateScreen () {

    document.getElementById('_totalWins').innerText = totalWins;    // Update totalWins on the page

    for ( i = 0; i < guessWord.length; i++ ) {
        document.getElementById('_' + i).innerText = '';            // Set blank space inside of the <h3>

    }

    for ( i = 0; i < guessWord.length; i++ ) {
        document.getElementById('_' + i).innerText += guessWord[i];
    }

    document.getElementById('_messagePrompt').innerHTML = '';
    document.getElementById('_guessedLetters').innerText = guessLetters;
    document.getElementById('_guessesRemaining').innerText = remainingGuesses;

    if ( remainingGuesses <= 0 ) {
        document.getElementById('_messagePrompt').innerText = 'You lose';
        gameFinished = true;
    }

}

// Make guess based on user Keystroke
function makeGuess (letter) {

    if ( remainingGuesses > 0) {                                    // Check to verify there are guesses to be made

        if ( !gameStarted ) {                                       // Check to verify game has been started
            gameStarted = true;                                     // Start the game
        }

        if ( guessLetters.indexOf(letter) === -1 ) {                // Check to verify letter hasn't already been guessed
            guessLetters.push(letter);                              // Add letter to guessLetters array
            checkGuess(letter);                                     // Send letter to check to checkGuess() function
        }
    }

    updateScreen();
    victory();

}

// Check the guess vs the letters in Character to guess array
function checkGuess (letter) {

    var letters = [];                   // Empty array for storage of checked letters

    for ( i = 0; i < starWarsCharacters[characterIndex].length; i++) {
        if ( starWarsCharacters[characterIndex][i].toLowerCase() === letter ) {     // If the guessed letter matches
            letters.push(i);                                                   // Add letter to empty array
        }
    }

    if ( letters.length <= 0 ) {                                    // If the letter was not found
        remainingGuesses--;                                       // Lower the amount of guesses remaining
    } else
        for ( i = 0; i < letters.length; i++ ) {{
            guessWord[letters[i]] = letter;
        }
    }

}

function victory () {

    if ( guessWord.indexOf('') === -1 ) {
        document.getElementById('_messagePrompt').innerHTML =
            '<p><strong>You Win!</strong> Press any key to play again</p>';
        totalWins++;
        gameFinished = true;
    }

}

// Grab the user keystroke
document.onkeydown = function (event) {

    if ( gameFinished === true ) {                                    // Check to see if the game has been won
        startGame();                                                  // Start a new game
        gameFinished = false;                                         // Reset game status
    } else {
        if ( event.keyCode >= 65 && event.keyCode <= 99 ) {           // Check to verify keystroke is between a-z
            makeGuess(event.key.toLowerCase());                       // Send lowercase letter to makeGuess() function
        }
    }

};














