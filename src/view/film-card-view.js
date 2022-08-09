import {createElement} from '../render.js';
import {getPrettyYear} from '../utility/date-time-format.js';

const createFilmCardTemplate = (film) => {
  const poster = film.filmInfo.poster;
  const title = film.filmInfo.title;
  const rating = film.filmInfo.totalRating;
  const releaseYear = getPrettyYear(film.filmInfo.release.date);
  const runtime = film.filmInfo.runtime;
  const genre = film.filmInfo.genre[0];

  let description = film.filmInfo.description;
  if (description.length > 140) {
    description = description.substring(0, 140).concat('…');
  }

  let commentsQty;
  if (!film.comments) {
    commentsQty = '0 comments';
  } else if (film.comments.length === 1) {
    commentsQty = '1 comment';
  } else {
    commentsQty = `${film.comments.length} comments`;
  }

  const inWatchlistClass = film.userDetails.watchlist ? 'film-card__controls-item--active' : '';
  const inWatchedClass = film.userDetails.alreadyWatched ? 'film-card__controls-item--active' : '';
  const inFavouritesClass = film.userDetails.favorite ? 'film-card__controls-item--active' : '';

  return `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
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

export default class FilmCardView {
  constructor(film) {
    this.film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this.film);
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
