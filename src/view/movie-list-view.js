import AbstractView from '../framework/view/abstract-view';


const createMovieListTemplate = () => `<section class="films">
      <section class="films-list">
        <div class="films-list__container"></div>
      </section>
  </section>`;

export default class MovieListView extends AbstractView {
  get template() {
    return createMovieListTemplate();
  }

  get filmsElement() {
    return document.querySelector('.films');
  }

  get listElement() {
    return document.querySelector('.films-list');
  }

  get containerElement() {
    return document.querySelector('.films-list__container');
  }


}
