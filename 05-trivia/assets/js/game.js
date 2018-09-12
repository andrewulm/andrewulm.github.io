// Trivia Game
// Author: Andrew Ulm

$(document).ready( function () {

    function getQuestions() {
        $.getJSON('assets/js/questions.json', function (data) {

            console.log(data);

        })
    }

    getQuestions(

});