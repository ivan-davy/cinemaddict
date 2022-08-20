import {remove, render, replace} from '../framework/render';
import InfoView from '../view/popup/info-view.js';
import ContainerView from '../view/popup/container-view';
import CommentsView from '../view/popup/comments-view';

export default class PopupPresenter {
  #movie = null;
  #mainElement = null;
  #comments = null;
  #updateData = null;
  #containerComponent = null;
  #infoComponent = null;
  #commentsComponent = null;

  constructor(mainElement, movie, comments, updateData) {
    this.#mainElement = mainElement;
    this.#movie = movie;
    this.#comments = comments;
    this.#updateData = updateData;

    this.#containerComponent = new ContainerView();
    this.#infoComponent = new InfoView(this.#movie);
    this.#commentsComponent = new CommentsView(this.#comments);
  }

  init() {
    if (this.#containerComponent.isPopupOpen()) {
      this.#containerComponent.closeAllPopups();
      this.#containerComponent.allowOverflow(this.#mainElement);
    }

    const prevInfoComponent = this.#infoComponent;
    this.#infoComponent = new InfoView(this.#movie);

    if (this.#infoComponent !== prevInfoComponent) {
      remove(prevInfoComponent);
      this.#containerComponent.restrictOverflow(this.#mainElement);
      render(this.#containerComponent, this.#mainElement);
      render(this.#infoComponent, this.#containerComponent.element);
      render(this.#commentsComponent, this.#containerComponent.element);
      this.#containerComponent.setCloseKeydownHandler(this.#closeKeydownHandler);
      this.#containerComponent.setCloseClickHandler(this.#closeClickHandler);
      this.#infoComponent.setWatchlistClickHandler(this.#watchlistClickHandler);
      this.#infoComponent.setHistoryClickHandler(this.#historyClickHandler);
      this.#infoComponent.setFavoriteClickHandler(this.#favoriteClickHandler);
      return;
    }

    if (this.#containerComponent.element.contains(this.#infoComponent.element)) {
      replace(this.#infoComponent, prevInfoComponent);
    }

  }

  destroy = () => {
    remove(this.#containerComponent);
  };

  isPopupOpen = () => this.#containerComponent.isPopupOpen();

  #closeKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.destroy();
      this.#containerComponent.closeKeydownSuccessful();
      this.#containerComponent.allowOverflow(this.#mainElement);
    }
  };

  #closeClickHandler = () => {
    this.destroy();
    this.#containerComponent.allowOverflow(this.#mainElement);
  };

  #watchlistClickHandler = () => {
    this.#movie.userDetails.watchlist = !this.#movie.userDetails.watchlist;
    this.#updateData(this.#movie);
  };

  #historyClickHandler = () => {
    this.#movie.userDetails.alreadyWatched = !this.#movie.userDetails.alreadyWatched;
    this.#updateData(this.#movie);
  };

  #favoriteClickHandler = () => {
    this.#movie.userDetails.favorite = !this.#movie.userDetails.favorite;
    this.#updateData(this.#movie);
  };
}

