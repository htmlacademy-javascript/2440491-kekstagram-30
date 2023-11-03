import { getPhotoDescription } from './create-descriptions';
import { createPhotos } from './create-photos';
import { openBigPhoto } from './open-fullsize-photo';

const photoDescriptions = Array.from({length: 24}, getPhotoDescription);
createPhotos(photoDescriptions);
openBigPhoto(photoDescriptions);
