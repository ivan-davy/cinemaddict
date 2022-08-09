import {render} from '../render.js';
import NavigationView from '../view/navigation-view.js';
import SortView from '../view/sort-view.js';
import FilmCardView from '../view/film-card-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
//import PopupView from '../view/popup-view.js';
import FilmListContainerView from '../view/film-list-container-view.js';
import TopRatedContainerView from '../view/top-rated-container-view.js';
import MostCommentedContainerView from '../view/most-commented-container-view.js';


export default class MainComponentsPresenter {
  init = (mainElement) => {
    render(new NavigationView(), mainElement);
    render(new SortView(), mainElement);

    render(new FilmListContainerView(), mainElement);
    const filmListContainerElement = mainElement.querySelector('.films-list__container');
    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), filmListContainerElement);
    }
    render(new ShowMoreButtonView(), mainElement.querySelector('.films-list'));

    const filmsElement = mainElement.querySelector('.films');
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

  };
}
