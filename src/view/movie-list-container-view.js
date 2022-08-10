import {createElement} from '../render.js';

const createMovieListContainerTemplate = () => '' +
  '<section class="films">\n' +
  '    <section class="films-list">\n' +
  '      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>\n' +
  '\n' +
  '      <div class="films-list__container"></div>' +
  '    </section>' +
  '</section>';

export default class MovieListContainerView {
  getTemplate() {
    return createMovieListContainerTemplate();
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
