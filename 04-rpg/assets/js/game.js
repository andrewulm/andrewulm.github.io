// Star Wars RPG - Game Logic
// Author: Andrew Ulm
// Description:

// Global Variables

var starWars = {
    characters: {
        name: [
            'Luke Skywalker',
            'Master Yoda',
            'Darth Vader',
            'Kylo Ren'],
        health: [100, 150, 200, 180],
        attack: [20, 40, 60, 80],
        background: [
            'assets/images/char-luke.png',
            'assets/images/char-yoda.png',
            'assets/images/char-vader.png',
            'assets/images/char-kylo.png'
        ],
    },

    // Create Character cards based on number of starWars in the list
    setCharacters : function() {

        var setCharacters = $('#_characterSelect');

        for (i = 0; i < starWars.characters.name.length; i++ ) {

            $(setCharacters).append(
                '<div class="col character-card" name="' + starWars.characters.name[i] + '">' +
                    '<div class="character-name">' +
                    starWars.characters.name[i] +
                    '</div>' +
                    '<div class="character-stats">' +
                    starWars.characters.health[i] +
                    '</div>'+
                '</div>');

            $('div[name|="' + starWars.characters.name[i] + '"').css('background-image', 'url("' + starWars.characters.background[i] + '")');
        }
    },

    selectChampion : function(selectedCharacter) {

        console.log(selectedCharacter);

        switch(selectedCharacter) {
            case 'Luke Skywalker':
                console.log('You Selected: Luke');
                break;
            case 'Master Yoda':
                console.log('You Selected: Yoda');
                break;
            case 'Darth Vader':
                console.log('You Selected: Vader');
                break;
            case 'Kylo Ren':
                console.log('You Selected: Kylo');
                break;
        }

    }
};

$(document).ready(function() {

    starWars.setCharacters();


    $('.character-card').on('click', function() {

        var characterName = $('.character-card').attr('name');

        console.log(characterName);


    })

});



