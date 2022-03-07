import Uttaksperioder from './Uttaksperioder';
import ArbeidsgiverOpplysninger from './ArbeidsgiverOpplysninger';

interface ContainerContract {
    uttaksperioder: Uttaksperioder;
    aktivBehandlingUuid: string;
    arbeidsforhold: Record<string, ArbeidsgiverOpplysninger>;
    aksjonspunktkoder: string[];
    erFagytelsetypeLivetsSluttfase: boolean;
}

export default ContainerContract;
