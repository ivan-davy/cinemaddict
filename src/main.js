import MoviesModel from './model/movies-model.js';
import CommentsModel from './model/comments-model.js';
import MainPresenter from './presenter/main-presenter';

const siteElements = {
  siteHeaderElement: document.querySelector('.header'),
  siteMainElement: document.querySelector('.main'),
  siteFooterElement: document.querySelector('.footer'),
};

const moviesModel = new MoviesModel;
const commentsModel = new CommentsModel;
const mainPresenter = new MainPresenter(siteElements, moviesModel, commentsModel);

mainPresenter.init();


