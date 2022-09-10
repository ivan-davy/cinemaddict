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
  const counterSpanTemplate = `<span class="main-navigation__item-count">${count}</span>`;

  return `<a href="#${name}" id="${name}" class="main-navigation__item ${isActiveClass}">${FILTER_UI_NAMES[name]} ${isFilterActive ? counterSpanTemplate : ''}</a>`;
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
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  };

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'A') {
      this._callback.filterTypeChange(evt.target.id);
    }
    if (evt.target.tagName === 'SPAN') {
      this._callback.filterTypeChange(evt.target.parentElement.id);
    }
  };
}
