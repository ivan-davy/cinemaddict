import {remove, render, replace} from '../framework/render';
import InfoView from '../view/popup/info-view.js';
import ContainerView from '../view/popup/container-view';
import CommentsView from '../view/popup/comments-view';
import {UPDATE_TYPES, USER_ACTIONS} from '../utility/actions-updates';

export default class PopupPresenter {
  #movie = null;
  #mainElement = null;
  #comments = null;
  #updateMovieData = null;
  #updateCommentData = null;
  #containerComponent = null;
  #infoComponent = null;
  #commentsComponent = null;
  #offset = null;

  constructor(mainElement, movie, comments, updateMovieData, updateCommentData) {
    this.#mainElement = mainElement;
    this.#movie = movie;
    this.#comments = comments;
    this.#updateMovieData = updateMovieData;
    this.#updateCommentData = updateCommentData;

    this.#containerComponent = new ContainerView();
    this.#infoComponent = new InfoView(this.#movie);
    this.#commentsComponent = new CommentsView(this.#comments);
  }

  init() {
    if (this.#containerComponent.isPopupOpen()) {
      this.#commentsComponent.unsetFormSubmitHandler();
      this.#containerComponent.closeAllPopups();
      this.#containerComponent.allowOverflow(this.#mainElement);
    }
    const prevInfoComponent = this.#infoComponent;
    const prevCommentsComponent = this.#commentsComponent;
    this.#infoComponent = new InfoView(this.#movie);
    this.#commentsComponent = new CommentsView(this.#comments);

    if (this.#infoComponent !== prevInfoComponent || this.#commentsComponent !== prevCommentsComponent) {
      this.#containerComponent.restrictOverflow(this.#mainElement);
      remove(prevInfoComponent);
      remove(prevCommentsComponent);


      this.#infoComponent = new InfoView(this.#movie);
      this.#commentsComponent = new CommentsView(this.#comments);
      render(this.#containerComponent, document.querySelector('footer'), 'afterend');
      render(this.#infoComponent, this.#containerComponent.element);
      render(this.#commentsComponent, this.#containerComponent.element);

      this.#commentsComponent.setFormSubmitHandler();
      this.#commentsComponent.setCommentDeleteHandler(this.#deleteCommentHandler);
      this.#containerComponent.setCloseKeydownHandler(this.#closeKeydownHandler);
      this.#containerComponent.setCloseClickHandler(this.#closeClickHandler);
      this.#infoComponent.setWatchlistClickHandler(this.#watchlistClickHandler);
      this.#infoComponent.setHistoryClickHandler(this.#historyClickHandler);
      this.#infoComponent.setFavoriteClickHandler(this.#favoriteClickHandler);

      this.#containerComponent.element.scrollTo(0, this.#offset);
      return;
    }

    if (this.#containerComponent.element.contains(this.#infoComponent.element)) {
      replace(this.#infoComponent, prevInfoComponent);
    }
    if (this.#containerComponent.element.contains(this.#commentsComponent.element)) {
      replace(this.#commentsComponent, prevCommentsComponent);
    }

  }

  destroy = () => {
    this.#commentsComponent.unsetFormSubmitHandler();
    remove(this.#containerComponent);
  };

  isPopupOpen = () => this.#containerComponent.isPopupOpen();

  get offset() {
    this.#offset = this.#containerComponent.element.scrollTop;
    return this.#offset;
  }

  set offset(offset) {
    this.#containerComponent.element.scrollTo(0, offset);
    this.#offset = offset;
  }

  #closeKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      this.destroy();
      this.#containerComponent.closeKeydownSuccessful();
      this.#commentsComponent.reset();
      this.#containerComponent.allowOverflow(this.#mainElement);
    }
  };

  #closeClickHandler = () => {
    this.destroy();
    this.#commentsComponent.reset();
    this.#containerComponent.allowOverflow(this.#mainElement);
  };

  #watchlistClickHandler = () => {
    this.#offset = this.#containerComponent.element.scrollTop;
    this.#movie.userDetails.watchlist = !this.#movie.userDetails.watchlist;
    this.#updateMovieData(
      USER_ACTIONS.UPDATE,
      UPDATE_TYPES.PATCH,
      this.#movie,
    );
    this.init();

  };

  #historyClickHandler = () => {
    this.#offset = this.#containerComponent.element.scrollTop;
    this.#movie.userDetails.alreadyWatched = !this.#movie.userDetails.alreadyWatched;
    this.#updateMovieData(
      USER_ACTIONS.UPDATE,
      UPDATE_TYPES.PATCH,
      this.#movie,
    );
    this.init();
  };

  #favoriteClickHandler = () => {
    this.#offset = this.#containerComponent.element.scrollTop;
    this.#movie.userDetails.favorite = !this.#movie.userDetails.favorite;
    this.#updateMovieData(
      USER_ACTIONS.UPDATE,
      UPDATE_TYPES.PATCH,
      this.#movie,
    );
    this.init();
  };

  #deleteCommentHandler = (comment) => {
    this.#offset = this.#containerComponent.element.scrollTop;
    this.#movie.comments = this.#movie.comments.filter((item) => item !== comment.id);
    this.#comments = this.#comments.filter((item) => item.id !== comment.id);
    this.#updateCommentData(
      USER_ACTIONS.DELETE,
      UPDATE_TYPES.MINOR,
      comment
    );
    this.init();
  };
}

