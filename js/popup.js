import {isEscapeKey} from './util.js';

const ALERT_SHOW_TIME = 10000;

const body = document.querySelector('body');
const contentPopupSuccess = document.querySelector('#success').content;
const messageSuccessTemplate = contentPopupSuccess.querySelector('.success');
const contentPopupError = document.querySelector('#error').content;
const messageErrorTemplate = contentPopupError.querySelector('.error');
const successMessage = messageSuccessTemplate.cloneNode(true);
const errorMessage = messageErrorTemplate.cloneNode(true);

const makePopupMessage = (messageType) =>  {
  body.appendChild(messageType);
  messageType.addEventListener('click', () => {
    messageType.remove();
  }, {once: true});
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      messageType.remove();
    }
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

  alertContainer.textContent = 'Не удалось загрузить объявления с сервера :(';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {makePopupMessage, successMessage, errorMessage, makeLoadErrorMessage};
