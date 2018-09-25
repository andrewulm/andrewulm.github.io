// Giphy API project
// Author: Andrew Ulm

$(document).ready( function () {
    const API_KEY = '6j4UrTaRkdwbzlI0OrmRK7dIVQc6F5b1';

    let teams = [
        'Dallas Cowboys',
        'New England Patriots',
        'Cleveland Browns',
        'Green Bay Packers',
        'New York Giants',
        'Minnesota Vikings',
        'Philadelphia Eagles',
        'Pittsburgh Steelers',
        'Seattle Seahawks',
        'Chicago Bears',
        'New York Jets',
        'San Francisco 49ers',
        'Oakland Raiders',
        'Denver Broncos',
        'Washington Redskins',
        'Kansas City Chiefs',
        'Buffalo Bills',
        'Arizona Cardinals',
        'Los Angeles Rams',
        'Atlanta Falcons',
        'Carolina Panthers',
        'Detroit Lions',
        'New Orleans Saints',
        'Jacksonville Jaguars',
        'Miami Dolphins',
        'Tampa Bay Buccaneers',
        'Indianapolis Colts',
        'Houston Texans',
        'Los Angeles Chargers',
        'Baltimore Ravens',
        'Tennessee Titans',
        'Cincinnati Bengals'
    ];

    getTeams();

    function getTeams() {

        let _teamButtons = $('#_teamButtons');
        $(_teamButtons).empty();

        for ( i = 0; i < teams.length; i++ ) {
            let teamButton = $('<button>' + teams[i] + '</button>').attr('data-id', teams[i]);

            $(_teamButtons).append(teamButton);
        }
    }

    $(document).on('click', '#_teamButtons button', function () {
        let _gifs = $('#_gifs');
        $(_gifs).empty();

        let searchTerm = $(this).attr('data-id');
        let limit = 10;

        let queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&q=" + searchTerm + "&limit=" + limit;

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then( function (res) {

            console.log(res);

            for ( i = 0; i < res.data.length; i++ ) {
                $(_gifs).append(
                    '<div>' +
                        '<div data-id="' + i + '" class="gif-background"/>' +
                    '<div><h2>' + res.data[i].rating
                );

                $('[data-id="' + i + '"]')
                    .css('background-image', 'url(' + res.data[i].images.original_still.url + ')')
                    .css('height', res.data[i].images.original_still.height)
                    .css('width', res.data[i].images.original_still.width);
            }

            $('#_gifs div div').on('click', function () {

                let dataID = $(this).attr('data-id');

                if ( $(this).css('background-image') === 'url("' + res.data[dataID].images.original_still.url +'")' ) {
                    $(this).css('background-image', 'url(' + res.data[dataID].images.original.url + ')')
                } else {
                    $(this).css('background-image', 'url(' + res.data[dataID].images.original_still.url + ')')
                }
            })
        });
    });

    $('.add-button').on('click', function (event) {
        event.preventDefault();

        let teamName = $('.add-team').val().trim();

        teams.push(teamName);

        $('.add-team').val('');

        getTeams();
    });
});