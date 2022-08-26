import {render, remove} from '../framework/render';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import MovieListView from '../view/movie-list-view.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommentedView from '../view/most-commented-view.js';
import MovieListEmptyView from '../view/movie-list-empty-view';
import MoviePresenter from './movie-presenter';
import PopupPresenter from './popup-presenter';
import {SORT_TYPES, sortDateDown, sortRatingDown} from '../utility/sort-logic';
import RankView from '../view/rank-view';
import MovieDatabaseStatsView from '../view/movie-database-stats-view';
import {generateFilter} from '../mock/filter';
import {UPDATE_TYPES, USER_ACTIONS} from '../utility/actions-updates';

const MOVIES_SHOWN_STEP = 5;

export default class MainPresenter {
  #movies = null;
  #comments = null;

  constructor(siteElements, moviesModel, commentsModel) {
    this.headerElement = siteElements.siteHeaderElement;
    this.mainElement = siteElements.siteMainElement;
    this.footerElement = siteElements.siteFooterElement;

    this.moviesModel = moviesModel;
    this.moviesModel.addObserver(this.#modelEventHandler);
    this.commentsModel = commentsModel;
    this.filters = generateFilter(this.movies);

    this.topRatedMovies = [this.movies[0]];
    this.mostCommentedMovies = [this.movies[0], this.movies[1]];
    this.moviesShown = Math.min(this.movies.length, MOVIES_SHOWN_STEP);
    this.selectedSortType = SORT_TYPES.DEFAULT;

    this.movieListComponent = new MovieListView();
    this.movieListEmptyComponent = new MovieListEmptyView();
    this.filterComponent = new FilterView(this.filters);
    this.sortComponent = new SortView();
    this.showMoreButtonComponent = new ShowMoreButtonView();
    this.topRatedComponent = new TopRatedView();
    this.mostCommentedComponent = new MostCommentedView();

    this.mainMovieCardPresenters = new Map();
    this.topRatedMovieCardsPresenters = new Map();
    this.mostCommentedMovieCardsPresenters = new Map();
    this.popupPresenters = new Map();
  }

  init() {
    const filmsWatched = this.filters[2].count;
    const rankComponent = new RankView(filmsWatched);
    render(rankComponent, this.headerElement);

    this.#renderFilter();
    this.#renderSort();
    this.#renderMovieList();

    if (!this.movies) {
      this.#renderEmptyList();
    } else {
      const movies = this.movies.slice(0, Math.min(this.movies.length, MOVIES_SHOWN_STEP));
      this.#renderMovies(movies);
      if (this.moviesShown < this.movies.length) {
        this.#renderShowMoreButton();
      }
    }
    this.#renderTopRatedList();
    this.#renderMostCommentedList();

    render(new MovieDatabaseStatsView(this.movies.length), this.footerElement.querySelector('.footer__statistics'));
  }

  get movies() {
    switch (this.selectedSortType) {
      case SORT_TYPES.DATE_DOWN:
        return [...this.moviesModel.movies].sort(sortDateDown);
      case SORT_TYPES.RATING_DOWN:
        return [...this.moviesModel.movies].sort(sortRatingDown);
    }
    return this.moviesModel.movies;
  }


  get comments() {
    return this.commentsModel.comments;
  }


  /*#movieChangeHandler = (updatedMovie) => {
    this.movies = updateItem(this.movies, updatedMovie);
    this.mainMovieCardPresenters.get(updatedMovie.id).init(updatedMovie);
    if (this.popupPresenters.get(updatedMovie.id).isPopupOpen()) {
      this.popupPresenters.get(updatedMovie.id).init();
    }
    if (this.topRatedMovieCardsPresenters.has(updatedMovie.id)) {
      this.topRatedMovieCardsPresenters.get(updatedMovie.id).init(updatedMovie);
    }
    if (this.mostCommentedMovieCardsPresenters.has(updatedMovie.id)) {
      this.mostCommentedMovieCardsPresenters.get(updatedMovie.id).init(updatedMovie);
    }
  };*/

  #viewActionHandler = (actionType, updateType, update) => {
    switch (actionType) {
      case USER_ACTIONS.UPDATE:
        this.moviesModel.updateMovie(updateType, update);
        break;
      case USER_ACTIONS.ADD:
        this.moviesModel.addMovie(updateType, update);
        break;
      case USER_ACTIONS.DELETE:
        this.moviesModel.deleteMovie(updateType, update);
        break;
    }
  };

  #modelEventHandler = (updateType, data) => {
    switch (updateType) {
      case UPDATE_TYPES.PATCH:

        this.mainMovieCardPresenters.get(data.id).init(data);
        break;
      case UPDATE_TYPES.MINOR:

        break;
      case UPDATE_TYPES.MAJOR:

        break;
    }
  };

  #sortTypeChangeHandler = (sortType) => {
    if (this.selectedSortType === sortType) {
      return;
    }
    this.selectedSortType = sortType;
    this.#clearMovieList();
    this.#renderMovies();
    if (this.moviesShown < this.movies.length) {
      this.#renderShowMoreButton();
    }
  };

  #renderFilter = () => {
    render(this.filterComponent, this.mainElement);
  };

  #renderSort = () => {
    render(this.sortComponent, this.mainElement);
    this.sortComponent.setSortTypeChangeHandler(this.#sortTypeChangeHandler);
  };

  #renderMovieList = () => {
    render(this.movieListComponent, this.mainElement);
  };

  #renderMovieCard = (movie, targetElement, cardPresentersGroup = this.mainMovieCardPresenters) => {
    const movieComments = this.comments.slice().filter((comment) => movie.comments.includes(comment.id));
    const popupPresenter = new PopupPresenter(this.mainElement, movie, movieComments, this.#viewActionHandler);
    const moviePresenter = new MoviePresenter(targetElement, popupPresenter, this.#viewActionHandler);
    cardPresentersGroup.set(movie.id, moviePresenter);
    this.popupPresenters.set(movie.id, popupPresenter);
    moviePresenter.init(movie);
  };

  #renderMovies = (movies = this.movies.slice(0, MOVIES_SHOWN_STEP)) => {
    movies.forEach((movie) => this.#renderMovieCard(movie, this.movieListComponent.containerElement));
  };

  #renderShowMoreButton = () => {
    render(this.showMoreButtonComponent, this.movieListComponent.listElement);
    this.showMoreButtonComponent.setClickHandler(this.#showMoreClickHandler);
  };

  #showMoreClickHandler = () => {
    const movies = this.movies.slice(this.moviesShown, Math.min(this.moviesShown + MOVIES_SHOWN_STEP, this.movies.length));
    this.#renderMovies(movies);
    this.moviesShown += MOVIES_SHOWN_STEP;
    if (this.moviesShown >= this.movies.length) {
      remove(this.showMoreButtonComponent);
    }
  };

  #clearMovieList = () => {
    this.mainMovieCardPresenters.forEach((presenter) => presenter.destroy());
    this.mainMovieCardPresenters.clear();
    this.moviesShown = MOVIES_SHOWN_STEP;
    this.mainMovieCardPresenters.clear();
    this.popupPresenters.clear();
    remove(this.showMoreButtonComponent);
  };



  #renderEmptyList = () => {
    render(this.movieListEmptyComponent, this.movieListComponent.listElement);
  };

  #renderTopRatedList = () => {
    if (this.topRatedMovies.length) {
      render(this.topRatedComponent, this.movieListComponent.filmsElement);
      for (const movie of this.topRatedMovies) {
        this.#renderMovieCard(movie, this.topRatedComponent.containerElement, this.topRatedMovieCardsPresenters);
      }
    }
  };

  #renderMostCommentedList = () => {
    if (this.mostCommentedMovies.length) {
      render(this.mostCommentedComponent, this.movieListComponent.filmsElement);
      for (const movie of this.mostCommentedMovies) {
        this.#renderMovieCard(movie, this.mostCommentedComponent.containerElement, this.mostCommentedMovieCardsPresenters);
      }
    }
  };
}
