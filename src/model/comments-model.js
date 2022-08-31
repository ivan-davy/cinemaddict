import Observable from '../framework/observable';


export default class CommentsModel extends Observable {
  #comments = [];
  #commentsApiService = null;

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  init = async () => {
    try {
      const comments = await this.#commentsApiService.comments;
      this.#comments = comments.map(this.#adaptToClient);
    } catch(err) {
      this.#comments = [];
    }
  };

  get comments() {
    return this.#comments;
  }

  addComment = (updateType, update) => {
    const {movieData, commentData, popupOffsetY} = update;
    commentData.id = this.getNewId();
    movieData.comments.push(commentData.id);

    this.#comments = [
      ...this.#comments,
      commentData
    ];

    this._notify(updateType, {movieData, commentData, popupOffsetY});
  };

  deleteComment = (updateType, update) => {
    const {movieData, commentData, popupOffsetY} = update;
    movieData.comments = movieData.comments.filter((item) => item !== commentData.id);
    const index = this.#comments.findIndex((comment) => comment.id === commentData.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this.#comments = [
      ...this.#comments.slice(0, index),
      ...this.#comments.slice(index + 1),
    ];

    this._notify(updateType, {movieData, commentData, popupOffsetY});
  };

  getNewId = () => String(Math.max(...this.#comments.slice().map((comment) => parseInt(comment.id, 10))) + 1);

  #adaptToClient = (comment) => ({...comment});
}
