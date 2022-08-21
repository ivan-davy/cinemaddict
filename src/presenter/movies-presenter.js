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


const MOVIES_SHOWN_STEP = 5;

export default class MoviesPresenter {
  constructor(mainElement, movies, filters, comments) {
    this.mainElement = mainElement;
    this.immutableMovies = movies;
    this.movies = this.immutableMovies.slice();
    this.topRatedMovies = [movies[0]];
    this.mostCommentedMovies = [movies[0], movies[1]];
    this.comments = comments;
    this.moviesShown = Math.min(this.movies.length, MOVIES_SHOWN_STEP);
    this.currentStep = 0;
    this.filters = filters;
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
    this.#renderFilter();
    this.#renderSort();
    this.#renderMovieList();

    if (!this.movies) {
      this.#renderEmptyList();
    } else {
      this.#renderMovies(this.currentStep * MOVIES_SHOWN_STEP, this.moviesShown);
      this.#renderShowMoreButton();
    }
    this.#renderTopRatedList();
    this.#renderMostCommentedList();
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

  #sortTypeChangeHandler = (sortType) => {
    if (this.selectedSortType === sortType) {
      return;
    }
    this.#sortMovies(sortType);

    this.#clearMovieList();
    this.#renderMovies();
    //console.log(this.movies.forEach((movie) => console.log(movie.filmInfo.totalRating)));
    this.#renderShowMoreButton();
  };

  #sortMovies = (sortType) => {
    switch (sortType) {
      case SORT_TYPES.DATE_DOWN:
        this.movies.sort(sortDateDown);
        break;
      case SORT_TYPES.RATING_DOWN:
        this.movies.sort(sortRatingDown);
        break;
      default:
        this.movies = this.immutableMovies.slice();
    }
    this.selectedSortType = sortType;
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
    const popupPresenter = new PopupPresenter(this.mainElement, movie, movieComments, this.#movieChangeHandler);
    const moviePresenter = new MoviePresenter(targetElement, popupPresenter, this.#movieChangeHandler);
    cardPresentersGroup.set(movie.id, moviePresenter);
    this.popupPresenters.set(movie.id, popupPresenter);
    moviePresenter.init(movie);
  };

  #renderMovies = (from = 0, to = MOVIES_SHOWN_STEP) => {
    for (let i = from; i < to; i++) {
      this.#renderMovieCard(this.movies[i], this.movieListComponent.containerElement);
    }
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
}
