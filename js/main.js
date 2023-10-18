import { getPhotoDescription } from "./create-description-for-photo";

// генерируем 25 описаний для фото
const photoDescriptions = Array.from({length: 25}, getPhotoDescription);
