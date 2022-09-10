const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  WATCHED: 'alreadyWatched',
  FAVORITE: 'favorite'
};

const movieFilters = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie) => movie.userDetails.watchlist),
  [FilterType.WATCHED]: (movies) => movies.filter((movie) => movie.userDetails.alreadyWatched),
  [FilterType.FAVORITE]: (movies) => movies.filter((movie) => movie.userDetails.favorite)
};

export {FilterType, movieFilters};
