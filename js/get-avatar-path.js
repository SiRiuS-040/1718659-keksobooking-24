import {ADS_COUNT} from './data.js';
import {shuffle} from './util.js';

const generateAvatarPathArray = () => {
  const array = [];
  for (let num = 1; num <= ADS_COUNT; num++) {
    if (num < 10) {
      num = `0${num}`;
    }
    array.push(`img/avatars/user${num}.png`);
  }
  return shuffle(array);
};

const avatarPathArray = generateAvatarPathArray();

function getUniqueAvatarPath () {
  const out = avatarPathArray[0];
  avatarPathArray.splice(0, 1);
  avatarPathArray.push(out);
  return avatarPathArray[0];
}

export {getUniqueAvatarPath};
