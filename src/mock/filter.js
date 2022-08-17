import {movieFilters} from '../utility/filter-logic';

export const generateFilter = (movies) => Object.entries(movieFilters).map(
  ([filterName, filterMovies]) => ({
    name: filterName,
    count: filterMovies(movies).length,
  }),
);
