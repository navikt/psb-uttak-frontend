import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';

dayjs.extend(utc);
dayjs.extend(duration);

export const prettifyDate = (date: string) => {
    return dayjs(date).utc(true).format('DD.MM.YYYY');
};

export const beregnDagerTimer = (duration: string) => {
    return dayjs.duration(duration).asHours();
};
