import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';
import MainPresenter from './presenter/main-presenter';
import FiltersModel from './model/filters-model';
import FilterPresenter from './presenter/filter-presenter';
import MovieApiService from './api/movie-api-service';

const END_POINT = 'https://18.ecmascript.pages.academy/cinemaddict';
const AUTH = 'Basic kTy9gIdsz2317rT';

const siteElements = {
  siteHeaderElement: document.querySelector('.header'),
  siteMainElement: document.querySelector('.main'),
  siteFooterElement: document.querySelector('.footer'),
};

const moviesModel = new MoviesModel(new MovieApiService(END_POINT, AUTH));
const commentsModel = new CommentsModel;
const filtersModel = new FiltersModel;
const mainPresenter = new MainPresenter(siteElements, moviesModel, commentsModel, filtersModel);
const filterPresenter = new FilterPresenter(siteElements, filtersModel, moviesModel);

filterPresenter.init();
mainPresenter.init();


