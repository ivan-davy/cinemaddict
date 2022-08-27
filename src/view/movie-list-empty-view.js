import AbstractView from '../framework/view/abstract-view';


const MESSAGES = {
  'all': 'There are no movies in our database',
  'watchlist': 'There are no movies to watch now',
  'alreadyWatched': 'There are no watched movies now',
  'favorite': 'There are no favorite movies now'
};


const createMovieListEmptyTemplate = (filterName) => `<h2 class="films-list__title">${MESSAGES[filterName]}</h2>`;

export default class MovieListEmptyView extends AbstractView {
  #filter = null;

  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createMovieListEmptyTemplate(this.#filter);
  }

  removeElement() {
    super.removeElement();
    this.#filter = null;
  }
}
