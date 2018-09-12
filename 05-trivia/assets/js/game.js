// Trivia Game
// Author: Andrew Ulm

var question = [];
var count = 0;

$(document).ready( function () {

    function getQuestion() {

        $.getJSON('assets/js/questions.json', function (data) {

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
        getQuestion();
    }

    function evaluateChoice () {
        console.log('ive been clicked!');
    }

    startGame();

    $('.option').on('click', evaluateChoice);

});

// document.body.style.background = "blue";
// setTimeout(function () {
//    document.body.style.background = "yellow";
// }, 2000);