import classNames from 'classnames/bind';
import { EtikettAdvarsel } from 'nav-frontend-etiketter';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';
import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import IkkeOppfylteÅrsakerMedTekst from '../../../constants/IkkeOppfylteÅrsakerMedTekst';
import OverseEtablertTilsynÅrsak from '../../../constants/OverseEtablertTilsynÅrsak';
import Årsaker from '../../../constants/Årsaker';
import GraderingMotTilsyn from '../../../types/GraderingMotTilsyn';
import Utbetalingsgrad from '../../../types/Utbetalingsgrad';
import { Uttaksperiode } from '../../../types/Uttaksperiode';
import { beregnDagerTimer } from '../../../util/dateUtils';
import { harÅrsak } from '../../../util/årsakUtils';
import ContentWithTooltip from '../content-with-tooltip/ContentWithTooltip';
import GreenCheckIcon from '../icons/GreenCheckIcon';
import OnePersonIconBlue from '../icons/OnePersonIconBlue';
import OnePersonOutline from '../icons/OnePersonOutline';
import styles from './uttakDetaljer.less';
import UttakUtregning from './UttakUtregning';
import ContainerContext from '../../context/ContainerContext';
import ArbeidsgiverOpplysninger from '../../../types/ArbeidsgiverOpplysninger';

const cx = classNames.bind(styles);

const getÅrsaksetiketter = (årsaker: Årsaker[]) => {
    const funnedeÅrsaker = IkkeOppfylteÅrsakerMedTekst.filter((årsak) => harÅrsak(årsaker, årsak.årsak));
    return funnedeÅrsaker.map((årsak) => (
        <EtikettAdvarsel key={årsak.årsak} className={styles.uttakDetaljer__etikett}>
            {årsak.tekst}
        </EtikettAdvarsel>
    ));
};

const harBeredskapEllerNattevåkÅrsak = (overseEtablertTilsynÅrsak: OverseEtablertTilsynÅrsak) => {
    const beredskapEllerNattevåkÅrsaker = [
        OverseEtablertTilsynÅrsak.BEREDSKAP,
        OverseEtablertTilsynÅrsak.NATTEVÅK,
        OverseEtablertTilsynÅrsak.NATTEVÅK_OG_BEREDSKAP,
    ];
    return beredskapEllerNattevåkÅrsaker.some((årsak) => årsak === overseEtablertTilsynÅrsak);
};

const hentÅrsakstekst = (overseEtablertTilsynÅrsak: OverseEtablertTilsynÅrsak) => {
    if (overseEtablertTilsynÅrsak === OverseEtablertTilsynÅrsak.BEREDSKAP) {
        return 'Etablert tilsyn blir ikke medregnet på grunn av beredskap.';
    }
    if (overseEtablertTilsynÅrsak === OverseEtablertTilsynÅrsak.NATTEVÅK) {
        return 'Etablert tilsyn blir ikke medregnet på grunn av nattevåk.';
    }
    return 'Etablert tilsyn blir ikke medregnet på grunn av nattevåk og beredskap.';
};

const formatGraderingMotTilsyn = (graderingMotTilsyn: GraderingMotTilsyn, pleiebehov: number) => {
    const { etablertTilsyn, andreSøkeresTilsyn, tilgjengeligForSøker, overseEtablertTilsynÅrsak } = graderingMotTilsyn;

    const utnullingPåGrunnAvBeredskapEllerNattevåk =
        overseEtablertTilsynÅrsak && harBeredskapEllerNattevåkÅrsak(overseEtablertTilsynÅrsak);
    const beredskapEllerNattevåkÅrsakTekst = utnullingPåGrunnAvBeredskapEllerNattevåk
        ? hentÅrsakstekst(overseEtablertTilsynÅrsak)
        : '';

    return (
        <div className={styles.uttakDetaljer__graderingMotTilsyn}>
            <p className={styles.uttakDetaljer__data}>{`Pleiebehov: ${pleiebehov} %`}</p>
            <p className={styles.uttakDetaljer__data}>
                {`- Etablert tilsyn: `}
                {overseEtablertTilsynÅrsak ? (
                    <>
                        <span className={styles['uttakDetaljer__data--utnullet']}>{etablertTilsyn}%</span>
                        <Hjelpetekst
                            className={styles.uttakDetaljer__data__questionMark}
                            type={PopoverOrientering.Hoyre}
                        >
                            {utnullingPåGrunnAvBeredskapEllerNattevåk
                                ? beredskapEllerNattevåkÅrsakTekst
                                : 'Etablert tilsyn under 10 % blir ikke medregnet.'}
                        </Hjelpetekst>
                    </>
                ) : (
                    `${etablertTilsyn}%`
                )}
            </p>
            <p className={styles.uttakDetaljer__data}>{`- Andre søkeres tilsyn: ${andreSøkeresTilsyn} %`}</p>
            <hr className={styles.uttakDetaljer__separator} />
            <p className={styles.uttakDetaljer__sum}>{`= ${tilgjengeligForSøker} % tilgjengelig for søker`}</p>
        </div>
    );
};

const formatAvkortingMotArbeid = (
    utbetalingsgrader: Utbetalingsgrad[],
    søkersTapteArbeidstid: number,
    alleArbeidsforhold: Record<string, ArbeidsgiverOpplysninger>
) => (
    <div className={styles.uttakDetaljer__avkortingMotArbeid}>
        {utbetalingsgrader.map((utbetalingsgradItem, index) => {
            const { normalArbeidstid, faktiskArbeidstid, utbetalingsgrad, arbeidsforhold } = utbetalingsgradItem;
            const orgnr = arbeidsforhold?.organisasjonsnummer;
            const arbeidsgivernavn = alleArbeidsforhold[orgnr]?.navn || 'Arbeidsgiver';
            return (
                <div key={index}>
                    <Element
                        className={styles.uttakDetaljer__avkortingMotArbeid__heading}
                    >{`${arbeidsgivernavn}:`}</Element>
                    <p className={styles.uttakDetaljer__data}>
                        {`Normal arbeidstid: ${beregnDagerTimer(normalArbeidstid)} timer`}
                    </p>
                    <p className={styles.uttakDetaljer__data}>
                        {`Faktisk arbeidstid: ${beregnDagerTimer(faktiskArbeidstid)} timer`}
                    </p>
                    <p className={styles.uttakDetaljer__data}>{`Utbetalingsgrad: ${utbetalingsgrad} %`}</p>
                    <p className={styles.uttakDetaljer__sum}>{`Søkers inntektstap: ${søkersTapteArbeidstid} %`}</p>
                </div>
            );
        })}
    </div>
);

const shouldHighlight = (aktuellÅrsak: Årsaker, årsaker: Årsaker[]) => årsaker.some((årsak) => årsak === aktuellÅrsak);

const getSøkerBerOmMaksimalt = (søkerBerOmMaksimalt: number, årsaker: Årsaker[]) => {
    const highlightSøkerBerOmMaksimalt =
        søkerBerOmMaksimalt && shouldHighlight(Årsaker.AVKORTET_MOT_SØKERS_ØNSKE, årsaker);

    const containerCls = cx('uttakDetaljer__oppsummering__container', {
        'uttakDetaljer__oppsummering__container--highlighted': highlightSøkerBerOmMaksimalt,
    });

    return (
        <div className={containerCls}>
            {highlightSøkerBerOmMaksimalt && (
                <div className={styles.uttakDetaljer__oppsummering__checkIcon}>
                    <GreenCheckIcon size={19} />
                </div>
            )}
            <ContentWithTooltip tooltipText="Søker">
                <OnePersonIconBlue />
            </ContentWithTooltip>
            <p className={styles.uttakDetaljer__oppsummering__tekst}>
                {`Søker ber om maksimalt: ${søkerBerOmMaksimalt} %`}
            </p>
        </div>
    );
};

interface UttakDetaljerProps {
    uttak: Uttaksperiode;
}

const UttakDetaljer = ({ uttak }: UttakDetaljerProps): JSX.Element => {
    const { arbeidsforhold } = React.useContext(ContainerContext);
    const {
        utbetalingsgrader,
        uttaksgrad,
        graderingMotTilsyn,
        søkerBerOmMaksimalt,
        årsaker,
        søkersTapteArbeidstid,
        pleiebehov,
    } = uttak;

    const tilgjengeligForAndreSøkere = graderingMotTilsyn?.tilgjengeligForSøker
        ? graderingMotTilsyn.tilgjengeligForSøker - uttaksgrad
        : 0;

    return (
        <div className={styles.uttakDetaljer}>
            {getÅrsaksetiketter(årsaker)}
            <div className={styles.uttakDetaljer__oppsummering}>
                {søkerBerOmMaksimalt && getSøkerBerOmMaksimalt(søkerBerOmMaksimalt, årsaker)}
                <div className={styles.uttakDetaljer__oppsummering__container}>
                    <ContentWithTooltip tooltipText="Annen part">
                        <OnePersonOutline />
                    </ContentWithTooltip>
                    <p className={styles.uttakDetaljer__oppsummering__tekst}>
                        {`Tilgjengelig for andre søkere: ${tilgjengeligForAndreSøkere} %`}
                    </p>
                </div>
            </div>
            <div className={styles.uttakDetaljer__grid}>
                {graderingMotTilsyn && (
                    <UttakUtregning
                        heading="Gradering mot tilsyn"
                        highlight={shouldHighlight(Årsaker.GRADERT_MOT_TILSYN, årsaker)}
                    >
                        {formatGraderingMotTilsyn(graderingMotTilsyn, pleiebehov)}
                    </UttakUtregning>
                )}
                <UttakUtregning
                    heading="Avkorting mot arbeid"
                    highlight={shouldHighlight(Årsaker.AVKORTET_MOT_INNTEKT, årsaker)}
                >
                    {formatAvkortingMotArbeid(utbetalingsgrader, søkersTapteArbeidstid, arbeidsforhold)}
                </UttakUtregning>
            </div>
        </div>
    );
};
export default UttakDetaljer;
