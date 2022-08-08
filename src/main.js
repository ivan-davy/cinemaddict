import {render} from './render.js';
import RankView from './view/rank-view.js';
import NavigationView from './view/navigation-view';
import SortView from './view/sort-view.js';
import FilmCardView from './view/film-card-view';
import ShowMoreButtonView from './view/show-more-button-view';
import PopupView from './view/popup-view';
import FilmDatabaseStatsView from './view/film-database-stats-view';
import FilmListContainerView from './view/film-list-container-view';
import TopRatedContainerView from './view/top-rated-container-view';
import MostCommentedContainerView from './view/most-commented-container-view';


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(new RankView(), siteHeaderElement);
render(new NavigationView(), siteMainElement);
render(new SortView(), siteMainElement);

render(new FilmListContainerView(), siteMainElement);
const filmListContainerElement = siteMainElement.querySelector('.films-list__container');
for (let i = 0; i < 5; i++) {
  render(new FilmCardView(), filmListContainerElement);
}
render(new ShowMoreButtonView(), siteMainElement.querySelector('.films-list'));

const filmsElement = siteMainElement.querySelector('.films');
render(new TopRatedContainerView(), filmsElement);
const topRatedElement = filmsElement.querySelector('#top-rated');
for (let i = 0; i < 2; i++) {
  render(new FilmCardView(), topRatedElement.querySelector('.films-list__container'));
}
render(new MostCommentedContainerView(), filmsElement);
const mostCommentedElement = filmsElement.querySelector('#most-commented');
for (let i = 0; i < 2; i++) {
  render(new FilmCardView(), mostCommentedElement.querySelector('.films-list__container'));
}

//render(new PopupView(), siteMainElement);
render(new FilmDatabaseStatsView(), siteFooterElement.querySelector('.footer__statistics'));


