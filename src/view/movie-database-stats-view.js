import {createElement} from '../framework/render';

const createFilmDatabaseStatsTemplate = (moviesQty) => '' +
`<p>${moviesQty} movies inside</p>`;

export default class MovieDatabaseStatsView {
  #element = null;
  #moviesQty = null;

  constructor(moviesQty) {
    this.#moviesQty = moviesQty;
  }

  get template() {
    return createFilmDatabaseStatsTemplate(this.#moviesQty);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
    this.#moviesQty = null;
  }
}
