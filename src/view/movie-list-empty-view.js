import AbstractView from '../framework/view/abstract-view';


const createMovieListEmptyTemplate = (message) => `<h2 class="films-list__title">${message}</h2>`;

export default class MovieListEmptyView extends AbstractView {
  #message = null;

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createMovieListEmptyTemplate(this.#message);
  }

  removeElement() {
    super.removeElement();
    this.#message = null;
  }
}
