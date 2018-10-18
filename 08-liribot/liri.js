// Bring in Modules
require('dotenv').config();

// TODO: Add chalkJS for CLI colors for interactivity.
// TODO: Remember to encodeURI() the string added to the queryURL for API calls.

const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const moment = require('moment');
const request = require('request');

const spotify = new Spotify(keys.spotify);

// Remove the first two default arguments
process.argv.splice(0, 2);

const task = process.argv.shift();
const term = process.argv.join(' ');
let queryURL;
let momentFrom;
let momentTo;
let momentDate;

console.log(`You want to run: ${task} with: ${term}`);

// Define LiriBot with functions
const liri = {
    runConcert: function(term) {
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
    runSpotify: function(term) {
        console.log(term);
    },
    runMovie: function(term) {
        console.log(term);
    },
    runDo: function(term) {
        console.log(term);
    }
};

switch (task) {
    case 'concert-this':
        liri.runConcert(term);
        break;
    case 'spotify-this-song':
        liri.runSpotify(term);
        break;
    case 'movie-this':
        liri.runMovie(term);
        break;
    case 'do-what-it-says':
        liri.runDo(term);
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

