let weatherData = {
  "coord": {"lon": 30.2642, "lat": 59.8944},
  "weather": [{"id": 800, "main": "Clear", "description": "ясно", "icon": "01n"}],
  "base": "stations",
  "main": {"temp": 15.03, "feels_like": 14.65, "temp_min": 14.08, "temp_max": 15.03, "pressure": 1011, "humidity": 79, "sea_level": 1011, "grnd_level": 1009},
  "visibility": 10000,
  "wind": {"speed": 3, "deg": 150},
  "clouds": {"all": 0},
  "dt": 1727203506,
  "sys": {"type": 2, "id": 197864, "country": "RU", "sunrise": 1727149703, "sunset": 1727193203},
  "timezone": 10800,
  "id": 498817,
  "name": "Санкт-Петербург",
  "cod": 200
};
let needweatherData = {};
function parseWeatherData(weatherData){
  needweatherData.name = weatherData.name;
  needweatherData.description = weatherData.weather[0].description;
  needweatherData.temp = weatherData.main.temp;
  needweatherData.feels_like = weatherData.main.feels_like;
  needweatherData.wind_speed = weatherData.wind.speed;
  return needweatherData;
}
function renderWeatherData(needweatherData){
  const weather_container = document.getElementById('weather_container');
  const city = document.getElementById('city')

  const name_city = document.createElement('h3');
  name_city.textContent = ` Сейчас в г.${needweatherData.name}`;
  city.appendChild(name_city);

  const description = document.createElement('h3')
  description.textContent = `Описание: ${needweatherData.description}`;
  weather_container.appendChild(description);

  const list = document.createElement('ul');

  const temp = document.createElement('li')
  temp.textContent = `Температура: ${needweatherData.temp} °C`
  list.appendChild(temp);

  const feels_like = document.createElement('li')
  feels_like.textContent = `Ощущается как: ${needweatherData.feels_like} °C`
  list.appendChild(feels_like);

  const wind_speed = document.createElement('li')
  wind_speed.textContent = `Скорость ветра: ${needweatherData.wind_speed} м/c`
  list.appendChild(wind_speed);

  weather_container.appendChild(list);
}
document.addEventListener('DOMContentLoaded', () => {
  parseWeatherData(weatherData);
  renderWeatherData(needweatherData);
});
