const API_URL = 'https://api.openweathermap.org/data/2.5/weather?'
const API_KEY = import.meta.env.VITE_API_KEY

export async function getInputWeather(city) {
  const url = `${API_URL}q=${city}&appid=${API_KEY}`
  const response = await fetch(url)
  if (!response.ok) {
    return {
      message: response.statusText
    }   
  } else {
    const data = await response.json()
    return data
  }
}