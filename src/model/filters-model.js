import Observable from '../framework/observable.js';
import {FilterType} from '../utility/filter-logic';

export default class FiltersModel extends Observable {
  #filter = FilterType.ALL;

  get filter() {
    return this.#filter;
  }

  setFilter = (updateType, filter) => {
    this.#filter = filter;
    this._notify(updateType, filter);
  };
}
