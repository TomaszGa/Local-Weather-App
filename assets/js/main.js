var currentDispCelsius = true, 
    latitude = 0,
    longitude = 0;
//block scale change button before json query is made
$(document).ready(function () {
$("#dispChange").attr("disabled", true);
setTimeout(function(){
    $("#dispChange").removeAttr("disabled");    
    }, 1000);
//geolocation
   if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        getWeather(latitude, longitude);
        });    

  }
//display change if current system is Celcius
$("#dispChange").click(function(){
    if (currentDispCelsius === true){
        $("#celsius").fadeOut(500);
        setTimeout(function(){
            $("#fahrenheit").fadeIn(500);
        }, 500);
        currentDispCelsius = false;
        $("#dispChange").text("I'm not American")
        var that = this;
        $(this).attr("disabled", true);
//block button during transition
        setTimeout(function(){
            $("#dispChange").removeAttr("disabled");    
            }, 1000);
        }
//display change if current system is Fahrenheit
    else{
        $("#fahrenheit").fadeOut(500);
        setTimeout(function(){
            $("#celsius").fadeIn(500);
            }, 500);
        currentDispCelsius = true;
        $("#dispChange").text("I'm American")
        var that = this;
        $(this).attr("disabled", true);
//block button during transition        
        setTimeout(function(){
            $("#dispChange").removeAttr("disabled");    
            }, 1000);
        }
    
    });
    
});
function getWeather(lat, long){
    var tempCelsius = 0;
    var tempFahrenheit = 0;
    var apiString = "";  
    //construct string for API request
    apiString+= "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?id=524901&APPID=9d0495bd52b15e645f5ba93ac8b9c889&lat=" + lat + "&lon=" + long;
    $.getJSON(apiString, function (json) {
        var celsiusString = "",
            fahrenheitString = "",
            htmlString = "";
        //calculate Celsius and Fahrenheit values from given Kelvin
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
        //background selection depending on json data
        switch (json.weather["0"]["main"]){
            case "Clouds":
                $("body").css({"background-image": "url('assets/img/clouds.jpg')",
                               "color": "white",
                               "text-shadow": "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"});                   
                $("#fahrenheit").after("<p>It's cloudy</p>");                
            break;
            case "Clear":
                $("body").css({"background-image": "url('assets/img/clear.jpg')",
                               "color": "black",
                                "text-shadow": "-0.8px 0 white, 0 0.8px white, 0.8px 0 white, 0 -0.8px white"});
                $("#fahrenheit").after("<p>The sky is clear</p>");
            break;
            case "Drizzle":
                $("body").css({"background-image": "url('assets/img/drizzle.jpg')",
                               "color": "black",
                                "text-shadow": "-0.8px 0 white, 0 0.8px white, 0.8px 0 white, 0 -0.8px white"});
                $("#fahrenheit").after("<p>Drizzling rain</p>");                
            break; 
            case "Rain":
                $("body").css({"background-image": "url('assets/img/rain.jpg')",
                               "color": "white",
                               "text-shadow": "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"});
                $("#fahrenheit").after("<p>It's raining</p>");                
            break;
            case "Snow":
                $("body").css({"background-image": "url('assets/img/snow.jpg')",
                               "color": "black",
                                "text-shadow": "-0.8px 0 white, 0 0.8px white, 0.8px 0 white, 0 -0.8px white"});
                $("#fahrenheit").after("<p>It's snowing</p>");                
            break;
            case "Thunderstorm":
                $("body").css({"background-image": "url('assets/img/thunderstorm.jpg')",
                               "color": "black",
                                "text-shadow": "-0.8px 0 white, 0 0.8px white, 0.8px 0 white, 0 -0.8px white"});
                $("#fahrenheit").after("<p>Thunderstorm!</p>");                
            break;                   
            }
        
    });
}