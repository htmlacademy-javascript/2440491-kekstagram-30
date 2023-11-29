import { openBigPhoto } from './open-fullsize-photo';
import { getUniqueRandom, debounce } from './util';
const pictures = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

const filtersBlock = document.querySelector('.img-filters');
const filterDefault = filtersBlock.querySelector('#filter-default');
const filterRandom = filtersBlock.querySelector('#filter-random');
const filterDiscussed = filtersBlock.querySelector('#filter-discussed');
let lastButton = filterDefault;

const TIMEOUT = 500;
// Ф-ция для добавления фото в разметку
const createPhotos = function (photoDescriptions) {
  const removePhotos = function () {
    const picturesOnScreen = pictures.querySelectorAll('a');
    for (let i = 0; i < picturesOnScreen.length; i++) {
      picturesOnScreen[i].remove();
    }
  };
  // Ф-ция отрисовки изображений
  const loadPhotos = function (photos) {
    removePhotos();
    photos.forEach((element) => {
      const photoCard = template.cloneNode(true);
      photoCard.querySelector('.picture__img').src = element.url;
      photoCard.querySelector('.picture__img').alt = element.description;
      photoCard.querySelector('.picture__likes').textContent = element.likes;
      photoCard.querySelector('.picture__comments').textContent = element.comments.length;
      fragment.append(photoCard);
    });
    pictures.append(fragment);
    openBigPhoto(photos);
  };
  //Ф-ция для сортировки по комментариям
  const sortComments = function (el1, el2) {
    const commentsEl1 = el1.comments.length;
    const commentsEl2 = el2.comments.length;
    return commentsEl2 - commentsEl1;
  };
  // Ф-ция для изменения фильтров
  const activeClass = 'img-filters__button--active';
  const toggleActiveClass = function (el) {
    el.classList.toggle(activeClass);
  };
  filtersBlock.classList.remove('img-filters--inactive');
  const changeActiveEl = function (evt) {
    toggleActiveClass(lastButton);
    toggleActiveClass(evt.target);
    lastButton = evt.target;
  };
  const refreshPhotos = function (cb) {
    cb();
  };
  filterDefault.addEventListener('click', (evt) => {
    changeActiveEl(evt);
    refreshPhotos(debounce(() => loadPhotos(photoDescriptions), TIMEOUT));
  });
  filterRandom.addEventListener('click', (evt) => {
    changeActiveEl(evt);
    refreshPhotos(debounce(() => loadPhotos(getUniqueRandom(photoDescriptions, 10)), TIMEOUT));
  });
  filterDiscussed.addEventListener('click', (evt) => {
    changeActiveEl(evt);
    refreshPhotos(debounce(() => loadPhotos(photoDescriptions.slice().sort(sortComments)), TIMEOUT));
  });
  loadPhotos(photoDescriptions);
};
export {createPhotos};
