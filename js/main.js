import {advertisementArray} from './ads-cards.js';
import './form.js';
import {activateForm, deactivateForm} from './switch.js';
import {createMarker} from './map.js';

import {createLoader} from './api.js';

deactivateForm();

createMarker(advertisementArray);

activateForm();

const loadAds = createLoader(console.log, console.error);

loadAds();

// fetch('https://24.javascript.pages.academy/keksobooking/data')
//   .then((response) => response.json())
//   .then((advertisements) => {
//     console.log(advertisements);
//   });
