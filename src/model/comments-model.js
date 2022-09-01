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
      const comments = await this.#commentsApiService.getComments(movieId);
      this.#comments = comments.map(this.#adaptToClient);
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
      const adaptedCommentData = this.#adaptToClient(response);
      movieData.comments.push(adaptedCommentData.id);

      this.#comments = [...this.#comments, adaptedCommentData];

      this._notify(updateType, {movieData, commentData: adaptedCommentData, popupOffsetY});
    } catch(err) {
      console.log(err)
      throw new Error('Can\'t add a new comment');
    }
  };

  deleteComment = async (updateType, update) => {
    const {movieData, commentData, popupOffsetY} = update;
    const index = this.#comments.findIndex((comment) => comment.id === commentData.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    try {
      movieData.comments = movieData.comments.filter((item) => item !== commentData.id);
      this.#comments = [...this.#comments.slice(0, index), ...this.#comments.slice(index + 1)];
      await this.#commentsApiService.deleteComment(commentData.id);
      this._notify(updateType, {movieData, popupOffsetY});
    } catch(err) {
      console.log(err);
      throw new Error('Can\'t delete a comment');
    }
  };

  #adaptToClient = (comment) => ({...comment});
}
