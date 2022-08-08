import {createElement} from '../render.js';

const createPopupTemplate = () => '' +
  '<section class="film-details">\n' +
  '  <div class="film-details__inner">\n' +
  '    <div class="film-details__top-container">\n' +
  '      <div class="film-details__close">\n' +
  '        <button class="film-details__close-btn" type="button">close</button>\n' +
  '      </div>\n' +
  '      <div class="film-details__info-wrap">\n' +
  '        <div class="film-details__poster">\n' +
  '          <img class="film-details__poster-img" src="./images/posters/the-great-flamarion.jpg" alt="">\n' +
  '\n' +
  '          <p class="film-details__age">18+</p>\n' +
  '        </div>\n' +
  '\n' +
  '        <div class="film-details__info">\n' +
  '          <div class="film-details__info-head">\n' +
  '            <div class="film-details__title-wrap">\n' +
  '              <h3 class="film-details__title">The Great Flamarion</h3>\n' +
  '              <p class="film-details__title-original">Original: The Great Flamarion</p>\n' +
  '            </div>\n' +
  '\n' +
  '            <div class="film-details__rating">\n' +
  '              <p class="film-details__total-rating">8.9</p>\n' +
  '            </div>\n' +
  '          </div>\n' +
  '\n' +
  '          <table class="film-details__table">\n' +
  '            <tr class="film-details__row">\n' +
  '              <td class="film-details__term">Director</td>\n' +
  '              <td class="film-details__cell">Anthony Mann</td>\n' +
  '            </tr>\n' +
  '            <tr class="film-details__row">\n' +
  '              <td class="film-details__term">Writers</td>\n' +
  '              <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>\n' +
  '            </tr>\n' +
  '            <tr class="film-details__row">\n' +
  '              <td class="film-details__term">Actors</td>\n' +
  '              <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>\n' +
  '            </tr>\n' +
  '            <tr class="film-details__row">\n' +
  '              <td class="film-details__term">Release Date</td>\n' +
  '              <td class="film-details__cell">30 March 1945</td>\n' +
  '            </tr>\n' +
  '            <tr class="film-details__row">\n' +
  '              <td class="film-details__term">Runtime</td>\n' +
  '              <td class="film-details__cell">1h 18m</td>\n' +
  '            </tr>\n' +
  '            <tr class="film-details__row">\n' +
  '              <td class="film-details__term">Country</td>\n' +
  '              <td class="film-details__cell">USA</td>\n' +
  '            </tr>\n' +
  '            <tr class="film-details__row">\n' +
  '              <td class="film-details__term">Genres</td>\n' +
  '              <td class="film-details__cell">\n' +
  '                <span class="film-details__genre">Drama</span>\n' +
  '                <span class="film-details__genre">Film-Noir</span>\n' +
  '                <span class="film-details__genre">Mystery</span></td>\n' +
  '            </tr>\n' +
  '          </table>\n' +
  '\n' +
  '          <p class="film-details__film-description">\n' +
  '            The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion\'s other assistant. Flamarion falls in love with Connie, the movie\'s femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.\n' +
  '          </p>\n' +
  '        </div>\n' +
  '      </div>\n' +
  '\n' +
  '      <section class="film-details__controls">\n' +
  '        <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>\n' +
  '        <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>\n' +
  '        <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>\n' +
  '      </section>\n' +
  '    </div>\n' +
  '\n' +
  '    <div class="film-details__bottom-container">\n' +
  '      <section class="film-details__comments-wrap">\n' +
  '        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>\n' +
  '\n' +
  '        <ul class="film-details__comments-list">\n' +
  '          <li class="film-details__comment">\n' +
  '            <span class="film-details__comment-emoji">\n' +
  '              <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">\n' +
  '            </span>\n' +
  '            <div>\n' +
  '              <p class="film-details__comment-text">Interesting setting and a good cast</p>\n' +
  '              <p class="film-details__comment-info">\n' +
  '                <span class="film-details__comment-author">Tim Macoveev</span>\n' +
  '                <span class="film-details__comment-day">2019/12/31 23:59</span>\n' +
  '                <button class="film-details__comment-delete">Delete</button>\n' +
  '              </p>\n' +
  '            </div>\n' +
  '          </li>\n' +
  '          <li class="film-details__comment">\n' +
  '            <span class="film-details__comment-emoji">\n' +
  '              <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji-sleeping">\n' +
  '            </span>\n' +
  '            <div>\n' +
  '              <p class="film-details__comment-text">Booooooooooring</p>\n' +
  '              <p class="film-details__comment-info">\n' +
  '                <span class="film-details__comment-author">John Doe</span>\n' +
  '                <span class="film-details__comment-day">2 days ago</span>\n' +
  '                <button class="film-details__comment-delete">Delete</button>\n' +
  '              </p>\n' +
  '            </div>\n' +
  '          </li>\n' +
  '          <li class="film-details__comment">\n' +
  '            <span class="film-details__comment-emoji">\n' +
  '              <img src="./images/emoji/puke.png" width="55" height="55" alt="emoji-puke">\n' +
  '            </span>\n' +
  '            <div>\n' +
  '              <p class="film-details__comment-text">Very very old. Meh</p>\n' +
  '              <p class="film-details__comment-info">\n' +
  '                <span class="film-details__comment-author">John Doe</span>\n' +
  '                <span class="film-details__comment-day">2 days ago</span>\n' +
  '                <button class="film-details__comment-delete">Delete</button>\n' +
  '              </p>\n' +
  '            </div>\n' +
  '          </li>\n' +
  '          <li class="film-details__comment">\n' +
  '            <span class="film-details__comment-emoji">\n' +
  '              <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji-angry">\n' +
  '            </span>\n' +
  '            <div>\n' +
  '              <p class="film-details__comment-text">Almost two hours? Seriously?</p>\n' +
  '              <p class="film-details__comment-info">\n' +
  '                <span class="film-details__comment-author">John Doe</span>\n' +
  '                <span class="film-details__comment-day">Today</span>\n' +
  '                <button class="film-details__comment-delete">Delete</button>\n' +
  '              </p>\n' +
  '            </div>\n' +
  '          </li>\n' +
  '        </ul>\n' +
  '\n' +
  '        <form class="film-details__new-comment" action="" method="get">\n' +
  '          <div class="film-details__add-emoji-label"></div>\n' +
  '\n' +
  '          <label class="film-details__comment-label">\n' +
  '            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>\n' +
  '          </label>\n' +
  '\n' +
  '          <div class="film-details__emoji-list">\n' +
  '            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">\n' +
  '            <label class="film-details__emoji-label" for="emoji-smile">\n' +
  '              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">\n' +
  '            </label>\n' +
  '\n' +
  '            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">\n' +
  '            <label class="film-details__emoji-label" for="emoji-sleeping">\n' +
  '              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">\n' +
  '            </label>\n' +
  '\n' +
  '            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">\n' +
  '            <label class="film-details__emoji-label" for="emoji-puke">\n' +
  '              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">\n' +
  '            </label>\n' +
  '\n' +
  '            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">\n' +
  '            <label class="film-details__emoji-label" for="emoji-angry">\n' +
  '              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">\n' +
  '            </label>\n' +
  '          </div>\n' +
  '        </form>\n' +
  '      </section>\n' +
  '    </div>\n' +
  '  </div>\n' +
  '</section>';

export default class PopupView {
  getTemplate() {
    return createPopupTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
