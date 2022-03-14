import Uttaksperioder from './Uttaksperioder';
import ArbeidsgiverOpplysninger from './ArbeidsgiverOpplysninger';
import KodeverkMedNavn from './kodeverkMedNavnTsType';

interface ContainerContract {
    uttaksperioder: Uttaksperioder;
    aktivBehandlingUuid: string;
    arbeidsforhold: Record<string, ArbeidsgiverOpplysninger>;
    aksjonspunktkoder: string[];
    erFagytelsetypeLivetsSluttfase: boolean;
    kodeverkUtenlandsoppholdÅrsaker: KodeverkMedNavn[];
}

export default ContainerContract;
