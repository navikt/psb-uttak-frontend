import axios, { CancelToken } from 'axios';
import uttaksperiodeMock from '../mock/uttaksperiodeMock';

export const hentUttaksperioder = (url: string, cancelToken: CancelToken) => {
    // return axios.get(url, { cancelToken });
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ data: uttaksperiodeMock });
        }, 1000);
    });
};
