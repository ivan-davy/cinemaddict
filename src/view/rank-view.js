import AbstractView from '../framework/view/abstract-view';


const RANK_NAMES = ['Novice', 'Fan', 'Movie Buff'];

const createRankTemplate = (rank) => {
  if (rank === '') {
    return '<section class="header__profile profile"></section>';
  } else {
    return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
  }
};


export default class RankView extends AbstractView {
  #moviesSeen = null;

  constructor(moviesSeen) {
    super();
    this.#moviesSeen = moviesSeen;
  }

  get template() {
    return createRankTemplate(this.rank);
  }

  get rank() {
    if (this.#moviesSeen >= 1 && this.#moviesSeen <= 10) {
      return RANK_NAMES[0];
    } else if (this.#moviesSeen >= 11 && this.#moviesSeen <= 20) {
      return RANK_NAMES[1];
    } else if (this.#moviesSeen >= 21) {
      return RANK_NAMES[2];
    } else {
      return '';
    }
  }
}
