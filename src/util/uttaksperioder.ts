import { Period } from '../types/Period';
import { Uttaksperiode } from '../types/Uttaksperiode';
import Uttaksperioder from '../types/Uttaksperioder';

const lagUttaksperiodeliste = ({ perioder }: Uttaksperioder): Uttaksperiode[] => {
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
