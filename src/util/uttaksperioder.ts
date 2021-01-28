import UttaksperioderResponse from '../types/UttaksperioderResponse';
import { Uttaksperiode } from '../types/Uttaksperiode';
import { Period } from '../types/Period';

const lagUttaksperiodeliste = ({ perioder }: UttaksperioderResponse): Uttaksperiode[] => {
    return Object.keys(perioder).map((periodenøkkel) => {
        const uttaksperiode = new Period(periodenøkkel);
        const andreUttaksperiodeData = perioder[periodenøkkel];
        return {
            periode: uttaksperiode,
            ...andreUttaksperiodeData,
        };
    });
};

export default lagUttaksperiodeliste;
