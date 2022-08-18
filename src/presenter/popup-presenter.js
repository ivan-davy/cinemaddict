import {remove, render} from '../framework/render';
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
    const closeKeydownHandler = (evt) => {
      if (evt.key === 'Escape') {
        this.infoComponent.closeKeydownSuccessful();
        remove(this.popupContainerComponent);
        this.popupContainerComponent.allowOverflow(this.mainElement);
      }
    };
    const closeClickHandler = () => {
      remove(this.popupContainerComponent);
      this.popupContainerComponent.allowOverflow(this.mainElement);
    };

    this.popupContainerComponent.restrictOverflow(this.mainElement);
    this.infoComponent.setCloseKeydownHandler(closeKeydownHandler);
    this.infoComponent.setCloseClickHandler(closeClickHandler);

    render(this.popupContainerComponent, this.mainElement);
    render(this.infoComponent, this.popupContainerComponent.element);
    render(this.commentsComponent, this.popupContainerComponent.element);
  };
}
