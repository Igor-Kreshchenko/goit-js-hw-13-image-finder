import './styles.css';
import '../node_modules/basiclightbox/src/styles/main.scss';
import pageTpl from './templates/template.hbs';
import ImagesApiService from './js/apiService';
import debounce from 'lodash.debounce';
import LoadMoreBtn from './js/components/load-more-btn';
import onOpenModal from './js/modal';

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
refs.galleryContainer.addEventListener('click', onOpenModal);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(event) {
  imagesApiService.query = event.target.value;

  if (imagesApiService.query !== '') {
    imagesApiService.resetPage();
    clearGalleryContainer();
    fetchImages();
    loadMoreBtn.show();
  }

  clearGalleryContainer();
  // отключить внизу
  loadMoreBtn.disable();
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
