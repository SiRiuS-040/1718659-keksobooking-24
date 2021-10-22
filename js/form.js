// 8-1

// const adForm = document.querySelector('ad-form');

// Валидация на вводе
// Заголовок минимум 30 символов, максимум 100.

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const adTitleInput = document.querySelector('#title');
adTitleInput.minLength = ('MIN_TITLE_LENGTH');

adTitleInput.addEventListener('input', () => {
  const valueLength = adTitleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    adTitleInput.setCustomValidity(`Добавьте ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adTitleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    adTitleInput.setCustomValidity('');
  }
  adTitleInput.reportValidity();
});

// Цена за ночь/

// цена от типа

// «Бунгало» — минимальная цена за ночь 0;
// «Квартира» — минимальная цена за ночь 1 000;
// «Отель» — минимальная цена за ночь 3 000;
// «Дом» — минимальная цена 5 000;
// «Дворец» — минимальная цена 10 000.

let currentPrice = 0;
const MAX_PRICE = 1000000;
const MIN_BUNGALOW_PRICE = 0;
const MIN_FLAT_PRICE = 1000;
const MIN_HOTEL_PRICE = 3000;
const MIN_HOUSE_PRICE = 5000;
const MIN_PALACE_PRICE = 10000;

const adTypeInput = document.querySelector('#type');
const adPriceInput = document.querySelector('#price');

adTypeInput.addEventListener('input', () => {
  const value = adTypeInput.value;
  if (value === 'bungalow') {
    adPriceInput.placeholder = MIN_BUNGALOW_PRICE;
    currentPrice = MIN_BUNGALOW_PRICE;
  }
  if (value === 'flat') {
    adPriceInput.placeholder = MIN_FLAT_PRICE;
    currentPrice = MIN_FLAT_PRICE;
  }
  if (value === 'hotel') {
    adPriceInput.placeholder = MIN_HOTEL_PRICE;
    currentPrice = MIN_HOTEL_PRICE;
  }
  if (value === 'house') {
    adPriceInput.placeholder = MIN_HOUSE_PRICE;
    currentPrice = MIN_HOUSE_PRICE;
  }
  if (value === 'palace') {
    adPriceInput.placeholder = MIN_PALACE_PRICE;
    currentPrice = MIN_PALACE_PRICE;
  }
  return currentPrice;

});

// макс мин цена

adPriceInput.addEventListener('input', () => {
  const value = adPriceInput.value;
  if (value < currentPrice) {
    adPriceInput.setCustomValidity(`Минимальная цена ${  currentPrice} ₽/ночь`);

  } else if (value > MAX_PRICE) {
    adPriceInput.setCustomValidity(`Очень дорого! Максимальная рекомендуемая цена не больше чем ${  MAX_PRICE} ₽/ночь!`);
  } else {
    adPriceInput.setCustomValidity('');
  }
  adPriceInput.reportValidity();
});

// Количество комнат и количество мест

// const adRoomsInput = document.querySelector('#room_number');


// adRoomsInput.addEventListener('input', () => {
//   const value = adRoomsInput.value;
//   if (value < 1) {

//   } else if () {

//   } else {
//     adRoomsInput.setCustomValidity('');
//   }
//   adRoomsInput.reportValidity();
// });

// После отправки - сброс формы без перезагрузки страницы
