import {createElement} from '../../render.js';

const createPopupContainerTemplate = () =>
  `<section class="film-details">
    <div class="film-details__inner"></div>
  </section>`;

export default class PopupContainerView {
  getTemplate() {
    return createPopupContainerTemplate();
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
