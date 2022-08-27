import dayjs from 'dayjs';

const SORT_TYPES = {
  DEFAULT: 'default',
  DATE_DOWN: 'date-down',
  RATING_DOWN: 'rating-down',
};

const getWeightNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }
  if (dateA === null) {
    return 1;
  }
  if (dateB === null) {
    return -1;
  }
  return null;
};

const sortDateDown = (movieA, movieB) => {
  const weight = getWeightNullDate(movieA.filmInfo.release.date, movieB.filmInfo.release.date);
  return weight ?? dayjs(movieB.filmInfo.release.date).diff(dayjs(movieA.filmInfo.release.date));
};

const sortRatingDown = (movieA, movieB) => {
  if (movieA.filmInfo.totalRating > movieB.filmInfo.totalRating) {
    return -1;
  }
  if (movieA.filmInfo.totalRating < movieB.filmInfo.totalRating) {
    return 1;
  }
  else {
    return 0;
  }
};

const sortCommentsDown = (movieA, movieB) => {
  if (movieA.comments.length > movieB.comments.length) {
    return -1;
  }
  if (movieA.comments.length < movieB.comments.length) {
    return 1;
  }
  else {
    return 0;
  }
};

export {SORT_TYPES, sortDateDown, sortRatingDown, sortCommentsDown};


