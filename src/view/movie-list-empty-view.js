import {createElement} from '../render.js';

const createMovieListEmptyTemplate = (message) => `<h2 class="films-list__title visually-hidden">${message}</h2>`;

export default class MovieListEmptyView {
  #element = null;
  #message = null;

  constructor(message) {
    this.#message = message;
  }

  get template() {
    return createMovieListEmptyTemplate(this.#message);
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
