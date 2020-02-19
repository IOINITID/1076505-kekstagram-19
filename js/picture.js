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
  var renderImages = function (imageObjects) {
    var imageList = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    imageObjects.forEach(function (item) {
      fragment.appendChild(renderImage(item));
    });
    imageList.appendChild(fragment);
  };

  var imageItems = window.gallery.createImagesDescription(window.data.QUANTITY_OF_IMAGES);

  renderImages(imageItems);
})();
