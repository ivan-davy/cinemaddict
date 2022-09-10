import ApiService from '../framework/api-service';
import {HTTPMethod} from '../utility/actions-updates-methods';


export default class MovieApiService extends ApiService {
  get movies() {
    return this._load({url: 'movies'})
      .then(ApiService.parseResponse).then((response) => response);
  }

  updateMovie = async (movie) => {
    const response = await this._load({
      url: `movies/${movie.id}`,
      method: HTTPMethod.PUT,
      body: JSON.stringify(this.#adaptMovieToServer(movie)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  };

  #adaptMovieToServer = (movie) => {
    const adaptedMovie = {
      ...movie,
      'film_info': {
        ...movie.filmInfo,
        'alternative_title': movie.filmInfo.alternativeTitle,
        'total_rating': movie.filmInfo.totalRating,
        'age_rating': movie.filmInfo.ageRating,
        'release': {
          ...movie.filmInfo.release,
          'release_country': movie.filmInfo.release.releaseCountry,
        }
      },
      'user_details': {
        ...movie.userDetails,
        'already_watched': movie.userDetails.alreadyWatched,
        'watching_date': movie.userDetails.watchingDate
      }
    };

    delete adaptedMovie['filmInfo'];
    delete adaptedMovie['userDetails'];
    delete adaptedMovie['film_info']['alternativeTitle'];
    delete adaptedMovie['film_info']['totalRating'];
    delete adaptedMovie['film_info']['ageRating'];
    delete adaptedMovie['film_info']['release']['releaseCountry'];
    delete adaptedMovie['user_details']['alreadyWatched'];
    delete adaptedMovie['user_details']['watchingDate'];

    return adaptedMovie;
  };
}

