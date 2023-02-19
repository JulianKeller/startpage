const API_URL = 'https://api.open-meteo.com/v1/forecast?hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit';

async function getWeather() {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  const response = await fetch(`${API_URL}&latitude=${latitude}&longitude=${longitude}`);
  const data = await response.json();

  const temperature = data.current_weather.temperature;

  document.getElementById("weather").innerHTML = `${temperature}° F`;
}

function showLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  console.log(latitude)
  console.log(longitude)
  getWeather(latitude, longitude);
}

function showError(error) {
  var errorText = "";
  switch(error.code) {
    case error.PERMISSION_DENIED:
      errorText = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      errorText = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      errorText = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      errorText = "An unknown error occurred.";
      break;
  }
  document.getElementById("location").innerHTML = errorText;
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showLocation, showError);
  } else {
    document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
  }
}
