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
import {generateFilter} from '../mock/filter';


const MOVIES_SHOWN_STEP = 5;

export default class MoviesPresenter {
  constructor(mainElement, movies, comments) {
    this.mainElement = mainElement;
    this.movies = movies;
    this.topRatedMovies = [movies[0]];
    this.mostCommentedMovies = [movies[0], movies[1]];
    this.comments = comments;
    this.moviesShown = Math.min(this.movies.length, MOVIES_SHOWN_STEP);
    this.currentStep = 0;
    this.filters = generateFilter(this.movies);

    render(new FilterView(this.filters), this.mainElement);
    render(new SortView(), this.mainElement);
  }

  init = () => {
    const movieListComponent = new MovieListView();
    render(movieListComponent, this.mainElement);
    for (let i = this.currentStep * MOVIES_SHOWN_STEP; i < this.moviesShown; i++) {
      this.#renderMovieCard(this.movies[i], movieListComponent.containerElement);
    }

    if (!this.movies) {
      const message = 'WIPPPPP';
      render(new MovieListEmptyView(message), movieListComponent.listElement);
    } else {
      const showMoreButtonComponent = new ShowMoreButtonView();
      if (this.moviesShown < this.movies.length) {
        render(showMoreButtonComponent, movieListComponent.listElement);

        const showMoreClickHandler = () => {
          for (let i = this.moviesShown; i < Math.min(this.moviesShown + MOVIES_SHOWN_STEP, this.movies.length); i++) {
            this.#renderMovieCard(this.movies[i], movieListComponent.containerElement);
          }

          this.moviesShown += MOVIES_SHOWN_STEP;
          if (this.moviesShown >= this.movies.length) {
            remove(showMoreButtonComponent);
          }
        };

        showMoreButtonComponent.setClickHandler(showMoreClickHandler);
      }
    }


    if (this.topRatedMovies.length) {
      const topRatedComponent = new TopRatedView();
      render(topRatedComponent, movieListComponent.filmsElement);
      for (const movie of this.topRatedMovies) {
        this.#renderMovieCard(movie, topRatedComponent.containerElement);
      }
    }

    if (this.mostCommentedMovies.length) {
      const mostCommentedComponent = new MostCommentedView();
      render(mostCommentedComponent, movieListComponent.filmsElement);
      for (const movie of this.mostCommentedMovies) {
        this.#renderMovieCard(movie, mostCommentedComponent.containerElement);
      }
    }
  };

  #renderMovieCard = (movie, targetElement) => {
    const movieCardComponent = new MovieCardView(movie);

    const openPopup = () => {
      const popupPresenter = new PopupPresenter(this.mainElement, movie, this.comments);
      popupPresenter.init();
    };

    const popupClickHandler = () => {
      openPopup();
    };

    movieCardComponent.setMovieClickHandler(popupClickHandler);
    render(movieCardComponent, targetElement);
  };
}
