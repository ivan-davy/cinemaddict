import {createElement} from '../render.js';

const createFilmCardTemplate = () => '' +
  '<article class="film-card">\n' +
  '  <a class="film-card__link">\n' +
  '    <h3 class="film-card__title">The Dance of Life</h3>\n' +
  '    <p class="film-card__rating">8.3</p>\n' +
  '    <p class="film-card__info">\n' +
  '      <span class="film-card__year">1929</span>\n' +
  '      <span class="film-card__duration">1h 55m</span>\n' +
  '      <span class="film-card__genre">Musical</span>\n' +
  '    </p>\n' +
  '    <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">\n' +
  '    <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>\n' +
  '    <span class="film-card__comments">5 comments</span>\n' +
  '  </a>\n' +
  '  <div class="film-card__controls">\n' +
  '    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>\n' +
  '    <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>\n' +
  '    <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>\n' +
  '  </div>\n' +
  '</article>';

export default class FilmCardView {
  getTemplate() {
    return createFilmCardTemplate();
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
