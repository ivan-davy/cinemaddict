import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';
import MoviesPresenter from './presenter/movies-presenter';

const siteElements = {
  siteHeaderElement: document.querySelector('.header'),
  siteMainElement: document.querySelector('.main'),
  siteFooterElement: document.querySelector('.footer'),
};

const moviesModel = new MoviesModel;
const commentsModel = new CommentsModel;
const moviesPresenter = new MoviesPresenter(siteElements, moviesModel, commentsModel);

moviesPresenter.init();


