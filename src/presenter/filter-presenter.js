import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import {FILTER_TYPES, movieFilters} from '../utility/filter-logic';
import {UPDATE_TYPES} from '../utility/actions-updates';

export default class FilterPresenter {
  #filterContainer = null;
  #filtersModel = null;
  #moviesModel = null;

  #filterComponent = null;

  constructor(siteElements, filtersModel, moviesModel) {
    this.#filterContainer = siteElements.siteMainElement;
    this.#filtersModel = filtersModel;
    this.#moviesModel = moviesModel;

    this.#moviesModel.addObserver(this.#modelEventHandler);
    this.#filtersModel.addObserver(this.#modelEventHandler);
  }

  get filters() {
    const movies = this.#moviesModel.movies;

    return [
      {
        type: FILTER_TYPES.ALL,
        name: 'all',
        count: movieFilters[FILTER_TYPES.ALL](movies).length,
      },
      {
        type: FILTER_TYPES.WATCHLIST,
        name: 'watchlist',
        count: movieFilters[FILTER_TYPES.WATCHLIST](movies).length,
      },
      {
        type: FILTER_TYPES.WATCHED,
        name: 'alreadyWatched',
        count: movieFilters[FILTER_TYPES.WATCHED](movies).length,
      },
      {
        type: FILTER_TYPES.FAVORITE,
        name: 'favorite',
        count: movieFilters[FILTER_TYPES.FAVORITE](movies).length,
      }
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filtersModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#filterTypeChangeHandler);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #modelEventHandler = () => {
    this.init();
  };

  #filterTypeChangeHandler = (filterType) => {
    if (this.#filtersModel.filter === filterType) {
      return;
    }
    this.#filtersModel.setFilter(UPDATE_TYPES.MAJOR, filterType);
  };
}
