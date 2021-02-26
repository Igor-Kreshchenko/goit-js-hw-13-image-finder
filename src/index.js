import './styles.css';
import '../node_modules/basiclightbox/src/styles/main.scss';
import pageTpl from './templates/template.hbs';
import ImagesApiService from './js/apiService';
import debounce from 'lodash.debounce';
import LoadMoreBtn from './js/components/load-more-btn';
import onOpenModal from './js/modal';
import { showError } from './js/error-notification';

const refs = {
  searchInput: document.querySelector('[data-action="search-js"]'),
  galleryContainer: document.querySelector('.gallery'),
  logoRef: document.querySelector('.logo'),
  bodyRef: document.body,
};
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const imagesApiService = new ImagesApiService();
let scrollPosition = 0;

refs.searchInput.addEventListener('input', debounce(onSearch, 500));
refs.galleryContainer.addEventListener('click', onOpenModal);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(event) {
  imagesApiService.query = event.target.value;

  if (imagesApiService.query !== '') {
    imagesApiService.resetPage();
    clearGalleryContainer();
    resetScrollPosition();
    fetchImages();
    loadMoreBtn.show();
    return;
  }

  clearGalleryContainer();
  addLogo();
  loadMoreBtn.hide();
}

function fetchImages() {
  loadMoreBtn.disable();

  imagesApiService
    .fetchImages()
    .then(images => {
      if (images.length === 0) {
        showError('No results found. Try again');
        loadMoreBtn.hide();
      }

      removeLogo();
      appendImagesMarkup(images);
      loadMoreBtn.enable();
    })
    .then(scrollDown)
    .catch(onError);
}

function appendImagesMarkup(images) {
  refs.galleryContainer.insertAdjacentHTML('beforeend', pageTpl(images));
}

function clearGalleryContainer() {
  refs.galleryContainer.innerHTML = '';
}

function onError() {
  showError('Unexpected error!');
}

function removeLogo() {
  refs.logoRef.classList.add('is-hidden');
}

function addLogo() {
  refs.logoRef.classList.remove('is-hidden');
}

function resetScrollPosition() {
  scrollPosition = 0;
}

function scrollDown() {
  window.scrollTo({
    top: scrollPosition,
    behavior: 'smooth',
  });

  scrollPosition = refs.bodyRef.scrollHeight;
}
