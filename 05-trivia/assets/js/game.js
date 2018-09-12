// Trivia Game
// Author: Andrew Ulm

$(document).ready( function () {

    var answer = '';
    var count = 0;
    var correct = 0;
    var incorrect = 0;
    var totalQuestions = 0;

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
                )
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

        console.log('inside endgame');

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

        if ( count === totalQuestions ) {
            endGame();
        } else {
            if ( text === answer ) {
                correct++;
                getQuestion();
            } else {
                incorrect++;
                getQuestion();
            }
        }
    }

    $(document).on('click', '.option', function () {
        evaluateChoice(this.innerText)
    });

    startGame();

});

// Timer syntax
// document.body.style.background = "blue";
// setTimeout(function () {
//    document.body.style.background = "yellow";
// }, 2000);