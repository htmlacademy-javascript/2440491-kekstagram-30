const SERVER_ADDRESS = 'https://30.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  POST_DATA: '/',
};

const Method = {
  'GET': 'GET',
  'POST': 'POST'
};

const ErrorMesages = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  POST_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const useServerFor = (route, errorMessage, method = Method.GET, body = null) =>
  fetch(`${SERVER_ADDRESS}${route}`, {method, body})
    .then((response) => {
      if(!response.ok){
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorMessage);
    });

const getData = () => useServerFor(Route.GET_DATA, ErrorMesages.GET_DATA);

const sendData = (body) => useServerFor(Route.POST_DATA, ErrorMesages.POST_DATA, Method.POST, body);

export {getData, sendData};
