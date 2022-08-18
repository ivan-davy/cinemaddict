const FILTER_TYPES = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  WATCHED: 'alreadyWatched',
  FAVORITE: 'favorite'
};

const movieFilters = {
  [FILTER_TYPES.ALL]: (movies) => movies,
  [FILTER_TYPES.WATCHLIST]: (movies) => movies.filter((movie) => movie.userDetails.watchlist),
  [FILTER_TYPES.WATCHED]: (movies) => movies.filter((movie) => movie.userDetails.alreadyWatched),
  [FILTER_TYPES.FAVORITE]: (movies) => movies.filter((movie) => movie.userDetails.favorite)
};

export {movieFilters};
