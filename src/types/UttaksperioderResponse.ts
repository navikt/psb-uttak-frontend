import { Uttaksperiodeelement } from './Uttaksperiode';

interface UttaksperioderResponse {
    perioder: {
        [key: string]: Uttaksperiodeelement;
    };
}

export default UttaksperioderResponse;
