import './form.js';
import {makeLoadErrorMessage} from './popup.js';
import './map.js';
import './filter.js';
import {getData} from './api.js';
import {filterAndShow, onFilterChange, onFilterReset} from './filter.js';


console.log('все очень плохо (((');

getData((data) => {
  filterAndShow(data);
  onFilterChange(
    () => filterAndShow(data),
  );
  onFilterReset(
    () => filterAndShow(data),
  );
},

makeLoadErrorMessage,
);
