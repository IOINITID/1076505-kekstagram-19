'use strict';

(function () {
  var QUANTITY_OF_IMAGES = 10;

  // Создание изображения
  var renderImage = function (imageItem) {
    var template = document.querySelector('#picture').content;
    var currentImage = template.cloneNode(true);
    var onImageClick = function (evt) {
      evt.preventDefault();
      window.preview.showBigImage(imageItem);
      document.addEventListener('keydown', window.preview.onEscapeButtonPress);
    };
    currentImage.querySelector('.picture__img').src = imageItem.url;
    currentImage.querySelector('.picture__img').alt = imageItem.description;
    currentImage.querySelector('.picture__likes').textContent = imageItem.likes;
    currentImage.querySelector('.picture__comments').textContent = imageItem.comments.length;
    currentImage.querySelector('.picture').addEventListener('click', onImageClick);
    return currentImage;
  };

  // Очищает все изображения
  var clearImages = function () {
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (item) {
      item.remove();
    });
  };

  // Показывает окно с сортировкой
  var showSortModal = function () {
    var sortElement = document.querySelector('.img-filters');
    sortElement.classList.remove('img-filters--inactive');
  };

  // Отрисовка всех изображений
  var renderImages = function (imageObjects) {
    var imageList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    imageObjects.forEach(function (item) {
      fragment.appendChild(renderImage(item));
    });
    imageList.appendChild(fragment);
  };

  // Получаем 10 случайных не повторяющихся изображений
  var getRandomImages = function (imageObjects) {
    var newImages = [];

    imageObjects.forEach(function (item, i, array) {
      var currentItem = imageObjects[i];

      array.forEach(function (itemElement, index) {
        if (currentItem.url !== array[index].url) {
          newImages[index] = array[index];
        } else {
          newImages[0] = array[index];
        }
      });

    });

    var randomImages = newImages.slice(0, QUANTITY_OF_IMAGES).sort(window.data.makeRandomArray);

    return randomImages;
  };

  // Получаем изображения сортированные по количеству комментариев
  var getDiscussedImages = function (imageObjects) {
    var sortedArray = imageObjects.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return sortedArray;
  };

  // При успешной загрузки с сервера
  var onSuccessLoad = function (response) {
    renderImages(response);
    showSortModal();

    // Сортировка по умолчанию
    var onDefaultSuccessLoad = function () {
      debouncedUpdate(response);
    };

    // Сортировка 10 случайных не повторяющихся изображений
    var onRandomSuccessLoad = function () {
      debouncedUpdate(getRandomImages(response));
    };

    // Сортировка по колличеству комментариев
    var onDiscussedSuccessLoad = function () {
      debouncedUpdate(getDiscussedImages(response));
    };

    var defaultSortButton = document.querySelector('#filter-default');
    var randomSortButton = document.querySelector('#filter-random');
    var discussedSortButton = document.querySelector('#filter-discussed');

    // Очищает активное состояние кнопок
    var clearActiveSortState = function () {
      defaultSortButton.classList.remove('img-filters__button--active');
      randomSortButton.classList.remove('img-filters__button--active');
      discussedSortButton.classList.remove('img-filters__button--active');
    };

    // Нажатие на кнопку сортировки по умолчанию
    var onDefaultSortButtonClick = function (evt) {
      evt.preventDefault();
      clearActiveSortState();
      clearImages();
      defaultSortButton.classList.add('img-filters__button--active');
      onDefaultSuccessLoad();
    };

    // Нажатие на кнопку сортировки по умолчанию
    var onRandomSortButtonClick = function (evt) {
      evt.preventDefault();
      clearActiveSortState();
      clearImages();
      randomSortButton.classList.add('img-filters__button--active');
      onRandomSuccessLoad();
    };

    // Нажатие на кнопку сортировки по умолчанию
    var onDiscussedSortButtonClick = function (evt) {
      evt.preventDefault();
      clearActiveSortState();
      clearImages();
      discussedSortButton.classList.add('img-filters__button--active');
      onDiscussedSuccessLoad();
    };

    var debouncedUpdate = window.debounce(renderImages);

    defaultSortButton.addEventListener('click', onDefaultSortButtonClick);
    randomSortButton.addEventListener('click', onRandomSortButtonClick);
    discussedSortButton.addEventListener('click', onDiscussedSortButtonClick);

  };

  window.backend.load(onSuccessLoad, window.data.onRequestError);
})();
