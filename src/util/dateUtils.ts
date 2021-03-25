import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import duration from 'dayjs/plugin/duration';
import customParseFormat from 'dayjs/plugin/customParseFormat';

const dateFormats = ['YYYY-MM-DD', 'DD.MM.YYYY'];

dayjs.extend(utc);
dayjs.extend(duration);
dayjs.extend(customParseFormat);

export const prettifyDate = (date: string) => {
    return dayjs(date).utc(true).format('DD.MM.YYYY');
};

export const beregnDagerTimer = (dur: string) => {
    return Math.round(dayjs.duration(dur).asHours() * 100) / 100;
};

export function dateFromString(dateString: string) {
    return dayjs(dateString, dateFormats).utc(true);
}
