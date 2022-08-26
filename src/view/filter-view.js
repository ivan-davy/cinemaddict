import AbstractView from '../framework/view/abstract-view';


const FILTER_UI_NAMES = {
  'all': 'All movies',
  'watchlist': 'Watchlist',
  'alreadyWatched': 'History',
  'favorite': 'Favorites'
};

const createFilterItemTemplate = (filter, activeFilter) => {
  const {name, count} = filter;
  const isActiveClass = (activeFilter === filter.name) ? 'main-navigation__item--active' : '';
  const isFilterActive = name !== 'all';
  const counterSpanTemplate = `<span class="main-navigation__item-count">${count}</span></a>`;

  return `<a href="#${name}" class="main-navigation__item ${isActiveClass}">${FILTER_UI_NAMES[name]}
            ${isFilterActive ? counterSpanTemplate : ''}`;
};

const createFilterTemplate = (filters, activeFilter) => {
  const filterItemsTemplates = filters
    .map((filter) => createFilterItemTemplate(filter, activeFilter)).join('');

  return `<nav class="main-navigation">
    ${filterItemsTemplates}
  </nav>`;
};


export default class FilterView extends AbstractView {
  #filters = null;
  #activeFilterType = null;

  constructor(filters, activeFilterType) {
    super();
    this.#filters = filters;
    this.#activeFilterType = activeFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#activeFilterType);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}
