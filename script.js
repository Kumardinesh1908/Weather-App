// Get DOM elements
const searchInput = document.querySelector('input');
const searchButton = document.querySelector('button');
const weatherIcon = document.querySelector('.weatherIcon');
const weather = document.querySelector('.weather');
const tempElement = document.querySelector('.temp');
const cityElement = document.querySelector('.city');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');

// Get weather data based on user's location when the page loads
window.addEventListener('load', getLocation);

// Function to get the user's location coordinates
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const weatherData = await getWeatherDataByLocation(latitude, longitude);
        updateWeather(weatherData);
      },
      (error) => {
        displayError("Error getting location");
      }
    );
  } else {
    displayError("Geolocation is not supported by this browser");
  }
}

// Function to fetch weather data from an API based on latitude and longitude
async function getWeatherDataByLocation(latitude, longitude) {
  try {
    const api = `https://api.openweathermap.org/data/2.5/weather`;
    const apikey = "d5399166131ee702b7110a07cda5e106";
    const url = `${api}?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    displayError("Error fetching weather data");
    return null;
  }
}

// Function to update the weather information on the page
function updateWeather(weatherData) {
  if (!weatherData || weatherData.message === "city not found") {
    displayError("City not found");
    return;
  }
  tempElement.textContent = Math.round(weatherData.main.temp) + "°C";
  cityElement.textContent = weatherData.name;
  humidityElement.textContent = weatherData.main.humidity + "%";
  windElement.textContent = weatherData.wind.speed + "Km/Hr";

  if (weatherData.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png"
  }
  else if (weatherData.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png"
  }
  else if (weatherData.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png"
  }
  else if (weatherData.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png"
  }
  else if (weatherData.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png"
  }
  else if (weatherData.weather[0].main == "Snow") {
    weatherIcon.src = "images/snow.png"
  }

}

// Event listener for the search input to fetch location on Enter key press
searchInput.addEventListener('keypress', async (e) => {
  if (e.key === 'Enter') {
    const city = searchInput.value;
    const weatherData = await getWeatherDataByCity(city);
    updateWeather(weatherData);
  }
});

// Event listener for the search button click
searchButton.addEventListener('click', async () => {
  const city = searchInput.value;
  const weatherData = await getWeatherDataByCity(city);
  updateWeather(weatherData);
});

// Function to fetch weather data from an API based on city name
async function getWeatherDataByCity(city) {
  try {
    const apikey = "d5399166131ee702b7110a07cda5e106";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`);
    const data = await response.json();
    return data;
  } catch (error) {
    displayError("Enter Correct City Name");
    return null;
  }
}

// Function to display an error message
function displayError(message) {
  weatherIcon.src = "images/error.png";
  tempElement.style.fontSize = "40px";
  tempElement.textContent = message;
  cityElement.textContent = "";
  humidityElement.style.fontSize = "16px";
  humidityElement.textContent = "Not available";
  windElement.style.fontSize = "16px";
  windElement.textContent = "Not available";
}

// Event listener for the search Input click
function changePadding() {
  searchInput.style.padding = "10px 25px";
  searchInput.style.fontSize = "22px";
  searchInput.placeholder = "";
}