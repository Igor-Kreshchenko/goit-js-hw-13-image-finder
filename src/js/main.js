import pageTpl from '../templates/template.hbs';
import ImagesApiService from './apiService';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryContainer: document.querySelector('.gallery'),
};

const imagesApiService = new ImagesApiService();

console.log(imagesApiService);

// refs.searchForm.addEventListener('submit', onSearch);
