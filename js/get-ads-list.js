import {ADS_COUNT, TITLE, TYPE, TIME_CHECKIN_CHECKOUT, FEATURES, DESCRIPTION, PHOTOS} from './data.js';
import {getRandomFloor} from './util.js';
import {getUniqueAvatarPath} from './get-avatar-path.js';
import {generatetCoordinates} from './generate-coordinates.js';
import {getRandomElementFromArray} from './get-1-random-element.js';
import {getRandomElementsFromArray} from './get-random-elements.js';

// Итоговая сборка объявлений

function getRandomAdertisementsList() {
  return new Array(ADS_COUNT)
    .fill(null)
    .map(() => ({
      author: {
        avatar: getUniqueAvatarPath(),
      },
      offer: {
        title: getRandomElementFromArray(TITLE),
        address: `${generatetCoordinates().lat}, ${generatetCoordinates().lng}`,
        price: getRandomFloor(0, 50000),
        type: getRandomElementFromArray(TYPE),
        rooms: getRandomFloor(1, 100),
        guests: getRandomFloor(0, 3),
        checkin: getRandomElementFromArray(TIME_CHECKIN_CHECKOUT),
        checkout: getRandomElementFromArray(TIME_CHECKIN_CHECKOUT),
        features: getRandomElementsFromArray(FEATURES),
        description: getRandomElementFromArray(DESCRIPTION),
        photos: getRandomElementsFromArray(PHOTOS),
      },
      location: generatetCoordinates(),
    }));
}

// getRandomAdertisementsList();

export {getRandomAdertisementsList};
