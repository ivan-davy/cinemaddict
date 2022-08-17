import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


const getPrettyYear = (year) => dayjs(year).format('YYYY');
const getPrettyDate = (date) => dayjs(date).format('D MMMM YYYY');
const getCommentPrettyDate = (commentDate) => {
  dayjs.extend(relativeTime);
  return dayjs(commentDate).fromNow();
};

export {getPrettyYear, getPrettyDate, getCommentPrettyDate};
