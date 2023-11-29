import { createPhotos } from './create-photos';
import { uploadImage, changeScale, createPhotoFilter} from './change-form';
import { getData } from './api';

uploadImage();
changeScale();
createPhotoFilter();
getData()
  .then((photos) => {
    createPhotos(photos);
  });
