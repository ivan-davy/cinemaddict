import {createElement} from '../render.js';

const createNewSortTemplate = () => '' +
  '<ul class="sort">\n' +
  '  <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>\n' +
  '  <li><a href="#" class="sort__button">Sort by date</a></li>\n' +
  '  <li><a href="#" class="sort__button">Sort by rating</a></li>\n' +
  '</ul>';

export default class NewSortView {
  getTemplate() {
    return createNewSortTemplate();
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
