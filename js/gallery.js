'use strict';

(function () {
  // Получение комментария
  // var createComment = function () {
  //   var MESSAGES = ['Всё отлично!',
  //     'В целом всё неплохо. Но не всё.',
  //     'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  //     'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  //     'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  //     'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  //   ];
  //   var NAMES = ['Иван', 'Даша', 'Маша', 'Александр', 'Катя', 'Оля'];
  //   var comment = {};
  //   comment.avatar = 'img/avatar-' + window.data.getRandomNumber(6) + '.svg';
  //   comment.message = window.data.getRandomElement(MESSAGES);
  //   comment.name = window.data.getRandomElement(NAMES);
  //   return comment;
  // };

  // Получение списка комментариев
  // var createComments = function (quantityOfComments) {
  //   var comments = [];
  //   for (var i = 0; i < quantityOfComments; i++) {
  //     comments[i] = createComment();
  //   }
  //   return comments;
  // };

  // Получение описания изображения
  // var createImageDescription = function (index) {
  //   var image = {};
  //   image.url = 'photos/' + (index + 1) + '.jpg';
  //   image.description = 'Описание фотографии';
  //   image.likes = window.data.getRandomNumberFromTo(15, 200);
  //   image.comments = createComments(window.data.getRandomNumber(5));
  //   return image;
  // };

  // Получение списка описаний изображений
  // var createImagesDescription = function (quantityOfImagesDescription) {
  //   var images = [];
  //   for (var i = 0; i < quantityOfImagesDescription; i++) {
  //     images[i] = createImageDescription(i);
  //   }
  //   return images;
  // };

  // Экспорт в глобальную область
  // window.gallery = {
  //   createImagesDescription: createImagesDescription,
  // };
})();
