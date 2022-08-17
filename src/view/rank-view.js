import {createElement} from '../render.js';

const createRankTemplate = () => '' +
  '<section class="header__profile profile">\n' +
  '  <p class="profile__rating">Movie Buff</p>\n' +
  '  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">\n' +
  '</section>';

export default class RankView {
  #element = null;

  get template() {
    return createRankTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
