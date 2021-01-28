export default {
    perioder: {
        '2024-01-01/2024-01-31': {
            utfall: 'INNVILGET',
            uttaksgrad: 100,
            utbetalingsgrader: [
                {
                    arbeidsforhold: {
                        type: 'arbeidsgiver',
                        organisasjonsnummer: 'HER_ER_ORGNUMMERET',
                        aktørId: null,
                        arbeidsforholdId: null,
                    },
                    utbetalingsgrad: 100,
                },
            ],
            årsak: ['FULL_DEKNING'],
            knekkpunktTyper: [],
            kildeBehandlingUUID: 'HER_ER_BEHANDLINGSIDEN',
        },
        '2024-06-01/2024-06-15': {
            utfall: 'INNVILGET',
            uttaksgrad: 50,
            utbetalingsgrader: [
                {
                    arbeidsforhold: {
                        type: 'arbeidsgiver',
                        organisasjonsnummer: 'HER_ER_ORGNUMMERET',
                        aktørId: null,
                        arbeidsforholdId: null,
                    },
                    utbetalingsgrad: 100,
                },
            ],
            årsak: ['FULL_DEKNING'],
            knekkpunktTyper: [],
            kildeBehandlingUUID: 'HER_ER_BEHANDLINGSIDEN',
        },
    },
};
