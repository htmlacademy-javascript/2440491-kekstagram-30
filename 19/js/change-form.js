import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';
import '../vendor/nouislider/nouislider.css';
import { sendData } from './api.js';

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const inputChangePhoto = form.querySelector('.img-upload__input');
const hashtagsInput = form.querySelector('[name="hashtags"]');
const commentText = form.querySelector('.text__description');
const mainPopup = form.querySelector('.img-upload__overlay');
const previewPhoto = mainPopup.querySelector('.img-upload__preview').querySelector('img');
const buttonClose = mainPopup.querySelector('.img-upload__cancel');
const submitButton = mainPopup.querySelector('.img-upload__submit');
let validOption = true;
let validOption2 = true;
let currentScale = 1;

const sliderEl = mainPopup.querySelector('.effect-level__slider');
const sliderValue = mainPopup.querySelector('.effect-level__value');

const buttonScaleMinus = mainPopup.querySelector('.scale__control--smaller');
const buttonScalePlus = mainPopup.querySelector('.scale__control--bigger');
const scaleInput = mainPopup.querySelector('.scale__control--value');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

// Ф-ция для изменения масштаба фото
const changeScale = function () {
  const checkScaleButton = function(operator) {
    let checkScaleValue;
    let changeScaleValue;
    if (operator === '+') {
      checkScaleValue = 1;
      changeScaleValue = currentScale + 0.25;
    } else {
      checkScaleValue = 0.25;
      changeScaleValue = currentScale - 0.25;
    }
    if (currentScale > checkScaleValue || currentScale < checkScaleValue) {
      currentScale = changeScaleValue;
      previewPhoto.style.transform = `scale(${currentScale})`;
    }
    scaleInput.value = `${currentScale * 100}%`;
  };
  buttonScaleMinus.addEventListener('click', () => {
    checkScaleButton('-');
  });
  buttonScalePlus.addEventListener('click', () => {
    checkScaleButton('+');
  });
};

const filtersEl = mainPopup.querySelectorAll('.effects__radio');

// Ф-ция для создания фильтра для фото
const createPhotoFilter = function () {
  let lastFilter;
  sliderEl.parentElement.classList.add('hidden');
  // Создаем слайдер
  noUiSlider.create(sliderEl, {
    start: 0,
    step: 1,
    connect: 'lower',
    range: {
      'min': 0,
      'max': 100
    }
  });
  // Словарь с фильтрами и их значениями для css: filter
  sliderValue.value = 0;
  const filters = {
    none: '',
    chrome: 'grayscale',
    sepia: 'sepia',
    marvin: 'invert',
    phobos: 'blur',
    heat: 'brightness'
  };
  // Словарь с промежутками и шагами
  const filtersRange = {
    none: '',
    chrome: '0:1:0.1',
    sepia: '0:1:0.1',
    marvin: '0:100:1:%',
    phobos: '0:3:0.1:px',
    heat: '1:3:0.1',
  };

  // Ф-ция для смены фильтра
  const changeFilter = function (filter) {
    if (filter !== 'none' && filter !== lastFilter) {
      // Формируем массив из объекта 'filtersRange' для предачи нужных параметров
      const filterRange = filtersRange[filter].split(':').slice(0,3).map((el) => Number(el));
      if (filterRange){
        sliderEl.noUiSlider.updateOptions({
          start: 0,
          range: {
            min: filterRange[0],
            max: filterRange[1],
          },
          step: filterRange[2],
        });
        sliderEl.parentElement.classList.remove('hidden');
        // Ф-ция для изменения текущего значения фильтра
        const changeFilterValue = function (currentFilterValue) {
          const filterValue = currentFilterValue + (filtersRange[filter].split(':')[3] || '');
          previewPhoto.style.filter = `${filters[filter]}(${filterValue})`;
        };
        sliderEl.noUiSlider.on('update', () => {
          sliderValue.value = sliderEl.noUiSlider.get();
          changeFilterValue(sliderValue.value);
        });
        changeFilterValue(filterRange[0]);
      }
    } else if (filter === 'none' && filter !== lastFilter) {
      sliderEl.parentElement.classList.add('hidden');
      previewPhoto.style.filter = null;
    }
    lastFilter = filter;
  };

  filtersEl.forEach((filterEl) => {
    filterEl.addEventListener('click', () => {
      changeFilter(filterEl.value);
    });
  });
};

const errorMesages = {
  Hashtag: 'Хэштэг должен включать в себя только: буквы из русского или английского алфавитов, любые цифры и начинаться с #',
  Comment: 'Число символов превышает 140, сократите ваш текст пожалуйста'
};

// Загрузить попап с изображением
const uploadImage = function () {
  const FILES_NAME = ['jpg', 'png', 'jpeg', 'webp'];
  inputChangePhoto.addEventListener('change', () => {
    const file = inputChangePhoto.files[0];
    const fileName = file.name.toLowerCase();
    const correct = FILES_NAME.some((end) => fileName.endsWith(end));
    if (correct){
      previewPhoto.src = URL.createObjectURL(file);
    }
  });
  const disableButton = function (button) {
    button.disabled = true;
  };
  const enableButton = function (button) {
    button.disabled = false;
  };
  const toggleButtonFromInput = function (button, input, condition) {
    if ((input.value === '' || condition) && validOption && validOption2) {
      enableButton(button);
    } else {
      disableButton(button);
    }
    return (input.value === '' || condition);
  };
  const disabledForClose = function (el) {
    el.addEventListener('keydown', (evt) => {
      evt.stopPropagation();
    });
  };
  const addHashtag = function () {
    const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
    const checkHashtag = function () {
      const value = hashtagsInput.value;
      let validHashtag = true;
      if (value !== ''){
        validHashtag = hashtag.test(value);
        validOption = toggleButtonFromInput(submitButton, hashtagsInput, validHashtag);
        toggleButtonFromInput(submitButton, hashtagsInput, validHashtag);
      }
      return validHashtag;
    };
    disabledForClose(hashtagsInput);
    pristine.addValidator(hashtagsInput, checkHashtag, errorMesages.Hashtag);
  };
  const addComment = function () {
    const checkCommentLength = function () {
      const validComment = commentText.value.length <= 140;
      validOption2 = toggleButtonFromInput(submitButton, commentText, validComment);
      toggleButtonFromInput(submitButton, commentText, validComment);
      return validComment;
    };
    disabledForClose(commentText);
    pristine.addValidator(commentText, checkCommentLength, errorMesages.Comment);
  };
  inputChangePhoto.onchange = function () {
    mainPopup.classList.remove('hidden');
    body.classList.add('modal-open');
    addHashtag();
    addComment();
  };

  // Закрыть всё
  const closeAll = function () {
    inputChangePhoto.value = '';
    hashtagsInput.value = '';
    commentText.value = '';
    mainPopup.classList.add('hidden');
    body.classList.remove('modal-open');
    previewPhoto.style.transform = null;
    currentScale = 1;
    scaleInput.value = '100%';
    submitButton.textContent = 'Опубликовать';
    sliderEl.parentElement.classList.add('hidden');
    previewPhoto.style.filter = null;
    filtersEl[0].click();
  };

  buttonClose.addEventListener('click', closeAll);
  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape'){
      closeAll();
    }
  });

  // После отправки формы
  form.addEventListener('submit', (evt) => {
    const addListenersForBlock = function (block, button, inner) {
      let flag = false;
      button.addEventListener('click', () => {
        block.remove();
      });
      window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape'){
          block.remove();
        }
      });
      window.addEventListener('mousedown', () => {
        flag = true;
      });
      inner.addEventListener('mouseup', () => {
        flag = false;
      });
      window.addEventListener('click', () => {
        if (flag) {
          block.remove();
        }
      });
    };

    const showSuccessMesage = function (templateSelector, buttonSelector, innerSelector) {
      const template = document.querySelector(templateSelector).content.querySelector('section');
      const success = template.cloneNode(true);
      const successButton = success.querySelector(buttonSelector);
      const successInner = success.querySelector(innerSelector);
      addListenersForBlock(success, successButton, successInner);
      body.append(success);
    };
    evt.preventDefault();
    pristine.validate();
    disableButton(submitButton);
    submitButton.textContent = 'Опубликовываю...';
    sendData(new FormData(evt.target))
      .then(() => {
        closeAll();
        enableButton(submitButton);
        showSuccessMesage('#success', '.success__button', '.success__inner');
      })
      .catch((err) => {
        showSuccessMesage('#error', '.error__button', '.error__inner');
        enableButton(submitButton);
        submitButton.textContent = 'Опубликовывать';
        throw new Error(err);
      });
  });
};

export {uploadImage, changeScale, createPhotoFilter};
