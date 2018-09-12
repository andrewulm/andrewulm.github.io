var characters = [];
var player;
var enemy;

$(document).ready( function () {

    function getCharacters() {
        $.getJSON('assets/js/characters.json', function (data) {
            characters = $(data.characters);

            $.each(data.characters, function (index, value) {

                var $characterName = $('<div>').addClass('character-name')
                    .html(data.characters[index].name);

                var $characterHealth = $('<div>').addClass('character-health')
                    .html(data.characters[index].health);

                var $characterAttack = $('<div>').addClass('character-attack')
                    .html(data.characters[index].attack);

                var $newCharacter = $('<div>').addClass('character-card col')
                    .attr('data-id', index)
                    .append($characterName)
                    .append($characterHealth)
                    .append($characterAttack)
                    .css('background-image', 'url("' + data.characters[index].background + '")')
                    .on('click', setPlayerCharacter);

                $('#_characterSelect').append($newCharacter);

            });
        });
    }

    function setPlayerCharacter(event) {

        // Create reusable variable based on data-id #
        var $selected = $(this).attr('data-id');

        // Fill the array with character stats
        player = characters[$selected];

        // Add the 'player' class to the selected card
        $(this).appendTo('[data-id|="' + $selected + '"')
            .addClass('player');

        // Remove previous attached event from this element
        $('#_characterSelect').children()
            .unbind('click', setPlayerCharacter)
            .on('click', setEnemyCharacter);

        var $attackButton = $('<button>').addClass('attack-button')
            .text('Attack');
            //.prop('disabled', true);

        $('#_battleText').prepend('<p>Select character to Battle</p>');

        $('#_attackButton').append($attackButton);

    }

    function setEnemyCharacter() {

        var $selected = $(this).attr('data-id');

        enemy = characters[$selected];

        $(this).appendTo('[data-id|="' + $selected + '"')
            .addClass('enemy fought');

        $('#_characterSelect').children()
            .unbind('click', setEnemyCharacter);

        $('#_battleText').html('<p>Press Attack to fight ' + enemy.name + '</p>');

        $('#_attackButton').on('click', attack);

    }

    function attack() {

        player.attack += 25;

        enemy.health -= player.attack;

        if ( enemy.health <= 0 ) {
            postBattle(true);
            return;
        }

        player.health -= enemy.attack;

        // Update player stats on page
        $('#_characterSelect .player .character-health').html(player.health);
        $('#_characterSelect .player .character-attack').html(player.attack);

        // Update enemy stats on page
        $('#_characterSelect .enemy .character-health').html(enemy.health);

        if ( player.health <= 0 ) {
            postBattle(false);
        }

    }

    function postBattle(victory) {

        if ( victory ) {
            $('#_characterSelect .fought').remove();

            if ( $('#_characterSelect').children().length === 1 ) {
                endGame(true);
                return;
            }

            $('#_battleText').html('<p>You defeated ' + enemy.name + '. Choose another enemy to fight</p>');

            $('#_characterSelect').children()
                .on('click', setEnemyCharacter);

        }

        else {
            $('#_characterSelect .player').remove();
            $('#_battleText').html('<p>You have been defeated by ' + enemy.name + '"');
            endGame(false);
        }

    }

    function endGame(win) {
        if (win) {
            $('#_battleText').html('<p>You Won!</p>');
        }

        $('#_attackButton').text('Play Again?')
            .on('click', function () {
                location.reload();
            })

    }

    getCharacters()

});