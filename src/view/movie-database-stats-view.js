import {createElement} from '../render.js';

const createFilmDatabaseStatsTemplate = () => '' +
  '<p>130 291 movies inside</p>';

export default class MovieDatabaseStatsView {
  getTemplate() {
    return createFilmDatabaseStatsTemplate();
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
