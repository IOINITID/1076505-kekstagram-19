'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var URL_FORM = 'https://js.dump.academy/kekstagram';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200,
  };

  var newRequest = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    newRequest(xhr, onLoad, onError);

    xhr.open('GET', URL);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    newRequest(xhr, onLoad, onError);

    xhr.open('POST', URL_FORM);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
