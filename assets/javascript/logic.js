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


// Password encryption 

// var pass = new Array()
// var t3 = ""
// var lim = 5
// pass[0] = "S6yrBG9mrTAL5Bz"
// pass[1] = "2tf3gGluctEZwha"
// pass[2] = "eicJNnfyHXjTpxr"
// pass[3] = "SPFG5ce2HHosLyn"
// pass[4] = "5AdQ529xqMYNQzQV"
// pass[5] = "36AdQ529xqMYNQzQ"

// //configure extension to reflect the extension type of the target web page (ie: .htm or .html)
// var extension = ".html"
// var enablelocking = 0
// var numletter = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
// var temp3 = ''
// var cur = 0


// function max(which) {
//     return (pass[Math.ceil(which) + (3 & 15)].substring(0, 1))
// }

// function testit(input) {
//     temp = numletter.indexOf(input)
//     var temp2 = temp ^ parseInt(pass[phase1 - 1 + (1 | 3)].substring(0, 2))
//     temp2 = numletter.substring(temp2, temp2 + 1)
//     return (temp2)
// }


// function submitentry() {
//     t3 = ''
//     verification = document.password1.password2.value
//     phase1 = Math.ceil(Math.random()) - 6 + (2 << 2)
//     var indicate = true
//     for (i = (1 & 2); i < window.max(Math.LOG10E); i++)
//         t3 += testit(verification.charAt(i))
//     for (i = (1 & 2); i < lim; i++) {
//         if (t3.charAt(i) != pass[phase1 + Math.round(Math.sin(Math.PI / 2) - 1)].charAt(i))
//             indicate = false
//     }
//     if (verification.length != window.max(Math.LOG10E))
//         indicate = false
//     if (indicate)
//         window.location = verification + extension
//     else
//         alert("Invalid password. Please try again")
// }

// Firebase reference 
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var accName = childSnapshot.val().name;
    var accEmail = childSnapshot.val().email;
    var accPassword = childSnapshot.val().password;

});





