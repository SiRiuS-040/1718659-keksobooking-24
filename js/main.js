import {getAdvertisementMarks} from './ads-cards.js';

import {activateForm, deactivateForm} from './switch.js';

import './form.js';

getAdvertisementMarks();

deactivateForm();
activateForm();

// 8-1

// const adForm = document.querySelector('ad-form');

// Валидация на вводе

// Заголовок минимум 30 символов, максимум 100.


// Цена за ночь - время заезда - время выезда
// «Бунгало» — минимальная цена за ночь 0;
// «Квартира» — минимальная цена за ночь 1 000;
// «Отель» — минимальная цена за ночь 3 000;
// «Дом» — минимальная цена 5 000;
// «Дворец» — минимальная цена 10 000.

// Количество комнат и количество мест

// После отправки - сброс формы без перезагрузки страницы
