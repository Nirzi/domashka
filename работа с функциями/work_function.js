

proverbs = [
  "Ум хорошо, а два лучше.",
  "Ум — горячая штука.",
  "Ум всё голова.",
  "Умом Россию не понять.",
  "Ум бережет, а глупость губит.",
  "Ум в голову приходит.",
  "Ум от ума не горит.",
  "Умом нагружен, а волосы развеваются.",
  "Умом обдумал, а ногами пошел.",
  "Ум — сокровище, не пропадет без него и копье на ветру.",
  "Ум — грех, а бес — мера.",
  "Ум есть богатство.",
  "Ум роднит народы.",
  "Ум краток, да забот — бездна.",
  "Ум не камень, взял и положил.",
  "Ум не велит, а наставляет.",
  "Ум с мерой, а глупость без меры.",
  "Ум — сокол, глаз его — телескоп.",
  "Ум — не конская морда, не разобьешь.",
  "Ум — семь пядей во лбу.",
  "Ум — не барсук, в нору не залезет.",
  "Ум в голове, а не на ветру.",
  "Ум греет душу, а глупость терпение.",
  "Ум служит человеку, а глупость — хозяином.",
  "Ум мил, да безумству хозяин.",
  "Ум в труде, да наслаждение в праздности.",
  "Ум глаза исправляет.",
  "Ум человека не обманешь.",
  "Ум на подобии огня — без сна не останешься.",
  "Ум к уму приходит.",
  "Ум с пользой тратит время.",
  "Ум желание творит.",
  "Ум общего дела дело.",
  "Ум — друг, а воля — враг.",
  "Ум — бесценное сокровище.",
  "Ум тонок, да разум невелик.",
  "Ум — враг бедности.",
  "Ум — теремок, да не на прокол.",
  "Ум силен, да не камень.",
  "Ум рассудит, что сердце не посоветует.",
  "Ум — подкова, а топор — ось.",
  "Ум легче камня, да весомей золота.",
  "Ум не вешать на гроздья.",
  "Ум — не мешок, на плечи не вешай.",
  "Ум — лучшая победа.",
  "Ум — в суде велик, а в деле своем мал.",
  "Ум голове краса.",
  "Ум — сокровище, а глупость — нищета.",
  "Ум человека — огонь, а глаза — масло.",
  "Ум — путь, а дорога — конец.",
  "Ум стоит денег.",
  "Ум от смеха бьет в ладоши.",
  "Ум — коза, к барскому плечу привыкает.",
  "Ум — лезвие, а лень — ржавчина.",
  "Ум на вершине — мир в руках.",
]

variants = [
  'кот',
  'шеф',
  'мозг',
  'фолк',
  'код',
  'рот',
  'мёд',
  'лук',
  'лес',
  'год',
  'час',
  'друг',
  'жена',
  'муж',
  'айфон',
  'работа',
]
document.getElementById('proverbsform').addEventListener('submit', function(event) {
  event.preventDefault();
  const number_proverbs = parseInt(document.getElementById('number_proverbs').value);
  if (isNaN(number_proverbs) || number_proverbs <= 0) {
    alert("Пожалуйста, введите положительное число.");
    return;
  }  
  displayProverbs(generateMultipleProverbs(number_proverbs, variants, proverbs))
});
let new_proverbs

// Функция для генерации одной пословицы, заменяя слово "Ум" на случайный вариант
function generateProverb(variants, proverbs){
  // Проверяем, пуст ли один из массивов
  const validmessage = validateArrays(proverbs, variants);
  if(validmessage !== true) {
    return validmessage;
  }
  // Генерируем случайные индексы для массивов
  let index_proverbs = Math.floor(Math.random() * proverbs.length)
  let index_variants = Math.floor(Math.random() * variants.length)

  // Выбираем случайную пословицу и случайный вариант по сгенерированным индексам
  let select_proverbs = proverbs[index_proverbs]
  let select_variants = variants[index_variants]

  // Заменяем слово "Ум" в выбранной пословице на выбранный вариант
  new_proverbs = select_proverbs.replace("Ум", select_variants);

  // Удаляем использованные элементы из массивов пословиц и вариантов
  proverbs.splice(index_proverbs, 1);
  variants.splice(index_variants, 1);
  return new_proverbs;

}
// Функция для генерации нескольких пословиц
function generateMultipleProverbs(count, variants, proverbs){
  const validmessage = validateArrays(proverbs, variants);
  if(validmessage !== true) {
    return validmessage;
  }
  // Создаем копии массивов пословиц и вариантов, чтобы удалялись пословацы и слова из массивов
  let proverbsCopy = proverbs.slice();
  let variantsCopy = variants.slice();
  // Массив для хранения сгенерированных пословиц
  let proverbsList = [];
  // Генерируем пословицы в цикле до указанного количества или пока не закончатся элементы
  for (let i = 0 ; i < count; i++){
    if (proverbsCopy.length === 0 || variantsCopy.length === 0) break;
    let genproverb = generateProverb(variantsCopy,proverbsCopy);
    proverbsList.push(genproverb);
  };
  return proverbsList;
}

// Функция для отображения списка пословиц на странице
function displayProverbs(proverbsList){
 let spisok = document.getElementById("spisok");
 spisok.innerHTML = '';
 for(let i = 0; i < proverbsList.length; i++){
  // Создаем новый элемент списка <li>
  const li = document.createElement('li');
  // Устанавливаем текст пословицы в элемент <li>
  li.textContent = `${proverbsList[i]}`;
  // Добавляем элемент <li> в список
  spisok.appendChild(li);
 }
 return "";
}

function validateArrays(variants, proverbs){
  if (proverbs.length === 0){
    return "Нету пословиц для замены"
  }
  if (variants.length === 0){
    return "Нету слов для замены"
  }
  return true;
}
