<<<<<<< HEAD
import { getPhotoDescription } from './create-descriptions';
import { createPhotos } from './create-photos';

createPhotos(getPhotoDescription);
=======
import { getPhotoDescription } from './create-descriptions.js';

// генерируем 25 описаний для фото
// eslint-disable-next-line no-unused-vars
const photoDescriptions = Array.from({length: 25}, getPhotoDescription);
>>>>>>> 07c62b787bd4c3f166d22320ea1f53dd06046d28
