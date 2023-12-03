import { getData } from './api';
import { openBigPhoto } from './open-fullsize-photo';
import { showSuccessMesage } from './show-message';
import { getUniqueRandom, debounce } from './util';

const pictures = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

const fragment = document.createDocumentFragment();

const filtersBlock = document.querySelector('.img-filters');
const filterDefault = filtersBlock.querySelector('#filter-default');
const filterRandom = filtersBlock.querySelector('#filter-random');
const filterDiscussed = filtersBlock.querySelector('#filter-discussed');
let lastButton = filterDefault;
const body = document.querySelector('body');

const TIMEOUT = 500;
// Ф-ция для добавления фото в разметку
const createPhotos = function (photoDescriptions) {
  const removePhotos = function () {
    pictures.querySelectorAll('a').forEach((el) => el.remove());
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
  // Ф-ция для сортировки по комментариям
  const sortComments = function (el1, el2) {
    const commentsEl1 = el1.comments.length;
    const commentsEl2 = el2.comments.length;
    return commentsEl2 - commentsEl1;
  };
  // Функции фильтров
  const filtersFunction = [filterDefault, photoDescriptions, filterRandom, getUniqueRandom(photoDescriptions, 10), filterDiscussed, photoDescriptions.slice().sort(sortComments)];
  // Ф-ция для изменения фотофильтра
  const activeClass = 'img-filters__button--active';
  const changeActiveEl = function (el) {
    el.classList.add(activeClass);
    lastButton.classList.remove(activeClass);
    lastButton = el;
  };
  const refreshPhotos = function (cb) {
    cb();
  };
  for (let i = 0; i < filtersFunction.length; i += 2) {
    filtersFunction[i].addEventListener('click', (evt) => {
      changeActiveEl(evt.target);
      refreshPhotos(debounce(() => loadPhotos(filtersFunction[i + 1]), TIMEOUT));
    });
  }
  filtersBlock.classList.remove('img-filters--inactive');
  loadPhotos(photoDescriptions);
};
// Ф-ция для получения данных от сервера
const getPhotosFromServer = function () {
  getData()
    .then((photos) => {
      createPhotos(photos);
    })
    .catch(() => {
      showSuccessMesage(body, '#data-error');
    });
};
export {createPhotos, getPhotosFromServer};
