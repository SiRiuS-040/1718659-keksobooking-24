const RERENDER_DELAY = 500;

function debounce (callback, timeoutDelay = RERENDER_DELAY) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function shuffle(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

export {shuffle, isEscapeKey, isEnterKey, debounce};
