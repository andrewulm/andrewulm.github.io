// Bring in Modules
require('dotenv').config();

// TODO: Add chalkJS for CLI colors for interactivity.
// TODO: Remember to encodeURI() the string added to the queryURL for API calls.

const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const moment = require('moment');
const request = require('request');
const fs = require('fs');

const spotify = new Spotify(keys.spotify);

// Remove the first two default arguments
process.argv.splice(0, 2);

const task = process.argv.shift();
let term = process.argv.join(' ');
let queryURL;
let momentFrom;
let momentTo;
let momentDate;
let songData;
let movieData;
let fileArgs;

console.log(`You want to run: ${task} with: ${term}`);

// Define LiriBot with functions
const liri = {
    runConcert: (term) => {
        // Build date for query parameter
        momentFrom = moment();
        momentTo = momentFrom.clone().add(30, 'days');
        momentDate = momentFrom.format('YYYY-MM-DD') + "," + momentTo.format('YYYY-MM-DD');

        // Assemble queryURL using search term and date
        // @example: "https://rest.bandsintown.com/artists/August%20Burns%20Red/events/?app_id=codingbootcamp&date=2018-10-18,2018-11-17"
        queryURL = encodeURI(`https://rest.bandsintown.com/artists/${term}/events/?app_id=codingbootcamp&date=${momentDate}`);

        request(queryURL, (err, res, body) => {
            if (err){
                console.log(err);
                throw err;
            }

            let event = JSON.parse(body);

            console.log(`I found these concerts for ${term}`);

            event.forEach((event) => {
                console.log(`
                    Venue: ${event.venue.name}
                    Location: ${event.venue.city}, ${event.venue.country}
                    Date: ${moment(event.datetime).format('MMMM Do YYYY, h:mm a')}
                `)
            });
        })
    },

    runSpotify: (term) => {
        spotify.search({ type: 'track', query: `${term}`, limit: 5 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            songData = data.tracks.items;
            songData.forEach((item) => {
                console.log(`
                    Artist: ${item.album.artists[0].name}
                    Title: ${item.name}
                    Album: ${item.album.name}
                    Preview: ${item.artists[0].external_urls.spotify}
                `);
            });
        });
    },

    runMovie: (term) => {
        queryURL = `http://www.omdbapi.com/?apikey=d1effae1&t=${term}`;
        console.log(queryURL);

        request(queryURL, (err, res, body) => {
            if (err) {
                console.log(err);
                throw err;
            }

            movieData = JSON.parse(body);

            console.log(`
                Title: ${movieData.Title}
                Year: ${movieData.Year}
                IMDB Rating: ${movieData.Ratings[0].Value}
                RT Rating: ${movieData.Ratings[1].Value}
                Country: ${movieData.Country}
                Language: ${movieData.Language}
                Actors: ${movieData.Actors}
                Plot: ${movieData.Plot}
            `)
        })
    },

    runDo: () => {
        fs.readFile('random.txt', 'utf-8', (err, data) => {
            if(err){
                console.log(err);
                throw err;
            }
            fileArgs = data.trim().split(',');
            runLiri(fileArgs[0], fileArgs[1]);
        });
    }
};

function runLiri(task, term) {
    switch (task) {
        case 'concert-this':
            liri.runConcert(term);
            break;
        case 'spotify-this-song':
            if ( term === '' ) {
                term = "The Sign";
            }
            liri.runSpotify(term);
            break;
        case 'movie-this':
            liri.runMovie(term);
            break;
        case 'do-what-it-says':
            liri.runDo();
            break;
        default:
            console.log(`
            Oops! I don't recognize that command. Try again.\n
            Commands:
                'concert-this'
                'spotify-this-song'
                'movie-this'
                'do-what-it-says'
        `);
    }
}

runLiri(task, term);