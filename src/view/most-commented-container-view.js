import {createElement} from '../framework/render';

const createMostCommentedContainerTemplate = () => '' +
  '<section class="films-list films-list--extra" id="most-commented">\n' +
  '  <h2 class="films-list__title">Most Commented</h2>\n' +
  '\n' +
  '  <div class="films-list__container"></div>' +
  '</section>';


export default class MostCommentedContainerView {
  #element = null;

  get template() {
    return createMostCommentedContainerTemplate();
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
