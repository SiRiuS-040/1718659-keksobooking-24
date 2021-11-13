import {resetMarkersAndMap, defaultAdressInput} from './map.js';
import {filterForm} from './filter.js';
import {sendData} from './api.js';
import {makePopupMessage, errorMessage} from './popup.js';
import {resetImages} from './avatar.js';

const MAX_PRICE = 1000000;
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const NUMBER_GUEST_MIN = 0;
const NUMBER_ROOMS_MAX = 100;
const PRICE_PLACEHOLDER_DEFAULT = '1000';
const GUESTS_VALUE__DEFAULT = '1';

const HOUSING__MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const adForm = document.querySelector('.ad-form');
const adTypeInput = adForm.querySelector('#type');
const adPriceInput = adForm.querySelector('#price');
const adRoomsInput = adForm.querySelector('#room_number');
const adGuestsInput = adForm.querySelector('#capacity');
const resetButton = adForm.querySelector('.ad-form__reset');
const adTimeInInput = adForm.querySelector('#timein');
const adTimeOutInput = adForm.querySelector('#timeout');
const adTitleInput = adForm.querySelector('#title');

adTitleInput.minLength = ('MIN_TITLE_LENGTH');
adPriceInput.placeholder = PRICE_PLACEHOLDER_DEFAULT;
adGuestsInput.value = GUESTS_VALUE__DEFAULT;

const validateTitle = () => {
  const valueLength = adTitleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    adTitleInput.setCustomValidity(`Добавьте ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adTitleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    adTitleInput.setCustomValidity('');
  }
  adTitleInput.reportValidity();
};

adTitleInput.addEventListener('input', () => {
  validateTitle();
});

let minPrice = HOUSING__MIN_PRICE[adTypeInput.value];

const getMinPrice = (value) => {
  minPrice = HOUSING__MIN_PRICE[value];
  return minPrice;
};

const setMinPrice = (value) => {
  value = adTypeInput.value;
  adPriceInput.placeholder = getMinPrice(value);
};

const validatePrice = () => {
  adPriceInput.min = HOUSING__MIN_PRICE[adTypeInput.value];
  adPriceInput.placeholder = adPriceInput.min;

  const value = adPriceInput.value;
  if (value < minPrice) {
    adPriceInput.setCustomValidity(`Минимальная цена ${  minPrice} ₽/ночь`);

  } else if (value > MAX_PRICE) {
    adPriceInput.setCustomValidity(`Рекомендуемая цена не больше чем ${  MAX_PRICE} ₽/ночь!`);
  } else {
    adPriceInput.setCustomValidity('');
  }
  adPriceInput.reportValidity();
};

adTypeInput.addEventListener('input', (value) => {
  setMinPrice(value);
  validatePrice();
});

adPriceInput.addEventListener('input', () => {
  validatePrice();
});

const validateCapacity = () => {
  if (adGuestsInput.value === NUMBER_GUEST_MIN && adRoomsInput.value !== NUMBER_ROOMS_MAX) {
    adGuestsInput.setCustomValidity('Выбранное количество комнат только для гостей!');
  }  else if (adRoomsInput.value === NUMBER_ROOMS_MAX && adGuestsInput.value > NUMBER_GUEST_MIN) {
    adGuestsInput.setCustomValidity('В данных помещеиях нельзя размещать гостей!');
  } else if (adGuestsInput.value > adRoomsInput.value) {
    adGuestsInput.setCustomValidity('Слишком много гостей');
  } else {
    adGuestsInput.setCustomValidity('');
  }
  adGuestsInput.reportValidity();
};

adRoomsInput.addEventListener('input', () => {
  validateCapacity();
});

adGuestsInput.addEventListener('input', () => {
  validateCapacity();
});

const setTimeIn = () => {
  adTimeOutInput.value = adTimeInInput.value;
};

const setTimeOut = () => {
  adTimeInInput.value = adTimeOutInput.value;
};

adTimeInInput.addEventListener('input', () => {
  setTimeIn();
});

adTimeOutInput.addEventListener('input', () => {
  setTimeOut();
});

document.addEventListener('DOMContentLoaded', () => {
  setTimeIn();
  setTimeOut();
  validateCapacity();


});

const setFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    validateTitle();
    validatePrice();

    sendData(
      () => onSuccess(),
      () => makePopupMessage(errorMessage),
      new FormData(evt.target),
    );
  });
};

const resetForm = () => {
  adForm.reset();
  defaultAdressInput();
  filterForm.reset();
  adPriceInput.placeholder = PRICE_PLACEHOLDER_DEFAULT;
  adGuestsInput.value = GUESTS_VALUE__DEFAULT;
  resetMarkersAndMap();
  resetImages();
};

const clickOnReset = () => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  });
};

clickOnReset();

export {adForm, setFormSubmit, resetForm};
