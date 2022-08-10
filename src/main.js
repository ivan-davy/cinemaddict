import MainPresenter from './presenter/main-presenter.js';
import MovieModel from './model/movie-model.js';
import CommentModel from './model/comment-model.js';

const siteElements = {
  siteHeaderElement: document.querySelector('.header'),
  siteMainElement: document.querySelector('.main'),
  siteFooterElement: document.querySelector('.footer'),
};

const movieModel = new MovieModel;
const commentModel = new CommentModel;
const mainPresenter = new MainPresenter;

mainPresenter.init(siteElements, movieModel, commentModel);


