import { getPhotoDescription } from './create-descriptions';

const pictures = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

// Ф-ция для добавления фото в разметку
const createPhotos = function () {
  // генерируем 25 описаний для фото
  const photoDescriptions = Array.from({length: 25}, getPhotoDescription);

  photoDescriptions.forEach((element) => {
    const photoCard = template.cloneNode(true);
    photoCard.querySelector('.picture__img').src = element.url;
    photoCard.querySelector('.picture__img').alt = element.description;
    photoCard.querySelector('.picture__likes').textContent = element.likes;
    let comments = -4;
    // eslint-disable-next-line no-unused-vars
    for (const el in element){
      comments++;
    }
    photoCard.querySelector('.picture__comments').textContent = comments;
    fragment.append(photoCard);
  });

  pictures.append(fragment);
};
export {createPhotos};
