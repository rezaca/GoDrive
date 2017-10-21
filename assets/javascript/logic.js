//var API_Key = "AIzaSyBtXBuh8qLYNrXlPIcOu_ogT-PcbLx0Zck";

// INITIATE GOOGLE MAP
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.2271, lng: -80.8431 },
        zoom: 13
    });

    var origin = document.getElementById('start');
    var destination = document.getElementById('end');

    var autocomplete = new google.maps.places.Autocomplete(origin);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        infowindowContent.children['place-icon'].src = place.icon;
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-address'].textContent = address;
        infowindow.open(map, marker);
    });

    var autocomplete2 = new google.maps.places.Autocomplete(destination);

    // Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete2.bindTo('bounds', map);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete2.addListener('place_changed', function () {
        infowindow.close();
        marker.setVisible(false);
        var place = autocomplete2.getPlace();
        if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
        } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
        }
        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }

        // infowindowContent.children['place-icon'].src = place.icon;
        // infowindowContent.children['place-name'].textContent = place.name;
        // infowindowContent.children['place-address'].textContent = address;
        // infowindow.open(map, marker);
    });

    var directionsDisplay = new google.maps.DirectionsRenderer({
        map: map
    });

    // Set destination, origin and travel mode.
    $('button').on('click', function () {

        var request = {
            destination: document.getElementById('end').value,
            origin: document.getElementById('start').value,
            travelMode: 'DRIVING'
        };

        // Pass the directions request to the directions service.
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function (response, status) {
            if (status == 'OK') {
                // Display the route on the map.
                console.log(response);
                directionsDisplay.setDirections(response);
                distance(request.origin, request.destination);
            }
        });

    });

    function distance(origin, destination) {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix({
            origins: [origin],
            destinations: [destination],
            travelMode: 'DRIVING',
            // unitSystem: google.maps.unitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false,
        }, function (response) {
            console.log("distance", response)
        });
    }
}

    $('#start').change(function(){
        var location = $('#start').val();
        var key = 'e9f3461c440eeabe8d545cb0168ef9e9';
        var queryURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=' + key + '&units=imperial';

          $.ajax({
            method: 'POST',
            url: queryURL,
            type: 'json'
          })
          .done(function(response) {
            console.log(response);
            var weather = response.weather[0].main;
            var weatherIcon = response.weather[0].icon;
            $("#weather").html('<h2> Weather: ' + weather + '</h2>');
            // $("#weather").prepend(weatherIcon)
          });
    });
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=charlotte&APPID=7a900c6b9bfad12905d2d07c66eaa183";

// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).done(function (response) {
//     console.log(response);


// });


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

// function onSignIn(googleUser) {
//     var profile = googleUser.getBasicProfile();
//     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     console.log('Name: ' + profile.getName());
//     console.log('Image URL: ' + profile.getImageUrl());
//     console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

//     $("#userDisplay").html(profile.getName());
//     $("#userDisplay").html("<img class='userImg'>" + profile.getImageUrl());
//     $("#userDisplay").html(profile.getEmail());

// }

// $("#signOut").on("click", function (event) {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         console.log('User signed out.');
//         $("#userDisplay").empty();
//     });
// });

// Button for adding users account
// $("#add-account").on("click", function (event) {

//     event.preventDefault();

//     // Grabs users input
//     var accName = $("#account-name").val().trim();
//     var accEmail = $("#account-email").val().trim();
//     var accPassword = $("#account-password").val().trim();
//     var verifyPassword = $("#verifyPassword").val().trim();

//     // Creates local object for holding account data
//     var newAccount = {
//         name: accName,
//         email: accEmail,
//         password: accPassword
//     }

//     // Uploads employee data to the database
//     database.ref().push(newAccount);

//     console.log(newAccount.name);
//     console.log(newAccount.email);
//     console.log(newAccount.password);

//     $("#account-name").val("");
//     $("#account-email").val("");
//     $("#account-password").val("");

// });

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
    var totalHours = $("#logHours").val().trim();
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
    $("#logHours").val("");
    $("#weatherInput").val("");
    $("#driveType").val("");


});



// Firebase reference 
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    // var accName = childSnapshot.val().name;
    // var accEmail = childSnapshot.val().email;
    // var accPassword = childSnapshot.val().password;

    var logDate = childSnapshot.val().date;
    var timeOfDay = childSnapshot.val().timeOfDay;
    var totalHours = childSnapshot.val().hours;
    var logWeather = childSnapshot.val().weather;
    var driveType = childSnapshot.val().driveType;

    $("#logTable").append("<tr><td>" + logDate + "</td><td>" + timeOfDay + "</td><td>" + logWeather + "</td><td>" + driveType + "</td><td>" + totalHours + "</td></tr>");


});














