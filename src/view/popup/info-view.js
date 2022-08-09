import {createElement} from '../../render.js';
import {getPrettyDate} from '../../utility/date-time-format';

const createInfoTemplate = (film) => {
  const poster = film.filmInfo.poster;
  const title = film.filmInfo.title;
  const ageRating = film.filmInfo.ageRating;
  const altTitle = film.filmInfo.alternativeTitle;
  const rating = film.filmInfo.totalRating;
  const director = film.filmInfo.director;
  const writers = film.filmInfo.writers.join(', ');
  const actors = film.filmInfo.actors.join(', ');
  const releaseDate = getPrettyDate(film.filmInfo.release.date);
  const runtime = film.filmInfo.runtime;
  const country = film.filmInfo.release.releaseCountry;
  const description = film.filmInfo.description;

  let genres = '';
  for (const genre of film.filmInfo.genre) {
    genres += (`<span class="film-details__genre">${genre}</span>\n`);
  }

  const inWatchlistClass = film.userDetails.watchlist ? 'film-details__control-button--active' : '';
  const inWatchedClass = film.userDetails.alreadyWatched ? 'film-details__control-button--active' : '';
  const inFavouritesClass = film.userDetails.favorite ? 'film-details__control-button--active' : '';

  return `<div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src=${poster} alt="${title}">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">Original: ${altTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${runtime}m</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">${genres}</td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${inWatchlistClass}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${inWatchedClass}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${inFavouritesClass}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>`;
};

export default class InfoView {
  constructor(movie) {
    this.movie = movie;
  }

  getTemplate() {
    return createInfoTemplate(this.movie);
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
