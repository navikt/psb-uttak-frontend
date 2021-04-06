import OverseEtablertTilsynÅrsaker from '../constants/OverseEtablertTilsynÅrsaker';

export default interface GraderingMotTilsyn {
    etablertTilsyn: number;
    andreSøkeresTilsyn: number;
    tilgjengeligForSøker: number;
    overseEtablertTilsynÅrsak?: OverseEtablertTilsynÅrsaker;
}
