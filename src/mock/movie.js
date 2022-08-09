import {getRandomFloat, getRandomInteger, getRandomItem, getRandomSample} from '../utility/random';


const MOCK_LONG = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.'
];

const MOCK_SHORT = [
  'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'
];

const POSTERS = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
];


export const generateMovie = () => ({
  id: getRandomInteger(0, 100),
  comments: getRandomSample([...Array(10).keys()], getRandomInteger(0, 5)),
  filmInfo: {
    title: getRandomItem(MOCK_SHORT),
    alternativeTitle: getRandomItem(MOCK_SHORT),
    totalRating: getRandomFloat(0, 10).toPrecision(2),
    poster: getRandomItem(POSTERS),
    ageRating: getRandomInteger(0, 18),
    director: getRandomItem(MOCK_SHORT),
    writers: getRandomSample(MOCK_SHORT, getRandomInteger(1, 3)),
    actors: getRandomSample(MOCK_SHORT, getRandomInteger(1, 3)),
    release: {
      date: '2019-05-11T00:00:00.000Z',
      releaseCountry: getRandomItem(MOCK_SHORT),
    },
    runtime: getRandomInteger(30, 180),
    genre: getRandomSample(MOCK_SHORT, getRandomInteger(1, 3)),
    description: getRandomItem(MOCK_LONG),
  },
  userDetails: {
    watchlist: getRandomItem([false, true]),
    alreadyWatched: getRandomItem([false, true]),
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: getRandomItem([false, true])
  }
});
