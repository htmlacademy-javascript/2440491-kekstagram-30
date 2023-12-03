const mainPopup = document.querySelector('.img-upload__overlay');
const sliderEl = mainPopup.querySelector('.effect-level__slider');
const sliderValue = mainPopup.querySelector('.effect-level__value');
const filtersEl = mainPopup.querySelectorAll('.effects__radio');
const previewPhoto = mainPopup.querySelector('.img-upload__preview').querySelector('img');

// Ф-ция для создания фильтра для фото
const createPhotoFilter = function () {
  let lastFilter;
  sliderEl.parentElement.classList.add('hidden');
  // Создаем слайдер
  noUiSlider.create(sliderEl, {
    start: 0,
    step: 1,
    connect: 'lower',
    range: {
      'min': 0,
      'max': 100
    }
  });
  // Словарь с фильтрами и их значениями для css: filter
  sliderValue.value = 0;
  const filters = {
    none: '',
    chrome: 'grayscale',
    sepia: 'sepia',
    marvin: 'invert',
    phobos: 'blur',
    heat: 'brightness'
  };
  // Словарь с промежутками и шагами
  const filtersRange = {
    none: '',
    chrome: '0:1:0.1',
    sepia: '0:1:0.1',
    marvin: '0:100:1:%',
    phobos: '0:3:0.1:px',
    heat: '1:3:0.1',
  };

  // Ф-ция для смены фильтра
  const changeFilter = function (filter) {
    if (filter !== 'none' && filter !== lastFilter) {
      // Формируем массив из объекта 'filtersRange' для предачи нужных параметров
      const filterRange = filtersRange[filter].split(':').slice(0,3).map((el) => Number(el));
      if (filterRange){
        sliderEl.noUiSlider.updateOptions({
          start: filterRange[1],
          range: {
            min: filterRange[0],
            max: filterRange[1],
          },
          step: filterRange[2],
        });
        sliderEl.parentElement.classList.remove('hidden');
        // Ф-ция для изменения текущего значения фильтра
        const changeFilterValue = function (currentFilterValue) {
          const filterValue = currentFilterValue + (filtersRange[filter].split(':')[3] || '');
          previewPhoto.style.filter = `${filters[filter]}(${filterValue})`;
        };
        sliderEl.noUiSlider.on('update', () => {
          sliderValue.value = Number(sliderEl.noUiSlider.get());
          changeFilterValue(sliderValue.value);
        });
        changeFilterValue(filterRange[1]);
      }
    } else if (filter === 'none' && filter !== lastFilter) {
      sliderEl.parentElement.classList.add('hidden');
      previewPhoto.style.filter = null;
    }
    lastFilter = filter;
  };

  filtersEl.forEach((filterEl) => {
    filterEl.addEventListener('click', () => {
      changeFilter(filterEl.value);
    });
  });
};

export {createPhotoFilter};
