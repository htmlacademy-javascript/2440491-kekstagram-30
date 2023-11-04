import { createNewElement } from './util.js';

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

// Функция для загрузки комментариев
const loadComments = function (number, maxNum, photoComments) {
  for (let i = number; i < maxNum; i++){
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
  }
}
// Функция для создания комментариев к фото
const createPhotoComments = function (photoComments) {
  commentsBlock.innerHTML = '';
  if (photoComments !== 0){
    let countOfComments = 0;
    const maxNumber = photoComments.length;
    const checkComments = function () {
      if ((maxNumber - countOfComments) > 5) {
        loadComments(countOfComments, countOfComments + 5, photoComments);
        countOfComments += 5;
        commentsShown.textContent = countOfComments;
        countCommentsBlock2.classList.remove('hidden');
      } else {
        loadComments(countOfComments, maxNumber, photoComments);
        commentsShown.textContent = photoComments.length;
        countCommentsBlock2.classList.add('hidden');
        countCommentsBlock2.removeEventListener('click', checkComments);
      }
      commentsAll.textContent = photoComments.length;
    };
    countCommentsBlock2.addEventListener('click', checkComments);
    // Закрыть все!
    const closeAll = function () {
      popUp.classList.add('hidden');
      body.classList.remove('modal-open');
      countCommentsBlock2.removeEventListener('click', checkComments);
    };
    closeButton.addEventListener('click', closeAll);
    document.addEventListener('keydown', (evt) => {
      if (evt.key === 'Escape'){
        closeAll();
      }
    });
    //
    checkComments();
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
};

export {openBigPhoto};
