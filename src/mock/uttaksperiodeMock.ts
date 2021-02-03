import UttaksperioderResponse from '../types/UttaksperioderResponse';

const uttaksperioderResponse: UttaksperioderResponse = {
    perioder: {
        '2020-01-01/2020-01-04': {
            utfall: 'INNVILGET',
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
            årsak: ['FULL_DEKNING'],
            graderingMotTilsyn: {
                pleiebehov: 100,
                etablertTilsyn: 0,
                andreSøkeresTilsyn: 0,
                tilgjengeligForSøker: 100,
            },
            knekkpunktTyper: [],
            kildeBehandlingUUID: 'BEHANDLINGSID HER',
        },
        '2020-01-05/2020-01-15': {
            utfall: 'AVSLÅTT',
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
            årsak: ['FULL_DEKNING'],
            graderingMotTilsyn: {
                pleiebehov: 100,
                etablertTilsyn: 0,
                andreSøkeresTilsyn: 0,
                tilgjengeligForSøker: 100,
            },
            knekkpunktTyper: [],
            kildeBehandlingUUID: 'BEHANDLINGSID HER',
        },
    },
};

export default uttaksperioderResponse;
