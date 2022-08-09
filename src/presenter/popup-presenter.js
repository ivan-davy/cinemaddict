import {render} from '../render.js';
import InfoView from '../view/popup/info-view.js';
import PopupContainerView from '../view/popup/popup-container-view';
import CommentsView from '../view/popup/comments-view';

export default class PopupPresenter {
  init = (mainElement, movie, comments) => {
    this.mainElement = mainElement;
    this.movies = movie;
    this.comments = comments;

    render(new PopupContainerView(), this.mainElement);
    this.popupContainer = this.mainElement.querySelector('.film-details__inner');

    render(new InfoView(movie), this.popupContainer);
    render(new CommentsView(comments), this.popupContainer);
  };
}
