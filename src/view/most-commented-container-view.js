import {createElement} from '../render.js';

const createMostCommentedContainerTemplate = () => '' +
  '<section class="films-list films-list--extra" id="most-commented">\n' +
  '  <h2 class="films-list__title">Most Commented</h2>\n' +
  '\n' +
  '  <div class="films-list__container"></div>' +
  '</section>';


export default class MostCommentedContainerView {
  getTemplate() {
    return createMostCommentedContainerTemplate();
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
