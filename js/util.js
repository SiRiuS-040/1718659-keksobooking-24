
function shuffle(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

export {shuffle, isEscapeKey, isEnterKey};
