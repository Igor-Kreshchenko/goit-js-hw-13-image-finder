import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

function showError(text) {
  error({
    type: 'error',
    title: false,
    text,
    closer: true,
    sticker: false,
    width: '400px',
    delay: 2000,
  });
}

export { showError };
