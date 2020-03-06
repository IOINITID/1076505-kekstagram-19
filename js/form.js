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

  var closeUploadModal = function () {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    scaleControlValue.value = '100%';
    uploadField.value = '';
    document.removeEventListener('keydown', onEscapeButtonPress);
    hashtagsField.value = '';
    commentField.value = '';
  };

  // Закрытие формы редактирования изображения
  var onUploadCloseButtonClick = function () {
    // uploadOverlay.classList.add('hidden');
    // document.body.classList.remove('modal-open');
    // scaleControlValue.value = '100%';
    // document.removeEventListener('keydown', onEscapeButtonPress);
    closeUploadModal();
  };

  // Нажатие на кнопку Escape
  var onEscapeButtonPress = function (evt) {
    if (evt.key === window.data.ESC_KEY && evt.target !== hashtagsField && evt.target !== commentField) {
      // uploadOverlay.classList.add('hidden');
      // document.body.classList.remove('modal-open');
      // scaleControlValue.value = '100%';
      // uploadField.value = '';
      // document.removeEventListener('keydown', onEscapeButtonPress);
      closeUploadModal();
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

      effectLevelValue.value = 100;
      effectLevelDepth.style.width = '100%';
      effectLevelPin.style.left = effectLevelLine.clientWidth + 'px';

    }
    uploadImagePreview.style.filter = '';
  });

  var getEffectLevelValue = function () {
    return Math.round(effectLevelPin.offsetLeft / effectLevelLine.offsetWidth * 100);
  };

  var onEffectPinMouseUp = function () {
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
  };

  effectLevelPin.addEventListener('mouseup', onEffectPinMouseUp);

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

  // Effect pin dragg event
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      var effectLevelPinPosition = effectLevelPin.offsetLeft - shift.x;

      if (effectLevelPinPosition >= 0 && effectLevelPinPosition <= effectLevelLine.clientWidth) {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
        effectLevelValue.value = getEffectLevelValue();
        effectLevelDepth.style.width = getEffectLevelValue() + '%';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (upEvt.target !== effectLevelPin) {
        document.addEventListener('mouseup', onEffectPinMouseUp);
        document.addEventListener('mousemove', onEffectPinMouseUp);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Form data upload
  var form = document.querySelector('.img-upload__form');
  var main = document.querySelector('main');

  var onSuccessUpload = function () {
    var successTemplate = document.querySelector('#success').content;
    var success = successTemplate.cloneNode(true);
    main.appendChild(success);
    var successButton = document.querySelector('.success__button');
    var successElement = document.querySelector('.success');
    successButton.addEventListener('click', onSuccessClose);
    successElement.addEventListener('click', onSuccessClose);
    document.addEventListener('keydown', onSuccessEscKeydown);
  };

  var onSuccessClose = function (evt) {
    evt.preventDefault();
    var successElement = document.querySelector('.success');
    if (successElement) {
      successElement.remove();
    }
  };

  var onSuccessEscKeydown = function (evt) {
    evt.preventDefault();
    var successElement = document.querySelector('.success');
    if (evt.key === window.data.ESC_KEY) {
      successElement.remove();
    }
  };

  var onErrorUpload = function () {
    var errorTemplate = document.querySelector('#error').content;
    var error = errorTemplate.cloneNode(true);
    main.appendChild(error);
    var errorButton = document.querySelector('.error__button');
    var errorElement = document.querySelector('.error');
    errorButton.addEventListener('click', onErrorClose);
    errorElement.addEventListener('click', onErrorClose);
    document.addEventListener('keydown', onErrorEscKeydown);
  };

  var onErrorClose = function (evt) {
    evt.preventDefault();
    var errorElement = document.querySelector('.error');
    if (errorElement) {
      errorElement.remove();
    }
  };

  var onErrorEscKeydown = function (evt) {
    evt.preventDefault();
    var errorElement = document.querySelector('.error');
    if (evt.key === window.data.ESC_KEY) {
      errorElement.remove();
    }
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    scaleControlValue.value = parseInt(scaleControlValue.value, 10);
    window.backend.save(new FormData(form), function () {
      closeUploadModal();
      onSuccessUpload();
    }, function () {
      closeUploadModal();
      onErrorUpload();
    });
  });

})();
