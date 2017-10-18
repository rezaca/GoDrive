//var API_Key = "AIzaSyBtXBuh8qLYNrXlPIcOu_ogT-PcbLx0Zck";

// INITIATE GOOGLE MAP
function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 35.2271, lng: -80.8431},
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

        autocomplete.addListener('place_changed', function() {
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

        autocomplete2.addListener('place_changed', function() {
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

          infowindowContent.children['place-icon'].src = place.icon;
          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-address'].textContent = address;
          infowindow.open(map, marker);
        });

        var directionsDisplay = new google.maps.DirectionsRenderer({
          map: map
        });

        // Set destination, origin and travel mode.
        $('button').on('click', function() {

          var request = {
            destination: document.getElementById('end').value,
            origin: document.getElementById('start').value,
            travelMode: 'DRIVING'
          };

        // Pass the directions request to the directions service.
          var directionsService = new google.maps.DirectionsService();
          directionsService.route(request, function(response, status) {
            if (status == 'OK') {
              // Display the route on the map.
              console.log(response);
              directionsDisplay.setDirections(response);
            }
          });
      });

      function test(origin, destination){
       var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
          origins: [origin],
          destinations: [destination],
          travelMode: 'DRIVING',
          // unitSystem: google.maps.unitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        }, function(response) {
          console.log("distance", response)
        });
     }
    }


     function test(origin, destination){
       var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix({
          origins: [origin],
          destinations: [destination],
          travelMode: 'DRIVING',
          // unitSystem: google.maps.unitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false,
        }, function(response) {
          console.log("distance", response)
        });
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

var pass = new Array()
var t3 = ""
var lim = 5
pass[0] = "S6yrBG9mrTAL5Bz"
pass[1] = "2tf3gGluctEZwha"
pass[2] = "eicJNnfyHXjTpxr"
pass[3] = "SPFG5ce2HHosLyn"
pass[4] = "5AdQ529xqMYNQzQV"
pass[5] = "36AdQ529xqMYNQzQ"

//configure extension to reflect the extension type of the target web page (ie: .htm or .html)
var extension = ".html"
var enablelocking = 0
var numletter = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
var temp3 = ''
var cur = 0


function max(which) {
    return (pass[Math.ceil(which) + (3 & 15)].substring(0, 1))
}

function testit(input) {
    temp = numletter.indexOf(input)
    var temp2 = temp ^ parseInt(pass[phase1 - 1 + (1 | 3)].substring(0, 2))
    temp2 = numletter.substring(temp2, temp2 + 1)
    return (temp2)
}


function submitentry() {
    t3 = ''
    verification = document.password1.password2.value
    phase1 = Math.ceil(Math.random()) - 6 + (2 << 2)
    var indicate = true
    for (i = (1 & 2); i < window.max(Math.LOG10E); i++)
        t3 += testit(verification.charAt(i))
    for (i = (1 & 2); i < lim; i++) {
        if (t3.charAt(i) != pass[phase1 + Math.round(Math.sin(Math.PI / 2) - 1)].charAt(i))
            indicate = false
    }
    if (verification.length != window.max(Math.LOG10E))
        indicate = false
    if (indicate)
        window.location = verification + extension
    else
        alert("Invalid password. Please try again")
}

// Firebase reference 
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    var accName = childSnapshot.val().name;
    var accEmail = childSnapshot.val().email;
    var accPassword = childSnapshot.val().password;

});

$('.form').find('input, textarea').on('keyup blur focus', function (e) {

    var $this = $(this),
        label = $this.prev('label');

    if (e.type === 'keyup') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
        if ($this.val() === '') {
            label.removeClass('active highlight');
        } else {
            label.removeClass('highlight');
        }
    } else if (e.type === 'focus') {

        if ($this.val() === '') {
            label.removeClass('highlight');
        }
        else if ($this.val() !== '') {
            label.addClass('highlight');
        }
    }

});

$('.tab a').on('click', function (e) {

    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);

});




