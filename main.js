import { getUserWeather } from "./services/getUserWeather.js";

const weatherImg = document.getElementById('weatherImg')
const weather = document.getElementById('weather')
const description = document.getElementById('description')

function updateUI(data) {
  weatherImg.src = 'https://openweathermap.org/img/w/' + data.weather[0].icon + '.png'
  weather.innerText = data.weather[0].main
  description.innerText = data.weather[0].description
}

function setUserWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const data = await getUserWeather(latitude, longitude)
      updateUI(data)
    })
  }
}

document.addEventListener('DOMContentLoaded', setUserWeather)
