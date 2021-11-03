import {isEscapeKey, isEnterKey} from './util.js';

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
  const message = messageErrorTemplate.cloneNode(true);
  message.querySelector('.error__message').textContent = 'Что то сломалось :(';
  message.querySelector('.error__button').textContent = 'Перезагрузка страницы';
  body.appendChild(message);
  message.querySelector('.error__button').addEventListener('click', ()=> {
    location.reload();
    return false;
  }, {once: true});
  document.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      location.reload();
      return false;
    }
  }, {once: true});
};

export {makePopupMessage, successMessage, errorMessage, makeLoadErrorMessage};
