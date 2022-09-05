import {getCommentPrettyDate} from '../../utility/date-time-format';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';
import he from 'he';

const USERNAME = 'KEKS';
const SHAKE_CLASS_NAME = 'shake';
const SHAKE_ANIMATION_TIMEOUT = 600;

const DEFAULT_STATE = {
  id: null,
  author: USERNAME,
  comment: '',
  date: null,
  emotion: null,
  isSubmitting: false
};

const createCommentsTemplate = (commentStates, userCommentState) => {
  const commentsQty = commentStates.length;
  let commentsTemplate = '';
  const isSubmitting = userCommentState.isSubmitting;
  let isDeleting = false;
  for (const commentEntry of commentStates) {
    const isThisDeleting = commentEntry.isDeleting;
    if (isThisDeleting) {
      isDeleting = true;
    }
    const {id, emotion, author, date, comment} = commentEntry;
    const timePassed = getCommentPrettyDate(date);

    commentsTemplate += `<li class="film-details__comment" id="block${id}">
              <span class="film-details__comment-emoji">
                <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
              </span>
              <div>
                <p class="film-details__comment-text">${comment}</p>
                <p class="film-details__comment-info">
                  <span class="film-details__comment-author">${author}</span>
                  <span class="film-details__comment-day">${timePassed}</span>
                  <button id="${id}" class="film-details__comment-delete" ${(isDeleting || isSubmitting) ? 'disabled' : ''}>${isThisDeleting ? 'Deleting...' : 'Delete'}</button>
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
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${(isDeleting || isSubmitting) ? 'disabled' : ''}>${he.encode(userCommentState.comment)}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${(isDeleting || isSubmitting) ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${(isDeleting || isSubmitting) ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${(isDeleting || isSubmitting) ? 'disabled' : ''}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${(isDeleting || isSubmitting) ? 'disabled' : ''}>
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
        this.setSubmittingState();
        this._callback.formSubmit(CommentsView.parseStateToComment(this._state.userComment));
        this._state.userComment = {...DEFAULT_STATE};
      }
    }
  };

  #deleteCommentHandler = (evt) => {
    if (evt.target.tagName === 'BUTTON') {
      const toBeDeletedIndex = this.setDeletingState(evt);
      this._callback.deleteComment(CommentsView.parseStateToComment(this._state.comments[toBeDeletedIndex]));
    }
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

  static parseCommentToState = (comment) => ({...comment, isDeleting: false});

  static parseStateToComment = (state) => {
    delete state.isSubmitting;
    delete state.isDeleting;
    return {...state};
  };


  setSubmittingState = () => {
    this._state.userComment.isSubmitting = true;
    this.updateElement(this._state.userComment);
  };

  setDeletingState = (evt = null, commentId = null) => {
    const comments = this._state.comments.slice();
    if (evt) {
      const toBeDeletedIndex = comments.findIndex((comment) => comment.id === evt.target.id);
      this._state.comments[toBeDeletedIndex].isDeleting = true;
      this.updateElement({...this._state.comments});
      return toBeDeletedIndex;
    }
    if (commentId) {
      const toBeDeletedIndex = comments.findIndex((comment) => comment.id === commentId);
      this._state.comments[toBeDeletedIndex].isDeleting = true;
      this.updateElement({...this._state.comments});
    }
  };

  resetAllStates = () => {
    for (const comment of this._state.comments) {
      comment.isDeleting = false;
    }
    this._state.userComment.isSubmitting = false;
    this.updateElement({...this._state});
  };

  shakeComment(callback, commentId) {
    document.querySelector(`#block${commentId}`).classList.add(SHAKE_CLASS_NAME);
    setTimeout(() => {
      this.element.classList.remove(SHAKE_CLASS_NAME);
      callback?.();
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  shakeInput(callback) {
    document.querySelector('.film-details__new-comment').classList.add(SHAKE_CLASS_NAME);
    setTimeout(() => {
      this.element.classList.remove(SHAKE_CLASS_NAME);
      callback?.();
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}
