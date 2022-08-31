import ApiService from '../framework/api-service';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export default class CommentApiService extends ApiService {
  getComments(filmId) {
    return this._load({url: `comments/${filmId}`})
      .then(ApiService.parseResponse);
  }

  addComment = async (comment) => { //!
    const response = await this._load({
      url: `comments/${comment.id}`,
      method: Method.PUT,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  #adaptToServer = (comment) => comment;
}

