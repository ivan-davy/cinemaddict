import {createElement} from '../render.js';

const createNewMostCommentedContainerTemplate = () => '' +
  '<section class="films-list films-list--extra" id="most-commented">\n' +
  '  <h2 class="films-list__title">Most Commented</h2>\n' +
  '\n' +
  '  <div class="films-list__container"></div>' +
  '</section>';


export default class NewMostCommentedContainerView {
  getTemplate() {
    return createNewMostCommentedContainerTemplate();
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
