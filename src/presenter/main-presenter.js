import {render} from '../framework/render';
import MovieDatabaseStatsView from '../view/movie-database-stats-view';
import MoviesPresenter from './movies-presenter';
import RankView from '../view/rank-view';


export default class MainPresenter {
  constructor(siteElements, movieModel, commentModel) {
    this.headerElement = siteElements.siteHeaderElement;
    this.mainElement = siteElements.siteMainElement;
    this.footerElement = siteElements.siteFooterElement;

    this.movieModel = movieModel;
    this.commentModel = commentModel;
    this.movies = [...this.movieModel.movies];
    this.comments = [...this.commentModel.comments];
  }

  init = () => {
    render(new RankView(), this.headerElement);

    const moviesPresenter = new MoviesPresenter(this.mainElement, this.movies, this.comments);
    moviesPresenter.init();

    render(new MovieDatabaseStatsView(this.movies.length), this.footerElement.querySelector('.footer__statistics'));
  };
}
