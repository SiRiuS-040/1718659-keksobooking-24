const advertisementForm = document.querySelector('.ad-form');
const advertisementFormFieldsets = document.querySelectorAll('.ad-form__element');
const formFilters = document.querySelector('.map__filters');
const formFilterFieldElements = formFilters.querySelectorAll('.map__filter');
const formFilterField = formFilters.querySelector('.map__features');

const activateForm = () => {
  advertisementForm.classList.remove('ad-form--disabled');
  formFilters.classList.remove('map__filters--disabled');

  advertisementFormFieldsets.forEach((advertisementFormFieldset) => {
    advertisementFormFieldset.removeAttribute('disabled', '');
  });

  formFilterFieldElements.forEach((formFilterFieldElement) => {
    formFilterFieldElement.removeAttribute('disabled', '');
  });
  formFilterField.removeAttribute('disabled', '');
};

const deactivateForm = () => {
  advertisementForm.classList.add('ad-form--disabled');
  formFilters.classList.add('map__filters--disabled');

  formFilterFieldElements.forEach((formFilterFieldElement) => {
    formFilterFieldElement.setAttribute('disabled', '');
  });

  advertisementFormFieldsets.forEach((advertisementFormFieldset) => {
    advertisementFormFieldset.setAttribute('disabled', '');
  });


  formFilterField.setAttribute('disabled', '');
};

export {activateForm, deactivateForm};

