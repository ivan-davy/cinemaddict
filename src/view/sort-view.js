import AbstractView from '../framework/view/abstract-view';
import {SORT_TYPES} from '../utility/sort-logic';


const createSortTemplate = (sortType) => `<ul class="sort">
    <li><a href="#" class="sort__button ${sortType === SORT_TYPES.DEFAULT ? 'sort__button--active' : ''}" data-sort-type="${SORT_TYPES.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button ${sortType === SORT_TYPES.DATE_DOWN ? 'sort__button--active' : ''}" data-sort-type="${SORT_TYPES.DATE_DOWN}">Sort by date</a></li>
    <li><a href="#" class="sort__button ${sortType === SORT_TYPES.RATING_DOWN ? 'sort__button--active' : ''}" data-sort-type="${SORT_TYPES.RATING_DOWN}">Sort by rating</a></li>
  </ul>`;

export default class SortView extends AbstractView {
  #sortType = null;

  constructor(sortType) {
    super();
    this.#sortType = sortType;
  }

  get template() {
    return createSortTemplate(this.#sortType);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  };
}
