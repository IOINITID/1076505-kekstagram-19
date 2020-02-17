'use strict';

(function () {
  // Раздел с интерактивными изображениями, который показывает большое изображение
  var showBigImage = function (itemObject) {
    var bigImageModal = document.querySelector('.big-picture');
    var bigImage = bigImageModal.querySelector('.big-picture__img img');
    var bigImageLikes = bigImageModal.querySelector('.likes-count');
    var bigImageComments = bigImageModal.querySelector('.comments-count');
    var bigImageSocialCaption = bigImageModal.querySelector('.social__caption');
    var counterComment = bigImageModal.querySelector('.social__comment-count');
    var commentsLoader = bigImageModal.querySelector('.comments-loader');
    bigImageModal.classList.remove('hidden');
    bigImage.src = itemObject.url;
    bigImageLikes.textContent = itemObject.likes;
    bigImageComments.textContent = itemObject.comments.length;
    renderComments(itemObject);
    bigImageSocialCaption.textContent = itemObject.description;
    counterComment.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    document.body.classList.add('modal-open');
  };

  // Отрисовка комментария
  var renderComment = function (commentObjectItem) {
    var commentItem = document.querySelector('.social__comment');
    var currentCommentItem = commentItem.cloneNode(true);
    currentCommentItem.querySelector('.social__picture').src = commentObjectItem.avatar;
    currentCommentItem.querySelector('.social__picture').alt = commentObjectItem.name;
    currentCommentItem.querySelector('.social__text').textContent = commentObjectItem.message;
    return currentCommentItem;
  };

  // Удаление имеющихся комментариев
  var deleteComments = function () {
    var commentsItem = document.querySelectorAll('.social__comment');
    commentsItem.forEach(function (item) {
      item.remove();
    });
  };

  // Отрисовка комментариев
  var renderComments = function (imagesObjectsList) {
    var bigImageSocialComments = document.querySelector('.social__comments');
    var fragment = document.createDocumentFragment();
    imagesObjectsList.comments.forEach(function (item) {
      fragment.appendChild(renderComment(item));
    });
    deleteComments();
    bigImageSocialComments.appendChild(fragment);
  };

  // Раздел с показам превью картинок
  var closePreviewButton = document.querySelector('.big-picture__cancel');
  var previewModal = document.querySelector('.big-picture');
  var closeOverlay = function () {
    previewModal.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPreviewEscapeButtonPress);
  };

  // Закрытие окна превью картинки
  var onClosePreviewButtonClick = function () {
    closeOverlay();
  };

  // Нажатие на Esc
  var onPreviewEscapeButtonPress = function (evt) {
    if (evt.key === window.data.ESC_KEY) {
      closeOverlay();
    }
  };

  closePreviewButton.addEventListener('click', onClosePreviewButtonClick);

  // Экспорт в глобальную область
  window.preview = {
    showBigImage: showBigImage,
    onPreviewEscapeButtonPress: onPreviewEscapeButtonPress,
  };
})();
