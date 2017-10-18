//var API_Key = "AIzaSyBtXBuh8qLYNrXlPIcOu_ogT-PcbLx0Zck";

// INITIATE GOOGLE MAP
function initMap() {
    var uluru = { lat: 35.2271, lng: -80.8431 };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
    console.log(google.maps);
}

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=charlotte&APPID=7a900c6b9bfad12905d2d07c66eaa183";

$.ajax({
    url: queryURL,
    method: "GET"
}).done(function (response) {
    console.log(response);


});



// Initialize Firebase
var config = {
    apiKey: "AIzaSyCjHRGiUjezd6cX9yf7Ci-U4drbZOIxXa4",
    authDomain: "godrive-a7500.firebaseapp.com",
    databaseURL: "https://godrive-a7500.firebaseio.com",
    projectId: "godrive-a7500",
    storageBucket: "",
    messagingSenderId: "60868714643"
};
firebase.initializeApp(config);

var database = firebase.database();

// Log in/ Create account 

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

// Button for adding users account
$("#add-account").on("click", function (event) {

    event.preventDefault();

    // Grabs users input
    var accName = $("#account-name").val().trim();
    var accEmail = $("#account-email").val().trim();
    var accPassword = $("#account-password").val().trim();
    var verifyPassword = $("#verifyPassword").val().trim();

    // Creates local object for holding account data
    var newAccount = {
        name: accName,
        email: accEmail,
        password: accPassword
    }

    // Uploads employee data to the database
    database.ref().push(newAccount);

    console.log(newAccount.name);
    console.log(newAccount.email);
    console.log(newAccount.password);

    $("#account-name").val("");
    $("#account-email").val("");
    $("#account-password").val("");

});

// Button to add users requirements 

// $("#add-requirements").on("click", function (event) {

//     event.preventDefault();

//     var totalHours = $("#required-hours").val().trim();
//     var nightHours = $("#required-nightHours").val().trim();
//     var highwayHours = $("#required-hwyHours").val().trim();
//     var rainHours = $("#required-rainHours").val().trim();

//     newRequirements = {
//         hours: totalHours,
//         night: nightHours,
//         highway: highwayHours,
//         rain: rainHours
//     }

//     database.ref().push(newRequirements);

//     console.log(newRequirements.hours);
//     console.log(newRequirements.night);
//     console.log(newRequirements.highway);
//     console.log(newRequirements.rain);

//     $("#required-hours").val("");
//     $("#required-nightHours").val("");
//     $("#required-hwyHours").val("");
//     $("#required-rainHours").val("");

// });

// Button for adding users log 

$("#add-log").on("click", function (event) {

    event.preventDefault();

    var timeOfDay = $("#timeOfDay").val().trim();
    var dateInput = $("#dateInput").val().trim();
    var totalHours = $("#totalHours").val().trim();
    var weatherInput = $("#weatherInput").val().trim();
    var driveType = $("#driveType").val().trim();

    newLog = {
        timeOfDay: timeOfDay,
        date: dateInput,
        hours: totalHours,
        weather: weatherInput,
        driveType: driveType
    }

    database.ref().push(newLog);

    console.log(newLog.date);
    console.log(newLog.timeOfDay);
    console.log(newLog.weather);
    console.log(newLog.driveType);
    console.log(newLog.hours);

    $("#timeOfDay").val("");
    $("#dateInput").val("");
    $("#totalHours").val("");
    $("#weatherInput").val("");
    $("#driveType").val("");


});



// Firebase reference 
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var accName = childSnapshot.val().name;
    var accEmail = childSnapshot.val().email;
    var accPassword = childSnapshot.val().password;

    var logDate = childSnapshot.val().date;
    var timeOfDay = childSnapshot.val().timeOfDay;
    var totalHours = childSnapshot.val().hours;
    var logWeather = childSnapshot.val().weather;
    var driveType = childSnapshot.val().driveType;

    $("#logTable").append("<tr><td>" + logDate + "</td><td>" + timeOfDay + "</td><td>" + logWeather + "</td><td>" + driveType + "</td><td>" + totalHours + "</td></tr>");


});












