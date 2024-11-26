

const secretLetter = [
  ['DFВsjl24sfFFяВАДОd24fssflj234'],
  ['asdfFп234рFFdо24с$#afdFFтasfо'],
  ['оafбasdf%^о^FFжа$#af243ю'],
  ['afпFsfайFтFsfо13н'],
  ['fн13Fа1234де123юsdсsfь'],
  ['чFFтF#Fsfsdf$$о'],
  ['и$##sfF'],
  ['вSFSDам'],
  ['пSFоsfнрSDFаSFвSDF$иFFтsfaсSFя'],
  ['FFэasdfтDFsfоasdfFт'],
  ['FяDSFзFFsыSfкFFf']
];

const smallRus = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и',
  'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф',
  'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 'э', 'ю', 'я'];

// Создаём массив, для извлечённого текста
let decodedMessage = [];


  for(let j = 0; j < secretLetter.length; j++) {
    // Получаем строку из текущего элемента
    let stringElement = secretLetter[j][0];
    // Разбиваем строку на символы
    let lettersArray = stringElement.split('');
    // Проходимся по массиву и ищем русские буквы и добавляем их в новый массив decodedMessage
    for(let k = 0; k < lettersArray.length; k++){
        if(smallRus.includes(lettersArray[k])){
          decodedMessage.push(lettersArray[k]);
        }
    }
    // Добавляем прбел после каждого пройденного элемента массива secretLetter кроме 1, что бы получить предложение
    if(j < secretLetter.length - 1){
      decodedMessage.push(' ');
    }
  }
//Преобразуем массив в строку и выводим окончательный результат
alert(decodedMessage.join(''));