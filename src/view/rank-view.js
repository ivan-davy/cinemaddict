import AbstractView from '../framework/view/abstract-view';

const RANKS = {
  'Novice': {from: 1, to: 10},
  'Fan': {from: 11, to: 20},
  'Movie Buff': {from: 21, to: Number.POSITIVE_INFINITY}
};

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
    for (const rank in RANKS) {
      const {from, to} = RANKS[rank];
      if (this.#moviesSeen >= from && this.#moviesSeen <= to) {
        return rank;
      }
    }
    return '';
  }
}
