const pictures = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

// Ф-ция для добавления фото в разметку
const createPhotos = function (photoDescriptions) {
  // генерируем 25 описаний для фото
  photoDescriptions.forEach((element) => {
    const photoCard = template.cloneNode(true);
    photoCard.querySelector('.picture__img').src = element.url;
    photoCard.querySelector('.picture__img').alt = element.description;
    photoCard.querySelector('.picture__likes').textContent = element.likes;
    photoCard.querySelector('.picture__comments').textContent = element.comments.length;
    fragment.append(photoCard);
  });

  pictures.append(fragment);
};
export {createPhotos};
