// Get DOM elements
const searchInput = document.querySelector('input');
const searchButton = document.querySelector('button');
const weatherIcon = document.querySelector('.weatherIcon');
const weather = document.querySelector('.weather');
const tempElement = document.querySelector('.temp');
const cityElement = document.querySelector('.city');
const humidityElement = document.querySelector('.humidity');
const windElement = document.querySelector('.wind');


// Function to fetch weather data from an API based on latitude and longitude
async function getWeatherDataByLocation(latitude, longitude) {
  try {

    const api = `https://api.openweathermap.org/data/2.5/weather`;
    const apikey = "d5399166131ee702b7110a07cda5e106";
    const url =
      api +
      "?lat=" +
      latitude +
      "&lon=" +
      longitude +
      "&appid=" +
      apikey +
      "&units=metric";
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    weatherIcon.src = "images/error.png"
    tempElement.style.fontSize = "40px";
    tempElement.textContent = "Error fetching weather data";
    cityElement.textContent = "";
    humidityElement.style.fontSize = "16px";
    humidityElement.textContent = "Not available";
    windElement.style.fontSize = "16px";
    windElement.textContent = "Not available";
    return null;
  }
}


// Function to get the user's location coordinates
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const weatherData = await getWeatherDataByLocation(latitude, longitude);
        console.log(weatherData);
        updateWeather(weatherData);
      },
      (error) => {
        weatherIcon.src = "images/error.png"
        tempElement.style.fontSize = "40px";
        tempElement.textContent = "Error getting location";
        cityElement.textContent = "";
        humidityElement.style.fontSize = "16px";
        humidityElement.textContent = "Not available";
        windElement.style.fontSize = "16px";
        windElement.textContent = "Not available";
      }
    );
  } else {
    weatherIcon.src = "images/error.png"
    tempElement.style.fontSize = "40px";
    tempElement.textContent = "Geolocation is not supported by this browser";
    cityElement.textContent = "";
    humidityElement.style.fontSize = "16px";
    humidityElement.textContent = "Not available";
    windElement.style.fontSize = "16px";
    windElement.textContent = "Not available";
  }
}


// Get weather data based on user's location when the page loads
window.addEventListener('load', getLocation);


// Function to update the weather information on the page
function updateWeather(weatherData) {
  if(weatherData.message == "city not found"){
    tempElement.style.fontSize = "40px";
    tempElement.textContent = "city not found";
    cityElement.textContent = "";
    humidityElement.style.fontSize = "16px";
    humidityElement.textContent = "Not available";
    windElement.style.fontSize = "16px";
    windElement.textContent = "Not available";
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
  // weather.style.display = "block";

}


// Function to fetch weather data from an API based on city name
async function getWeatherDataByCity(city) {
  try {
    const api = "d5399166131ee702b7110a07cda5e106";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&cnt=5&appid=d5399166131ee702b7110a07cda5e106&units=metric`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    tempElement.style.fontSize = "40px";
    tempElement.textContent = "Enter Correct City Name";
    cityElement.textContent = "";
    humidityElement.style.fontSize = "16px";
    humidityElement.textContent = "Not available";
    windElement.style.fontSize = "16px";
    windElement.textContent = "Not available";
    return null;
  }
}


// Event listener for the search button click
searchButton.addEventListener('click',async () => {
  const city = searchInput.value;
  const weatherData = await getWeatherDataByCity(city);
  updateWeather(weatherData);
});


// Event listener for the search Input click
function changePadding() {
  searchInput.style.padding = "10px 25px";
  searchInput.style.fontSize = "22px";
  searchInput.placeholder = "";
}