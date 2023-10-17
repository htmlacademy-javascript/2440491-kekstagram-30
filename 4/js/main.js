
// Функция генерации случайных чисел в диапазоне
const getNumInRange = (min, max) => {
  const minNum = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const maxNum = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
  return result;
};

// Функция получения id
const getUniqueId = () => {
  let id = 0;
  return function () {
    id += 1;
    return id;
  };
};

// Функция для генерации случайных слов
const getRandomElementIn = (array, maxNum) => {
  const sentences = [];
  for (let i = 0; i < getNumInRange(1, maxNum); i++){
    sentences.push(array[getNumInRange(0, array.length - 1) ?? 0]);
  }
  return sentences;
};

// Массивы
const COMMENTSTEXT = ['Всё отлично!','В целом всё неплохо. Но не всё.',
'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?'];
const NAMES = ['Ваня', 'Егор', 'Аля', 'Евдоким'];
const DESCRIPTIONS = ['Вот такая замечательная фоточка)', 'Я на море!!', 'Вот это еда!!', 'Холодильник'];

// Переменные для объекта
const createPhotoId = getUniqueId();
const createPhotoAddress = getUniqueId();
const createCommentsId = getUniqueId();

// Составляем объект для описания фотографии
const getPhotoDescription = () => {
  const createNumberOfLikes = getNumInRange(15, 200);
  const startDescription = {
    id: createPhotoId(),
    url: `photos/${createPhotoAddress()}.jpg`,
    description: getRandomElementIn(DESCRIPTIONS, 1),
    likes: createNumberOfLikes,
  };
  const getComment = () => {
    const createAvatarAddress = getNumInRange(1, 6);
    const comment = {
      id: createCommentsId(),
      avatar: `img/avatar-${createAvatarAddress}.svg`,
      message: getRandomElementIn(COMMENTSTEXT, 2),
      name: getRandomElementIn(NAMES, 1),
    };
    return comment;
  };
  // генерируем до 30 комментариев
  const comments = Array.from({length: getNumInRange(0, 30)}, getComment);
  // соединяем объекты startDescription и comments
  return Object.assign({}, startDescription, comments);
};
// генерируем 25 описаний для фото
const photoDescriptions = Array.from({length: 25}, getPhotoDescription);
