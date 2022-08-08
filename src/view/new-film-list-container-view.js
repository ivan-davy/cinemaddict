import {createElement} from '../render.js';

const createNewFilmListContainerTemplate = () => '' +
  '<section class="films">\n' +
  '    <section class="films-list">\n' +
  '      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>\n' +
  '\n' +
  '      <div class="films-list__container"></div>' +
  '    </section>' +
  '</section>';

export default class NewFilmListContainerView {
  getTemplate() {
    return createNewFilmListContainerTemplate();
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
