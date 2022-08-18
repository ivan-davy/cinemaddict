import {remove, render} from '../framework/render';
import InfoView from '../view/popup/info-view.js';
import ContainerView from '../view/popup/container-view';
import CommentsView from '../view/popup/comments-view';

export default class PopupPresenter {
  #movie = null;

  #mainElement = null;
  #comments = null;
  #updateCards = null;

  #containerComponent = null;
  #infoComponent = null;
  #commentsComponent = null;

  constructor(mainElement, comments, updateCards) {
    this.#mainElement = mainElement;
    this.#comments = comments;
    this.#updateCards = updateCards;
  }

  init(movie) {
    this.#movie = movie;

    this.#containerComponent = new ContainerView();
    this.#infoComponent = new InfoView(this.#movie);
    this.#commentsComponent = new CommentsView(this.#comments);

    this.#containerComponent.restrictOverflow(this.#mainElement);
    this.#infoComponent.setCloseKeydownHandler(this.#closeKeydownHandler);
    this.#infoComponent.setCloseClickHandler(this.#closeClickHandler);
    this.#infoComponent.setWatchlistClickHandler(this.#watchlistClickHandler);
    this.#infoComponent.setHistoryClickHandler(this.#historyClickHandler);
    this.#infoComponent.setFavoriteClickHandler(this.#favoriteClickHandler);

    this.renderPopup();
  }

  renderPopup = () => {
    render(this.#containerComponent, this.#mainElement);
    render(this.#infoComponent, this.#containerComponent.element);
    render(this.#commentsComponent, this.#containerComponent.element);
  };

  destroy = () => {
    if (this.#containerComponent !== null) {
      remove(this.#containerComponent);
      //remove(this.#infoComponent);
      //remove(this.#commentsComponent);
    }
  };


  #closeKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.#infoComponent.closeKeydownSuccessful();
      this.destroy();
      this.#containerComponent.allowOverflow(this.#mainElement);
    }
  };

  #closeClickHandler = () => {
    this.destroy();
    this.#containerComponent.allowOverflow(this.#mainElement);
  };

  #watchlistClickHandler = () => {
    this.#movie.userDetails.watchlist = !this.#movie.userDetails.watchlist;
    this.#updateCards(this.#movie);
  };

  #historyClickHandler = () => {
    this.#movie.userDetails.alreadyWatched = !this.#movie.userDetails.alreadyWatched;
    this.#updateCards(this.#movie);
  };

  #favoriteClickHandler = () => {
    this.#movie.userDetails.favorite = !this.#movie.userDetails.favorite;
    this.#updateCards(this.#movie);
  };
}

