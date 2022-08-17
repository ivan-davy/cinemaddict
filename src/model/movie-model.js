import {generateMovie} from '../mock/movie';


export default class MovieModel {
  #movies = Array.from({length: 17}, generateMovie);

  get movies() {
    return this.#movies;
  }
}
