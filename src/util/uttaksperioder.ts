import { Period } from '../types/Period';
import { Uttaksperiode } from '../types/Uttaksperiode';
import Uttaksperioder from '../types/Uttaksperioder';

const lagUttaksperiodeliste = (uttaksperioder: Uttaksperioder): Uttaksperiode[] => {
    return Object.keys(uttaksperioder).map((periodenøkkel) => {
        const uttaksperiode = new Period(periodenøkkel);
        const andreUttaksperiodeData = uttaksperioder[periodenøkkel];
        return {
            periode: uttaksperiode,
            ...andreUttaksperiodeData,
        };
    });
};

export default lagUttaksperiodeliste;
