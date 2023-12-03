import '../vendor/pristine/pristine.min.js';
import '../vendor/nouislider/nouislider.js';
import '../vendor/nouislider/nouislider.css';
import { sendData } from './api.js';
import { disabledForClose } from './util.js';
import { changeScale } from './scale.js';
import { showSuccessMesage } from './show-message.js';

const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const inputChangePhoto = form.querySelector('.img-upload__input');
const hashtagsInput = form.querySelector('[name="hashtags"]');
const commentText = form.querySelector('.text__description');
const mainPopup = form.querySelector('.img-upload__overlay');
const previewPhotosFilters = mainPopup.querySelectorAll('.effects__preview');
const previewPhoto = mainPopup.querySelector('.img-upload__preview').querySelector('img');
const buttonClose = mainPopup.querySelector('.img-upload__cancel');
const submitButton = mainPopup.querySelector('.img-upload__submit');
const filtersEl = mainPopup.querySelectorAll('.effects__radio');
let validOption = true;
let validOption2 = true;
let currentScale = 1;

const sliderEl = mainPopup.querySelector('.effect-level__slider');
const scaleInput = mainPopup.querySelector('.scale__control--value');

// Валидация пристин
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

// Сообщения с ошибками
const errorMessages = {
  Comment: 'Число символов превышает 140, сократите ваш текст пожалуйста',
  Hashtag: {
    alphabet: 'Хэштэг должен включать в себя только: буквы из русского или английского алфавитов, любые цифры и начинаться с #.',
    length: 'Хэштэг не может быть больше 20 символов!',
    space: 'Проверьте стоит ли между хэштэгами пробел.',
    repeats: 'Хештеги не должны повторяться!',
    number: 'Хештегов не может быть больше чем 5 шт'
  }
};

// Загрузить попап с изображением
const uploadImage = function () {
  changeScale(currentScale);
  const FILES_NAME = ['jpg', 'png', 'jpeg', 'webp'];
  inputChangePhoto.addEventListener('change', () => {
    mainPopup.classList.remove('hidden');
    body.classList.add('modal-open');
    const file = inputChangePhoto.files[0];
    const fileName = file.name.toLowerCase();
    const correct = FILES_NAME.some((end) => fileName.endsWith(end));
    if (correct){
      const previewUrl = URL.createObjectURL(file);
      previewPhoto.src = previewUrl;
      previewPhotosFilters.forEach((el) => {
        el.style.backgroundImage = `url(${previewUrl})`;
      });
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
  const pristineSpans = [null, null];
  const addHashtag = function () {
    const hashtag = /^#[a-zа-яё0-9]{1,19}$/i;
    let value;
    let lastHastags;
    let splitValue;
    // Проверка хэштэга
    const checkHashtag = function () {
      value = hashtagsInput.value;
      splitValue = value.split(' ').filter((el) => el !== '');
      let validHashtag = true;
      if (splitValue.length > 5){
        validHashtag = false;
        validOption = toggleButtonFromInput(submitButton, hashtagsInput, validHashtag);
        toggleButtonFromInput(submitButton, hashtagsInput, validHashtag);
      } else if (value !== ''){
        lastHastags = new Set();
        splitValue.slice(0, splitValue.length - 1).forEach((el) => {
          lastHastags.add(el.toLowerCase());
        });
        validHashtag = hashtag.test(!lastHastags.has(splitValue.at(-1).toLowerCase()) ? splitValue.at(-1) : false);
        validOption = toggleButtonFromInput(submitButton, hashtagsInput, validHashtag);
        toggleButtonFromInput(submitButton, hashtagsInput, validHashtag);
      } else{
        submitButton.disabled = false;
      }
      if (validHashtag) {
        const el = document.querySelectorAll('.img-upload__field-wrapper')[0].querySelector('span') ?? null;
        if (el) {
          pristineSpans[0] = el ? el : null;
          el.remove();
        }
      } else {
        const el = document.querySelectorAll('.img-upload__field-wrapper')[0];
        el.append(pristineSpans[0] ?? '');
        pristineSpans[0] = '';
      }
      return validHashtag;
    };
    const displayError = function () {
      let thisError = '';
      let checkSpaces = true;
      if (!hashtag.test(splitValue.at(-1).slice(0, 20))) {
        thisError += `${errorMessages.Hashtag.alphabet}`;
        splitValue.forEach((el) => {
          if(el.lastIndexOf('#') > 1){
            checkSpaces = false;
          }
        });
      }
      if (!checkSpaces) {
        thisError += ` ${errorMessages.Hashtag.space}`;
      }
      if (splitValue.at(-1).length > 20) {
        thisError += ` ${errorMessages.Hashtag.length}`;
      }
      if (lastHastags.has(splitValue.at(-1).toLowerCase())) {
        thisError += ` ${errorMessages.Hashtag.repeats}`;
      }
      if (splitValue.length > 5) {
        thisError += ` ${errorMessages.Hashtag.number}`;
      }
      return thisError;
    };
    disabledForClose(hashtagsInput);
    pristine.addValidator(hashtagsInput, checkHashtag, displayError);
  };
  const addComment = function () {
    const checkCommentLength = function () {
      const validComment = commentText.value.length <= 140;
      validOption2 = toggleButtonFromInput(submitButton, commentText, validComment);
      toggleButtonFromInput(submitButton, commentText, validComment);
      if (validComment) {
        const el = document.querySelectorAll('.img-upload__field-wrapper')[1].querySelector('span') ?? null;
        if (el) {
          pristineSpans[1] = el ? el : null;
          el.remove();
        }
      } else {
        const el = document.querySelectorAll('.img-upload__field-wrapper')[1];
        el.append(pristineSpans[1] ?? '');
        pristineSpans[1] = null;
      }
      return validComment;
    };
    disabledForClose(commentText);
    pristine.addValidator(commentText, checkCommentLength, errorMessages.Comment);
  };
  addHashtag();
  addComment();

  // Закрыть всё
  const closeAll = function () {
    inputChangePhoto.value = null;
    hashtagsInput.value = null;
    commentText.value = '';
    document.querySelectorAll('.pristine-error').forEach((element) => {
      element.style.display = 'none';
    });
    document.querySelector('.img-upload__field-wrapper').classList.remove('img-upload__field-wrapper--error');
    enableButton(submitButton);
    mainPopup.classList.add('hidden');
    body.classList.remove('modal-open');
    filtersEl[0].click();
    currentScale = 1;
    changeScale(currentScale);
    scaleInput.value = '100%';
    submitButton.textContent = 'Опубликовать';
    sliderEl.parentElement.classList.add('hidden');
    previewPhoto.style.filter = null;
    const el = document.querySelectorAll('.img-upload__field-wrapper')[1].querySelector('span') ?? null;
    if (el) {
      pristineSpans[1] = el ? el : null;
      el.remove();
    }
    const el2 = document.querySelectorAll('.img-upload__field-wrapper')[0].querySelector('span') ?? null;
    if (el2) {
      pristineSpans[0] = el2 ? el2 : null;
      el2.remove();
    }
  };

  buttonClose.addEventListener('click', closeAll);
  window.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
    if (evt.key === 'Escape'){
      closeAll();
    }
  });

  // После отправки формы
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
    disableButton(submitButton);
    submitButton.textContent = 'Опубликовываю...';
    sendData(new FormData(evt.target))
      .then(() => {
        closeAll();
        enableButton(submitButton);
        showSuccessMesage(body,'#success', '.success__button', '.success__inner');
      })
      .catch(() => {
        showSuccessMesage(body, '#error', '.error__button', '.error__inner');
        enableButton(submitButton);
        submitButton.textContent = 'Опубликовывать';
      });
  });
};

export {uploadImage};
