'use strict';

(function () {
  // Объявление переменных и констант
  var QUANTITY_OF_IMAGES = 25;
  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';

  // Получение случайного числа (утилитная функция)
  var getRandomNumber = function (number) {
    return Math.ceil(Math.random() * number);
  };

  // Получение случайного числа в заданном диапазоне (утилитная функция)
  var getRandomNumberFromTo = function (minNumber, maxNumber) {
    var number = minNumber + Math.random() * (maxNumber + 1 - minNumber);
    return Math.floor(number);
  };

  // Получение случайного элемента из списка
  var getRandomElement = function (elementList) {
    return elementList[getRandomNumber(elementList.length - 1)];
  };

  // Экспорт в глобальную область
  window.data = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    QUANTITY_OF_IMAGES: QUANTITY_OF_IMAGES,
    getRandomNumber: getRandomNumber,
    getRandomNumberFromTo: getRandomNumberFromTo,
    getRandomElement: getRandomElement,
  };
})();
