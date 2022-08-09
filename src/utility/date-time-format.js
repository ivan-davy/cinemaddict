import dayjs from 'dayjs';

const getPrettyYear = (year) => dayjs(year).format('YYYY');
const getPrettyDate = (date) => dayjs(date).format('D MMMM YYYY');

export {getPrettyYear, getPrettyDate};
