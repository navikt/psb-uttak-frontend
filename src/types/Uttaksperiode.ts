import Utbetalingsgrad from './Utbetalingsgrad';
interface Uttaksperiode {
    utfall: string;
    uttaksgrad: number;
    utbetalingsgrader: Utbetalingsgrad[];
    årsak: string[];
    knekkpunktTyper: any[];
    kildeBehandlingUUID: string;
}

export default Uttaksperiode;
