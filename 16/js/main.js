import { getPhotoDescription } from './create-descriptions';
import { createPhotos } from './create-photos';
import { uploadImage, changeScale, createPhotoFilter} from './change-form';

uploadImage();
changeScale();
createPhotoFilter();
createPhotos(getPhotoDescription);
