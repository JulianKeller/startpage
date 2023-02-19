const API_URL = `https://api.open-meteo.com/v1/forecast?hourly=temperature_2m&current_weather=true&temperature_unit=fahrenheit`;

async function getWeather() {
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

window.onload = function() {
  getWeather();
}
