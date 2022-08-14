import AbstractView from '../framework/view/abstract-view';

const createFilmDatabaseStatsTemplate = (moviesQty) => '' +
`<p>${moviesQty} movies inside</p>`;

export default class MovieDatabaseStatsView extends AbstractView {
  #moviesQty = null;

  constructor(moviesQty) {
    super();
    this.#moviesQty = moviesQty;
  }

  get template() {
    return createFilmDatabaseStatsTemplate(this.#moviesQty);
  }
}
