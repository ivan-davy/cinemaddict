import {createElement} from '../framework/render';

const createTopRatedContainerTemplate = () => `<section class="films-list films-list--extra" id="top-rated">
    <h2 class="films-list__title">Top Rated</h2>

    <div class="films-list__container"></div>
  </section>`;

export default class TopRatedContainerView {
  #element = null;

  get template() {
    return createTopRatedContainerTemplate();
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
