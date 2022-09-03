import MovieCardView from '../view/movie-card-view';
import {remove, render, replace} from '../framework/render';
import {UPDATE_TYPES, USER_ACTIONS} from '../utility/actions-updates-methods';

export default class MoviePresenter {
  #movieContainerElement = null;
  #movie = null;
  #updateMovieDataHandler = null;
  #movieCardComponent = null;
  #popupPresenter = null;
  #moviesModel = null;


  constructor(movieContainerElement, movie, moviesModel, popupPresenter, updateMovieDataHandler) {
    this.#movieContainerElement = movieContainerElement;
    this.#movie = movie;
    this.#moviesModel = moviesModel;
    this.#moviesModel.addObserver(updateMovieDataHandler);
    this.#updateMovieDataHandler = updateMovieDataHandler;
    this.#popupPresenter = popupPresenter;
  }

  init() {
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
    this.#popupPresenter.init(this.#movie);
  };

  #watchlistClickHandler = () => {
    this.#updateMovieDataHandler(
      USER_ACTIONS.UPDATE,
      UPDATE_TYPES.MINOR,
      {
        movieData: {...this.#movie, userDetails: {...this.#movie.userDetails, watchlist: !this.#movie.userDetails.watchlist}},
        popupOffsetY: this.#popupPresenter.getPopupOffsetY()
      },
    );
  };

  #historyClickHandler = () => {
    this.#updateMovieDataHandler(
      USER_ACTIONS.UPDATE,
      UPDATE_TYPES.MINOR,
      {
        movieData: {...this.#movie, userDetails: {...this.#movie.userDetails, alreadyWatched: !this.#movie.userDetails.alreadyWatched}},
        popupOffsetY: this.#popupPresenter.getPopupOffsetY()
      },
    );
  };

  #favoriteClickHandler = () => {
    this.#updateMovieDataHandler(
      USER_ACTIONS.UPDATE,
      UPDATE_TYPES.MINOR,
      {
        movieData: {...this.#movie, userDetails: {...this.#movie.userDetails, favorite: !this.#movie.userDetails.favorite}},
        popupOffsetY: this.#popupPresenter.getPopupOffsetY()
      },
    );
  };
}
