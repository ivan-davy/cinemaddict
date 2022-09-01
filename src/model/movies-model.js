import Observable from '../framework/observable';
import {UPDATE_TYPES} from '../utility/actions-updates-methods';


export default class MoviesModel extends Observable {
  #movies = [];
  #moviesApiService = null;

  constructor(moviesApiService) {
    super();
    this.#moviesApiService = moviesApiService;
  }

  init = async () => {
    try {
      const movies = await this.#moviesApiService.movies;
      this.#movies = movies.map(this.#adaptToClient);
    } catch(err) {
      this.#movies = [];
    }

    this._notify(UPDATE_TYPES.INIT, null);
  };

  get movies() {
    return this.#movies;
  }

  updateMovie = async (updateType, update) => {
    const {movieData} = update;
    const index = this.#movies.findIndex((movie) => movie.id === movieData.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    try {
      const response = await this.#moviesApiService.updateMovie(movieData);
      const updatedMovieData = this.#adaptToClient(response);

      this.#movies = [
        ...this.#movies.slice(0, index),
        updatedMovieData,
        ...this.#movies.slice(index + 1),
      ];
      this._notify(updateType, {...update, movieData: updatedMovieData});
    } catch(err) {
      console.log(err)
      throw new Error('Can\'t update movie');
    }
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
