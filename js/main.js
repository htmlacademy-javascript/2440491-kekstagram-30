import { getPhotoDescription } from './create-descriptions.js';

// генерируем 25 описаний для фото
const photoDescriptions = Array.from({length: 25}, getPhotoDescription);
