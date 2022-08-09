import {generateMovie} from '../mock/movie';


export default class MovieModel {
  _movies = Array.from({length: 15}, generateMovie);

  get movies() {
    return this._movies;
  }
}
