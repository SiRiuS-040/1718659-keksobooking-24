// вспомогательные функции

function shuffle(array) {
  return array.slice().sort(() => Math.random() - 0.5);
}

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

export {shuffle, getRandomFloor, getRandomFloat};
