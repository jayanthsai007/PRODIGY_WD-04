const apiKey = 'YOUR_API_KEY'; // Replace with your weather API key
const searchButton = document.getElementById('search-button');
const locationInput = document.getElementById('location-input');
const weatherIcon = document.getElementById('weather-icon');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

function getWeatherData(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        const weather = data.weather[0];
        const iconCode = weather.icon;
        const weatherDesc = weather.main;

        setWeatherIcon(iconCode);
        weatherDescription.textContent = weatherDesc;

        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        feelsLike.textContent = `Feels Like: ${Math.round(data.main.feels_like)}°C`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
      } else {
        alert('Location not found. Please try again.');
      }
    })
    .catch(error => console.error(error));
}

function setWeatherIcon(iconCode) {
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  weatherIcon.setAttribute('src', iconUrl);
}

searchButton.addEventListener('click', () => {
  const location = locationInput.value;
  if (location) {
    getWeatherData(location);
    locationInput.value = ''; // Clear input field after search
  }
});

// Get user location (optional)
navigator.geolocation.getCurrentPosition(position => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeatherData(`${lat},${lon}`); // Fetch weather for user's location
});
