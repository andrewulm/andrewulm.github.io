let friends = require('../data/friends');

module.exports = (app) => {

    app.get('/api/friends', (req, res) => {
        res.json(friends);
    });

    app.post('/api/friends', (req, res) => {
        friends.push(req.body);

        let difference = 40;
        let matchName = '';
        let matchPhoto = '';

        friends.forEach( (friend) => {
           let matchedScoreArray = [];

           function add(total, num) {
               return total + num;
           }

           for( i = 0; i < friend.scores.length; i++ ){
               matchedScoreArray.push(Math.abs(parseInt(req.body.scores[i]) - parseInt(friend.scores[i])));
           }

           let totalDifference = matchedScoreArray.reduce(add, 0);

           if ( totalDifference < difference ) {
               difference = totalDifference;
               matchName = friend.name;
               matchPhoto = friend.photo;
           }
        });

        res.json({
            name: matchName,
            photo: matchPhoto
        });
    });
};