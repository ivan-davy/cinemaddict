import Observable from '../framework/observable';


export default class CommentsModel extends Observable {
  #comments = [];
  #commentsApiService = null;

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  init = async (movieId) => {
    try {
      const response = await this.#commentsApiService.getComments(movieId);
      this.#comments = response.map(this.#adaptCommentToClient);
      return this.#comments;
    } catch(err) {
      this.#comments = [];
      throw new Error('Can\'t fetch comments');
    }
  };

  addComment = async (updateType, update) => {
    const {movieData, commentData, popupOffsetY} = update;
    try {
      const response = await this.#commentsApiService.addComment(commentData, movieData.id);
      const adaptedMovieData = {...update.movieData, comments: response['movie']['comments']};
      const adaptedCommentData = response.comments.map(this.#adaptCommentToClient);

      movieData.comments = adaptedMovieData.comments;
      this.#comments = adaptedCommentData;

      this._notify(updateType, {movieData, commentData: adaptedCommentData, popupOffsetY});
    } catch(err) {
      throw new Error('Can\'t add a new comment');
    }
  };

  deleteComment = async (updateType, update) => {
    const {movieData, commentData, popupOffsetY} = update;
    try {
      await this.#commentsApiService.deleteComment(commentData.id);
      const index = this.#comments.findIndex((comment) => comment.id === commentData.id);

      movieData.comments = movieData.comments.filter((comment) => comment !== commentData.id);
      this.#comments = [...this.#comments.slice(0, index), ...this.#comments.slice(index + 1)];

      this._notify(updateType, {movieData, popupOffsetY});
    } catch(err) {
      throw new Error('Can\'t delete a comment');
    }
  };

  #adaptCommentToClient = (comment) => ({...comment});
}
