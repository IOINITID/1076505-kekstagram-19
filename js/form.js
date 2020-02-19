'use strict';

// Валидация хештегов
(function () {
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
  var commentField = document.querySelector('.text__description');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadField = document.querySelector('#upload-file');
  var uploadCloseButton = document.querySelector('.img-upload__cancel');
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var uploadImagePreview = document.querySelector('.img-upload__preview img');
  var uploadImageScaleFieldset = document.querySelector('.img-upload__scale');
  var effectsSlider = document.querySelector('.img-upload__effect-level');
  var effectsList = document.querySelector('.effects__list');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelLine = document.querySelector('.effect-level__line');

  // Показ формы редактирования изображения
  var onUploadFieldChange = function () {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    scaleControlValue.value = '100%';
    uploadImagePreview.style.transform = '';
    uploadImagePreview.className = '';
    effectsSlider.style.display = 'none';
    uploadImagePreview.style.filter = '';
    document.addEventListener('keydown', onEscapeButtonPress);
  };

  // Нажатие на кнопку Enter
  var onEnterButtonPress = function (evt) {
    if (evt.key === window.data.ENTER_KEY) {
      uploadOverlay.classList.add('hidden');
    }
  };

  // Закрытие формы редактирования изображения
  var onUploadCloseButtonClick = function () {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    scaleControlValue.value = '100%';
    document.removeEventListener('keydown', onEscapeButtonPress);
  };

  // Нажатие на кнопку Escape
  var onEscapeButtonPress = function (evt) {
    if (evt.key === window.data.ESC_KEY && evt.target !== hashtagsField && evt.target !== commentField) {
      uploadOverlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
      scaleControlValue.value = '100%';
      uploadField.value = '';
      document.removeEventListener('keydown', onEscapeButtonPress);
    }
  };

  var onImageScaleButtonClick = function (evt) {
    var SCALE_MIN_VALUE = 25;
    var SCALE_MAX_VALUE = 100;
    var scaleControlValueItem = parseInt(scaleControlValue.value, 10);
    var scaleValue;
    if (evt.target === scaleControlSmaller && scaleControlValueItem !== SCALE_MIN_VALUE) {
      scaleControlValue.value = (scaleControlValueItem - 25) + '%';
      scaleValue = 'scale(' + (scaleControlValueItem - 25) / 100 + ')';
    } else if (evt.target === scaleControlBigger && scaleControlValueItem !== SCALE_MAX_VALUE) {
      scaleControlValue.value = (scaleControlValueItem + 25) + '%';
      scaleValue = 'scale(' + (scaleControlValueItem + 25) / 100 + ')';
    }
    uploadImagePreview.style.transform = scaleValue;
  };

  uploadField.addEventListener('change', onUploadFieldChange);
  uploadCloseButton.addEventListener('click', onUploadCloseButtonClick);
  uploadCloseButton.addEventListener('keydown', onEnterButtonPress);
  uploadImageScaleFieldset.addEventListener('click', onImageScaleButtonClick);

  effectsList.addEventListener('change', function (evt) {
    if (evt.target.value === 'none') {
      uploadImagePreview.className = '';
      effectsSlider.style.display = 'none';
    } else {
      uploadImagePreview.className = 'effects__preview--' + evt.target.value;
      effectsSlider.style.display = 'block';
    }
    uploadImagePreview.style.filter = '';
  });

  var getEffectLevelValue = function () {
    return Math.round(effectLevelPin.offsetLeft / effectLevelLine.offsetWidth * 100);
  };

  effectLevelPin.addEventListener('mouseup', function () {
    var effectItem = uploadImagePreview.getAttribute('class');
    switch (effectItem) {
      case 'effects__preview--none':
        uploadImagePreview.style.filter = 'none';
        break;
      case 'effects__preview--chrome':
        uploadImagePreview.style.filter = 'grayscale(' + getEffectLevelValue() / 100 + ')';
        break;
      case 'effects__preview--sepia':
        uploadImagePreview.style.filter = 'sepia(' + getEffectLevelValue() / 100 + ')';
        break;
      case 'effects__preview--marvin':
        uploadImagePreview.style.filter = 'invert(' + getEffectLevelValue() + '%)';
        break;
      case 'effects__preview--phobos':
        uploadImagePreview.style.filter = 'blur(' + (getEffectLevelValue() / 10) / 3 + 'px)';
        break;
      case 'effects__preview--heat':
        uploadImagePreview.style.filter = 'brightness(' + (getEffectLevelValue() / 100 * 2) + 1 + ')';
        break;
      default:
        uploadImagePreview.style.filter = 'none';
        break;
    }
    effectLevelValue.value = getEffectLevelValue();
  });

  // Получение количества уникальных елементов
  var getUniqueItems = function (elements) {
    var currentElements = [];
    elements.forEach(function (item) {
      if (!currentElements.includes(item)) {
        currentElements.push(item);
      }
    });
    return currentElements;
  };

  // Валидация поля с хештегами
  var hashtagValidate = function (hashtagsItem) {
    var error = '';
    var hashtagsString = hashtagsItem.value.toLocaleLowerCase();
    var hashtagsElements = hashtagsString.split(' ');
    hashtagsElements.forEach(function (item) {
      if (item[0] !== HASHTAG_SYMBOL) {
        error = HASHTAG_VALIDATE_ERRORS.firstSymbol;
      } else if (item.length > HASHTAG_MAX_LENGTH) {
        error = HASHTAG_VALIDATE_ERRORS.symbolsLength;
      } else if (item === HASHTAG_SYMBOL) {
        error = HASHTAG_VALIDATE_ERRORS.onlyHashtag;
      } else if (hashtagsElements.length > HASHTAG_MAX_QUANITY) {
        error = HASHTAG_VALIDATE_ERRORS.toMuchHashtags;
      } else if (getUniqueItems(hashtagsElements).length < hashtagsElements.length) {
        error = HASHTAG_VALIDATE_ERRORS.onlyUniqueHashtags;
      } else if (HASHTAG_PATTERN.test(item) === false) {
        error = HASHTAG_VALIDATE_ERRORS.invalidSymbols;
      }
    });
    hashtagsItem.setCustomValidity(error);
  };

  // Валидация комментария
  var commentValidate = function (commentItem) {
    if (commentItem.value.length > 140) {
      commentItem.setCustomValidity('Максимальная длина комментария 140 символов.');
    } else {
      commentItem.setCustomValidity('');
    }
  };

  hashtagsField.addEventListener('input', function () {
    hashtagValidate(hashtagsField);
  });

  commentField.addEventListener('input', function () {
    commentValidate(commentField);
  });
})();