import AbstractView from '../framework/view/abstract-view';

const FILTER_UI_NAMES = {
  'all': 'All movies',
  'watchlist': 'Watchlist',
  'alreadyWatched': 'History',
  'favorite': 'Favorites'
};

const createFilterItemTemplate = (filter, isActive) => {
  const {name, count} = filter;
  const isActiveClass = isActive ? 'main-navigation__item--active' : '';
  const isFilterActive = name !== 'all';
  const counterSpanTemplate = `<span class="main-navigation__item-count">${count}</span></a>`;

  return `<a href="#${name}" class="main-navigation__item ${isActiveClass}">${FILTER_UI_NAMES[name]}
            ${isFilterActive ? counterSpanTemplate : ''}`;
};

const createFilterTemplate = (filters) => {
  const filterItemsTemplates = filters
    .map((filter, index) => createFilterItemTemplate(filter, index === 0))
    .join('');

  return `<nav class="main-navigation">
    ${filterItemsTemplates}
  </nav>`;
};


export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFilterTemplate(this.#filters);
  }
}
