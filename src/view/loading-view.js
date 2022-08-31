import AbstractView from '../framework/view/abstract-view.js';

const createLoadingTemplate = () => (
  `<p class="loading-prompt">
     Loading...
   </p>`
);

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}
