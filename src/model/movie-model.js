import {generateMovie} from '../mock/movie';


export default class MovieModel {
  #movies = Array.from({length: 50}, generateMovie);

  get movies() {
    return this.#movies;
  }
}
