import {getPrettyDate} from '../../utility/date-time-format';
import AbstractView from '../../framework/view/abstract-view';

const createInfoTemplate = (movie) => {
  const {poster, title, ageRating, alternativeTitle, totalRating, director, runtime, description} = movie.filmInfo;
  const writers = movie.filmInfo.writers.join(', ');
  const actors = movie.filmInfo.actors.join(', ');
  const releaseDate = getPrettyDate(movie.filmInfo.release.date);
  const country = movie.filmInfo.release.releaseCountry;
  let genres = '';
  for (const genre of movie.filmInfo.genre) {
    genres += (`<span class="film-details__genre">${genre}</span>\n`);
  }

  const inWatchlistClass = movie.userDetails.watchlist ? 'film-details__control-button--active' : '';
  const inWatchedClass = movie.userDetails.alreadyWatched ? 'film-details__control-button--active' : '';
  const inFavouritesClass = movie.userDetails.favorite ? 'film-details__control-button--active' : '';

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
                <p class="film-details__title-original">Original: ${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
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

export default class InfoView extends AbstractView {
  #element = null;
  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createInfoTemplate(this.#movie);
  }
}
