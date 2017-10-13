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

// var directionsDisplay;
// var directionsService = new google.maps.DirectionsService();
// var map;

// function initialize() {
//     directionsDisplay = new google.maps.DirectionsRenderer();
//     var chicago = new google.maps.LatLng(41.850033, -87.6500523);
//     var mapOptions = {
//         zoom: 7,
//         center: chicago
//     }
//     map = new google.maps.Map(document.getElementById('map'), mapOptions);
//     directionsDisplay.setMap(map);
//     directionsDisplay.setPanel(document.getElementById('directionsPanel'));
// }

// function calcRoute() {
//     var start = document.getElementById('start').value;=
//     var end = document.getElementById('end').value;
//     var request = {
//         origin: start,
//         destination: end,
//         travelMode: 'DRIVING'
//     };
//     directionsService.route(request, function (response, status) {
//         if (status == 'OK') {
//             directionsDisplay.setDirections(response);
//         }
//     });
// }

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

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var accName = childSnapshot.val().name;
    var accEmail = childSnapshot.val().email;
    var accPassword = childSnapshot.val().password;


});

// Button to add users requirements 

$("#add-requirements").on("click", function (event) {

    event.preventDefault();

    var totalHours = $("#required-hours").val().trim();
    var nightHours = $("#required-nightHours").val().trim();
    var highwayHours = $("#required-hwyHours").val().trim();
    var rainHours = $("#required-rainHours").val().trim();

    newRequirements = {
        hours: totalHours,
        night: nightHours,
        highway: highwayHours,
        rain: rainHours
    }

    database.ref().push(newRequirements);

    console.log(newRequirements.hours);
    console.log(newRequirements.night);
    console.log(newRequirements.highway);
    console.log(newRequirements.rain);

    $("#required-hours").val("");
    $("#required-nightHours").val("");
    $("#required-hwyHours").val("");
    $("#required-rainHours").val("");

});

// Button for adding users log 

$("#add-log").on("click", function (event) {

    event.preventDefault();

    var timeOfDay = $("#log-timeOfDay").val().trim();
    var distance = $("#log-distance").val().trim();
    var hours = $("#log-hours").val().trim();
    var weather = $("#log-weather").val().trim();

    newLog = {
        timeOfDay: timeOfDay,
        distance: distance,
        hours: hours,
        weather: weather
    }

    database.ref().push(newLog);

    console.log(newLog.timeOfDay);
    console.log(newLog.distance);
    console.log(newLog.hours);
    console.log(newLog.weather);

    $("#").val("");
    $("#log-distance").val("");
    $("#log-hours").val("");
    $("#log-weather").val("");
});



