import {getCommentPrettyDate} from '../../utility/date-time-format';
import AbstractStatefulView from '../../framework/view/abstract-stateful-view';

const createCommentsTemplate = (commentStates) => {
  const commentsQty = commentStates.length;
  let commentsTemplate = '';
  for (const commentEntry of commentStates) {
    const {emotion, author, date, comment} = commentEntry;
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
                  <button class="film-details__comment-delete">Delete</button>
                </p>
              </div>
            </li>`;
  }

  return `<div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsQty}</span></h3>
            <ul class="film-details__comments-list">${commentsTemplate}</ul>

            <form class="film-details__new-comment" action="" method="get">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </form>
        </section>
      </div>`;
};

export default class CommentsView extends AbstractStatefulView {
  constructor(comments) {
    super();
    this._state.comments = comments.slice().map((comment) => CommentsView.parseCommentToState(comment));
    this._state.userComment = null;
  }

  get template() {
    return createCommentsTemplate(this._state.comments);
  }

  removeElement() {
    super.removeElement();
    this._state = null;
  }

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('.film-details__new-comment').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(CommentsView.parseStateToComment(this._state.userComment));
  };

  static parseCommentToState = (comment) => ({...comment});

  static parseStateToComment = (state) => ({...state});
}
