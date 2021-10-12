import {getRandomFloor} from './util.js';

// Рандомный 1 элемент из массива

function getRandomElementFromArray (element) {
  return element[getRandomFloor(0, element.length - 1)];
}

export {getRandomElementFromArray};
