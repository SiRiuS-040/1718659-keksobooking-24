import {makePopupMessage, successMessage, errorMessage, makeLoadErrorMessage} from './popup.js';

const URL_DATA_GET = 'https://24.javascript.pages.academy/keksobooking/data';
const URL_DATA_POST = 'https://24.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(
    URL_DATA_GET,
    {
      method: 'GET',
      credentials: 'same-origin',
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError(makeLoadErrorMessage());
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    URL_DATA_POST,
    {
      method: 'POST',
      body,
    },
  ).then((response) => response.ok ? onSuccess(makePopupMessage(successMessage)) : onFail(makePopupMessage(errorMessage)),
  )
    .catch(() => {
      onFail(makePopupMessage(errorMessage));
    });
};

export {getData, sendData};
