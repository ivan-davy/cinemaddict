import {getRandomItem} from '../utility/random';


const MOCK_LONG = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  'Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.'
];

const MOCK_SHORT = [
  'Lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit'
];

const EMOTIONS = [
  'smile', 'sleeping', 'puke', 'angry'
];


export const generateComment = (id) => ({
  id,
  author: getRandomItem(MOCK_SHORT),
  comment: getRandomItem(MOCK_LONG),
  date: '2018-05-11T16:12:32.554Z',
  emotion: getRandomItem(EMOTIONS)
});


