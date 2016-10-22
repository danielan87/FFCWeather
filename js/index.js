var APPID = "42d53e949533ca7c1502713fa4916009";
var mapConditionsIcons = {"Thunderstorm": "wi-thunderstorm","Drizzle": "wi-showers","Rain": "wi-rain" ,"Snow": "wi-snow","Atmosphere": "wi-fog","Clear": "wi-day-sunny","Clouds": "wi-cloudy","Extreme": "wi-hurricane-warning","Additional": "wi-meteor"};
var mapConditionsBG = {"Thunderstorm": "thunderstorm-background","Drizzle": "rainy-background","Rain": "rainy-background" ,"Snow": "snowy-background","Atmosphere": "foggy-background","Clear": "sunny-background","Clouds": "foggy-background","Extreme": "hell-background","Additional": "hell-background"}
function setIcon(condition) {
  $("#icon").removeClass();
  $("#icon").addClass("wi " + mapConditionsIcons[condition]);
  $("body").removeClass();
  $("body").addClass(mapConditionsBG[condition]);
}

function changeTempType() {
  if($("#temp_unit").text() == "F") {
    $("#temperature").html(Math.floor(($("#temperature").html() - 32) * 5 / 9));
    $("#temp_unit").text("C");
  } else {
    $("#temperature").html(Math.ceil($("#temperature").html() * 9/5 + 32));
    $("#temp_unit").text("F");
  }
}

$(document).ready(function() {
  $("#temp_unit").click(function() {
    changeTempType();
  });
  $.ajax({
    url: "http://ip-api.com/json",
    success: function(data) {
      var countrycode = data.countryCode,
        city = data.city,
        lat = data.lat,
        lon = data.lon;
      $("#location").html(data.city + ", " + countrycode);
      $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=" + APPID,
        success: function(data2) {
          $("#temperature").html(Math.floor(data2.main.temp * 9/5 - 459.67));
          $("#mean_weather").html(data2.weather[0].main);
          setIcon($("#mean_weather").text());
        },
        cache: false
      });

    },
    cache: false
  });
});