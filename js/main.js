import {advertisementArray} from './ads-cards.js';
import './form.js';
import {activateForm, deactivateForm} from './switch.js';
import {createMarker} from './map.js';

deactivateForm();

createMarker(advertisementArray);

activateForm();

