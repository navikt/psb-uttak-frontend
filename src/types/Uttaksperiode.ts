import { Period } from './Period';
import Utbetalingsgrad from './Utbetalingsgrad';
import GraderingMotTilsyn from './GraderingMotTilsyn';
import Utfall from '../constants/Utfall';
import Inngangsvilkår from './Inngangsvilkår';
import AnnenPart from '../constants/AnnenPart';
import Årsaker from '../constants/Årsaker';

export interface Uttaksperiodeelement {
    utfall: Utfall;
    uttaksgrad: number;
    søkerBerOmMaksimalt?: number;
    årsaker: Årsaker[];
    inngangsvilkår: Inngangsvilkår;
    kildeBehandlingUUID: string;
    knekkpunktTyper: string[];
    utbetalingsgrader: Utbetalingsgrad[];
    graderingMotTilsyn: GraderingMotTilsyn;
    annenPart: AnnenPart;
    søkersTapteArbeidstid: number;
}

export interface Uttaksperiode extends Uttaksperiodeelement {
    periode: Period;
}
