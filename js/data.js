'use strict';

(function () {
  // Объявление переменных и констант
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
  var getRandomArray = function (items) {
    for (var i = items.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = items[i];
      items[i] = items[j];
      items[j] = temp;
    }
    return items;
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
    getRandomNumber: getRandomNumber,
    getRandomNumberFromTo: getRandomNumberFromTo,
    getRandomElement: getRandomElement,
    onRequestError: onRequestError,
    getRandomArray: getRandomArray,
  };
})();
