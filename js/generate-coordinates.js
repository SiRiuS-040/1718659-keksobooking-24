import {getRandomFloat} from './util.js';

function generatetCoordinates () {
  return {
    lat : getRandomFloat(35.65000, 35.70000, 5),
    lng : getRandomFloat(139.70000, 139.80000, 5),
  };
}

export {generatetCoordinates};
