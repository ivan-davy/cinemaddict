import MovieCardView from '../view/movie-card-view';
import PopupPresenter from './popup-presenter';
import {remove, render, replace} from '../framework/render';

export default class MoviePresenter {
  #movieContainerElement = null;
  #movie = null;
  #comments = null;
  #updateCards = null;

  #movieCardComponent = null;
  #popupPresenter = null;

  constructor(movieContainerElement, mainElement, comments, updateCards) {
    this.mainElement = mainElement;
    this.#movieContainerElement = movieContainerElement;
    this.#comments = comments;
    this.#updateCards = updateCards;

    this.#popupPresenter = new PopupPresenter(this.mainElement, this.#comments, this.#updateCards);
  }

  init(movie) {
    this.#movie = movie;

    const prevMovieCardComponent = this.#movieCardComponent;
    this.#movieCardComponent = new MovieCardView(this.#movie);

    this.#movieCardComponent.setMovieClickHandler(this.#movieClickHandler);
    this.#movieCardComponent.setWatchlistClickHandler(this.#watchlistClickHandler);
    this.#movieCardComponent.setHistoryClickHandler(this.#historyClickHandler);
    this.#movieCardComponent.setFavoriteClickHandler(this.#favoriteClickHandler);

    if (prevMovieCardComponent === null) {
      render(this.#movieCardComponent, this.#movieContainerElement);
      return;
    }

    if (this.#movieContainerElement.contains(prevMovieCardComponent.element)) {
      replace(this.#movieCardComponent, prevMovieCardComponent);
    }

    remove(prevMovieCardComponent);
  }

  destroy = () => {
    remove(this.#movieCardComponent);
  };


  #movieClickHandler = () => {
    this.#popupPresenter.init(this.#movie);
  };

  #watchlistClickHandler = () => {
    this.#movie.userDetails.watchlist = !this.#movie.userDetails.watchlist;
    this.#updateCards(this.#movie);
    this.#popupPresenter.renderPopup();
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
