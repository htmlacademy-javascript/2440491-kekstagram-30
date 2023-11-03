import { createNewElement, getNumInRange } from './util';

const body = document.querySelector('body');
const popUp = document.querySelector('.big-picture');
const photo = popUp.querySelector('.big-picture__img').querySelector('img');
const likes = popUp.querySelector('.likes-count');
const commentsShown = popUp.querySelector('.social__comment-shown-count');
const commentsAll = popUp.querySelector('.social__comment-total-count');
const commentsBlock = popUp.querySelector('.social__comments');
const descriptionText = popUp.querySelector('.social__caption');
const closeButton = popUp.querySelector('.big-picture__cancel');
const countCommentsBlock = document.querySelector('.social__comment-count');
const countCommentsBlock2 = document.querySelector('.comments-loader');
/*
<li class="social__comment">
  <img
    class="social__picture"
    src="{{аватар}}"
    alt="{{имя комментатора}}"
    width="35" height="35">
  <p class="social__text">{{текст комментария}}</p>
</li>
*/


let countImage = 0;

const closeAll = function () {
  popUp.classList.add('hidden');
  countCommentsBlock.classList.remove('hidden');
  countCommentsBlock2.classList.remove('hidden');
  body.classList.remove('modal-open');
};

// Функция для создания комментариев к фото
const createPhotoComments = function (photoComments) {
  commentsBlock.innerHTML = '';
  if (photoComments !== 0){
    let countOfComments = 0;
    for (let i = 0; i < getNumInRange(1, photoComments.length); i++){
      const photoComment = photoComments[i];
      const commentLi = createNewElement('li','social__comment');
      const commentImg = createNewElement('img','social__picture');
      commentImg.src = photoComment.avatar;
      commentImg.alt = photoComment.name;
      commentImg.width = 35;
      commentImg.height = 35;
      const commentText = createNewElement('p', 'social__text', photoComment.message);
      commentLi.append(commentImg);
      commentLi.append(commentText);
      commentsBlock.append(commentLi);
      countOfComments++;
    }
    commentsShown.textContent = countOfComments;
    commentsAll.textContent = photoComments.length;
  }
};

// Функция для изменения фотокарточки
const changePhotoCard = function (photoCard) {
  photo.src = photoCard.url;
  photo.alt = photoCard.description;
  likes.textContent = photoCard.likes;
  descriptionText.textContent = photoCard.description;
  createPhotoComments(photoCard.comments);
};

// Открываем попап с фото из массива элементов [photoDescriptions]
const openPopUp = function (el, photoDescriptions, photoNumber) {
  el.addEventListener('click', () => {
    changePhotoCard(photoDescriptions[photoNumber]);
    popUp.classList.remove('hidden');
    countCommentsBlock.classList.add('hidden');
    countCommentsBlock2.classList.add('hidden');
    body.classList.add('modal-open');
  });
};

// главная функция открытия
const openBigPhoto = function (photoDescriptions) {
  const miniPictures = document.querySelectorAll('.picture__img');
  miniPictures.forEach((element) => {
    openPopUp(element, photoDescriptions, countImage);
    countImage++;
  });
  closeButton.addEventListener('click', closeAll);
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape'){
      closeAll();
    }
  });
};

export {openBigPhoto};
