import {render} from './render.js';
import RankView from './view/rank-view.js';
import FilmDatabaseStatsView from './view/film-database-stats-view';
import MainComponentsPresenter from './presenter/main-components-presenter';


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(new RankView(), siteHeaderElement);
render(new FilmDatabaseStatsView(), siteFooterElement.querySelector('.footer__statistics'));

const mainComponentsPresenter = new MainComponentsPresenter;
mainComponentsPresenter.init(siteMainElement);

