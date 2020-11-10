import moment from 'moment';

export const formatDate = (date: string): string => moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY');
