import ApiService from '../framework/api-service';
import {HTTP_METHODS} from '../utility/actions-updates-methods';


export default class CommentApiService extends ApiService {
  getComments(movieId) {
    return this._load({url: `comments/${movieId}`})
      .then(ApiService.parseResponse);
  }

  addComment = async (comment, movieId) => {
    const response = await this._load({
      url: `comments/${movieId}`,
      method: HTTP_METHODS.POST,
      body: JSON.stringify(this.#adaptCommentToServer(comment)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });
    return await ApiService.parseResponse(response);
  };

  deleteComment = async (commentId) => await this._load({
    url: `comments/${commentId}`,
    method: HTTP_METHODS.DELETE,
  });

  #adaptCommentToServer = (comment) => comment;
}

