import * as basicLightbox from 'basiclightbox';

export default function onOpenModal(event) {
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  basicLightbox
    .create(
      `
    <img width="1400" height="900" src="${event.target.dataset['source']}">
	`,
    )
    .show();
}
