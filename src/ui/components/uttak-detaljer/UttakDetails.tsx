import { ContentWithTooltip, GreenCheckIcon, OnePersonIconBlue } from '@navikt/k9-react-components';
import classNames from 'classnames/bind';
import { EtikettAdvarsel } from 'nav-frontend-etiketter';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import { PopoverOrientering } from 'nav-frontend-popover';
import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import BarnetsDødsfallÅrsakerMedTekst from '../../../constants/BarnetsDødsfallÅrsakerMedTekst';
import IkkeOppfylteÅrsakerMedTekst from '../../../constants/IkkeOppfylteÅrsakerMedTekst';
import OverseEtablertTilsynÅrsak from '../../../constants/OverseEtablertTilsynÅrsak';
import Årsaker from '../../../constants/Årsaker';
import ArbeidsgiverOpplysninger from '../../../types/ArbeidsgiverOpplysninger';
import GraderingMotTilsyn from '../../../types/GraderingMotTilsyn';
import Utbetalingsgrad from '../../../types/Utbetalingsgrad';
import { Uttaksperiode } from '../../../types/Uttaksperiode';
import { calculateDaysHours } from '../../../util/dateUtils';
import { hasÅrsak } from '../../../util/årsakUtils';
import ContainerContext from '../../context/ContainerContext';
import styles from './uttakDetails.less';
import UttakUtregning from './UttakUtregning';

const cx = classNames.bind(styles);

const getÅrsaksetiketter = (årsaker: Årsaker[]) => {
    const funnedeÅrsaker = IkkeOppfylteÅrsakerMedTekst.filter((årsak) => hasÅrsak(årsaker, årsak.årsak));
    return funnedeÅrsaker.map((årsak) => (
        <EtikettAdvarsel key={årsak.årsak} className={styles.uttakDetaljer__etikett}>
            {årsak.tekst}
        </EtikettAdvarsel>
    ));
};

const getTekstVedBarnetsDødsfall = (årsaker: Årsaker[]) => {
    const funnedeÅrsaker = BarnetsDødsfallÅrsakerMedTekst.filter((årsak) => hasÅrsak(årsaker, årsak.årsak));
    return funnedeÅrsaker.map((årsak) => (
        <div key={årsak.årsak} className={styles.uttakDetaljer__etikettBarnetsDødsfall}>
            {årsak.tekst}
        </div>
    ));
};

const hasBeredskapEllerNattevåkÅrsak = (overseEtablertTilsynÅrsak: OverseEtablertTilsynÅrsak) => {
    const beredskapEllerNattevåkÅrsaker = [
        OverseEtablertTilsynÅrsak.BEREDSKAP,
        OverseEtablertTilsynÅrsak.NATTEVÅK,
        OverseEtablertTilsynÅrsak.NATTEVÅK_OG_BEREDSKAP,
    ];
    return beredskapEllerNattevåkÅrsaker.some((årsak) => årsak === overseEtablertTilsynÅrsak);
};

const getÅrsakstekst = (overseEtablertTilsynÅrsak: OverseEtablertTilsynÅrsak, etablertTilsyn: number) => {
    if (overseEtablertTilsynÅrsak === OverseEtablertTilsynÅrsak.BEREDSKAP) {
        return `Etablert tilsyn på ${etablertTilsyn} % blir ikke medregnet på grunn av beredskap.`;
    }
    if (overseEtablertTilsynÅrsak === OverseEtablertTilsynÅrsak.NATTEVÅK) {
        return `Etablert tilsyn på ${etablertTilsyn} % blir ikke medregnet på grunn av nattevåk.`;
    }
    return `Etablert tilsyn på ${etablertTilsyn} % blir ikke medregnet på grunn av nattevåk og beredskap.`;
};

const formatGraderingMotTilsyn = (graderingMotTilsyn: GraderingMotTilsyn, pleiebehov: number) => {
    const { etablertTilsyn, andreSøkeresTilsyn, tilgjengeligForSøker, overseEtablertTilsynÅrsak } = graderingMotTilsyn;

    const utnullingPåGrunnAvBeredskapEllerNattevåk =
        overseEtablertTilsynÅrsak && hasBeredskapEllerNattevåkÅrsak(overseEtablertTilsynÅrsak);
    const beredskapEllerNattevåkÅrsakTekst = utnullingPåGrunnAvBeredskapEllerNattevåk
        ? getÅrsakstekst(overseEtablertTilsynÅrsak, etablertTilsyn)
        : '';

    return (
        <div className={styles.uttakDetaljer__graderingMotTilsyn}>
            <p className={styles.uttakDetaljer__data}>{`Pleiebehov: ${pleiebehov} %`}</p>
            <p className={styles.uttakDetaljer__data}>
                {`- Etablert tilsyn: `}
                {overseEtablertTilsynÅrsak ? (
                    <>
                        <span className={styles['uttakDetaljer__data--utnullet']}>{etablertTilsyn} %</span>
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
                    `${etablertTilsyn} %`
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
    <>
        <div className={styles.uttakDetaljer__avkortingMotArbeid}>
            {utbetalingsgrader.map((utbetalingsgradItem, index) => {
                const { normalArbeidstid, faktiskArbeidstid, utbetalingsgrad, arbeidsforhold } = utbetalingsgradItem;
                const orgnr = arbeidsforhold?.organisasjonsnummer;
                const arbeidsgivernavn = alleArbeidsforhold[orgnr]?.navn || 'Arbeidsgiver';
                return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={index}>
                        <Element
                            className={styles.uttakDetaljer__avkortingMotArbeid__heading}
                        >{`${arbeidsgivernavn}:`}</Element>
                        <p className={styles.uttakDetaljer__data}>
                            {`Normal arbeidstid: ${calculateDaysHours(normalArbeidstid)} timer`}
                        </p>
                        <p className={styles.uttakDetaljer__data}>
                            {`Faktisk arbeidstid: ${calculateDaysHours(faktiskArbeidstid)} timer`}
                        </p>
                        <p className={styles.uttakDetaljer__data}>{`Utbetalingsgrad: ${utbetalingsgrad} %`}</p>
                    </div>
                );
            })}
        </div>
        <hr />
        <p className={styles.uttakDetaljer__sum}>{`= ${søkersTapteArbeidstid} % totalt inntektstap`}</p>
    </>
);

const shouldHighlight = (aktuellÅrsak: Årsaker, årsaker: Årsaker[]) => årsaker.some((årsak) => årsak === aktuellÅrsak);
const hasBarnetsDødsfallÅrsak = (årsaker: Årsaker[]) =>
    BarnetsDødsfallÅrsakerMedTekst.some((barnetsDødsfallÅrsak) => hasÅrsak(årsaker, barnetsDødsfallÅrsak.årsak));

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

const UttakDetails = ({ uttak }: UttakDetaljerProps): JSX.Element => {
    const { arbeidsforhold } = React.useContext(ContainerContext);
    const { utbetalingsgrader, graderingMotTilsyn, søkerBerOmMaksimalt, årsaker, søkersTapteArbeidstid, pleiebehov } =
        uttak;

    return (
        <div className={styles.uttakDetaljer}>
            {getÅrsaksetiketter(årsaker)}
            {getTekstVedBarnetsDødsfall(årsaker)}
            <div className={styles.uttakDetaljer__oppsummering}>
                {søkerBerOmMaksimalt && getSøkerBerOmMaksimalt(søkerBerOmMaksimalt, årsaker)}
            </div>
            <div className={styles.uttakDetaljer__grid}>
                {graderingMotTilsyn && (
                    <UttakUtregning
                        heading="Gradering mot tilsyn"
                        highlight={shouldHighlight(Årsaker.GRADERT_MOT_TILSYN, årsaker)}
                        headingPostContent={() =>
                            hasBarnetsDødsfallÅrsak(årsaker) && (
                                <Hjelpetekst
                                    className={styles.uttakDetaljer__data__questionMark}
                                    type={PopoverOrientering.Hoyre}
                                >
                                    Gradering mot tilsyn blir ikke medregnet på grunn av barnets dødsfall.
                                </Hjelpetekst>
                            )
                        }
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
export default UttakDetails;
