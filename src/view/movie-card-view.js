import {getPrettyYear} from '../utility/date-time-format.js';
import AbstractView from '../framework/view/abstract-view';


const createFilmCardTemplate = (movie) => {
  const {poster, title, totalRating, runtime} = movie.filmInfo;
  const releaseYear = getPrettyYear(movie.filmInfo.release.date);
  const genre = movie.filmInfo.genre[0];

  let description = movie.filmInfo.description;
  if (description.length > 140) {
    description = description.substring(0, 140).concat('…');
  }

  let commentsQty;
  if (!movie.comments) {
    commentsQty = '0 comments';
  } else if (movie.comments.length === 1) {
    commentsQty = '1 comment';
  } else {
    commentsQty = `${movie.comments.length} comments`;
  }

  const inWatchlistClass = movie.userDetails.watchlist ? 'film-card__controls-item--active' : '';
  const inWatchedClass = movie.userDetails.alreadyWatched ? 'film-card__controls-item--active' : '';
  const inFavouritesClass = movie.userDetails.favorite ? 'film-card__controls-item--active' : '';

  return `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseYear}</span>
        <span class="film-card__duration">${runtime}m</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src=${poster} alt=${title} class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <span class="film-card__comments">${commentsQty}</span>
    </a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${inWatchlistClass}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${inWatchedClass}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${inFavouritesClass}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class MovieCardView extends AbstractView {
  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createFilmCardTemplate(this.#movie);
  }

  setMovieClickHandler(callback) {
    this._callback.movieClick = callback;
    this.element.querySelector('.film-card__link')
      .addEventListener('click', this.#movieClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist')
      .addEventListener('click', this.#watchlistClickHandler);
  }

  setHistoryClickHandler(callback) {
    this._callback.historyClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched')
      .addEventListener('click', this.#historyClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite')
      .addEventListener('click', this.#favoriteClickHandler);
  }


  #movieClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.movieClick();
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    //this.element.querySelector('.film-card__controls-item--add-to-watchlist')
    //  .classList.toggle('film-card__controls-item--active');
    this._callback.watchlistClick();
  };

  #historyClickHandler = (evt) => {
    evt.preventDefault();
    //this.element.querySelector('.film-card__controls-item--mark-as-watched')
    //  .classList.toggle('film-card__controls-item--active');
    this._callback.historyClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    //this.element.querySelector('.film-card__controls-item--favorite')
    //  .classList.toggle('film-card__controls-item--active');
    this._callback.favoriteClick();
  };

  removeElement() {
    super.removeElement();
    this.#movie = null;
  }
}
