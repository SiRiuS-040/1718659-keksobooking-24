import {setFormSubmit, resetForm} from './form.js';
import {makeLoadErrorMessage} from './popup.js';
import {debounce} from './util.js';
import './map.js';
import './filter.js';
import {activateForm, deactivateForm} from './switch.js';
import {getData} from './api.js';
import {filterAndShow, onFilterChange, onFilterReset} from './filter.js';

setFormSubmit(resetForm);

getData((data) => {
  deactivateForm();
  filterAndShow(data);
  activateForm();
  onFilterChange(debounce(
    () => filterAndShow(data),
  ));
  onFilterReset(debounce(
    () => filterAndShow(data),
  ));
},

makeLoadErrorMessage,
);
