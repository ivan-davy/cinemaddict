import {generateMovie} from '../mock/movie';
import Observable from '../framework/observable';


export default class MoviesModel extends Observable {
  #movies = Array.from({length: 16}, generateMovie);
  #moviesApiService = null;

  constructor(moviesApiService) {
    super();
    this.#moviesApiService = moviesApiService;
    this.#moviesApiService.movies.then((movies) => {
      console.log(movies.map(this.#adaptToClient));
    });
  }

  get movies() {
    return this.#movies;
  }

  updateMovie = (updateType, update) => {
    const {movieData} = update;
    const index = this.#movies.findIndex((movie) => movie.id === movieData.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      movieData,
      ...this.#movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addMovie = (updateType, update) => {
    const {movieData} = update;

    this.#movies = [
      movieData,
      ...this.#movies,
    ];

    this._notify(updateType, update);
  };

  deleteMovie = (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting movie');
    }

    this.#movies = [
      ...this.#movies.slice(0, index),
      ...this.#movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  #adaptToClient = (movie) => {
    const adaptedMovie = {...movie,
      filmInfo: {...movie['film_info'],
        alternativeTitle: movie['film_info']['alternative_title'],
        totalRating: movie['film_info']['total_rating'],
        ageRating: movie['film_info']['age_rating'],
        release: {...movie['film_info']['release'],
          releaseCountry: movie['film_info']['release']['release_country']
        }
      },
      userDetails: {...movie['user_details'],
        alreadyWatched: movie['user_details']['already_watched'],
        watchingDate: movie['user_details']['watching_date']
      }
    };

    delete adaptedMovie['film_info'];
    delete adaptedMovie['user_details'];
    delete adaptedMovie['filmInfo']['alternative_title'];
    delete adaptedMovie['filmInfo']['total_rating'];
    delete adaptedMovie['filmInfo']['age_rating'];
    delete adaptedMovie['filmInfo']['release']['release_country'];
    delete adaptedMovie['userDetails']['already_watched'];
    delete adaptedMovie['userDetails']['watching_date'];

    return adaptedMovie;
  };
}
