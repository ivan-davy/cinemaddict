import {remove, render} from '../framework/render';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import MovieListView from '../view/movie-list-view.js';
import TopRatedView from '../view/top-rated-view.js';
import MostCommentedView from '../view/most-commented-view.js';
import MovieListEmptyView from '../view/movie-list-empty-view';
import MoviePresenter from './movie-presenter';
import PopupPresenter from './popup-presenter';
import {SortType, sortCommentsDown, sortDateDown, sortRatingDown} from '../utility/sort-logic';
import RankView from '../view/rank-view';
import MovieDatabaseStatsView from '../view/movie-database-stats-view';
import LoadingView from '../view/loading-view';
import {UpdateType, UserAction} from '../utility/actions-updates-methods';
import {FilterType, movieFilters} from '../utility/filter-logic';
import FilterPresenter from './filter-presenter';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

const MOVIES_SHOWN_STEP = 5;

const UI_TIME_LIMITS = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export default class MainPresenter {
  #uiBlocker = new UiBlocker(UI_TIME_LIMITS.LOWER_LIMIT, UI_TIME_LIMITS.UPPER_LIMIT);

  constructor(siteElements, moviesModel, commentsModel, filtersModel) {
    this.headerElement = siteElements.siteHeaderElement;
    this.mainElement = siteElements.siteMainElement;
    this.footerElement = siteElements.siteFooterElement;

    this.moviesModel = moviesModel;
    this.commentsModel = commentsModel;
    this.filtersModel = filtersModel;
    this.moviesModel.addObserver(this.#modelMovieEventHandler);
    this.commentsModel.addObserver(this.#modelCommentEventHandler);
    this.filtersModel.addObserver(this.#modelMovieEventHandler);

    this.topRatedMovies = null;
    this.mostCommentedMovies = null;
    this.moviesShown = null;
    this.selectedSortType = SortType.DEFAULT;
    this.selectedFilterType = FilterType.ALL;
    this.isLoading = true;

    this.rankComponent = null;
    this.movieListComponent = new MovieListView();
    this.loadingComponent = new LoadingView();
    this.movieListEmptyComponent = null;
    this.sortComponent = null;
    this.showMoreButtonComponent = null;
    this.topRatedComponent = null;
    this.mostCommentedComponent = null;

    this.filterPresenter = new FilterPresenter(siteElements, filtersModel, moviesModel);
    this.mainMovieCardPresenters = new Map();
    this.topRatedMovieCardsPresenters = new Map();
    this.mostCommentedMovieCardsPresenters = new Map();
    this.popupPresenters = new Map();
  }

  init() {
    this.filterPresenter.init();
    this.#clearMovieLists();
    this.#renderMainMovieList();
    this.#renderTopRatedList();
    this.#renderMostCommentedList();
  }

  get movies() {
    this.selectedFilterType = this.filtersModel.filter;
    const filterType = this.filtersModel.filter;
    const movies = this.moviesModel.movies;
    const filteredMovies = movieFilters[filterType](movies);

    switch (this.selectedSortType) {
      case SortType.DATE_DOWN:
        return filteredMovies.slice().sort(sortDateDown);
      case SortType.RATING_DOWN:
        return filteredMovies.slice().sort(sortRatingDown);
    }

    return filteredMovies;
  }


  #viewMovieActionHandler = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE:
        try {
          await this.moviesModel.updateMovie(updateType, update);
        } catch(err) {
          const popupPresenter = this.popupPresenters.get(update.movieData.id);
          if (popupPresenter.getIsPopupOpen()) {
            this.popupPresenters.get(update.movieData.id).resetControls();
          }
        }
        break;
    }
  };

  #viewCommentActionHandler = async (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.ADD:
        this.#uiBlocker.block();
        try {
          await this.commentsModel.addComment(updateType, update);
        } catch(err) {
          this.popupPresenters.get(update.movieData.id).resetSubmittingState();
        }
        this.#uiBlocker.unblock();
        break;
      case UserAction.DELETE:
        try {
          await this.commentsModel.deleteComment(updateType, update);
        } catch(err) {
          this.popupPresenters.get(update.movieData.id).resetDeletingState(update.commentData.id);
        }
        break;
    }
  };

  #modelMovieEventHandler = (updateType, data) => {
    let movieData = null;
    let popupOffsetY = null;
    if (data) {
      movieData = data.movieData;
      popupOffsetY = data.popupOffsetY;
    }
    switch (updateType) {
      case UpdateType.MINOR:
        if (movieData && this.popupPresenters.get(movieData.id).getIsPopupOpen()) {
          this.popupPresenters.get(movieData.id).init(movieData, popupOffsetY);
        }
        this.#renderRank();
        this.#clearMovieLists();
        this.#renderMainMovieList();
        this.#renderTopRatedList();
        this.#renderMostCommentedList();
        break;
      case UpdateType.MAJOR:
        this.#renderRank();
        this.#clearMovieLists({resetMoviesShownCount: true, resetSortType: true});
        this.#renderMainMovieList();
        this.#renderTopRatedList();
        this.#renderMostCommentedList();
        break;
      case UpdateType.INIT:
        this.isLoading = false;
        this.#renderRank();
        render(new MovieDatabaseStatsView(this.movies.length), this.footerElement.querySelector('.footer__statistics'));
        this.moviesShown = Math.min(this.movies.length, MOVIES_SHOWN_STEP);
        remove(this.loadingComponent);
        this.#renderMainMovieList();
        this.#renderTopRatedList();
        this.#renderMostCommentedList();
        break;
    }
  };

  #renderRank = () => {
    if (this.rankComponent) {
      remove(this.rankComponent);
    }
    this.rankComponent = new RankView(movieFilters[FilterType.WATCHED](this.moviesModel.movies).length);
    render(this.rankComponent, this.headerElement);
  };

  #modelCommentEventHandler = (updateType, data) => {
    const {movieData, popupOffsetY} = data;
    switch (updateType) {
      case UpdateType.MINOR:
        this.popupPresenters.get(movieData.id).init(movieData, popupOffsetY);
        this.#clearMovieLists();
        this.#renderMainMovieList();
        this.#renderTopRatedList();
        this.#renderMostCommentedList();
        break;
    }
  };

  #sortTypeChangeHandler = (sortType) => {
    if (this.selectedSortType === sortType) {
      return;
    }
    this.selectedSortType = sortType;
    this.#clearMovieLists({resetMoviesShownCount: true});
    this.#renderMainMovieList();
    this.#renderTopRatedList();
    this.#renderMostCommentedList();
  };

  #renderLoading = () => {
    render(this.loadingComponent, this.mainElement);
  };

  #renderSort = () => {
    this.sortComponent = new SortView(this.selectedSortType);
    if (this.movies.length !== 0) {
      render(this.sortComponent, this.mainElement);
    }
    this.sortComponent.setSortTypeChangeHandler(this.#sortTypeChangeHandler);
  };

  #renderMainMovieList = () => {
    if (this.isLoading) {
      this.#renderLoading();
      return;
    }
    this.#renderSort();
    render(this.movieListComponent, this.mainElement);
    if (this.movies.length === 0) {
      this.#renderEmptyList();
    } else {
      const movies = this.movies.slice(0, Math.min(this.movies.length, this.moviesShown));
      this.#renderMovies(movies);
      if (this.moviesShown < this.movies.length && this.movies.length !== 0 ) {
        this.#renderShowMoreButton();
      }
    }
  };

  #renderMovieCard = (movie, targetElement, cardPresentersGroup = this.mainMovieCardPresenters) => {
    const popupPresenter = new PopupPresenter(this.mainElement, movie, this.moviesModel, this.commentsModel, this.#viewMovieActionHandler, this.#viewCommentActionHandler);
    const moviePresenter = new MoviePresenter(targetElement, movie, this.moviesModel, popupPresenter, this.#viewMovieActionHandler, this.#viewCommentActionHandler);
    cardPresentersGroup.set(movie.id, moviePresenter);
    this.popupPresenters.set(movie.id, popupPresenter);
    moviePresenter.init();
  };

  #renderMovies = (movies = this.movies.slice(0, MOVIES_SHOWN_STEP)) => {
    movies.forEach((movie) => this.#renderMovieCard(movie, this.movieListComponent.containerElement));
  };

  #renderShowMoreButton = () => {
    this.showMoreButtonComponent = new ShowMoreButtonView();
    render(this.showMoreButtonComponent, this.movieListComponent.listElement);
    this.showMoreButtonComponent.setClickHandler(this.#showMoreClickHandler);

    remove(this.loadingComponent);
  };

  #showMoreClickHandler = () => {
    const movies = this.movies.slice(this.moviesShown, Math.min(this.moviesShown + MOVIES_SHOWN_STEP, this.movies.length));
    this.#renderMovies(movies);
    this.moviesShown += MOVIES_SHOWN_STEP;
    if (this.moviesShown >= this.movies.length) {
      remove(this.showMoreButtonComponent);
    }
  };

  #clearMovieLists = ({resetMoviesShownCount = false, resetSortType = false} = {}) => {
    const moviesCount = this.movies.length;

    this.mainMovieCardPresenters.forEach((presenter) => presenter.destroy());
    this.mainMovieCardPresenters.clear();


    remove(this.sortComponent);
    remove(this.movieListEmptyComponent);
    remove(this.showMoreButtonComponent);

    if (this.topRatedComponent) {
      remove(this.topRatedComponent);
    }
    if (this.mostCommentedComponent) {
      remove(this.mostCommentedComponent);
    }

    if (resetMoviesShownCount) {
      this.moviesShown = MOVIES_SHOWN_STEP;
    } else {
      this.moviesShown = Math.min(moviesCount, this.moviesShown);
    }

    if (resetSortType) {
      this.selectedSortType = SortType.DEFAULT;
    }

    if (this.movieListEmptyComponent) {
      remove(this.movieListEmptyComponent);
    }
  };

  #renderEmptyList = () => {
    this.movieListEmptyComponent = new MovieListEmptyView(this.selectedFilterType);
    render(this.movieListEmptyComponent, this.movieListComponent.listElement);
  };

  #renderTopRatedList = () => {
    let doNotShow = false;

    this.topRatedMovies = this.moviesModel.movies.slice().sort(sortRatingDown);
    if (this.topRatedMovies.length) {
      if (this.topRatedMovies[0].filmInfo.totalRating === 0) {
        doNotShow = true;
      }
    }
    this.topRatedMovies = this.moviesModel.movies.slice().sort(sortRatingDown).slice(0, 2);
    if (this.topRatedMovies.length && !doNotShow) {
      this.topRatedComponent = new TopRatedView();
      render(this.topRatedComponent, this.movieListComponent.filmsElement);
      for (const movie of this.topRatedMovies) {
        this.#renderMovieCard(movie, this.topRatedComponent.containerElement, this.topRatedMovieCardsPresenters);
      }
    }
  };

  #renderMostCommentedList = () => {
    let doNotShow = true;
    this.mostCommentedMovies = this.moviesModel.movies.slice()
      .sort(sortCommentsDown)
      .filter((movie) => movie.comments.length !== 0)
      .slice(0, 2);
    if (this.mostCommentedMovies.length !== 0) {
      doNotShow = false;
    }
    if (!doNotShow) {
      this.mostCommentedComponent = new MostCommentedView();
      render(this.mostCommentedComponent, this.movieListComponent.filmsElement);
      for (const movie of this.mostCommentedMovies) {
        this.#renderMovieCard(movie, this.mostCommentedComponent.containerElement, this.mostCommentedMovieCardsPresenters);
      }
    }
  };
}
