// Ф-ция для закрытия блока по 'ESC' или за блоком
const addListenersForBlock = function (block, button = null, inner) {
  let flag = false;
  if (button) {
    button.addEventListener('click', () => {
      block.remove();
    });
  }
  const clickEsc = function (evt) {
    evt.stopPropagation();
    if (evt.key === 'Escape'){
      block.remove();
      document.querySelector('body').removeEventListener('keydown', clickEsc);
    }
  };
  document.querySelector('body').addEventListener('keydown', clickEsc);
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

// Ф-ция для проявления блока по шаблону
const showSuccessMesage = function (body, templateSelector, buttonSelector = null, innerSelector = null) {
  const template = document.querySelector(templateSelector).content.querySelector('section');
  const success = template.cloneNode(true);
  let successButton = null;
  if (buttonSelector){
    successButton = success.querySelector(buttonSelector);
  }
  let successInner = success;
  if (innerSelector) {
    successInner = success.querySelector(innerSelector);
  }
  addListenersForBlock(success, successButton, successInner);
  body.append(success);
};

export {showSuccessMesage};
