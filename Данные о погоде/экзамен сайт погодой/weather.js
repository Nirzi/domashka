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
    needweatherData.icon = data_weather.weather[0].icon; // Добавлено для иконки
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
        temp: data_forecast.list[i].main.temp,
        icon: data_forecast.list[i].weather[0].icon // Добавлено для иконки
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
  const air_quality_container = document.getElementById('air_quality_container');
  const air_quality_list = document.getElementById('air_quality_list') || createAirQualityList();
  const forecast_container = document.getElementById('forecast_container');

  city.innerHTML = '';
  weather_container.innerHTML = '';
  air_quality_container.innerHTML = '';
  forecast_container.innerHTML = '';

  // Отображение города
  const name_city = document.createElement('h3');
  name_city.textContent = `Сейчас в г.${needweatherData.name}`;
  city.appendChild(name_city);

  // Карточка погоды сейчас
  const weatherRow = document.createElement('div');
  weatherRow.className = 'row align-items-center';

  const iconCol = document.createElement('div');
  iconCol.className = 'col-md-3 text-center';
  const iconImg = document.createElement('img');
  iconImg.src = `http://openweathermap.org/img/wn/${needweatherData.icon}@2x.png`;
  iconImg.alt = needweatherData.description;
  iconImg.className = 'weather-icon';
  iconCol.appendChild(iconImg);

  const infoCol = document.createElement('div');
  infoCol.className = 'col-md-9';
  const description = document.createElement('h4');
  description.textContent = `${needweatherData.description}`;
  const temp = document.createElement('p');
  temp.innerHTML = `<strong>Температура:</strong> ${needweatherData.temp} °C<br>
                   <strong>Ощущается как:</strong> ${needweatherData.feels_like} °C<br>
                   <strong>Скорость ветра:</strong> ${needweatherData.wind_speed} м/с`;
  infoCol.appendChild(description);
  infoCol.appendChild(temp);

  weatherRow.appendChild(iconCol);
  weatherRow.appendChild(infoCol);
  weather_container.appendChild(weatherRow);

  // Карточка качества воздуха
  const airQualityHeader = document.createElement('h4');
  airQualityHeader.textContent = 'Качество воздуха';
  air_quality_container.appendChild(airQualityHeader);

  const airQualityTable = document.createElement('table');
  airQualityTable.className = 'table table-striped';
  const airQualityBody = document.createElement('tbody');

  const aqiRow = document.createElement('tr');
  aqiRow.innerHTML = `<th scope="row">Индекс качества воздуха (AQI)</th><td>${needweatherData.aqi}</td>`;
  airQualityBody.appendChild(aqiRow);

  const coRow = document.createElement('tr');
  coRow.innerHTML = `<th scope="row">CO</th><td>${needweatherData.co} µg/m³</td>`;
  airQualityBody.appendChild(coRow);

  const no2Row = document.createElement('tr');
  no2Row.innerHTML = `<th scope="row">NO2</th><td>${needweatherData.no2} µg/m³</td>`;
  airQualityBody.appendChild(no2Row);

  const pm25Row = document.createElement('tr');
  pm25Row.innerHTML = `<th scope="row">PM2.5</th><td>${needweatherData.pm2_5} µg/m³</td>`;
  airQualityBody.appendChild(pm25Row);

  const pm10Row = document.createElement('tr');
  pm10Row.innerHTML = `<th scope="row">PM10</th><td>${needweatherData.pm10} µg/m³</td>`;
  airQualityBody.appendChild(pm10Row);

  airQualityTable.appendChild(airQualityBody);
  air_quality_container.appendChild(airQualityTable);

  // Карточка прогноза
  const forecastHeader = document.createElement('h4');
  forecastHeader.textContent = 'Прогноз на 5 дней';
  forecast_container.appendChild(forecastHeader);

  const forecastTable = document.createElement('table');
  forecastTable.className = 'table table-hover';
  const forecastBody = document.createElement('tbody');

  // Отображаем прогноз каждые 3 часа, можно отфильтровать для отображения по дням
  needweatherData.temperature_forecast.forEach(forecast => {
    const forecastRow = document.createElement('tr');
    
    const dateCol = document.createElement('td');
    const date = new Date(forecast.dt_txt);
    dateCol.textContent = date.toLocaleString('ru-RU', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    const iconCol = document.createElement('td');
    const forecastIcon = document.createElement('img');
    forecastIcon.src = `http://openweathermap.org/img/wn/${forecast.icon}@2x.png`;
    forecastIcon.alt = forecast.temp;
    forecastIcon.className = 'weather-icon';
    iconCol.appendChild(forecastIcon);

    const tempCol = document.createElement('td');
    tempCol.innerHTML = `<strong>${forecast.temp} °C</strong>`;

    forecastRow.appendChild(dateCol);
    forecastRow.appendChild(iconCol);
    forecastRow.appendChild(tempCol);
    forecastBody.appendChild(forecastRow);
  });

  forecastTable.appendChild(forecastBody);
  forecast_container.appendChild(forecastTable);
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
    const city = search_city.value.trim();
    if (city === '') {
      alert('Пожалуйста, введите название города.');
      return;
    }
    const apikey = 'ef209120327b90dd8e685562d563a3a5';
    const url_weather = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric&lang=ru`;
    const url_forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric&lang=ru`;

    const weatherData = await parseWeatherData(url_weather, url_forecast);
    if (weatherData) {
      renderWeatherData(weatherData);
      // Сохраняем город в локальное хранилище
      saveToLocalStorage(city);
    } else {
      alert('Не удалось получить данные. Проверьте правильность названия города.');
    }
  });
});

// Функция для создания списка качества воздуха (если необходимо)
function createAirQualityList() {
  const air_quality_container = document.getElementById('air_quality_container');
  const air_quality_list = document.createElement('ul');
  air_quality_list.id = 'air_quality_list';
  air_quality_container.appendChild(air_quality_list);
  return air_quality_list;
}
