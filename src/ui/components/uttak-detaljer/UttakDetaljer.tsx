import classNames from 'classnames/bind';
import { EtikettAdvarsel } from 'nav-frontend-etiketter';
import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import Årsaker from '../../../constants/Årsaker';
import GraderingMotTilsyn from '../../../types/GraderingMotTilsyn';
import Utbetalingsgrad from '../../../types/Utbetalingsgrad';
import { Uttaksperiode } from '../../../types/Uttaksperiode';
import { beregnDagerTimer } from '../../../util/dateUtils';
import Box, { Margin } from '../box/Box';
import GreenCheckIcon from '../icons/GreenCheckIcon';
import OnePersonIconBlue from '../icons/OnePersonIconBlue';
import OnePersonOutline from '../icons/OnePersonOutline';
import styles from './uttakDetaljer.less';
import UttakUtregning from './UttakUtregning';

const cx = classNames.bind(styles);

const getAvslagsetiketter = (uttaksgrad: number, søkersTapteArbeidstid: number) => {
    const harUtilstrekkeligUttak = uttaksgrad < 20;
    const harUtilstrekkeligTaptArbeidstid = søkersTapteArbeidstid < 20;

    return (
        <>
            {harUtilstrekkeligUttak && (
                <EtikettAdvarsel className={styles.uttakDetaljer__etikett}>
                    Årsak for avslag: Søker må ha minst 20 % tilgjengelig uttak.
                </EtikettAdvarsel>
            )}
            {harUtilstrekkeligTaptArbeidstid && (
                <EtikettAdvarsel className={styles.uttakDetaljer__etikett}>
                    Årsak for avslag: Søker må ha minst 20 % tapt arbeidstid.
                </EtikettAdvarsel>
            )}
        </>
    );
};

const formatGraderingMotTilsyn = (graderingMotTilsyn: GraderingMotTilsyn) => {
    const { pleiebehov, etablertTilsyn, andreSøkeresTilsyn, tilgjengeligForSøker } = graderingMotTilsyn;
    return (
        <div className={styles.uttakDetaljer__graderingMotTilsyn}>
            <p className={styles.uttakDetaljer__data}>{`Pleiebehov: ${pleiebehov} %`}</p>
            <p className={styles.uttakDetaljer__data}>{`- Etablert tilsyn: ${etablertTilsyn} %`}</p>
            <p className={styles.uttakDetaljer__data}>{`- Andre søkeres tilsyn: ${andreSøkeresTilsyn} %`}</p>
            <hr className={styles.uttakDetaljer__separator} />
            <p className={styles.uttakDetaljer__sum}>{`= ${tilgjengeligForSøker} % tilgjengelig for søker`}</p>
        </div>
    );
};

const formatAvkortingMotArbeid = (utbetalingsgrader: Utbetalingsgrad[], søkersTapteArbeidstid: number) => {
    return (
        <div className={styles.uttakDetaljer__avkortingMotArbeid}>
            {utbetalingsgrader.map((utbetalingsgrad, index) => (
                <div key={index}>
                    <Element className={styles.uttakDetaljer__avkortingMotArbeid__heading}>
                        {`Arbeidsgiver ${index + 1}:`}
                    </Element>
                    <p className={styles.uttakDetaljer__data}>
                        {`Normal arbeidstid: ${beregnDagerTimer(utbetalingsgrad.normalArbeidstid)} timer`}
                    </p>
                    <p className={styles.uttakDetaljer__data}>
                        {`Faktisk arbeidstid: ${beregnDagerTimer(utbetalingsgrad.faktiskArbeidstid)} timer`}
                    </p>
                    <p className={styles.uttakDetaljer__data}>
                        {`Utbetalingsgrad: ${utbetalingsgrad.utbetalingsgrad} %`}
                    </p>
                    <p className={styles.uttakDetaljer__sum}>{`Søkers inntektstap: ${søkersTapteArbeidstid} %`}</p>
                </div>
            ))}
        </div>
    );
};

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
            <OnePersonIconBlue />
            <p className={styles.uttakDetaljer__oppsummering__tekst}>
                {`Søker ber om maksimalt ${søkerBerOmMaksimalt} %`}
            </p>
        </div>
    );
};

interface UttakDetaljerProps {
    uttak: Uttaksperiode;
}

const UttakDetaljer = ({ uttak }: UttakDetaljerProps): JSX.Element => {
    const {
        utbetalingsgrader,
        uttaksgrad,
        graderingMotTilsyn,
        søkerBerOmMaksimalt,
        årsaker,
        søkersTapteArbeidstid,
    } = uttak;

    const tilgjengeligForAndreSøkere = graderingMotTilsyn?.tilgjengeligForSøker
        ? graderingMotTilsyn.tilgjengeligForSøker - uttaksgrad
        : 0;

    return (
        <div className={styles.uttakDetaljer}>
            {getAvslagsetiketter(uttaksgrad, søkersTapteArbeidstid)}
            <Box marginTop={Margin.small}>
                <div className={styles.uttakDetaljer__oppsummering}>
                    {søkerBerOmMaksimalt && getSøkerBerOmMaksimalt(søkerBerOmMaksimalt, årsaker)}
                    <div className={styles.uttakDetaljer__oppsummering__container}>
                        <OnePersonOutline />
                        <p className={styles.uttakDetaljer__oppsummering__tekst}>
                            {`Tilgjengelig for andre søkere ${tilgjengeligForAndreSøkere} %`}
                        </p>
                    </div>
                </div>
            </Box>
            <Box marginTop={Margin.medium}>
                <div className={styles.uttakDetaljer__grid}>
                    {graderingMotTilsyn && (
                        <UttakUtregning
                            heading="Gradering mot tilsyn"
                            highlight={shouldHighlight(Årsaker.GRADERT_MOT_TILSYN, årsaker)}
                        >
                            {formatGraderingMotTilsyn(graderingMotTilsyn)}
                        </UttakUtregning>
                    )}
                    <UttakUtregning
                        heading="Avkorting mot arbeid"
                        highlight={shouldHighlight(Årsaker.AVKORTET_MOT_INNTEKT, årsaker)}
                    >
                        {formatAvkortingMotArbeid(utbetalingsgrader, søkersTapteArbeidstid)}
                    </UttakUtregning>
                </div>
            </Box>
        </div>
    );
};
export default UttakDetaljer;
