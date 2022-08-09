import dayjs from 'dayjs';

const getPrettyYear = (year) => dayjs(year).format('YYYY');
const getPrettyDate = (date) => dayjs(date).format('D MMMM YYYY');
const getCommentDate = (date) => dayjs(date).format('YYYY/MM/DD HH:mm');

export {getPrettyYear, getPrettyDate, getCommentDate};
