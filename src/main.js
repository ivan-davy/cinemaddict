import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';
import MainPresenter from './presenter/main-presenter';
import FiltersModel from './model/filters-model';
import FilterPresenter from './presenter/filter-presenter';

const siteElements = {
  siteHeaderElement: document.querySelector('.header'),
  siteMainElement: document.querySelector('.main'),
  siteFooterElement: document.querySelector('.footer'),
};

const moviesModel = new MoviesModel;
const commentsModel = new CommentsModel;
const filtersModel = new FiltersModel;
const mainPresenter = new MainPresenter(siteElements, moviesModel, commentsModel, filtersModel);
const filterPresenter = new FilterPresenter(siteElements, filtersModel, moviesModel);

filterPresenter.init();
mainPresenter.init();


