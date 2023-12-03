import { getPhotosFromServer } from './upload-photos';
import { createPhotoFilter } from './effects';
import { uploadImage} from './form';

createPhotoFilter();
uploadImage();
getPhotosFromServer();
