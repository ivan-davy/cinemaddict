import AbstractView from '../../framework/view/abstract-view';


const createPopupContainerTemplate = () =>
  `<section class="film-details">
    <div class="film-details__inner"></div>
  </section>`;

export default class ContainerView extends AbstractView {
  get template() {
    return createPopupContainerTemplate();
  }

  getIsPopupOpen = () => document.contains(document.querySelector('.film-details'));

  closeAllPopups = () => {
    document.querySelector('.film-details').remove();
    this.unsetCloseKeydownHandler();
  };

  restrictOverflow = (element) => {
    element.classList.add('hide-overflow');
  };

  allowOverflow = (element) => {
    element.classList.remove('hide-overflow');
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

  #closeClickHandler = () => {
    this._callback.closeClick();
    this.unsetCloseKeydownHandler();
  };

  #closeKeydownHandler = (evt) => {
    this._callback.closeKeydown(evt);
  };

  unsetCloseKeydownHandler = () => {
    document.removeEventListener('keydown', this.#closeKeydownHandler);
  };
}
