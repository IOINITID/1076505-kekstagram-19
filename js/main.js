'use strict';

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

// Получение комментария
var createComment = function () {
  var MESSAGES = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var NAMES = ['Иван', 'Даша', 'Маша', 'Александр', 'Катя', 'Оля'];
  var comment = {};
  comment.avatar = 'img/avatar-' + getRandomNumber(6) + '.svg';
  comment.message = getRandomElement(MESSAGES);
  comment.name = getRandomElement(NAMES);
  return comment;
};

// Получение списка комментариев
var createComments = function (quantityOfComments) {
  var comments = [];
  for (var i = 0; i < quantityOfComments; i++) {
    comments[i] = createComment();
  }
  return comments;
};

// Получение описания изображения
var createImageDescription = function (index) {
  var image = {};
  image.url = 'photos/' + (index + 1) + '.jpg';
  image.description = 'Описание фотографии';
  image.likes = getRandomNumberFromTo(15, 200);
  image.comments = createComments(getRandomNumber(5));
  return image;
};

// Получение списка описаний изображений
var createImagesDescription = function (quantityOfImagesDescription) {
  var images = [];
  for (var i = 0; i < quantityOfImagesDescription; i++) {
    images[i] = createImageDescription(i);
  }
  return images;
};

// Создание изображения
var renderImage = function (imageItem) {
  var template = document.querySelector('#picture').content;
  var currentImage = template.cloneNode(true);
  currentImage.querySelector('.picture__img').src = imageItem.url;
  currentImage.querySelector('.picture__img').alt = imageItem.description;
  currentImage.querySelector('.picture__likes').textContent = imageItem.likes;
  currentImage.querySelector('.picture__comments').textContent = imageItem.comments.length;
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

var imageItems = createImagesDescription(QUANTITY_OF_IMAGES);
renderImages(imageItems);

// Раздел с интерактивными изображениями
// Показывает большое изображение
// var showBigImage = function (itemObject) {
//   var bigImageModal = document.querySelector('.big-picture');
//   var bigImage = bigImageModal.querySelector('.big-picture__img img');
//   var bigImageLikes = bigImageModal.querySelector('.likes-count');
//   var bigImageComments = bigImageModal.querySelector('.comments-count');
//   var bigImageSocialCaption = bigImageModal.querySelector('.social__caption');
//   var counterComment = bigImageModal.querySelector('.social__comment-count');
//   var commentsLoader = bigImageModal.querySelector('.comments-loader');
//   bigImageModal.classList.remove('hidden');
//   bigImage.src = itemObject.url;
//   bigImageLikes.textContent = itemObject.likes;
//   bigImageComments.textContent = itemObject.comments.length;
//   renderComments(itemObject);
//   bigImageSocialCaption.textContent = itemObject.description;
//   counterComment.classList.add('hidden');
//   commentsLoader.classList.add('hidden');
//   document.body.classList.add('modal-open');
// };

// Отрисовка комментария
// var renderComment = function (commentObjectItem) {
//   var commentItem = document.querySelector('.social__comment');
//   var currentCommentItem = commentItem.cloneNode(true);
//   currentCommentItem.querySelector('.social__picture').src = commentObjectItem.avatar;
//   currentCommentItem.querySelector('.social__picture').alt = commentObjectItem.name;
//   currentCommentItem.querySelector('.social__text').textContent = commentObjectItem.message;
//   return currentCommentItem;
// };

// Удаление имеющихся комментариев
// var deleteComments = function () {
//   var commentsItem = document.querySelectorAll('.social__comment');
//   commentsItem.forEach(function (item) {
//     item.remove();
//   });
// };

// Отрисовка комментариев
// var renderComments = function (imagesObjectsList) {
//   var bigImageSocialComments = document.querySelector('.social__comments');
//   var fragment = document.createDocumentFragment();
//   imagesObjectsList.comments.forEach(function (item) {
//     fragment.appendChild(renderComment(item));
//   });
//   deleteComments();
//   bigImageSocialComments.appendChild(fragment);
// };

// showBigImage(imageItems[0]);

var uploadImageForm = document.querySelector('.img-upload__form');
var uploadOverlay = document.querySelector('.img-upload__overlay');
var uploadField = document.querySelector('#upload-file');
var uploadCloseButton = document.querySelector('.img-upload__cancel');
var scaleControlSmaller = document.querySelector('.scale__control--smaller');
var scaleControlBigger = document.querySelector('.scale__control--bigger');
var scaleControlValue = document.querySelector('.scale__control--value');
var uploadImagePreview = document.querySelector('.img-upload__preview img');

// Показ формы редактирования изображения
var onUploadFieldChange = function () {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadField.value = '';
};

// Закрытие формы редактирования изображения
var onUploadCloseButtonPress = function () {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadField.value = '';
};

// Нажатие на кнопку Enter
var onEnterButtonPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    uploadOverlay.classList.add('hidden');
  }
};

// Нажатие на кнопку Escape
var onEscapeButtonPress = function (evt) {
  if (evt.key === ESC_KEY) {
    uploadOverlay.classList.add('hidden');
  }
};

// Нажатие на кнопку уменьшить
var scaleControlSmallerClick = function () {
  var scaleControlValueItem = parseInt(scaleControlValue.value, 10);
  if (scaleControlValueItem >= 50) {
    scaleControlValue.value = (scaleControlValueItem - 25) + '%';
    uploadImagePreview.style.transform = 'scale(' + (scaleControlValueItem - 25) / 100 + ')';
  } else {
    scaleControlValue.value = '25%';
    uploadImagePreview.style.transform = 'scale(0.25)';
  }
};

// Нажатие на кнопку увеличить
var scaleControlBiggerClick = function () {
  var scaleControlValueItem = parseInt(scaleControlValue.value, 10);
  if (scaleControlValueItem <= 75) {
    scaleControlValue.value = (scaleControlValueItem + 25) + '%';
    uploadImagePreview.style.transform = 'scale(' + (scaleControlValueItem + 25) / 100 + ')';
  } else {
    scaleControlValue.value = '100%';
    uploadImagePreview.style.transform = 'scale(1)';
  }
};

uploadField.addEventListener('change', onUploadFieldChange);
uploadCloseButton.addEventListener('click', onUploadCloseButtonPress);
uploadImageForm.addEventListener('keydown', onEscapeButtonPress);
uploadCloseButton.addEventListener('keydown', onEnterButtonPress);

scaleControlSmaller.addEventListener('click', scaleControlSmallerClick);
scaleControlBigger.addEventListener('click', scaleControlBiggerClick);

// Эффекты изображения
var effects = document.querySelectorAll('.effects__radio');
var effectsSlider = document.querySelector('.img-upload__effect-level');

effects.forEach(function (item) {
  item.addEventListener('click', function () {
    if (item.getAttribute('id') === 'effect-none') {
      getEffectNone();
    } else if (item.getAttribute('id') === 'effect-chrome') {
      getEffectChrome();
    } else if (item.getAttribute('id') === 'effect-sepia') {
      getEffectSepia();
    } else if (item.getAttribute('id') === 'effect-marvin') {
      getEffectMarvin();
    } else if (item.getAttribute('id') === 'effect-phobos') {
      getEffectPhobos();
    } else if (item.getAttribute('id') === 'effect-heat') {
      getEffectHeat();
    }
  });
});

var getEffectNone = function () {
  uploadImagePreview.setAttribute('class', '');
  uploadImagePreview.classList.add('effects__preview--none');
  uploadImagePreview.style.filter = 'none';
  effectsSlider.style.display = 'none';
};

var getEffectChrome = function () {
  uploadImagePreview.setAttribute('class', '');
  uploadImagePreview.classList.add('effects__preview--chrome');
  uploadImagePreview.style.filter = 'grayscale(1)';
  effectsSlider.style.display = 'block';
};

var getEffectSepia = function () {
  uploadImagePreview.setAttribute('class', '');
  uploadImagePreview.classList.add('effects__preview--sepia');
  uploadImagePreview.style.filter = 'sepia(1)';
  effectsSlider.style.display = 'block';
};

var getEffectMarvin = function () {
  uploadImagePreview.setAttribute('class', '');
  uploadImagePreview.classList.add('effects__preview--marvin');
  uploadImagePreview.style.filter = 'invert(100%)';
  effectsSlider.style.display = 'block';
};

var getEffectPhobos = function () {
  uploadImagePreview.setAttribute('class', '');
  uploadImagePreview.classList.add('effects__preview--phobos');
  uploadImagePreview.style.filter = 'blur(3px)';
  effectsSlider.style.display = 'block';
};

var getEffectHeat = function () {
  uploadImagePreview.setAttribute('class', '');
  uploadImagePreview.classList.add('effects__preview--heat');
  uploadImagePreview.style.filter = 'brightness(3)';
  effectsSlider.style.display = 'block';
};

// Фильтр по умолчанию
document.addEventListener('DOMContentLoaded', getEffectNone);

// Значение фильтра слайдера
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelValue = document.querySelector('.effect-level__value');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelDepth = document.querySelector('.effect-level__depth');

var getEffectLevelValue = function () {
  return Math.round(effectLevelDepth.clientWidth / effectLevelLine.clientWidth * 100);
};

// Получаем значение яркости
var getBrightnessValue = function () {
  var brightnessValue = (getEffectLevelValue() / 10) / 3;
  if (brightnessValue < 1) {
    brightnessValue = 1;
  }
  return brightnessValue;
};

effectLevelPin.addEventListener('mouseup', function () {
  if (uploadImagePreview.getAttribute('class') === 'effects__preview--none') {
    uploadImagePreview.style.filter = 'none';
  } else if (uploadImagePreview.getAttribute('class') === 'effects__preview--chrome') {
    uploadImagePreview.style.filter = 'grayscale(' + getEffectLevelValue() / 100 + ')';
  } else if (uploadImagePreview.getAttribute('class') === 'effects__preview--sepia') {
    uploadImagePreview.style.filter = 'sepia(' + getEffectLevelValue() / 100 + ')';
  } else if (uploadImagePreview.getAttribute('class') === 'effects__preview--marvin') {
    uploadImagePreview.style.filter = 'invert(' + getEffectLevelValue() + '%)';
  } else if (uploadImagePreview.getAttribute('class') === 'effects__preview--phobos') {
    uploadImagePreview.style.filter = 'blur(' + (getEffectLevelValue() / 10) / 3 + 'px)';
  } else if (uploadImagePreview.getAttribute('class') === 'effects__preview--heat') {
    uploadImagePreview.style.filter = 'brightness(' + getBrightnessValue() + ')';
  }
  effectLevelValue.value = getEffectLevelValue();
});

// Валидация хештегов
var HASHTAG_SYMBOL = '#';
var HASHTAG_MAX_LENGTH = 20;
var HASHTAG_MAX_QUANITY = 5;
var HASHTAG_PATTERN = /^#[\w\dа-яА-Я]+$/;
var HASHTAG_VALIDATE_ERRORS = {
  firstSymbol: 'Хэштег должен начинаться с символа "#".',
  symbolsLength: 'Доступное количество символов 20.',
  onlyHashtag: 'Хештег не может состоять только из символа "#".',
  toMuchHashtags: 'Максимальное количество хештегов равно ' + HASHTAG_MAX_QUANITY + '.',
  onlyUniqueHashtags: 'Повторяющиеся хештеги не допустимы.',
  invalidSymbols: 'Допустим ввод только букв и цифр.'
};
var hashtagsField = document.querySelector('.text__hashtags');

hashtagsField.addEventListener('input', function () {
  hashtagValidate(hashtagsField);
});

var hashtagValidate = function (hashtagsItem) {
  var error = '';
  var hashtagsString = hashtagsItem.value.toLocaleLowerCase();
  var hashtagsElements = hashtagsString.split(' ');

  hashtagsElements.forEach(function (item, i) {
    if (item[0] !== HASHTAG_SYMBOL) {
      error = HASHTAG_VALIDATE_ERRORS.firstSymbol;
    } else if (item.length > HASHTAG_MAX_LENGTH) {
      error = HASHTAG_VALIDATE_ERRORS.symbolsLength;
    } else if (item === HASHTAG_SYMBOL) {
      error = HASHTAG_VALIDATE_ERRORS.onlyHashtag;
    } else if (hashtagsElements.length > HASHTAG_MAX_QUANITY) {
      error = HASHTAG_VALIDATE_ERRORS.toMuchHashtags;
    } else if (hashtagsElements[0] === hashtagsElements[i + 1]) {
      error = HASHTAG_VALIDATE_ERRORS.onlyUniqueHashtags;
    } else if (HASHTAG_PATTERN.test(item) === false) {
      error = HASHTAG_VALIDATE_ERRORS.invalidSymbols;
    }
  });

  hashtagsItem.setCustomValidity(error);
};
