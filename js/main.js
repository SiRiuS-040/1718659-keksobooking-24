

// Задание 4-1

const ADS_COUNT = 10;

const TITLE = [
  'Лучшая квартирка для тебя и твоего кота!',
  'Квартира где не страшно шуметь всю ночь!',
  'Уголок в самом спокойном доме района!',
  'Для тебя и всех знакомых кошечек!',
  'Милая уютная комнатка с видом на самое большое ПУХТО в городе!',
  'Идеальное место если у Вас накопились крупные долги!',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME_CHECKIN_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Уютно как на теплотрассе!',
  'Дороже не придумаешь!',
  'Почти как картонная коробка!',
  'Тут есть единственный уникальный золотой унитаз в городе!',
  'Очень чисто и без паразитов, но на всякитй случай рекомендуется прихватить с собой парочку балончиков с ароматом RAID!',
];


const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

// вспомогательные функции

// Генерация чисел

function getRandomFloor(min, max) {
  if (min < 0 || max < 0) {
    throw new Error('Данные для диапазона должны равняться "0" или быть положительными');
  }
  if ((max - min) < 0) {
    throw new Error('Диапазон должен быть положительным');
  }
  if (min === max) {
    return min;
  }
  return Math.floor(Math.random() * (max-min + 1) + min);
}
getRandomFloor(0, 101);

function getRandomFloat(min, max, decimalPlaces) {
  if (min < 0 || max < 0) {
    throw new Error('Данные для диапазона должны равняться "0" или быть положительными');
  }
  if ((max - min) < 0) {
    throw new Error('Диапазон должен быть положительным');
  }
  if (min === max) {
    return min;
  }
  return parseFloat((Math.random() * (max - min) + min).toFixed(decimalPlaces));
}
getRandomFloat(0, 0, 3);

// Генерация пути аватара

const generateAvatarPath = () => {
  const num = getRandomFloor(1, 10);
  //const avatarId;
  const avatarId = num < 10 ? `0${num}` : num;
  // if (num < 10) {
  // avatarId = `0${num}`;
  // } else {
  // avatarId = num;
  // };
  return `img/avatars/user${avatarId}.png`;
};

// Генерация координат

function generatetCoordinates () {
  return {
    lat : getRandomFloat(35.65000, 35.70000, 5),
    lng : getRandomFloat(139.70000, 139.80000, 5),
  };
}

// Рандомный 1 элемент из массива

function getRandomElementFromArray (element) {
  return element[getRandomFloor(0, element.length - 1)];
}

// Рандомные  элементЫ (0 - макс) из массива

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function getRandomElementsFromArray (elements) {
  const shuffled = shuffle(elements);
  return shuffled.slice(0, getRandomFloor(0, shuffled.length - 1));
}

// Итоговая сборка объявлений

const getRandomAdertisementsList = () => new Array(ADS_COUNT)
  .fill(null)
  .map (() => ({
    author: {
      avatar : generateAvatarPath(),
    },
    offer : {
      title : getRandomElementFromArray(TITLE),
      address: `${generatetCoordinates().lat}, ${generatetCoordinates().lng}`,
      price : getRandomFloor(0, 50000),
      type : getRandomElementFromArray(TYPE),
      rooms : getRandomFloor(1, 100),
      guests : getRandomFloor(0, 3),
      checkin : getRandomElementFromArray(TIME_CHECKIN_CHECKOUT),
      checkout : getRandomElementFromArray(TIME_CHECKIN_CHECKOUT),
      features : getRandomElementsFromArray(FEATURES),
      description : getRandomElementFromArray(DESCRIPTION),
      photos : getRandomElementsFromArray(PHOTOS),
    },
    location: generatetCoordinates(),
  }));

getRandomAdertisementsList();

// console.log(getRandomAdertisementsList());
