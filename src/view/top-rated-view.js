import AbstractView from '../framework/view/abstract-view';


const createTopRatedTemplate = () => `<section class="films-list films-list--extra" id="top-rated">
    <h2 class="films-list__title">Top Rated</h2>

    <div class="films-list__container"></div>
  </section>`;

export default class TopRatedView extends AbstractView {
  get template() {
    return createTopRatedTemplate();
  }

  get listElement() {
    return this.element;
  }

  get containerElement() {
    return this.listElement.querySelector('.films-list__container');
  }
}
