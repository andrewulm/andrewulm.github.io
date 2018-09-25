// Train Schedule
// Author: Andrew Ulm

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAhXiRq4joa7d5QR55TX1WIT0DBjDR-x5U",
    authDomain: "kutrainscheduler.firebaseapp.com",
    databaseURL: "https://kutrainscheduler.firebaseio.com",
    projectId: "kutrainscheduler",
    storageBucket: "kutrainscheduler.appspot.com",
    messagingSenderId: "1034312080869"
};

firebase.initializeApp(config);

let database = firebase.database();

$(document).ready( function() {

    $('#add-train').on('click', function(event) {
        event.preventDefault();

        let trainName = $('#train-name').val().trim();
        let trainDestination = $('#train-destination').val().trim();
        let trainTime = $('#train-time').val().trim();
        let trainFrequency = $('#train-frequency').val().trim();

        let newTrain = {
            name: trainName,
            destination: trainDestination,
            depart: trainTime,
            frequency: trainFrequency
        };

        database.ref("trains").push(newTrain);
    });

    database.ref("trains").on('child_added', function(snapshot) {

        let timeConverted = moment(snapshot.val().depart, 'HH:mm').subtract(1, 'years');
        let diffTime = moment().diff(moment(timeConverted), 'minutes');
        let remainderTime = diffTime % snapshot.val().frequency;
        let minutesAway = snapshot.val().frequency - remainderTime;
        let arrivalTime = moment().add(minutesAway, 'minutes');

        $('#_trainBoard > tbody').append(
            '<tr>' +
            '<td>' + snapshot.val().name +
            '<td>' + snapshot.val().destination +
            '<td>' + snapshot.val().frequency +
            '<td>' + arrivalTime.format('hh:mm') +
            '<td>' + minutesAway
        );

        $('#_trains').trigger('reset');

    })
});
