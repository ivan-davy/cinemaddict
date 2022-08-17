import {render} from '../render.js';
import NavigationView from '../view/navigation-view.js';
import SortView from '../view/sort-view.js';
import MovieCardView from '../view/movie-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import MovieListContainerView from '../view/movie-list-container-view.js';
import TopRatedContainerView from '../view/top-rated-container-view.js';
import MostCommentedContainerView from '../view/most-commented-container-view.js';
import PopupPresenter from './popup-presenter';
import MovieListEmptyView from '../view/movie-list-empty-view';


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

    render(new NavigationView(), this.mainElement);
    render(new SortView(), this.mainElement);
  }

  init = () => {
    render(new MovieListContainerView(), this.mainElement);
    this.movieListElement = this.mainElement.querySelector('.films-list');
    for (let i = this.currentStep * MOVIES_SHOWN_STEP; i < this.moviesShown; i++) {
      this.#renderMovieCard(this.movies[i], this.movieListElement.querySelector('.films-list__container'));
    }

    if (!this.movies) {
      const message = 'WIPPPPP';
      render(new MovieListEmptyView(message), this.movieListElement);
    } else {
      const showMoreButtonComponent = new ShowMoreButtonView();
      if (this.moviesShown < this.movies.length) {
        render(showMoreButtonComponent, this.movieListElement);

        const showMoreClickHandler = (evt) => {
          evt.preventDefault();
          for (let i = this.moviesShown; i < Math.min(this.moviesShown + MOVIES_SHOWN_STEP, this.movies.length); i++) {
            this.#renderMovieCard(this.movies[i], this.movieListElement.querySelector('.films-list__container'));
          }

          this.moviesShown += MOVIES_SHOWN_STEP;
          if (this.moviesShown >= this.movies.length) {
            showMoreButtonComponent.element.remove();
            showMoreButtonComponent.removeElement();
          }
        };

        showMoreButtonComponent.element
          .addEventListener('click', showMoreClickHandler);
      }
    }


    this.moviesElement = this.mainElement.querySelector('.films');
    if (this.topRatedMovies.length) {
      render(new TopRatedContainerView(), this.moviesElement);
      this.topRatedElement = this.moviesElement.querySelector('#top-rated');
      for (const movie of this.topRatedMovies) {
        this.#renderMovieCard(movie, this.topRatedElement.querySelector('.films-list__container'));
      }
    }

    if (this.mostCommentedMovies.length) {
      render(new MostCommentedContainerView(), this.moviesElement);
      this.mostCommentedElement = this.moviesElement.querySelector('#most-commented');
      for (const movie of this.mostCommentedMovies) {
        this.#renderMovieCard(movie, this.mostCommentedElement.querySelector('.films-list__container'));
      }
    }
  };

  #renderMovieCard = (movie, targetElement) => {
    const movieCardComponent = new MovieCardView(movie);

    const openPopup = () => {
      const popupPresenter = new PopupPresenter(this.mainElement, movie, this.comments);
      popupPresenter.init();
    };

    movieCardComponent.element.querySelector('.film-card__link').addEventListener('click', () => {
      openPopup();
    });

    render(movieCardComponent, targetElement);
  };
}
