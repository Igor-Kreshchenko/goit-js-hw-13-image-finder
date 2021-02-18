import './styles.css';
import pageTpl from './templates/template.hbs';
import ImagesApiService from './js/apiService';
import debounce from 'lodash.debounce';
import LoadMoreBtn from './js/components/load-more-btn';

const refs = {
  searchInput: document.querySelector('[data-action="search-js"]'),
  galleryContainer: document.querySelector('.gallery'),
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const imagesApiService = new ImagesApiService();

refs.searchInput.addEventListener('input', debounce(onSearch, 500));
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(event) {
  imagesApiService.query = event.target.value;

  if (imagesApiService.query !== '') {
    loadMoreBtn.show();
    imagesApiService.resetPage();
    clearGalleryContainer();
    fetchImages();
  }

  clearGalleryContainer();
}

function fetchImages() {
  loadMoreBtn.disable();

  imagesApiService.fetchImages().then(images => {
    appendImagesMarkup(images);
    loadMoreBtn.enable();
  });
}

function appendImagesMarkup(images) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', pageTpl(images));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}
