import {createElement} from '../render.js';

const createNewFilmDatabaseStatsTemplate = () => '' +
  '<p>130 291 movies inside</p>';

export default class NewFilmDatabaseStatsView {
  getTemplate() {
    return createNewFilmDatabaseStatsTemplate();
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
