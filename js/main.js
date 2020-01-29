'use strict';

// Получение случайного числа (утилитная функция)
var getRandomNumber = function (number) {
  return Math.ceil(Math.random() * number);
};

// Получение случайного числа в заданном диапазоне (утилитная функция)
var getRandomNumberFromTo = function (minNumber, maxNumber) {
  var number = minNumber + Math.random() * (maxNumber + 1 - minNumber);
  return Math.floor(number);
};

// Объявление переменных
var imageList = document.querySelector('.pictures');
var template = document.querySelector('#picture').content;

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
  comment.message = MESSAGES[getRandomNumber(MESSAGES.length - 1)];
  comment.name = NAMES[getRandomNumber(NAMES.length - 1)];
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
var createImageDescription = function () {
  var image = {};
  image.url = 'photos/' + getRandomNumber(25) + '.jpg';
  image.description = 'Описание фотографии';
  image.likes = getRandomNumberFromTo(15, 200);
  image.comments = createComments(getRandomNumber(5));
  return image;
};

// Получение списка описаний изображений
var createImagesDescription = function (quantityOfImagesDescription) {
  var images = [];
  for (var i = 0; i < quantityOfImagesDescription; i++) {
    images[i] = createImageDescription();
  }
  return images;
};

// Создание изображения
var renderImage = function (imageItem) {
  var currentImage = template.cloneNode(true);
  currentImage.querySelector('.picture__img').src = imageItem.url;
  currentImage.querySelector('.picture__img').alt = imageItem.description;
  currentImage.querySelector('.picture__likes').textContent = imageItem.likes;
  currentImage.querySelector('.picture__comments').textContent = imageItem.comments.length;
  return currentImage;
};

// Отрисовка изобржений на странице
var renderImages = function (quantityOfImages) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < createImagesDescription(quantityOfImages).length; i++) {
    fragment.appendChild(renderImage(createImagesDescription(quantityOfImages)[i]));
  }
  imageList.appendChild(fragment);
};

renderImages(25);
