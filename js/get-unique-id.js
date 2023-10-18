// Функция получения id
const getUniqueId = () => {
  let id = 0;
  return function () {
    id += 1;
    return id;
  };
};
export {getUniqueId};
