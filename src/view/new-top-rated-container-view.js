import {createElement} from '../render.js';

const createNewTopRatedContainerTemplate = () => '' +
  '<section class="films-list films-list--extra" id="top-rated">\n' +
  '  <h2 class="films-list__title">Top Rated</h2>\n' +
  '\n' +
  '  <div class="films-list__container"></div>' +
  '</section>';

export default class NewTopRatedContainerView {
  getTemplate() {
    return createNewTopRatedContainerTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
