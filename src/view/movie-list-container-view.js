import AbstractView from '../framework/view/abstract-view';

const createMovieListContainerTemplate = () => `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container"></div>
      </section>
  </section>`;

export default class MovieListContainerView extends AbstractView {
  #element = null;

  get template() {
    return createMovieListContainerTemplate();
  }
}
