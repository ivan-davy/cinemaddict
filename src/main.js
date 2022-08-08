import {render} from './render.js';
import NewRankView from './view/new-rank-view.js';
import NewNavigationView from './view/new-navigation-view';
import NewSortView from './view/new-sort-view.js';
import NewFilmCardView from './view/new-film-card-view';
import NewShowMoreButtonView from './view/new-show-more-button-view';
import NewPopupView from './view/new-popup-view';
import NewFilmDatabaseStatsView from './view/new-film-database-stats-view';
import NewFilmListContainerView from './view/new-film-list-container-view';
import NewTopRatedContainerView from './view/new-top-rated-container-view';
import NewMostCommentedContainerView from './view/new-most-commented-container-view';


const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(new NewRankView(), siteHeaderElement);
render(new NewNavigationView(), siteMainElement);
render(new NewSortView(), siteMainElement);

render(new NewFilmListContainerView(), siteMainElement);
const filmListContainerElement = siteMainElement.querySelector('.films-list__container');
for (let i = 0; i < 5; i++) {
  render(new NewFilmCardView(), filmListContainerElement);
}
render(new NewShowMoreButtonView(), siteMainElement.querySelector('.films-list'));

const filmsElement = siteMainElement.querySelector('.films');
render(new NewTopRatedContainerView(), filmsElement);
const topRatedElement = filmsElement.querySelector('#top-rated');
for (let i = 0; i < 2; i++) {
  render(new NewFilmCardView(), topRatedElement.querySelector('.films-list__container'));
}
render(new NewMostCommentedContainerView(), filmsElement);
const mostCommentedElement = filmsElement.querySelector('#most-commented');
for (let i = 0; i < 2; i++) {
  render(new NewFilmCardView(), mostCommentedElement.querySelector('.films-list__container'));
}

//render(new NewPopupView(), siteMainElement);
render(new NewFilmDatabaseStatsView(), siteFooterElement.querySelector('.footer__statistics'));


