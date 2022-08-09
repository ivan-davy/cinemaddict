import {generateComment} from '../mock/comment';


export default class CommentModel {
  _comments = Array.from({length: 50}, generateComment);

  get comments() {
    return this._comments;
  }
}
