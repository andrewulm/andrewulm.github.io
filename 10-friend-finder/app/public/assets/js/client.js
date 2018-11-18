$(document).ready( () => {
    let matchStatus = $('.modal-title');
    let modalBody = $('.modal-body');

    let startSurvey = (() => {
        let survey = $('#_Survey');

        survey.prepend(`
            <form id="_survey">
                <label for="name">What's your name?</label>
                <input type="text" id="_name" name="name" required>
                <label for="photo">URL to photo:</label>
                <input type="text" id="_photo" name="photo" required>
                <hr>
                <div id="_questions"></div>
                <div id="_submit"></div>
            </form>
        `);

        questions();
    })();

    function questions() {
        $.getJSON('./assets/js/questions.json', (data) => {
            let $questions = $('#_questions');

            $.each(data.questions, (item) => {
                let $question = $('<h5>').html(data.questions[item].question);
                let $dropdown = $(`
                    <select id="${item}">
                        <option value="" disabled selected>Choose an Option</option>
                        <option value="1">Strongly Disagree</option>
                        <option value="2">Disagree</option>
                        <option value="3">Neutral</option>
                        <option value="4">Agree</option>
                        <option value="5">Strongly Agree</option>
                    </select>
                    `);

                let $bundle = $('<div class="questions">').html($question).append($dropdown);
                $questions.append($bundle);
            });

            let $submit = $('<hr> <input type="submit" value="Find Friend" id="_submit">');
            $('#_submit').append($submit);
        })
    }

    $('#_submit').on('click', (e) => {
        e.preventDefault();

        let newFriend = {
            name: $('#_name').val().trim(),
            photo: $('#_photo').val().trim(),
            scores: [
                $('#0').val(),
                $('#1').val(),
                $('#2').val(),
                $('#3').val(),
                $('#4').val(),
                $('#5').val(),
                $('#6').val(),
                $('#7').val(),
                $('#8').val(),
                $('#9').val(),
            ]
        };

        $.post('/api/friends', newFriend, (data) => {
            console.log(data);
            if ( data.name !== '' ) {
                matchStatus.html('We found you a match!');
                modalBody.html(`<p>${data.name}!</p> <img src="${data.photo}" height="200px"/>`)
            } else {
                matchStatus.html('Sorry!');
                modalBody.html(`<p>Unfortunately, there is not enough data to match you. Try later</p>`);
            }

            $('.modal').modal('toggle');
        })
    });

    $('#_survey').trigger('reset');

});