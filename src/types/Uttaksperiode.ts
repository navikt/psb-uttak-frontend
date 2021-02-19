import { Period } from './Period';
import Utbetalingsgrad from './Utbetalingsgrad';
import GraderingMotTilsyn from './GraderingMotTilsyn';
import Utfall from '../constants/Utfall';
import Inngangsvilkår from './Inngangsvilkår';
import AnnenPart from '../constants/AnnenPart';

export interface Uttaksperiodeelement {
    utfall: Utfall;
    uttaksgrad: number;
    søkerBerOmMaksimalt?: number;
    årsaker: 'FULL_DEKNING'[];
    inngangsvilkår: Inngangsvilkår;
    kildeBehandlingUUID: string;
    knekkpunktTyper: string[];
    utbetalingsgrader: Utbetalingsgrad[];
    graderingMotTilsyn: GraderingMotTilsyn;
    annenPart: AnnenPart;
}

export interface Uttaksperiode extends Uttaksperiodeelement {
    periode: Period;
}
