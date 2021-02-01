import { Period } from './Period';
import Utbetalingsgrad from './Utbetalingsgrad';
import GraderingMotTilsyn from './GraderingMotTilsyn';

export interface Uttaksperiodeelement {
    utfall: 'INNVILGET' | 'AVSLÅTT';
    uttaksgrad: number;
    årsak: 'FULL_DEKNING'[];
    kildeBehandlingUUID: string;
    knekkpunktTyper: string[];
    utbetalingsgrader: Utbetalingsgrad[];
    graderingMotTilsyn: GraderingMotTilsyn;
}

export interface Uttaksperiode extends Uttaksperiodeelement {
    periode: Period;
}
