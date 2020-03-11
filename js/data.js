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

  // Получение случайного массива
  var makeRandomArray = function () {
    return Math.random() - 0.5;
  };

  // Ошибка выполнения запроса
  var onRequestError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  // Экспорт в глобальную область
  window.data = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    QUANTITY_OF_IMAGES: QUANTITY_OF_IMAGES,
    getRandomNumber: getRandomNumber,
    getRandomNumberFromTo: getRandomNumberFromTo,
    getRandomElement: getRandomElement,
    onRequestError: onRequestError,
    makeRandomArray: makeRandomArray,
  };
})();
