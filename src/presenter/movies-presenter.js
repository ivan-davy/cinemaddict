import {render, remove} from '../framework/render';
import FilterView from '../view/filter-view.js';
import SortView from '../view/sort-view.js';
import MovieCardView from '../view/movie-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import MovieListView from '../view/movie-list-view.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommentedView from '../view/most-commented-view.js';
import PopupPresenter from './popup-presenter';
import MovieListEmptyView from '../view/movie-list-empty-view';


const MOVIES_SHOWN_STEP = 5;

export default class MoviesPresenter {
  constructor(mainElement, movies, filters, comments) {
    this.mainElement = mainElement;
    this.movies = movies;
    this.topRatedMovies = [movies[0]];
    this.mostCommentedMovies = [movies[0], movies[1]];
    this.comments = comments;
    this.moviesShown = Math.min(this.movies.length, MOVIES_SHOWN_STEP);
    this.currentStep = 0;
    this.filters = filters;

    this.movieListComponent = new MovieListView();
    this.movieListEmptyContainer = new MovieListEmptyView();
    this.filterComponent = new FilterView(this.filters);
    this.sortComponent = new SortView();
    this.showMoreButtonComponent = new ShowMoreButtonView();
    this.topRatedComponent = new TopRatedView();
    this.mostCommentedComponent = new MostCommentedView();
  }

  init = () => {
    render(this.filterComponent, this.mainElement);
    render(this.sortComponent, this.mainElement);
    render(this.movieListComponent, this.mainElement);

    if (!this.movies) {
      this.#renderEmptyList();
    } else {
      this.#renderMovies(this.currentStep * MOVIES_SHOWN_STEP, this.moviesShown);
      if (this.moviesShown < this.movies.length) {
        this.#renderShowMoreButton();
      }
    }
    this.#renderTopRatedList();
    this.#renderMostCommentedList();
  };

  #renderMovieCard = (movie, targetElement) => {
    const movieCardComponent = new MovieCardView(movie);
    const movieClickHandler = () => {
      const popupPresenter = new PopupPresenter(this.mainElement, movie, this.comments);
      popupPresenter.init();
    };
    const watchlistClickHandler = () => {
      movie.userDetails.watchlist = !movie.userDetails.watchlist;
    };
    const historyClickHandler = () => {
      movie.userDetails.alreadyWatched = !movie.userDetails.alreadyWatched;
    };
    const favoriteClickHandler = () => {
      movie.userDetails.favorite = !movie.userDetails.favorite;
    };
    movieCardComponent.setMovieClickHandler(movieClickHandler);
    movieCardComponent.setWatchlistClickHandler(watchlistClickHandler);
    movieCardComponent.setHistoryClickHandler(historyClickHandler);
    movieCardComponent.setFavoriteClickHandler(favoriteClickHandler);
    render(movieCardComponent, targetElement);
  };

  #renderMovies = (from, to) => {
    for (let i = from; i < to; i++) {
      this.#renderMovieCard(this.movies[i], this.movieListComponent.containerElement);
    }
  };

  #renderShowMoreButton = () => {
    render(this.showMoreButtonComponent, this.movieListComponent.listElement);
    const showMoreClickHandler = () => {
      this.#renderMovies(this.moviesShown, Math.min(this.moviesShown + MOVIES_SHOWN_STEP, this.movies.length));
      this.moviesShown += MOVIES_SHOWN_STEP;
      if (this.moviesShown >= this.movies.length) {
        remove(this.showMoreButtonComponent);
      }
    };
    this.showMoreButtonComponent.setClickHandler(showMoreClickHandler);
  };

  #renderEmptyList = () => {
    render(this.movieListEmptyContainer, this.movieListComponent.listElement);
  };

  #renderTopRatedList = () => {
    if (this.topRatedMovies.length) {
      render(this.topRatedComponent, this.movieListComponent.filmsElement);
      for (const movie of this.topRatedMovies) {
        this.#renderMovieCard(movie, this.topRatedComponent.containerElement);
      }
    }
  };

  #renderMostCommentedList = () => {
    if (this.mostCommentedMovies.length) {
      render(this.mostCommentedComponent, this.movieListComponent.filmsElement);
      for (const movie of this.mostCommentedMovies) {
        this.#renderMovieCard(movie, this.mostCommentedComponent.containerElement);
      }
    }
  };
}
