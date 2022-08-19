import MovieCardView from '../view/movie-card-view';
import {remove, render, replace} from '../framework/render';

export default class MoviePresenter {
  #movieContainerElement = null;
  #movie = null;
  #updateData = null;

  #movieCardComponent = null;
  #popupPresenter = null;

  constructor(movieContainerElement, popupPresenter, updateData) {
    this.#movieContainerElement = movieContainerElement;

    this.#updateData = updateData;

    this.#popupPresenter = popupPresenter;
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
  }

  destroy = () => {
    remove(this.#movieCardComponent);
  };


  #movieClickHandler = () => {
    this.#popupPresenter.init();
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
