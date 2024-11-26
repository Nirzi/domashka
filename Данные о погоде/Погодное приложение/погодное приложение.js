async function getWeather() {
  const city = prompt('Введите город');
  const apikey = 'ef209120327b90dd8e685562d563a3a5';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric&lang=ru`;
  
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}
getWeather();