import { getUserWeather } from "./services/getUserWeather.js";
import { getInputWeather } from "./services/getInputWeather.js";

const weatherImg = document.getElementById('weatherImg')
const weather = document.getElementById('weather')
const description = document.getElementById('description')
const cityForm = document.getElementById('cityForm')
const cityInput = document.getElementById('cityInput')

let city = ''

function updateUI(data) {
  weatherImg.src = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png'
  weather.innerText = data.weather[0].main
  description.innerText = data.weather[0].description
}

cityInput.addEventListener('change', (evt) => {
  city = evt.target.value
})

cityForm.addEventListener('submit', async (evt) => {
  evt.preventDefault()
  try {
    const data = await getInputWeather(city)
    updateUI(data)
  } catch(err) {
    weather.innerText = 'Weather data not avaliable'
    description.innerText = ''
    weatherImg.src = ''
  }
})

function setUserWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const data = await getUserWeather(latitude, longitude);
        updateUI(data);
      } catch (error) {
        weather.innerText = 'Error fetching weather data';
        description.innerText = '';
        weatherImg.src = '';
        console.error('Error fetching weather data:', error);
      }
    }, (error) => {
      weather.innerText = 'Geolocation error: ' + error.message;
      description.innerText = '';
      weatherImg.src = '';
      console.error('Geolocation error:', error);
    });
  } else {
    weather.innerText = 'Your browser does not support geolocation!';
    description.innerText = '';
    weatherImg.src = '';
  }
}

document.addEventListener('DOMContentLoaded', setUserWeather)
