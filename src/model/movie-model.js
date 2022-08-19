import {generateMovie} from '../mock/movie';


export default class MovieModel {
  #movies = Array.from({length: 12}, generateMovie);

  get movies() {
    return this.#movies;
  }
}
