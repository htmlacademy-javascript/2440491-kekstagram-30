import '../vendor/pristine/pristine.min.js';
const body = document.querySelector('body');
const form = body.querySelector('.img-upload__form');
const inputChangePhoto = form.querySelector('.img-upload__input');
const hashtagsInput = form.querySelector('[name="hashtags"]');
const commentText = form.querySelector('.text__description');
const mainPopup = form.querySelector('.img-upload__overlay');
// eslint-disable-next-line no-unused-vars
const previewPhoto = mainPopup.querySelector('.img-upload__preview').querySelector('img');
const buttonClose = mainPopup.querySelector('.img-upload__cancel');
const submitButton = mainPopup.querySelector('.img-upload__submit');
let validOption = true;
let validOption2 = true;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
});

// Загрузить попап с изображением
const uploadImage = function() {
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
      const validHashtag = hashtag.test(hashtagsInput.value);
      validOption = toggleButtonFromInput(submitButton, hashtagsInput, validHashtag);
      toggleButtonFromInput(submitButton, hashtagsInput, validHashtag);
      return hashtag;
    };
    disabledForClose(hashtagsInput);
    pristine.addValidator(hashtagsInput, checkHashtag);
  };
  const addComment = function () {
    const checkCommentLength = function () {
      const validComment = commentText.value.length <= 140;
      validOption2 = toggleButtonFromInput(submitButton, commentText, validComment);
      toggleButtonFromInput(submitButton, commentText, validComment);
      return validComment;
    };
    disabledForClose(commentText);
    pristine.addValidator(commentText, checkCommentLength);
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
    mainPopup.classList.add('hidden');
    body.classList.remove('modal-open');
  };

  buttonClose.addEventListener('click', closeAll);
  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape'){
      closeAll();
    }
  });

};

export {uploadImage};
