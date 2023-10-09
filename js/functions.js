// Задаем переменные для 1 задания
let string = 'five';
const num = 4;

// Функция для проверки на максимальную длину
function checkMaxLength(str, maxNum) {
  str = String(str).toLowerCase();
  return str.length <= maxNum;
}

checkMaxLength(string, num);
// конец 1-ого задания

// Задаем перемменные для 2 задания
string = 'топот';

// Функция для проверки строки на палиндром
const isPalindrome = function (str) {
  str = str.toString().replaceAll(' ', '').toLowerCase();
  const halfLine = Math.round(str.length / 2);
  for (let i = 0; i < halfLine; i++){
    if (str[i] !== str[str.length - 1 - i]){
      return false;
    }
  }
  return halfLine !== 0;
}

isPalindrome('goog');
// конец 2-ого задания

// Объявляем переменные для 3 задачи
string = 'hello 25';

const toNumber = (str) => {
  str = String(str).replaceAll(' ', '');
  let result = '';
  for (let i = 0; i < str.length; i++){
    if (!Number.isNaN(parseInt(str[i], 10))){
      result += str[i];
    }
  }
  return result ? result : NaN;
}

toNumber(string);
// конец программы 3
