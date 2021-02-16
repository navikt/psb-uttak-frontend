import UttaksperioderResponse from '../../src/types/UttaksperioderResponse';
import Utfall from '../../src/constants/Utfall';
import AnnenPart from '../../src/constants/AnnenPart';

const uttaksperioderResponse: UttaksperioderResponse = {
    perioder: {
        '2020-01-01/2020-01-04': {
            utfall: Utfall.OPPFYLT,
            uttaksgrad: 100,
            utbetalingsgrader: [
                {
                    arbeidsforhold: {
                        type: 'arbeidsgiver',
                        organisasjonsnummer: '123456789',
                        aktørId: null,
                        arbeidsforholdId: null,
                    },
                    normalArbeidstid: 'PT7H30M',
                    faktiskArbeidstid: 'PT0S',
                    utbetalingsgrad: 100,
                },
            ],
            søkerBerOmMaksimalt: 100,
            årsak: ['FULL_DEKNING'],
            inngangsvilkår: [
                {
                    inngangsvilkårkode: '123',
                    utfall: Utfall.OPPFYLT,
                },
            ],
            graderingMotTilsyn: {
                pleiebehov: 100,
                etablertTilsyn: 0,
                andreSøkeresTilsyn: 0,
                tilgjengeligForSøker: 100,
            },
            knekkpunktTyper: [],
            kildeBehandlingUUID: '8994463a-c3df-4ce5-a0f1-ee733e20b50e',
            annenPart: AnnenPart.ALENE,
        },
        '2020-01-05/2020-01-15': {
            utfall: Utfall.IKKE_OPPFYLT,
            uttaksgrad: 0,
            utbetalingsgrader: [
                {
                    arbeidsforhold: {
                        type: 'arbeidsgiver',
                        organisasjonsnummer: '123456789',
                        aktørId: null,
                        arbeidsforholdId: null,
                    },
                    normalArbeidstid: 'PT7H30M',
                    faktiskArbeidstid: 'PT0S',
                    utbetalingsgrad: 100,
                },
            ],
            søkerBerOmMaksimalt: 100,
            årsak: ['FULL_DEKNING'],
            inngangsvilkår: [
                {
                    inngangsvilkårkode: '123',
                    utfall: Utfall.OPPFYLT,
                },
            ],
            graderingMotTilsyn: {
                pleiebehov: 100,
                etablertTilsyn: 0,
                andreSøkeresTilsyn: 0,
                tilgjengeligForSøker: 100,
            },
            knekkpunktTyper: [],
            kildeBehandlingUUID: 'a378b91c-37ab-4264-bad8-66eadddad1a8',
            annenPart: AnnenPart.MED_ANDRE,
        },
    },
};

export default uttaksperioderResponse;
