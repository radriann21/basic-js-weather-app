const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = "https://api.openweathermap.org/data/2.5/weather?"

export async function getUserWeather(lat, lon) {
  const url = `${API_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`
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