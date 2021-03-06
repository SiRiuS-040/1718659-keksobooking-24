import {isEscapeKey} from './util.js';

const ALERT_SHOW_TIME = 10000;
const LOAD_ERROR_TEXT = 'Не удалось загрузить объявления с сервера :(';

const body = document.querySelector('body');
const contentPopupSuccess = document.querySelector('#success').content;
const messageSuccessTemplate = contentPopupSuccess.querySelector('.success');
const contentPopupError = document.querySelector('#error').content;
const messageErrorTemplate = contentPopupError.querySelector('.error');
const successMessage = messageSuccessTemplate.cloneNode(true);
const errorMessage = messageErrorTemplate.cloneNode(true);

const makePopupMessage = (messageType) =>  {
  body.appendChild(messageType);

  const onKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      messageType.remove();
    }
  };

  document.addEventListener('keydown', onKeydown, {once: true});

  messageType.addEventListener('click', () => {
    messageType.remove();
    document.removeEventListener('keydown', onKeydown);
  }, {once: true});
};

const makeLoadErrorMessage = () =>  {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = '20px';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '28px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'orange';

  alertContainer.textContent = LOAD_ERROR_TEXT;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {makePopupMessage, successMessage, errorMessage, makeLoadErrorMessage};
