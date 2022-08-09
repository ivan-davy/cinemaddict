import {render} from './render.js';
import RankView from './view/rank-view.js';
import FilmDatabaseStatsView from './view/film-database-stats-view.js';
import MainComponentsPresenter from './presenter/main-components-presenter.js';
import MovieModel from './model/movie-model.js';
import CommentModel from './model/comment-model.js';


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(new RankView(), siteHeaderElement);
render(new FilmDatabaseStatsView(), siteFooterElement.querySelector('.footer__statistics'));

const mainComponentsPresenter = new MainComponentsPresenter;

const movieModel = new MovieModel;
const commentModel = new CommentModel;
mainComponentsPresenter.init(siteMainElement, movieModel, commentModel);


