let needweatherData = {
  temperature_forecast: []
};

// Функция для сохранения города в локальное хранилище
function saveToLocalStorage(city) {
  localStorage.setItem('lastCity', city);
}

// Функция для загрузки города из локального хранилища
function loadFromLocalStorage() {
  return localStorage.getItem('lastCity');
}

async function parseWeatherData(url_weather, url_forecast) {
  try {
    const response_weather = await fetch(url_weather);
    const data_weather = await response_weather.json();
    console.log(data_weather);

    const lat = data_weather.coord.lat;
    const lon = data_weather.coord.lon;

    const apikey = 'ef209120327b90dd8e685562d563a3a5';
    const url_air = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric&lang=ru`;
    const response_air = await fetch(url_air);
    const data_air = await response_air.json();
    console.log(data_air);

    const response_forecast = await fetch(url_forecast);
    const data_forecast = await response_forecast.json();
    console.log(data_forecast);

    needweatherData.name = data_weather.name;
    needweatherData.description = data_weather.weather[0].description;
    needweatherData.temp = data_weather.main.temp;
    needweatherData.feels_like = data_weather.main.feels_like;
    needweatherData.wind_speed = data_weather.wind.speed;

    const air_data = data_air.list[0].components;
    needweatherData.aqi = data_air.list[0].main.aqi;
    needweatherData.co = air_data.co;
    needweatherData.no2 = air_data.no2;
    needweatherData.pm2_5 = air_data.pm2_5;
    needweatherData.pm10 = air_data.pm10;

    needweatherData.temperature_forecast = [];

    for (let i = 0; i < data_forecast.list.length; i++) {
      needweatherData.temperature_forecast.push({
        dt_txt: data_forecast.list[i].dt_txt,
        temp: data_forecast.list[i].main.temp
      });
    }
    return needweatherData;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
}

function renderWeatherData(needweatherData) {
  const weather_container = document.getElementById('weather_container');
  const city = document.getElementById('city');
  const air_quality_list = document.getElementById('air_quality_list');
  const forecast_container = document.getElementById('forecast_container');

  city.innerHTML = '';
  weather_container.innerHTML = '';
  air_quality_list.innerHTML = '';
  forecast_container.innerHTML = '';

  const name_city = document.createElement('h3');
  name_city.textContent = `Сейчас в г.${needweatherData.name}`;
  city.appendChild(name_city);

  const description = document.createElement('h3');
  description.textContent = `Описание: ${needweatherData.description}`;
  weather_container.appendChild(description);

  const list = document.createElement('ul');

  const temp = document.createElement('li');
  temp.textContent = `Температура: ${needweatherData.temp} °C`;
  list.appendChild(temp);

  const feels_like = document.createElement('li');
  feels_like.textContent = `Ощущается как: ${needweatherData.feels_like} °C`;
  list.appendChild(feels_like);

  const wind_speed = document.createElement('li');
  wind_speed.textContent = `Скорость ветра: ${needweatherData.wind_speed} м/c`;
  list.appendChild(wind_speed);

  weather_container.appendChild(list);

  const h3_air_quality = document.getElementById('h3_air_quality');
  h3_air_quality.textContent = 'Качество воздуха';
  const aqi = document.createElement('li');
  aqi.textContent = `Индекс качества воздуха (AQI): ${needweatherData.aqi}`;
  air_quality_list.appendChild(aqi);

  const co = document.createElement('li');
  co.textContent = `CO: ${needweatherData.co} µg/m³`;
  air_quality_list.appendChild(co);

  const no2 = document.createElement('li');
  no2.textContent = `NO2: ${needweatherData.no2} µg/m³`;
  air_quality_list.appendChild(no2);

  const pm25 = document.createElement('li');
  pm25.textContent = `PM2.5: ${needweatherData.pm2_5} µg/m³`;
  air_quality_list.appendChild(pm25);

  const pm10 = document.createElement('li');
  pm10.textContent = `PM10: ${needweatherData.pm10} µg/m³`;
  air_quality_list.appendChild(pm10);

  const forecast_h3 = document.createElement('h3');
  forecast_h3.textContent = 'Прогноз на 5 дней';
  forecast_container.appendChild(forecast_h3);

  const forecast_list = document.createElement('ul');
  for (let i = 0; i < needweatherData.temperature_forecast.length; i++) {
    const forecast_element = document.createElement('li');
    forecast_element.textContent = `${needweatherData.temperature_forecast[i].dt_txt} ${needweatherData.temperature_forecast[i].temp} °C`;
    forecast_list.appendChild(forecast_element);
  }
  forecast_container.appendChild(forecast_list);
}

document.addEventListener('DOMContentLoaded', async () => {
  const search_button = document.getElementById('search_button');
  const search_city = document.getElementById('search_city');

  // Проверка на наличие сохранённого города
  const savedCity = loadFromLocalStorage();
  if (savedCity) {
    search_city.value = savedCity;
    const apikey = 'da25d3a138e89006c560047a0faaaa4b';
    const url_weather = `https://api.openweathermap.org/data/2.5/weather?q=${savedCity}&appid=${apikey}&units=metric&lang=ru`;
    const url_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${savedCity}&appid=${apikey}&units=metric&lang=ru`;
    const weatherData = await parseWeatherData(url_weather, url_forecast);
    if (weatherData) {
      renderWeatherData(weatherData);
    }
  }

  search_button.addEventListener('click', async () => {
    const city = search_city.value;
    const apikey = 'ef209120327b90dd8e685562d563a3a5';
    const url_weather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric&lang=ru`;
    const url_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric&lang=ru`;

    const weatherData = await parseWeatherData(url_weather, url_forecast);
    if (weatherData) {
      renderWeatherData(weatherData);
      // Сохраняем город в локальное хранилище
      saveToLocalStorage(city);
    }
  });
});


