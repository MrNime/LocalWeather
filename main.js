var apiURL = "https://fcc-weather-api.glitch.me/api/current?";
var tempUnit = "C";
var tempInC = 20;

$(document).ready(function() {
    var lat = 50.986846799999995;
    var lon = 3.8526721999999998;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            getWeather(lat, lon);
        });
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    $("#tempUnit").on("click", function() {
        var currTempUnit = $(this).text();
        swapTempUnit(currTempUnit);
    });
});

function getWeather(lat, lon) {
    localUrl = apiURL + "lon=" + lon + "&" + "lat=" + lat;
    $.ajax({
        url: localUrl,
        success: function (data) {
            console.log(data);
            var country = data.sys.country;
            var city = data.name;
            tempInC = parseFloat(data.main.temp);
            var iconText = data.weather[0].main;
            var iconUrl = data.weather[0].icon;
            $("#city").text(city);
            $("#country").text(country);
            $("#tempVal").text(tempInC);
            $("#desc").text(iconText);
            $("#icon").attr("src", iconUrl);
        }
    });
}
console.log(parseFloat("23.99") + 1);
function swapTempUnit(tempUnit) {
    var newTempUnit = tempUnit == "C" ? "F" : "C";
    $("#tempUnit").text(newTempUnit);
    if(newTempUnit == "C") {
        $("#tempVal").text(tempInC);
    } else {
        $("#tempVal").text(celciusToF(tempInC).toFixed(2));
    }
}

function celciusToF(celsius) {
    return celsius * 9 / 5 + 32;
}
