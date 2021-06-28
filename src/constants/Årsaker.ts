enum Årsaker {
    // Oppfylt årsaker
    GRADERT_MOT_TILSYN = 'GRADERT_MOT_TILSYN',
    AVKORTET_MOT_INNTEKT = 'AVKORTET_MOT_INNTEKT',
    AVKORTET_MOT_SØKERS_ØNSKE = 'AVKORTET_MOT_SØKERS_ØNSKE',
    OPPFYLT_PGA_BARNETS_DØDSFALL = 'OPPFYLT_PGA_BARNETS_DØDSFALL',
    OPPFYLT_PGA_BARNETS_DØDSFALL_6_UKER = 'OPPFYLT_PGA_BARNETS_DØDSFALL_6_UKER',
    OPPFYLT_PGA_BARNETS_DØDSFALL_12_UKER = 'OPPFYLT_PGA_BARNETS_DØDSFALL_12_UKER',
    FULL_DEKNING = 'FULL_DEKNING',

    // Ikke oppfylt årsaker
    UTENOM_PLEIEBEHOV = 'UTENOM_PLEIEBEHOV',
    FOR_LAV_REST_PGA_ETABLERT_TILSYN = 'FOR_LAV_REST_PGA_ETABLERT_TILSYN',
    FOR_LAV_REST_PGA_ANDRE_SØKERE = 'FOR_LAV_REST_PGA_ANDRE_SØKERE',
    FOR_LAV_REST_PGA_ETABLERT_TILSYN_OG_ANDRE_SØKERE = 'FOR_LAV_REST_PGA_ETABLERT_TILSYN_OG_ANDRE_SØKERE',
    FOR_LAV_TAPT_ARBEIDSTID = 'FOR_LAV_TAPT_ARBEIDSTID',
    FOR_LAV_ØNSKET_UTTAKSGRAD = 'FOR_LAV_ØNSKET_UTTAKSGRAD',
    LOVBESTEMT_FERIE = 'LOVBESTEMT_FERIE',
    BARNETS_DØDSFALL = 'BARNETS_DØDSFALL',
    INNGANGSVILKÅR_IKKE_OPPFYLT = 'INNGANGSVILKÅR_IKKE_OPPFYLT',
}

export default Årsaker;
