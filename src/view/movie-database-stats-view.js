import {createElement} from '../render.js';

const createFilmDatabaseStatsTemplate = (moviesQty) => '' +
`<p>${moviesQty} movies inside</p>`;

export default class MovieDatabaseStatsView {
  constructor(moviesQty) {
    this.moviesQty = moviesQty;
  }

  getTemplate() {
    return createFilmDatabaseStatsTemplate(this.moviesQty);
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
