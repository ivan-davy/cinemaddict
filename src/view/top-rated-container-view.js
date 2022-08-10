import {createElement} from '../render.js';

const createTopRatedContainerTemplate = () => '' +
  '<section class="films-list films-list--extra" id="top-rated">\n' +
  '  <h2 class="films-list__title">Top Rated</h2>\n' +
  '\n' +
  '  <div class="films-list__container"></div>' +
  '</section>';

export default class TopRatedContainerView {
  #element = null;

  get template() {
    return createTopRatedContainerTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
