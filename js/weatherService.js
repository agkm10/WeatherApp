angular.module('weatherApp').service('weatherService', function($http, $q) {
    this.getCurrentLocation = function() {
        var firstPromise = new Promise(function(resolve, reject) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var position = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    getGoogleLocation(position).then(function(googleLocation) {
                        getOpenWeatherForecast(googleLocation).then(function(finalForecast) {
                          console.log(finalForecast)
                            resolve(finalForecast)
                        })
                    });
                })
            }
        })
        return firstPromise
    }


    var getGoogleLocation = function(pos) {
        var key = "&key=AIzaSyBZj7pF8D1r85QEwNwTKYm0H5jDDXeQDo8";
        var googlePos = pos.lat + "," + pos.lng;
        console.log(googlePos)
        var callURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
        var googleCallUrl = callURL + googlePos + key
        console.log(googleCallUrl)
        return $http({
            method: 'GET',
            url: googleCallUrl
        }).then(function(googleCall) {
            console.log(googleCall)
            var googleCity = googleCall.data.results[0].address_components[3].long_name;
            var googleState = googleCall.data.results[0].address_components[5].short_name;
            var zip = googleCall.data.results[0].address_components[7].short_name;
            var cc = googleCall.data.results[0].address_components[6].short_name;
            console.log(googleCity);
            console.log(googleState);
            var myLocation = {
                city: googleCity,
                state: googleState,
                zip: zip,
                cc: cc,
                coords: googlePos
            }
            return myLocation
        })
    }


    var getOpenWeatherForecast = function(myLocation) {
        console.log(myLocation);
        var darkSkyKey = "b37f081c85e68011733dc3e245f22102/"
        var openWeatherUrl = "https://api.darksky.net/forecast/" + darkSkyKey+ myLocation.coords
        return $http.get(openWeatherUrl)
        .then(function(openWeatherCall) {
            console.log("opnewaethercall ", openWeatherCall)
            var myForecast = {
                city: myLocation.city,
                state: myLocation.state,
                forecast: openWeatherCall.currently.summary,
                icon: openWeatherCall.currently.icon,
                temp: Math.floor(openWeatherCall.currently.temperature)
                // forecast: openWeatherCall.data.weather[0].main,
                // icon: 'http://openweathermap.org/img/w/'+openWeatherCall.data.weather[0].icon+'.png',
                // temp: Math.floor(openWeatherCall.data.main.temp * (9 / 5) - 459.67)
            }
            console.log("myforecast ", myForecast)
            return myForecast
        })
    }
})
