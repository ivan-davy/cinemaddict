import {createElement} from '../render.js';

const createNewNavigationTemplate = () => '' +
  '<nav class="main-navigation">\n' +
  '  <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>\n' +
  '  <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>\n' +
  '  <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>\n' +
  '  <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>\n' +
  '</nav>';


export default class NewNavigationView {
  getTemplate() {
    return createNewNavigationTemplate();
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