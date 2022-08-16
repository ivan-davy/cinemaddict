const FILTER_TYPES = {
  WATCHLIST: 'watchlist',
  WATCHED: 'alreadyWatched',
  FAVORITE: 'favorite'
};

const movieFilters = {
  [FILTER_TYPES.WATCHLIST]: (movies) => movies.filter((movie) => !movie.watchlist),
  [FILTER_TYPES.WATCHED]: (movies) => movies.filter((movie) => !movie.alreadyWatched),
  [FILTER_TYPES.FAVORITE]: (movies) => movies.filter((movie) => !movie.favorite)
};

export {movieFilters};
