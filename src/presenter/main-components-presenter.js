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
  init = (mainElement, movieModel, commentModel) => {
    this.mainElement = mainElement;
    this.movieModel = movieModel;
    this.commentModel = commentModel;
    this.movies = [...this.movieModel.movies];
    this.comments = [...this.commentModel.comments];


    render(new NavigationView(), this.mainElement);
    render(new SortView(), this.mainElement);

    render(new FilmListContainerView(), this.mainElement);
    this.filmListElement = this.mainElement.querySelector('.films-list');
    for (const movie of this.movies) {
      render(new FilmCardView(movie), this.filmListElement.querySelector('.films-list__container'));
    }
    render(new ShowMoreButtonView(), this.filmListElement);

    this.filmsElement = this.mainElement.querySelector('.films');
    render(new TopRatedContainerView(), this.filmsElement);
    this.topRatedElement = this.filmsElement.querySelector('#top-rated');
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(), this.topRatedElement.querySelector('.films-list__container'));
    }
    render(new MostCommentedContainerView(), this.filmsElement);
    this.mostCommentedElement = this.filmsElement.querySelector('#most-commented');
    for (let i = 0; i < 2; i++) {
      render(new FilmCardView(), this.mostCommentedElement.querySelector('.films-list__container'));
    }

    //render(new PopupView(), siteMainElement);

  };
}
