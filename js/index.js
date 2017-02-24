 //----------------------HTML5 getLocation---------------
$(document).ready(function() {
  console.log(navigator.geolocation)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          $("#location").html(pos.lat + ", " + pos.lng);
        var key = "&key=AIzaSyBZj7pF8D1r85QEwNwTKYm0H5jDDXeQDo8";
          var googlePos = pos.lat + "," + pos.lng;
          var callAdd = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
          console.log(pos);
          console.log(callAdd + googlePos + key);
          $.getJSON(callAdd + googlePos + key, function(googleCall) {
            console.log(googleCall)
            var googleCity = googleCall.results[0].address_components[3].long_name;
            var googleState = googleCall.results[0].address_components[5].short_name;
            var zip = googleCall.results[0].address_components[6].short_name;
            var cc = googleCall.results[0].address_components[7].short_name;
            console.log(googleCity);
            console.log(googleState);
            $("#location").html(googleCity + ", " + googleState);

  //-----------------Open Weather API-------------
  //placed inside ip-api call for timing.
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "," + cc + ",&appid=1da331d282010b1df60431834e1145ae", function(result) {
      //Sets each variable with data from the JSON call (result).
      var forecast = result.weather[0].main;
      var icon = result.weather[0].icon;
      var temp = result.main.temp;
      temp = Math.floor(temp * (9 / 5) - 459.67);
      //Puts the variables into the html elements.
      $("#temp").html(temp + " °F");

      $("#forecast").html(forecast);

      $("#icon").html('<img src="http://openweathermap.org/img/w/' + icon + '.png">');

    });
          });
          $("#latLong").html(googlePos);

        });
       //Close if statement for geolocation check.
     } else {
       alert("Geolocation did not load");
     }
 //Close document ready.
 });
