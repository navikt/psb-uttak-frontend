import Årsaker from './Årsaker';

const IkkeOppfylteÅrsakerMedTekst = [
    {
        årsak: Årsaker.LOVBESTEMT_FERIE,
        tekst: 'Årsak for 0 % uttak: Søker avvikler lovbestemt ferie',
    },
    {
        årsak: Årsaker.FOR_LAV_REST_PGA_ETABLERT_TILSYN,
        tekst: 'Årsak for 0 % uttaksgrad: Barnet er i tilsynsordning mer enn 80 %',
    },
    {
        årsak: Årsaker.FOR_LAV_REST_PGA_ANDRE_SØKERE,
        tekst: 'Årsak for 0 % uttaksgrad: Mindre enn 20 % pleiepenger tilgjengelig grunnet annen søkers uttak',
    },
    {
        årsak: Årsaker.FOR_LAV_REST_PGA_ETABLERT_TILSYN_OG_ANDRE_SØKERE,
        tekst:
            'Årsak for 0 % uttaksgrad: Mindre enn 20 % pleiepenger tilgjengelig grunnet annen søkers uttak og tid i tilsynsordning',
    },
    {
        årsak: Årsaker.FOR_LAV_TAPT_ARBEIDSTID,
        tekst: 'Årsak for 0 % uttaksgrad: Tapt arbeidstid må være minst 20 %',
    },
    {
        årsak: Årsaker.FOR_LAV_ØNSKET_UTTAKSGRAD,
        tekst: 'Årsak for 0 % uttaksgrad: Uttaksgrad må være minst 20 %',
    },
];

export default IkkeOppfylteÅrsakerMedTekst;
