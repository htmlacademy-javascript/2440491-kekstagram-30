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

export {getUniqueId, getNumInRange, getRandomElementIn};
