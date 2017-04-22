$(document).ready(function () {

   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = 0,
            longitude = 0;
        $("#data").html("Your latitude: " + position.coords.latitude + "<br>Your longitude: " + position.coords.longitude);
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        constructLink(latitude, longitude);
        });
       
  }   

});
function constructLink(lat, long){
    var tempCelsius = 0;
    var tempFahrenheit = 0;
    var apiString = "";  
    apiString+= "http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=9d0495bd52b15e645f5ba93ac8b9c889&lat=" + lat + "&lon=" + long;
    console.log(apiString);
    $.getJSON(apiString, function (json) {
        var celsiusString = "",
            fahrenheitString = "",
            htmlString = "";
        console.log(json.weather["0"]["main"]);
        tempCelsius = json.main.temp - 273.15;
        tempFahrenheit = json.main.temp * 9/5 - 459.67;
        tempCelsius = Math.round( tempCelsius * 10 ) / 10;
        tempFahrenheit = Math.round( tempFahrenheit * 10 ) / 10;    
        htmlString+= "<h3>Weather in " + json.name + ", " + json.sys.country + ":</h3>";
        celsiusString+= "<p id='celsius'>" +tempCelsius + "°C</p>";
        fahrenheitString+= "<p id='fahrenheit'>" +tempFahrenheit + "°F</p>";
        $("#data").after(celsiusString);
        $("#celsius").after(fahrenheitString);
        $("#data").after(htmlString)
        $("#fahrenheit").hide();
        $("#celsius").click(function(){
            $(this).hide();
            $("#fahrenheit").show();
            });
        $("#fahrenheit").click(function(){
            $(this).hide();
            $("#celsius").show();
            });
        
        switch (json.weather["0"]["main"]){
            case "Clouds":
                $("body").css({"background-image": "url('assets/img/clouds.jpg')",
                               "color": "white"});
                $("#fahrenheit").after("<p>It's cloudy</p>");                
            break;
            case "Clear":
                $("body").css({"background-image": "url('assets/img/clear.jpg')",
                "color": "black"});
                $("#fahrenheit").after("<p>The sky is clear</p>");
            break;
            case "Drizzle":
                $("body").css({"background-image": "url('assets/img/drizzle.jpg')",
                               "color": "black"});
                $("#fahrenheit").after("<p>Drizzling rain</p>");                
            break; 
            case "Rain":
                $("body").css({"background-image": "url('assets/img/rain.jpg')",
                               "color": "white"});
                $("#fahrenheit").after("<p>It's raining</p>");                
            break;
            case "Snow":
                $("body").css({"background-image": "url('assets/img/snow.jpg')",
                               "color": "black"});
                $("#fahrenheit").after("<p>It's snowing</p>");                
            break;
            case "Thunderstorm":
                $("body").css({"background-image": "url('assets/img/thunderstorm.jpg')",
                               "color": "black"});
                $("#fahrenheit").after("<p>Thunderstorm!</p>");                
            break;                   
            }
        
    });
}