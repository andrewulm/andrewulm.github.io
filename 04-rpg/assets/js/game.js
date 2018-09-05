// Star Wars RPG - Game Logic
// Author: Andrew Ulm
// Description:

// Global Variables

var player = [];
var enemy = [];

var starWars = {
    characters: [
        {
            name: 'Luke Skywalker',
            health: 100,
            attack: 20,
            background: 'assets/images/char-luke.png',
            selected: false
        },
        {
            name: 'Master Yoda',
            health: 180,
            attack: 40,
            background: 'assets/images/char-yoda.png',
            selected: false
        },
        {
            name: 'Darth Vader',
            health: 200,
            attack: 60,
            background: 'assets/images/char-vader.png',
            selected: false
        },
        {
            name: 'Kylo Ren',
            health: 180,
            attack: 80,
            background: 'assets/images/char-kylo.png',
            selected: false
        },
    ],

    // Create Character cards based on number of starWars in the list
    outputCharacters : function() {

        var setCharacters = $('#_characterSelect');

        for ( index = 0; index < this.characters.length; index++ ) {

            $(setCharacters).append(
                '<div class="col character-card" data-id="' + index + '">' +
                    '<div class="character-name">' +
                    this.characters[index].name +
                    '</div>' +
                    '<div class="character-health">' +
                    'Health: ' + this.characters[index].health +
                    '</div>' +
                    '<div class="character-attack">' +
                    'Attack: ' + this.characters[index].attack +
                    '</div>' +
                '</div>');

            $('[data-id|="' + index + '"').css('background-image', 'url("' + this.characters[index].background + '")');
        }
    },

    setPlayerCharacter : function (characterName) {
        player = this.characters[characterName];
        $('[data-id|="' + characterName + '"').addClass('.player-character');

        console.log(player);
    },

    setEnemyCharacter : function (characterName) {
        enemy = this.characters[characterName];
        $('[data-id|="' + characterName + '"').addClass('.enemy-character');

        console.log(enemy);
    }
};

$(document).ready(function() {

    starWars.outputCharacters();

    $('.character-card').on('click', function() {

        var characterName = $(this).attr('data-id');
        console.log(characterName);

        if ( player.length === 0 ) {
            starWars.setPlayerCharacter(characterName);
        } else if ( enemy.length === 0 ) {
            starWars.setEnemyCharacter(characterName);
        }
    });

    $('#_attackButton').on('click', function () {

        console.log(enemy);

        enemy.health -= player.attack;

        console.log(enemy);

        if ( enemy.health <= 0 ) {
            console.log('Enemy Dead');
        }

        player.health -= enemy.attack;





    });
});