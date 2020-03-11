'use strict';

(function () {
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

  // Отрисовка изобржений на странице
  // var renderImages = function (imageObjects) {
  //   var imageList = document.querySelector('.pictures');
  //   var fragment = document.createDocumentFragment();
  //   imageObjects.forEach(function (item) {
  //     fragment.appendChild(renderImage(item));
  //   });
  //   imageList.appendChild(fragment);
  // };

  // var imageItems = window.gallery.createImagesDescription(window.data.QUANTITY_OF_IMAGES);

  // renderImages(imageItems);

  // Очищает все изображения
  var clearImages = function () {
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (item) {
      item.remove();
    });
  };

  // Отрисовка всех изображений
  var renderAllImages = function (imageObjects) {
    var imageList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    imageObjects.forEach(function (item) {
      fragment.appendChild(renderImage(item));
    });
    imageList.appendChild(fragment);
  };

  // Отрисовка из 10 рандомных изображений
  var renderRandomImages = function (imageObjects, quantity) {
    var imageList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
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

    newImages.slice(0, quantity).sort(window.data.makeRandomArr).forEach(function (itemImage) {
      fragment.appendChild(renderImage(itemImage));
    });

    imageList.appendChild(fragment);
  };

  // Отрисовка по количеству комментариев
  var renderDiscussedImages = function (imageObjects) {
    var imageList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    var sortedArray = imageObjects.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });

    sortedArray.forEach(function (item) {
      fragment.appendChild(renderImage(item));
    });

    imageList.appendChild(fragment);
  };

  // Показывает окно с сортировкой
  var showSortModal = function () {
    var sortElement = document.querySelector('.img-filters');
    sortElement.classList.remove('img-filters--inactive');
  };

  // Сортировка по умолчанию
  var onSuccessLoad = function (response) {
    renderAllImages(response);
    showSortModal();
  };

  // Сортировка по умолчанию
  var onDefaultSuccessLoad = function (response) {
    // renderAllImages(response);
    debouncedDefaultUpdate(response);
    showSortModal();
  };

  // Сортировка 10 случайных изображений
  var onRandomSuccessLoad = function (response) {
    // renderRandomImages(response, 10);
    debouncedRandomUpdate(response, 10);
    showSortModal();
  };

  // Сортировка по колличеству комментариев
  var onDiscussedSuccessLoad = function (response) {
    // renderDiscussedImages(response);
    debouncedDiscussedUpdate(response);
    showSortModal();
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
    defaultSortButton.classList.add('img-filters__button--active');
    clearImages();
    window.backend.load(onDefaultSuccessLoad, window.data.onRequestError);
  };

  // Нажатие на кнопку сортировки по умолчанию
  var onRandomSortButtonClick = function (evt) {
    evt.preventDefault();
    clearActiveSortState();
    randomSortButton.classList.add('img-filters__button--active');
    clearImages();
    window.backend.load(onRandomSuccessLoad, window.data.onRequestError);
  };

  // Нажатие на кнопку сортировки по умолчанию
  var onDiscussedSortButtonClick = function (evt) {
    evt.preventDefault();
    clearActiveSortState();
    discussedSortButton.classList.add('img-filters__button--active');
    clearImages();
    window.backend.load(onDiscussedSuccessLoad, window.data.onRequestError);
  };

  var debouncedDefaultUpdate = window.debounce(renderAllImages);
  var debouncedRandomUpdate = window.debounce(renderRandomImages);
  var debouncedDiscussedUpdate = window.debounce(renderDiscussedImages);

  defaultSortButton.addEventListener('click', onDefaultSortButtonClick);
  randomSortButton.addEventListener('click', onRandomSortButtonClick);
  discussedSortButton.addEventListener('click', onDiscussedSortButtonClick);

  // window.backend.load(onSuccessLoad, window.data.onRequestError);
  window.backend.load(onSuccessLoad, window.data.onRequestError);
})();
