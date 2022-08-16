import AbstractView from '../framework/view/abstract-view';

const createMovieListContainerTemplate = () => `<section class="films">
      <section class="films-list">
        <div class="films-list__container"></div>
      </section>
  </section>`;

export default class MovieListContainerView extends AbstractView {
  get template() {
    return createMovieListContainerTemplate();
  }
}
