import {shuffle, getRandomFloor} from './util.js';

// Рандомные  элементЫ (0 - макс) из массива

function getRandomElementsFromArray (elements) {
  const shuffled = shuffle(elements);
  return shuffled.slice(0, getRandomFloor(0, shuffled.length - 1));
}

export {getRandomElementsFromArray};
