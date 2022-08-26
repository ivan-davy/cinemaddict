import {render, remove} from '../framework/render';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import MovieListView from '../view/movie-list-view.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommentedView from '../view/most-commented-view.js';
import MovieListEmptyView from '../view/movie-list-empty-view';
import MoviePresenter from './movie-presenter';
import {updateItem} from '../utility/update-item';
import PopupPresenter from './popup-presenter';
import {SORT_TYPES, sortDateDown, sortRatingDown} from '../utility/sort-logic';
import RankView from '../view/rank-view';
import MovieDatabaseStatsView from '../view/movie-database-stats-view';
import {generateFilter} from '../mock/filter';

const MOVIES_SHOWN_STEP = 5;

export default class MoviesPresenter {
  #movies = null;
  #comments = null;

  constructor(siteElements, moviesModel, commentsModel) {
    this.headerElement = siteElements.siteHeaderElement;
    this.mainElement = siteElements.siteMainElement;
    this.footerElement = siteElements.siteFooterElement;

    this.moviesModel = moviesModel;
    this.commentsModel = commentsModel;
    this.immutableMovies = this.movies.slice();
    this.filters = generateFilter(this.movies);

    this.moviesModel.addObserver(this.#modelEventHandler);


    this.topRatedMovies = [this.movies[0]];
    this.mostCommentedMovies = [this.movies[0], this.movies[1]];
    this.moviesShown = Math.min(this.movies.length, MOVIES_SHOWN_STEP);
    this.currentStep = 0;
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
      const movieQty = this.movies.length;
      const movies = this.movies.slice(0, Math.min(movieQty, MOVIES_SHOWN_STEP));
      this.#renderMovies(movies);
      this.#renderShowMoreButton();
    }
    this.#renderTopRatedList();
    this.#renderMostCommentedList();

    render(new MovieDatabaseStatsView(this.movies.length), this.footerElement.querySelector('.footer__statistics'));
  }

  #movieChangeHandler = (updatedMovie) => {
    this.movies = updateItem(this.movies, updatedMovie);
    this.mainMovieCardPresenters.get(updatedMovie.id).init(updatedMovie);
    if (this.popupPresenters.get(updatedMovie.id).isPopupOpen()) {
      this.popupPresenters.get(updatedMovie.id).init();
    }
    if (this.topRatedMovieCardsPresenters.has(updatedMovie.id)){
      this.topRatedMovieCardsPresenters.get(updatedMovie.id).init(updatedMovie);
    }
    if (this.mostCommentedMovieCardsPresenters.has(updatedMovie.id)) {
      this.mostCommentedMovieCardsPresenters.get(updatedMovie.id).init(updatedMovie);
    }
  };

  #viewActionHandler = (actionType, updateType, update) => {
    console.log(actionType, updateType, update);
  };

  #modelEventHandler = (updateType, data) => {
    console.log(updateType, data);
  };

  #sortTypeChangeHandler = (sortType) => {
    if (this.selectedSortType === sortType) {
      return;
    }
    this.selectedSortType = sortType;
    this.#clearMovieList();
    this.#renderMovies();
    this.#renderShowMoreButton();
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

  #renderMovies = (movies) => {
    movies.forEach((movie) => this.#renderMovieCard(movie, this.movieListComponent.containerElement));
  };

  #renderShowMoreButton = () => {
    if (this.moviesShown < this.movies.length) {
      render(this.showMoreButtonComponent, this.movieListComponent.listElement);

      const showMoreClickHandler = () => {
        this.#renderMovies(this.moviesShown, Math.min(this.moviesShown + MOVIES_SHOWN_STEP, this.movies.length));
        this.moviesShown += MOVIES_SHOWN_STEP;
        if (this.moviesShown >= this.movies.length) {
          remove(this.showMoreButtonComponent);
        }
      };

      this.showMoreButtonComponent.setClickHandler(showMoreClickHandler);
    }
  };

  #clearMovieList = () => {
    this.mainMovieCardPresenters.forEach((presenter) => presenter.destroy());
    this.mainMovieCardPresenters.clear();
    this.moviesShown = MOVIES_SHOWN_STEP;
    this.currentStep = 0;
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
}
