import {render} from '../framework/render';
import MovieDatabaseStatsView from '../view/movie-database-stats-view';
import MoviesPresenter from './movies-presenter';
import RankView from '../view/rank-view';
import {generateFilter} from '../mock/filter';


export default class MainPresenter {
  constructor(siteElements, movieModel, commentModel) {
    this.headerElement = siteElements.siteHeaderElement;
    this.mainElement = siteElements.siteMainElement;
    this.footerElement = siteElements.siteFooterElement;

    this.movieModel = movieModel;
    this.commentModel = commentModel;
    this.movies = [...this.movieModel.movies];
    this.filters = generateFilter(this.movies);
    this.comments = [...this.commentModel.comments];
  }

  init = () => {
    const rankComponent = new RankView(this.filters[2].count);
    render(rankComponent, this.headerElement);

    const moviesPresenter = new MoviesPresenter(this.mainElement, this.movies, this.filters, this.comments);
    moviesPresenter.init();

    render(new MovieDatabaseStatsView(this.movies.length), this.footerElement.querySelector('.footer__statistics'));
  };
}
