'use strict';

(function () {
  // Раздел с интерактивными изображениями, который показывает большое изображение
  var showBigImage = function (itemObject) {
    var QUANTITY_OF_COMMENTS = 5;
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

    // Подзагрузка комментариев по нажатию
    var commentItems = document.querySelectorAll('.social__comment');
    var counterItem = QUANTITY_OF_COMMENTS;

    // Скрывает все комментарии
    var hideAllComments = function () {
      commentItems.forEach(function (item) {
        item.style.display = 'none';
      });
    };

    // Показывает комменарии по условию
    var showComments = function () {
      commentItems.forEach(function (item, i) {
        if (i < counterItem) {
          item.style.display = 'flex';
        }
      });
    };

    // Событие нажатия на кнопку загурзить еще
    var onCommentsLoaderButtonClick = function () {
      counterItem += 5;
      showComments();
      if (itemObject.comments.length <= counterItem) {
        commentsLoader.classList.add('hidden');
      }
    };

    if (itemObject.comments.length > QUANTITY_OF_COMMENTS) {
      hideAllComments();
      showComments();
      commentsLoader.classList.remove('hidden');
      commentsLoader.addEventListener('click', onCommentsLoaderButtonClick);
    }

    // Устанавливает фокус при открытии
    var closeButton = document.querySelector('.big-picture__cancel');
    var bigPicturePreview = document.querySelector('.big-picture__preview');

    closeButton.setAttribute('tabindex', '0');
    bigPicturePreview.setAttribute('tabindex', '0');
    bigPicturePreview.focus();

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
    document.removeEventListener('keydown', onEscapeButtonPress);
  };

  // Закрытие окна превью картинки
  var onClosePreviewButtonClick = function () {
    closeOverlay();
  };

  // Нажатие на Esc
  var onEscapeButtonPress = function (evt) {
    if (evt.key === window.data.ESC_KEY) {
      closeOverlay();
    }
  };

  closePreviewButton.addEventListener('click', onClosePreviewButtonClick);

  // Экспорт в глобальную область
  window.preview = {
    showBigImage: showBigImage,
    onEscapeButtonPress: onEscapeButtonPress,
  };
})();
