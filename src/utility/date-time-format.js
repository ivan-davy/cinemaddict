import dayjs from 'dayjs';

const getYear = (year) => dayjs(year).format('YYYY');

export {getYear};
