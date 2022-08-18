import AbstractView from '../framework/view/abstract-view';


const SCENARIO_MESSAGES = {
  'all': 'There are no movies in our database',
  'watchlist': 'There are no movies to watch now',
  'alreadyWatched': 'There are no watched movies now',
  'favorites': 'There are no favorite movies now'
};


const createMovieListEmptyTemplate = (message) => `<h2 class="films-list__title">${message}</h2>`;

export default class MovieListEmptyView extends AbstractView {
  #message = null;

  constructor() {
    super();
    this.#message = SCENARIO_MESSAGES['all'];
  }

  get template() {
    return createMovieListEmptyTemplate(this.#message);
  }

  setScenario = (scenario) => {
    this.#message = SCENARIO_MESSAGES[scenario];
  };

  removeElement() {
    super.removeElement();
    this.#message = null;
  }
}
