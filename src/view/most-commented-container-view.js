import AbstractView from '../framework/view/abstract-view';

const createMostCommentedContainerTemplate = () => `<section class="films-list films-list--extra" id="most-commented">
    <h2 class="films-list__title">Most Commented</h2>

    <div class="films-list__container"></div>
  </section>`;


export default class MostCommentedContainerView extends AbstractView {
  #element = null;

  get template() {
    return createMostCommentedContainerTemplate();
  }
}
