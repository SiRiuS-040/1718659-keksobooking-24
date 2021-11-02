import './form.js';
import {activateForm, deactivateForm} from './switch.js';
import {createMarker} from './map.js';

// import {createLoader} from './api.js';

deactivateForm();

activateForm();

// const loadAds = createLoader(console.log, console.error);

// loadAds();

const SIMILAR_ADS_COUNT = 10;

fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((advertisements) => {
    console.log(advertisements);
    createMarker(advertisements.slice(0, SIMILAR_ADS_COUNT));
  });
