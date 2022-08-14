import {render} from '../framework/render';
import InfoView from '../view/popup/info-view.js';
import PopupContainerView from '../view/popup/popup-container-view';
import CommentsView from '../view/popup/comments-view';

export default class PopupPresenter {
  constructor(mainElement, movie, comments) {
    this.mainElement = mainElement;
    this.movie = movie;
    this.comments = comments;

    this.popupContainerComponent = new PopupContainerView();
    this.infoComponent = new InfoView(movie);
    this.commentsComponent = new CommentsView(comments);
  }

  init = () => {
    this.mainElement.classList.add('hide-overflow');
    const closeKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        this.popupContainerComponent.removeElement();
        this.mainElement.querySelector('.film-details').remove();
        this.mainElement.classList.remove('hide-overflow');
      }
    };
    const closeClickHandler = () => {
      this.popupContainerComponent.removeElement();
      this.mainElement.querySelector('.film-details').remove();
      this.mainElement.classList.remove('hide-overflow');
    };

    this.infoComponent.setKeydownHandler(closeKeydownHandler);
    this.infoComponent.setClickHandler(closeClickHandler);

    render(this.popupContainerComponent, this.mainElement);
    render(this.infoComponent, this.popupContainerComponent.element);
    render(this.commentsComponent, this.popupContainerComponent.element);
  };
}
