// Trivia Game
// Author: Andrew Ulm

$(document).ready( function () {

    // const timer = 1000;

    var answer = '';
    var count = 0;
    var correct = 0;
    var incorrect = 0;
    var totalQuestions = 0;
    var timeLeft = 10;

    function getQuestion() {

        $('#_questions').empty();

        $.getJSON('assets/js/questions.json', function (data) {

            answer = data.list[count].answer;
            totalQuestions = data.list.length;

            var $question = $('<h3>').html(data.list[count].question);

            var $choices = $('<ul>').addClass('choices');

            $.each(data.list[count].choices, function (index) {
                $($choices).append(
                    '<li class="option">' + data.list[count].choices[index] + '</li>'
                );
            });

            var $bundle = $('<div>').html($question)
                .append($choices);

            $('#_questions').append($bundle);

        });
    }

    function startGame () {
        count = 0;
        correct = 0;
        incorrect = 0;
        totalQuestions = 0;

        getQuestion();
    }

    function endGame () {
        $('#_questions').empty();

        var $totalCorrect = $('<h3>').text(correct);
        var $totalIncorrect = $('<h3>').text(incorrect);
        var $resetGame = $('<button>').addClass('play-again')
            .text('Play Again');

        var $endGameMessage = $('<div>')
            .append($totalCorrect, $totalIncorrect, $resetGame);

        $('#_questions').append($endGameMessage);

        $('.play-again').on('click', startGame);
    }

    function evaluateChoice (text) {
        count++;

        if ( text === answer ) {
            correct++;
            getQuestion();
        } else {
            incorrect++;
            getQuestion();
        }

        if ( count === totalQuestions ) {
            endGame();
            clearInterval(startTimer);
        }
    }

    function startTimer () {
        if (timeLeft === 0) {
            evaluateChoice();
            timeLeft = 10;
        } else {
            $('#_timer').text(timeLeft);
            timeLeft--;
        }
    }

    $(document).on('click', '.option', function () {
        evaluateChoice(this.innerText);
    });

    $(document).on('click', '.start-game', function () {
        startGame();
        setInterval(startTimer, 500);
    });

});

// function setTimer () {
//     timeLeft--;
//
//     if ( timeLeft > 0 ) {
//         gameTimer = setTimeout(setTimer, timer);
//     } else {
//
//         if ( count === totalQuestions ) {
//             endGame();
//         } else {
//             count++;
//             incorrect++;
//             timeLeft = 10;
//             getQuestion();
//         }
//     }
//
//     $('#_timer').text(timeLeft);
// }