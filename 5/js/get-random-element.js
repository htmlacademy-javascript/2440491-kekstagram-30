import { getNumInRange } from "./get-num-in-range";
// Функция для генерации случайных слов
const getRandomElementIn = (array, maxNum) => {
  const sentences = [];
  for (let i = 0; i < getNumInRange(1, maxNum); i++){
    sentences.push(array[getNumInRange(0, array.length - 1) ?? 0]);
  }
  return sentences;
};
export {getRandomElementIn};
