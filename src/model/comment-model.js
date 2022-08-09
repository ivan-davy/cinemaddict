import {generateComment} from '../mock/comment';


export default class CommentModel {
  _comments = Array.from({length: 20}, generateComment);

  get comments() {
    return this._comments;
  }
}
