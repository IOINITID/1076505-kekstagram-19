'use strict';

// Объявление переменных и констант
var QUANTITY_OF_IMAGES = 25;
var imageList = document.querySelector('.pictures');
var template = document.querySelector('#picture').content;
var startImageNumber = 1;
var images = [];
var imagesList = [];

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
var createImageDescription = function () {
  var image = {};
  image.url = 'photos/' + startImageNumber + '.jpg';
  image.description = 'Описание фотографии';
  image.likes = getRandomNumberFromTo(15, 200);
  image.comments = createComments(getRandomNumber(5));
  startImageNumber++;
  return image;
};

// Получение списка описаний изображений
var createImagesDescription = function (quantityOfImagesDescription) {
  images = [];
  for (var i = 0; i < quantityOfImagesDescription; i++) {
    images[i] = createImageDescription();
  }
  return images;
};

createImagesDescription(QUANTITY_OF_IMAGES);

// Создание изображения
var renderImage = function (imageItem) {
  var currentImage = template.cloneNode(true);
  currentImage.querySelector('.picture__img').src = imageItem.url;
  currentImage.querySelector('.picture__img').alt = imageItem.description;
  currentImage.querySelector('.picture__likes').textContent = imageItem.likes;
  currentImage.querySelector('.picture__comments').textContent = imageItem.comments.length;
  return currentImage;
};

// Массив картинок
var createImageList = function (imageObjects) {
  imagesList = [];
  imageObjects.forEach(function (item, i) {
    imagesList[i] = renderImage(imageObjects[i]);
  });
  return imagesList;
};

// Отрисовка изобржений на странице
var renderImages = function (imagesObjectList) {
  var fragment = document.createDocumentFragment();
  imagesObjectList.forEach(function (item, i) {
    fragment.appendChild(imagesObjectList[i]);
  });
  imageList.appendChild(fragment);
};

renderImages(createImageList(images));
