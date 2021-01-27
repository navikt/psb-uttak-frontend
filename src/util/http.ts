import axios, { CancelToken } from 'axios';

export const hentUttaksperioder = (url: string, cancelToken: CancelToken) => {
    return axios.get(url, { cancelToken });
};
