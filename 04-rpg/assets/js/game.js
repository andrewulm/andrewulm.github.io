// Star Wars RPG - Game Logic
// Author: Andrew Ulm
// Description:

// Global Variables

var firstChampion = [];
var secondChampion = [];

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

        var character = ('.character-card[name="' + selectedCharacter + '"]');
        var battleArena = ('#_battleArena');

        switch(selectedCharacter) {
            case 'Luke Skywalker':
                console.log(character);

                $(battleArena).append( starWars.characters.name[0] );

                if ( firstChampion.length == 0 ) {
                    firstChampion.push(
                        starWars.characters.health[0], starWars.characters.attack[0]
                    );
                } else {
                    secondChampion.push(
                        starWars.characters.health[0], starWars.characters.attack[0]
                    )
                }

                console.log(firstChampion);
                console.log(secondChampion);

                break;
            case 'Master Yoda':
                console.log(character);

                $(battleArena).append( starWars.characters.name[1] );

                if ( firstChampion.length == 0) {
                    firstChampion.push(
                        starWars.characters.health[1], starWars.characters.attack[1]
                    );
                } else {
                    secondChampion.push(
                        starWars.characters.health[1], starWars.characters.attack[1]
                    )
                }

                console.log(firstChampion);
                console.log(secondChampion);

                break;
            case 'Darth Vader':
                console.log(character);



                break;
            case 'Kylo Ren':
                console.log(character);



                break;
        }
    }
};

$(document).ready(function() {

    starWars.setCharacters();

    $('.character-card').on('click', function() {

        var characterName = $(this).attr('name');

        starWars.selectChampion(characterName);

    });

    $('#_attackButton').on('click', function() {

        // First champion attacks second champion
        secondChampion[0] = secondChampion[0] - firstChampion[1];

        // Second champion attacks first champion
        firstChampion[0] = firstChampion[0] - secondChampion[1];

        // Increment first champion attack damage
        firstChampion[1] = (firstChampion[1] + 10);

        console.log(firstChampion);
        console.log(secondChampion);

    });


});



