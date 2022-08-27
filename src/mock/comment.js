import {getRandomItem} from '../utility/random';


const MOCK_LONG = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.'
];

const MOCK_SHORT = [
  'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'
];

const MOCK_DATES = [
  '2019-05-11T00:05:08.000Z',
  '2022-04-11T00:00:04.000Z',
  '2022-06-11T00:01:01.000Z',
  '2012-12-11T00:00:00.000Z',
  '2022-08-12T16:12:32.554Z'
];

const EMOTIONS = [
  'smile', 'sleeping', 'puke', 'angry'
];

let id = -1;


export const generateComment = () => {
  id += 1;
  return {
    id: String(id),
    author: getRandomItem(MOCK_SHORT),
    comment: getRandomItem(MOCK_LONG),
    date: getRandomItem(MOCK_DATES),
    emotion: getRandomItem(EMOTIONS)
  };
};


