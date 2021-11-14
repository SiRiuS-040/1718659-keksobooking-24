import {getAdvertisementMarks} from './ads-cards.js';
import {deactivateForm, activateForm} from './switch.js';

const TO_FIXED_RANGE = 5;
const DEFAULT_COORDINATES = {
  lat: 35.68077,
  lng: 139.76678,
};

const ZOOM = 12;
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

const adForm = document.querySelector('.ad-form');
const addressInput = adForm.querySelector('#address');

deactivateForm();

const defaultAdressInput = () => {
  addressInput.value = `${DEFAULT_COORDINATES.lat.toFixed(TO_FIXED_RANGE)}, ${DEFAULT_COORDINATES.lng.toFixed(TO_FIXED_RANGE)}`;
};

defaultAdressInput();

const mainPinIcon = L.icon(MAIN_ICON);

const map = L.map('map-canvas')
  .on('load', () => {
    activateForm();
  })
  .setView(DEFAULT_COORDINATES, ZOOM);

L.tileLayer(
  TILE_LAYER,
  {
    attribution: ATTRIBUTION,
  },
).addTo(map);

const mainPinMarker = L.marker(
  DEFAULT_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('drag', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  addressInput.value = `${lat.toFixed(TO_FIXED_RANGE)}, ${lng.toFixed(TO_FIXED_RANGE)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (advertisements) => {
  markerGroup.clearLayers();
  advertisements
    .forEach((advertisement) => {

      const lat = advertisement.location.lat;
      const lng = advertisement.location.lng;
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
      marker
        .addTo(markerGroup)
        .bindPopup(getAdvertisementMarks(advertisement));
    });
};

const resetMarkersAndMap = () => {
  mainPinMarker.setLatLng(DEFAULT_COORDINATES);
  map.setView(DEFAULT_COORDINATES, ZOOM);
  map.closePopup();
};

export {createMarker, resetMarkersAndMap, defaultAdressInput};
