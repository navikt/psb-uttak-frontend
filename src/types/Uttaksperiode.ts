import { Period } from './Period';

export interface Uttaksperiodeelement {
    utfall: 'INNVILGET' | 'AVSLÅTT';
    uttaksgrad: number;
    årsak: 'FULL_DEKNING'[];
    kildeBehandlingUUID: string;
    knekkpunktTyper: string[];
    utbetalingsgrader: {
        arbeidsforhold: {
            type: 'arbeidsgiver';
            organisasjonsnummer: string;
        };
        utbetalingsgrad: number;
    }[];
}

export interface Uttaksperiode extends Uttaksperiodeelement {
    periode: Period;
}
