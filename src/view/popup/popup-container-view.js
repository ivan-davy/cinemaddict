import {createElement} from '../../framework/render';

const createPopupContainerTemplate = () =>
  `<section class="film-details">
    <div class="film-details__inner"></div>
  </section>`;

export default class PopupContainerView {
  #element = null;

  get template() {
    return createPopupContainerTemplate();
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
