import AbstractView from '../framework/view/abstract-view';

const createTopRatedContainerTemplate = () => `<section class="films-list films-list--extra" id="top-rated">
    <h2 class="films-list__title">Top Rated</h2>

    <div class="films-list__container"></div>
  </section>`;

export default class TopRatedContainerView extends AbstractView {
  #element = null;

  get template() {
    return createTopRatedContainerTemplate();
  }
}
