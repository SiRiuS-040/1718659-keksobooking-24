import {getAdvertisementMarks} from './ads-cards.js';
import {activateForm, deactivateForm} from './switch.js';
import {getData} from './api.js';

deactivateForm();

const adForm = document.querySelector('.ad-form');
const addressInput = adForm.querySelector('#address');
const TO_FIXED_RANGE = 5;

const DEFAULT_COORDINATES = {
  lat: 35.66637,
  lng: 139.77059,
};

const ZOOM = 12;

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const MAIN_ICON = {
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};

const mainPinIcon = L.icon(MAIN_ICON);

const AD_ICON = {
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

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

const mainPinMarker = L.marker(
  DEFAULT_COORDINATES,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const { lat, lng } = evt.target.getLatLng();
  addressInput.value = `${lat.toFixed(TO_FIXED_RANGE)}, ${lng.toFixed(TO_FIXED_RANGE)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (adPoints) => {
  markerGroup.clearLayers();
  for (let i = 0; i < adPoints.length; i++) {
    const lat = adPoints[i].location.lat;
    const lng = adPoints[i].location.lng;
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
      .bindPopup(getAdvertisementMarks(adPoints[i]));
  }
};

const activateAfterMapLoad = () => {
  activateForm();
  getData((advertisements) => {
    createMarker(advertisements);
  });
};

map.on('load', activateAfterMapLoad());

const resetMarkersAndMap = () => {
  mainPinMarker.setLatLng(DEFAULT_COORDINATES);
  map.setView(DEFAULT_COORDINATES, ZOOM);
  map.closePopup();
};

export {createMarker, resetMarkersAndMap};
