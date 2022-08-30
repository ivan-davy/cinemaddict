import {generateComment} from '../mock/comment';
import Observable from '../framework/observable';


export default class CommentsModel extends Observable {
  #comments = Array.from({length: 25}, generateComment);

  get comments() {
    return this.#comments;
  }

  addComment = (updateType, update) => {
    const {commentData} = update;

    this.#comments = [
      ...this.#comments,
      commentData
    ];

    this._notify(updateType, update);
  };

  deleteComment = (updateType, update) => {
    const {commentData} = update;
    const index = this.#comments.findIndex((comment) => comment.id === commentData.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  getNewId = () => String(Math.max(...this.#comments.slice().map((comment) => parseInt(comment.id, 10))) + 1);
}
