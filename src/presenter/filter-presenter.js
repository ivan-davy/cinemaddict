import {render, replace, remove} from '../framework/render.js';
import FilterView from '../view/filter-view.js';
import {FilterType, movieFilters} from '../utility/filter-logic';
import {UpdateType} from '../utility/actions-updates-methods';

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
        type: FilterType.ALL,
        name: 'all',
        count: movieFilters[FilterType.ALL](movies).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'watchlist',
        count: movieFilters[FilterType.WATCHLIST](movies).length,
      },
      {
        type: FilterType.WATCHED,
        name: 'alreadyWatched',
        count: movieFilters[FilterType.WATCHED](movies).length,
      },
      {
        type: FilterType.FAVORITE,
        name: 'favorite',
        count: movieFilters[FilterType.FAVORITE](movies).length,
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
    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
