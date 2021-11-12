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
  return typeValue === object.offer.type || typeValue === DEFAULT_VALUE;
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

const filterAndShow = (advertisements) => {
  const getAllFilters = (object) => {
    const inputFilters = [
      filterType,
      filterPrice,
      filterRooms,
      filterGuests,
      filterFeatures,
    ];
    return inputFilters.every((input) => input(object));
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
  createMarker(filteredRents);
};

const onFilterChange = (cb) => filterForm.addEventListener('change', () => {
  cb();
});

const onFilterReset = (cb) => filterForm.addEventListener('reset', () => {
  cb();
});

export {filterAndShow, onFilterChange, onFilterReset, filterForm};


