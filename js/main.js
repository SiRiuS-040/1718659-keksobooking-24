import './form.js';
import {makeLoadErrorMessage} from './popup.js';
import {debounce} from './util.js';
import './map.js';
import './filter.js';
import {activateFilters} from './switch.js';
import {getData} from './api.js';
import {filterAndShow, onFilterChange, onFilterReset} from './filter.js';
import './avatar.js';

getData((data) => {

  filterAndShow(data);
  activateFilters();
  onFilterChange(debounce(
    () => filterAndShow(data),
  ));
  onFilterReset(debounce(
    () => filterAndShow(data),
  ));
},

makeLoadErrorMessage,
);
