// Star Wars RPG - Game Logic
// Author: Andrew Ulm
// Description:

// Global Variables

var characters = {
    name: [
        'Luke Skywalker',
        'Master Yoda',
        'Darth Vader',
        'Kylo Ren'],
    health: [100, 150, 200, 175],
    attack: [20, 40, 60, 80],
    background: [
        'assets/images/char-luke.png',
        'assets/images/char-yoda.png',
        'assets/images/char-vader.png',
        'assets/images/char-kylo.png'
    ],

    // Create Character cards based on number of characters in the list
    setCharacters : function() {

        var setCharacters = $('#_characterSelect');

        for ( i = 0; i < characters.name.length; i++ ) {

            $(setCharacters).append(
                '<div class="col character-card" name="' + characters.name[i] + '">' +
                    '<div class="character-name">' +
                    characters.name[i] +
                    '</div>' +
                    '<div class="character-stats">' +
                    characters.health[i] +
                    '</div>'+
                '</div>');

            $('div[name|="' + characters.name[i] + '"').css('background-image', 'url("' + characters.background[i] + '")');
        }
    }
};

$(document).ready(function() {

    characters.setCharacters();

});



