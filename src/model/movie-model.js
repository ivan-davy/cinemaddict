import {generateMovie} from '../mock/movie';


export default class MovieModel {
  #movies = Array.from({length: 6}, generateMovie);

  get movies() {
    return this.#movies;
  }
}
