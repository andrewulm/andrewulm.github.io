// Trivia Game
// Author: Andrew Ulm

$(document).ready( function () {
    var answer = '';
    var count = 0;
    var correct = 0;
    var incorrect = 0;
    var totalQuestions = 0;
    var timer;
    var timeLeft = 11;
    var grade;

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
            count++;
        });

        clearInterval(timer);
        time();
    }

    function startGame () {
        count = 0;
        correct = 0;
        incorrect = 0;
        totalQuestions = 0;

        getQuestion();
    }

    function endGame () {
        resetTimer();
        results();

        $('#_questions').empty();

        var $totalCorrect = $('<h3>').text('Correct: ' + correct);
        var $totalIncorrect = $('<h3>').text('Incorrect: ' + incorrect);
        var $resetGame = $('<div>').addClass('play-again')
            .text('Play Again');

        var $endGameMessage = $('<div>')
            .prepend('<h3 class="grade">Overall Grade: ' + (grade * 100) + '%')
            .append($totalCorrect, $totalIncorrect, $resetGame);

        $('#_questions').append($endGameMessage);

        $('.play-again').on('click', function () {
            startGame();
            resetTimer();
            time();
        });
    }

    function evaluateChoice (text) {
        if ( text === answer ) {
            resetTimer();
            correct++;
            getQuestion();
        } else {
            resetTimer();
            incorrect++;
            getQuestion();
        }

        if ( count === totalQuestions ) {
            endGame();
        }
    }

    function time() {
        timer = setInterval(countdown, 1000);
        function countdown() {
            if (timeLeft === 0) {
                resetTimer();
                evaluateChoice();
            } else {
                timeLeft--;
                if ( timeLeft >= 6 ) {
                    $('#_timer').html('<h2>' + timeLeft);
                } else if ( 5 >= timeLeft && timeLeft >= 3 ) {
                    $('#_timer').html('<h2 class="warning">' + timeLeft);
                } else if ( timeLeft < 3 ) {
                    $('#_timer').html('<h2 class="danger">' + timeLeft);
                }
            }
        }
    }

    function resetTimer () {
        clearInterval(timer);
        $('#_timer').empty();
        timeLeft = 11;
    }

    function results () {
        grade = (correct / totalQuestions).toFixed(2);
        console.log(grade);

        if ( grade >= 0.75 ) {
            $('#_timer').html('<h2>' + 'Wow, you really know your stuff!');
        } else if ( 0.74 >= grade && grade >= 0.50 ) {
            $('#_timer').html('<h2 class="warning">' + 'You did alright. Maybe you should try again.');
        } else {
            $('#_timer').html('<h2 class="danger">' + "You're pretty terrible at this Try again.");
        }
    }


    $(document).on('click', '.option', function () {
        evaluateChoice(this.innerText);
    });

    $(document).on('click', '.start-game', function () {
        startGame();
    });

});