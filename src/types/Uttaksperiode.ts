import { Period } from './Period';
import Utbetalingsgrad from './Utbetalingsgrad';

export interface Uttaksperiodeelement {
    utfall: 'INNVILGET' | 'AVSLÅTT';
    uttaksgrad: number;
    årsak: 'FULL_DEKNING'[];
    kildeBehandlingUUID: string;
    knekkpunktTyper: string[];
    utbetalingsgrader: Utbetalingsgrad[];
}

export interface Uttaksperiode extends Uttaksperiodeelement {
    periode: Period;
}
