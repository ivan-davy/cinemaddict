import {createElement} from '../render.js';

const createNewRankTemplate = () => '' +
  '<section class="header__profile profile">\n' +
  '  <p class="profile__rating">Movie Buff</p>\n' +
  '  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">\n' +
  '</section>';

export default class NewRankView {
  getTemplate() {
    return createNewRankTemplate();
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
