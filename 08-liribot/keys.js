// Exports the Spotify object with keys included from .env file
console.log('Spotify Exports');

exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};