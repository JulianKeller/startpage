

async function getLocalWeather() {
    // load the local weather
  const LOCAL_API_URL = `https://api.open-meteo.com/v1/forecast?latitude=45.78&longitude=-122.53&hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit`;
  const response = await fetch(`${LOCAL_API_URL}`);
  const data = await response.json();
  const temperature = data.current_weather.temperature;
  document.getElementById("weather").innerHTML = `${temperature}° F`;


  // then try to update the weather using local geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

//      document.getElementById("latitude").innerHTML = latitude;
//      document.getElementById("longitude").innerHTML = longitude;

      const response = await fetch(`${API_URL}&latitude=${latitude}&longitude=${longitude}`);
      const data = await response.json();
      const temperature = data.current_weather.temperature;
      document.getElementById("weather").innerHTML = `${temperature}° F`;
    });
  } else {
    document.getElementById("weather").innerHTML = "Geolocation is not supported by this browser.";
  }
}


/*
Functions for getCurrentPosition
*/

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.getElementById("latitude").innerHTML = latitude;
    document.getElementById("longitude").innerHTML = longitude;

    const response = fetch(`${API_URL}&latitude=${latitude}&longitude=${longitude}`);
    const data = response.json();
    const temperature = data.current_weather.temperature;
    document.getElementById("weather").innerHTML = `${temperature}° F`;
}

  function showError(error) {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
  }

var options = {
    maximumAge: 30000, // Cache age in milliseconds (30 seconds)
    enableHighAccuracy: false, // Get approximate location
    timeout: 5000,  // timeout after5 seconds
  };

async function getLocationWeather() {
    const API_URL = `https://api.open-meteo.com/v1/forecast?hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit`;
   //document.getElementById("debug").innerHTML = "debugging";
  // then try to update the weather using local geolocation
  if (navigator.geolocation) {
//        document.getElementById("debug").innerHTML = "if navigator.geolocation";
        navigator.geolocation.getCurrentPosition(showPosition, showError, options);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
}


window.onload = function() {
  getLocalWeather();
  getLocationWeather();
}

setInterval(getLocationWeather, 25000); // update every 10 seconds
