const HOUSE_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const similarAdsTemplate = document.querySelector('#card').content;
const popup = similarAdsTemplate.querySelector('.popup');

const getAdvertisementMarks = (dataArray) => {
  const adsClone = popup.cloneNode(true);
  const featuresContainer = adsClone.querySelector('.popup__features');
  const featureList = featuresContainer.querySelectorAll('.popup__feature');

  adsClone.querySelector('.popup__title').textContent = dataArray.offer.title;
  adsClone.querySelector('.popup__text--address').textContent = dataArray.offer.address;
  adsClone.querySelector('.popup__text--price').textContent = `${dataArray.offer.price } ₽/ночь`;
  adsClone.querySelector('.popup__type').textContent = HOUSE_TYPE[dataArray.offer.type];
  adsClone.querySelector('.popup__text--capacity').textContent = `${dataArray.offer.rooms } комнаты для ${dataArray.offer.guests} гостей`;
  adsClone.querySelector('.popup__text--time').textContent = `Заезд после ${ dataArray.offer.checkin}, выезд до ${ dataArray.offer.checkout}`;
  adsClone.querySelector('.popup__avatar').src = dataArray.author.avatar;

  const getFeatures = () => {
    const adsFeatures = dataArray.offer.features;

    if (!adsFeatures) {
      return featuresContainer.remove();
    } else {
      featureList.forEach((featureListItem) => {
        const isChecked = adsFeatures.some(
          (adsFeature) => featureListItem.classList.contains(`popup__feature--${  adsFeature}`),
        );
        if (!isChecked) {
          featureListItem.remove();
        }
      });
    }
  };

  getFeatures();

  if (!dataArray.offer.description) {
    adsClone.querySelector('.popup__description').classList.add('visually-hidden');
  } else {
    adsClone.querySelector('.popup__description').textContent = dataArray.offer.description;
  }

  const getPhotos = () => {
    const adsPhotos = dataArray.offer.photos;
    const photoContainer = adsClone.querySelector('.popup__photos');

    if (!adsPhotos) {
      return photoContainer.remove();
    } else {
      photoContainer.innerHTML = '';

      dataArray.offer.photos.forEach((photoItem) => {
        const img = document.createElement('img');
        img.classList.add('popup__photo');
        img.src = photoItem;
        img.height = 40;
        img.width = 45;
        photoContainer.appendChild(img);
      });
    }
  };

  getPhotos();

  return adsClone;
};

export {getAdvertisementMarks};
