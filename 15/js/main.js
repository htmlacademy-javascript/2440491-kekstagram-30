import { getPhotoDescription } from './create-descriptions';
import { createPhotos } from './create-photos';
import { uploadImage } from './change-form';

uploadImage();
createPhotos(getPhotoDescription);
