const mainPopup = document.querySelector('.img-upload__overlay');
const buttonScaleMinus = mainPopup.querySelector('.scale__control--smaller');
const buttonScalePlus = mainPopup.querySelector('.scale__control--bigger');
const scaleInput = mainPopup.querySelector('.scale__control--value');
const previewPhoto = mainPopup.querySelector('.img-upload__preview').querySelector('img');
let scaleValue;

// Ф-ция для изменения масштаба фото
const changeScale = function (currentScale, operator = null) {
  let checkScaleValue;
  let changeScaleValue;
  if (operator === '+') {
    checkScaleValue = 1;
    changeScaleValue = currentScale + 0.25;
  } else if (operator === '-') {
    checkScaleValue = 0.25;
    changeScaleValue = currentScale - 0.25;
  }
  if (currentScale > checkScaleValue || currentScale < checkScaleValue) {
    currentScale = changeScaleValue;
    previewPhoto.style.transform = `scale(${currentScale})`;
  }
  scaleValue = currentScale;
  scaleInput.value = `${currentScale * 100}%`;
};

buttonScaleMinus.addEventListener('click', () => {
  changeScale(scaleValue, '-');
});
buttonScalePlus.addEventListener('click', () => {
  changeScale(scaleValue, '+');
});

export {changeScale};
