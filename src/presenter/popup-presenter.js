import {remove, render, replace} from '../framework/render';
import InfoView from '../view/popup/info-view.js';
import ContainerView from '../view/popup/container-view';
import CommentsView from '../view/popup/comments-view';
import {UPDATE_TYPES, USER_ACTIONS} from '../utility/actions-updates';

export default class PopupPresenter {
  #movie = null;
  #mainElement = null;
  #comments = null;
  #commentsModel = null;
  #updateMovieData = null;
  #updateCommentData = null;
  #containerComponent = null;
  #infoComponent = null;
  #commentsComponent = null;
  #getNewCommentId = null;

  constructor(mainElement, movie, commentsModel, updateMovieData, updateCommentData, getNewCommentId) {
    this.#mainElement = mainElement;
    this.#movie = movie;
    this.#commentsModel = commentsModel;
    this.#comments = this.#commentsModel.comments.slice().filter((comment) => this.#movie.comments.includes(comment.id));

    this.#updateMovieData = updateMovieData;
    this.#updateCommentData = updateCommentData;
    this.#getNewCommentId = getNewCommentId;

    this.#containerComponent = new ContainerView();
    this.#infoComponent = new InfoView(this.#movie);
    this.#commentsComponent = new CommentsView(this.#comments);
  }

  init() {
    this.#comments = this.#commentsModel.comments.slice().filter((comment) => this.#movie.comments.includes(comment.id));
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

      this.#commentsComponent.setFormSubmitHandler(this.#formSubmitHandler);
      this.#commentsComponent.setCommentDeleteHandler(this.#deleteCommentHandler);
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
    if (this.#containerComponent.element.contains(this.#commentsComponent.element)) {
      replace(this.#commentsComponent, prevCommentsComponent);
    }

  }

  destroy = () => {
    this.#commentsComponent.unsetFormSubmitHandler();
    remove(this.#containerComponent);
  };

  isPopupOpen = () => this.#containerComponent.isPopupOpen();

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
    this.#movie.userDetails.watchlist = !this.#movie.userDetails.watchlist;
    this.#updateMovieData(
      USER_ACTIONS.UPDATE,
      UPDATE_TYPES.MINOR,
      this.#movie,
    );
  };

  #historyClickHandler = () => {
    this.#movie.userDetails.alreadyWatched = !this.#movie.userDetails.alreadyWatched;
    this.#updateMovieData(
      USER_ACTIONS.UPDATE,
      UPDATE_TYPES.MINOR,
      this.#movie,
    );
  };

  #favoriteClickHandler = () => {
    this.#movie.userDetails.favorite = !this.#movie.userDetails.favorite;
    this.#updateMovieData(
      USER_ACTIONS.UPDATE,
      UPDATE_TYPES.MINOR,
      this.#movie,
    );
  };

  #formSubmitHandler = (comment) => {
    this.#updateCommentData(
      USER_ACTIONS.ADD,
      UPDATE_TYPES.MINOR,
      {
        movieData: this.#movie,
        commentData: comment
      }
    );
  };


  #deleteCommentHandler = (comment) => {
    this.#updateCommentData(
      USER_ACTIONS.DELETE,
      UPDATE_TYPES.MINOR,
      {
        movieData: this.#movie,
        commentData: comment,
      }
    );
  };
}

