// import {getRandomAdertisementsList} from './get-ads-list.js';

import {advertisementArray, getAdvertisementMarks} from './ads-cards.js';

import {adForm} from './form.js';

const   TO_FIXED_RANGE = 5;

const DEFAULT_COORDINATES = {
  lat: 35.66637,
  lng: 139.77059,
};

const ZOOM = 11;

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MAIN_ICON = {
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};

const AD_ICON = {
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

// Инициализация карты

const map = L.map('map-canvas')
  .on('load', () => {
  })
  .setView(DEFAULT_COORDINATES, ZOOM);

L.tileLayer(
  TILE_LAYER,
  {
    attribution: ATTRIBUTION,
  },
).addTo(map);

// 10-1-3 Главная метка

const mainPinIcon = L.icon(MAIN_ICON);

const mainPinMarker = L.marker(
  DEFAULT_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

// 10-1-4 Координаты в в адресной строке

const addressInput = adForm.querySelector('#address');

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  addressInput.value = `${lat.toFixed(TO_FIXED_RANGE)}, ${lng.toFixed(TO_FIXED_RANGE)}`;
});

// 10-1-5

// console.log(advertisementArray);

const markerGroup = L.layerGroup().addTo(map);

const createMarker = () => {
  for (let i = 0; i < advertisementArray.length; i++) {
    const lat = advertisementArray[i].location.lat;
    const lng = advertisementArray[i].location.lng;

    const icon = L.icon(AD_ICON);

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );
    marker.addTo(markerGroup);
  }
};

export {createMarker};
