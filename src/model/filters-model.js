import Observable from '../framework/observable.js';
import {FILTER_TYPES} from '../utility/filter-logic';

export default class FiltersModel extends Observable {
  #filter = FILTER_TYPES.ALL;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}
