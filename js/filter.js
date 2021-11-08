
import {createMarker} from './map.js';

const filterForm = document.querySelector('.map__filters');
const typeField = filterForm.querySelector('#housing-type');
const priceField = filterForm.querySelector('#housing-price');
const roomsField = filterForm.querySelector('#housing-rooms');
const guestsField = filterForm.querySelector('#housing-guests');

const ADS_MAX = 10;
const DEFAULT_VALUE = 'any';


const PriceRange = {
  PRICE_LOW: {
    MAX: 10000,
  },
  PRICE_MIDDLE: {
    MIN: 10000,
    MAX: 50000,
  },
  PRICE_HIGH: {
    MIN: 50000,
  },
};

const filterType = (object) => {
  const typeValue = typeField.value;
  console.log(typeValue);
  return typeValue === object.offer.type || typeValue === DEFAULT_VALUE;
};

const filterPrice = (object) => {
  const priceValue = priceField.value;
  switch (priceValue) {
    case 'low': return object.offer.price < PriceRange.PRICE_LOW.MAX;
    case 'middle': return object.offer.price >= PriceRange.PRICE_MIDDLE.MIN && object.offer.price < PriceRange.PRICE_MIDDLE.MAX;
    case 'high': return object.offer.price >= PriceRange.PRICE_HIGH.MIN;
    case 'any': return true;
    default: return false;
  }
};

const filterRooms = (object) => {
  const roomsValue = roomsField.value;
  return roomsValue === object.offer.rooms.toString() || roomsValue === DEFAULT_VALUE;
};

const filterGuests = (object) => {
  const guestsValue = guestsField.value;
  return guestsValue === object.offer.guests.toString() || guestsValue === DEFAULT_VALUE;
};

const filterFeatures = (object) => {
  const selectedFeatures = Array.from(filterForm.querySelectorAll('#housing-features input:checked'));
  if (!object.offer.features) {
    return false;
  }
  const featuresValues = selectedFeatures.map((element) => element.value);
  const filter = featuresValues.filter((item) => object.offer.features.includes(item));
  return featuresValues.length === filter.length;
};

//

const filterAndShow = (advertisements) => {
  const getAllFilters = (object) => {
    const inputFiltres = [
      filterType,
      filterPrice,
      filterRooms,
      filterGuests,
      filterFeatures,
    ];
    return inputFiltres.every((input) => input(object));
  };

  const filteredRents = [];
  for (const element of advertisements) {
    if (getAllFilters(element)) {
      filteredRents.push(element);
    }
    if (filteredRents.length >= ADS_MAX) {
      break;
    }
  }
  console.log(filteredRents);
  createMarker(filteredRents);
};

//

const onFilterChange = (cb) => filterForm.addEventListener('change', () => {


  cb();
});

const onFilterReset = (cb) => filterForm.addEventListener('reset', () => {
  cb();
});

filterForm.addEventListener('change', () => {
  const typeValue = typeField.value;
  const priceValue = priceField.value;
  const roomsValue = roomsField.value;
  const guestsValue = guestsField.value;

  const selectedFeatures = Array.from(filterForm.querySelectorAll('#housing-features input:checked'));
  const featuresValues = selectedFeatures.map((element) => element.value);

  console.log(typeValue);
  console.log(priceValue);
  console.log(roomsValue);
  console.log(guestsValue);
  console.log(featuresValues);

});

export {filterAndShow, onFilterChange, onFilterReset};


