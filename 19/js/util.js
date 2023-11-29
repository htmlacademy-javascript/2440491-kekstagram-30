// Функция получения id
const getUniqueId = () => {
  let id = 0;
  return function () {
    id += 1;
    return id;
  };
};

// Функция генерации случайных чисел в диапазоне
const getNumInRange = (min, max) => {
  const minNum = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const maxNum = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
  return result;
};

// Функция для генерации случайных слов
const getRandomElementIn = (array, maxNum) => {
  const sentences = [];
  for (let i = 0; i < getNumInRange(1, maxNum); i++){
    sentences.push(array[getNumInRange(0, array.length - 1) ?? 0]);
  }
  return sentences;
};

// Функция для генерации случайных неповторяющихся элементов в массиве
const getUniqueRandom = (array, maxNum) => {
  const randomElements = [];
  const arrayLength = array.length;
  for (let i = 0; i < maxNum; i++) {
    let el = getNumInRange(0, arrayLength - 1);
    while (randomElements.indexOf(array[el]) >= 0) {
      el = getNumInRange(0, arrayLength - 1);
    }
    randomElements.push(array[el]);
  }
  return randomElements;
};

// Функция для создания элемента
const createNewElement = function (tag, tegClass, text) {
  const el = document.createElement(tag);
  el.classList.add(tegClass);
  if (text){
    el.textContent = text;
  }
  return el;
};

let timeoutId;
// eslint-disable-next-line arrow-body-style
const debounce = (callback, timeoutDelay = 500) => {
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getUniqueId, getNumInRange, getRandomElementIn, createNewElement, getUniqueRandom, debounce};
