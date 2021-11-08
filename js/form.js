import {resetMarkersAndMap} from './map.js';
import {filterForm} from './filter.js';
import {sendData} from './api.js';
import {makePopupMessage, errorMessage} from './popup.js';

const adForm = document.querySelector('.ad-form');
const adTypeInput = adForm.querySelector('#type');
const adPriceInput = adForm.querySelector('#price');
const adRoomsInput = adForm.querySelector('#room_number');
const adGuestsInput = adForm.querySelector('#capacity');
const resetButton = adForm.querySelector('.ad-form__reset');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const adTitleInput = adForm.querySelector('#title');
adTitleInput.minLength = ('MIN_TITLE_LENGTH');

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

const HOUSING__MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

let minPrice = HOUSING__MIN_PRICE[adTypeInput.value];
const MAX_PRICE = 1000000;

const getMinPrice = (value) => {
  minPrice = HOUSING__MIN_PRICE[value];
  return minPrice;
};

const setMinPrice = (value) => {
  value = adTypeInput.value;
  adPriceInput.placeholder = getMinPrice(value);
};

const validatePrice = () => {
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
  if (adGuestsInput.value === '0' && adRoomsInput.value !== '100') {
    adGuestsInput.setCustomValidity('Выбранное количество комнат только для гостей!');
  }  else if (adRoomsInput.value === '100' && adGuestsInput.value > 0) {
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

const adTimeinInput = adForm.querySelector('#timein');
const adTimeoutInput = adForm.querySelector('#timeout');

const setTimein = () => {
  adTimeoutInput.value = adTimeinInput.value;
};

const setTimeout = () => {
  adTimeinInput.value = adTimeoutInput.value;
};

adTimeinInput.addEventListener('input', () => {
  setTimein();
});

adTimeoutInput.addEventListener('input', () => {
  setTimeout();
});

// Проверка при загрузке страницы.

document.addEventListener('DOMContentLoaded', () => {
  setTimein();
  setTimeout();
  validateCapacity();
  validatePrice();
  validateTitle();
});

// Действия с формой


const setFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => makePopupMessage(errorMessage),
      new FormData(evt.target),
    );
  });
};

const resetForm = () => {
  adForm.reset();
  filterForm.reset();
  resetMarkersAndMap();
};

const clickOnReset = () => {
  resetButton.addEventListener('click', () => {
    resetForm();
  });
};

clickOnReset();

export {adForm, setFormSubmit, resetForm};
