import {getCommentPrettyDate} from '../../utility/date-time-format';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import dayjs from 'dayjs';
import he from 'he';

const USERNAME = 'xXx_KEKSUS69_xXx';

const DEFAULT_STATE = {
  id: null,
  author: USERNAME,
  comment: '',
  date: dayjs().format(),
  emotion: null,
  isSubmitting: false
};

const createCommentsTemplate = (commentStates, userCommentState) => {
  const commentsQty = commentStates.length;
  let commentsTemplate = '';
  const isSubmitting = userCommentState.isSubmitting;
  for (const commentEntry of commentStates) {
    const isDeleting = commentEntry.isDeleting;
    const {id, emotion, author, date, comment} = commentEntry;
    const timePassed = getCommentPrettyDate(date);

    commentsTemplate += `<li class="film-details__comment">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
              </span>
              <div>
                <p class="film-details__comment-text">${comment}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${author}</span>
                  <span class="film-details__comment-day">${timePassed}</span>
                  <button id=${id} class="film-details__comment-delete" ${(isDeleting || isSubmitting) ? 'disabled' : ''}>${isDeleting ? 'Deleting...' : 'Delete'}</button>
                </p>
              </div>
            </li>`;
  }

  const emojiLabelTemplate = userCommentState.emotion ? `<img src="images/emoji/${userCommentState.emotion}.png" width="55" height="55" alt="emoji-smile">` : '';
  return `<div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsQty}</span></h3>
            <ul class="film-details__comments-list">${commentsTemplate}</ul>

            <form class="film-details__new-comment" action="" method="get">
            <div class="film-details__add-emoji-label">${emojiLabelTemplate}</div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isSubmitting ? 'disabled' : ''}>${he.encode(userCommentState.comment)}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${isSubmitting ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${isSubmitting ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${isSubmitting ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${isSubmitting ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </form>
        </section>
      </div>`;
};

export default class CommentsView extends AbstractStatefulView {
  #comments = null;

  constructor(comments) {
    super();
    this.#comments = comments.slice();
    this._state.comments = comments.slice().map((comment) => CommentsView.parseCommentToState(comment));
    this._state.userComment = {...DEFAULT_STATE};
    this.#setInnerHandlers();
  }

  get template() {
    return createCommentsTemplate(this._state.comments, this._state.userComment);
  }

  reset() {
    const state = {
      comments: this.#comments.slice().map((comment) => CommentsView.parseCommentToState(comment)),
      userComment: {...DEFAULT_STATE}
    };
    this.updateElement(state);
    this.#setInnerHandlers();
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    document
      .addEventListener('keydown', this.#formSubmitHandler);
  };

  unsetFormSubmitHandler = () => {
    this._callback.formSubmit = null;
    document.removeEventListener('keydown', this.#formSubmitHandler);
  };

  setCommentDeleteHandler = (callback) => {
    this._callback.deleteComment = callback;
    this.element.querySelector('.film-details__comments-list')
      .addEventListener('click', this.#deleteCommentHandler);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__emoji-list')
      .addEventListener('click', this.#emojiClickHandler);
    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentInputHandler);
    this.element.querySelector('.film-details__comments-list')
      .addEventListener('click', this.#deleteCommentHandler);
  };

  #emojiClickHandler = (evt) => {
    if (evt.target.classList.contains('film-details__emoji-item')) {
      this._state.userComment.emotion = evt.target.value;
      this.updateElement({...this._state.userComment, emotion: evt.target.value});
    }
  };

  #commentInputHandler = (evt) => {
    this._state.userComment.comment = evt.target.value;
    this._setState({...this._state.userComment, comment: evt.target.value});
  };

  #formSubmitHandler = (evt) => {
    if (evt.ctrlKey && evt.key === 'Enter') {
      if (this._state.userComment.emotion && this._state.userComment.comment) {
        this._state.userComment.isSubmitting = true;
        this.updateElement(this._state.userComment);
        this._callback.formSubmit(CommentsView.parseStateToUserComment(this._state.userComment));
        this._state.userComment = DEFAULT_STATE;
      }
    }
  };

  #deleteCommentHandler = (evt) => {
    if (evt.target.tagName === 'BUTTON') {
      const toBeDeletedIndex = this._state.comments.findIndex((comment) => comment.id === evt.target.id);
      this._state.comments[toBeDeletedIndex].isDeleting = true;
      this.updateElement({...this._state.comments});
      this._callback.deleteComment(this._state.comments[toBeDeletedIndex]);
    }
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

  static parseCommentToState = (comment) => ({...comment, isDeleting: false});

  static parseStateToUserComment = (state) => {
    delete state.isSubmitting;
    return {...state};
  };
}
