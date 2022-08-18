import AbstractView from '../framework/view/abstract-view';


const createMovieListTemplate = () => `<section class="films">
      <section class="films-list" id="main-list">
        <div class="films-list__container"></div>
      </section>
  </section>`;

export default class MovieListView extends AbstractView {
  get template() {
    return createMovieListTemplate();
  }

  get filmsElement() {
    return this.element;
  }

  get listElement() {
    return this.filmsElement.querySelector('#main-list');
  }

  get containerElement() {
    return this.listElement.querySelector('.films-list__container');
  }


}
