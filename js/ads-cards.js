// Задание 7-1

import {getRandomAdertisementsList} from './get-ads-list.js';

const HOUSE_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

// const similarAdsList = document.querySelector('#map-canvas');
const similarAdsTemplate = document.querySelector('#card').content;
const popup = similarAdsTemplate.querySelector('.popup');

const advertisementArray = getRandomAdertisementsList();

// console.log(similarAdsList);
// console.log(advertisementArray);
// console.log(advertisementArray[0]);

const getAdvertisementMarks = () => {

  const adsClone = popup.cloneNode(true);

  adsClone.querySelector('.popup__title').textContent = advertisementArray[0].offer.title;
  adsClone.querySelector('.popup__text--address').textContent = advertisementArray[0].offer.address;
  adsClone.querySelector('.popup__text--price').textContent = `${advertisementArray[0].offer.price } ₽/ночь`;

  adsClone.querySelector('.popup__type').textContent = HOUSE_TYPE[advertisementArray[0].offer.type];
  adsClone.querySelector('.popup__text--capacity').textContent = `${advertisementArray[0].offer.rooms } комнаты для ${advertisementArray[0].offer.guests} гостей`;
  adsClone.querySelector('.popup__text--time').textContent = `Заезд после ${ advertisementArray[0].offer.checkin}, выезд до ${ advertisementArray[0].offer.checkout}`;

  const adsFeatures = advertisementArray[0].offer.features;

  const feturesContainer = adsClone.querySelector('.popup__features');
  const featureList = feturesContainer.querySelectorAll('.popup__feature');

  featureList.forEach((featureListItem) => {

    const isChecked = adsFeatures.some(
      (adsFeature) => featureListItem.classList.contains(`popup__feature--${  adsFeature}`),
    );

    if (!isChecked) {
      featureListItem.remove();
    }
  });

  if (!advertisementArray[0].offer.description) {
    adsClone.querySelector('.popup__description').classList.add('visually-hidden');
  } else {
    adsClone.querySelector('.popup__description').textContent = advertisementArray[0].offer.description;
  }

  const adsPhotos = adsClone.querySelector('.popup__photos');
  adsPhotos.innerHTML = '';

  advertisementArray[0].offer.photos.forEach((photoItem) => {
    const img = document.createElement('img');
    img.classList.add('popup__photo');
    img.src = photoItem;
    img.height = 40;
    img.width = 45;
    adsPhotos.appendChild(img);
  });

  adsClone.querySelector('.popup__avatar').src = advertisementArray[0].author.avatar;
  // similarAdsList.appendChild(adsClone);

  return adsClone;
};

export {advertisementArray, getAdvertisementMarks};
