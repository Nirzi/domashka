window.addEventListener('DOMContentLoaded', () => {
 const saveCity = localStorage.getItem('city');
 if (saveCity) {
   document.getElementById('search_city').value = saveCity;
 }
});

document.getElementById('search_button').addEventListener('click', (event) => {
  event.preventDefault();// Отключаем стандартное поведение
  const cityInput = document.getElementById('search_city').value.trim();
  localStorage.setItem('city', cityInput);

  if(cityInput === '') {
    alert('Пожалуйста, введите город.');
  }
  else{
    localStorage.setItem('city', cityInput);
    alert(`Вы ввели город: ${cityInput}`);
  }
})