import AbstractView from '../../framework/view/abstract-view';


const createPopupContainerTemplate = () =>
  `<section class="film-details">
    <div class="film-details__inner"></div>
  </section>`;

export default class ContainerView extends AbstractView {
  get template() {
    return createPopupContainerTemplate();
  }

  isPopupOpen = () => document.contains(document.querySelector('.film-details'));
  closeAllPopups = () => document.querySelectorAll('.film-details')
    .forEach((node) => node.remove());

  restrictOverflow = (element) => {
    element.classList.add('hide-overflow');
  };

  allowOverflow = (element) => {
    element.classList.remove('hide-overflow');
  };

  closeKeydownSuccessful = () => {
    document.removeEventListener('keydown', this.#closeKeydownHandler);
  };

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closeClickHandler, {once: true});
  };

  setCloseKeydownHandler = (callback) => {
    this._callback.closeKeydown = callback;
    document
      .addEventListener('keydown', this.#closeKeydownHandler);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
    document.removeEventListener('keydown', this.#closeKeydownHandler);
  };

  #closeKeydownHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeKeydown(evt);
  };
}
