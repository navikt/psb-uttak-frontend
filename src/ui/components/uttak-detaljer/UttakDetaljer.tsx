import { EtikettAdvarsel } from 'nav-frontend-etiketter';
import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import GraderingMotTilsyn from '../../../types/GraderingMotTilsyn';
import Utbetalingsgrad from '../../../types/Utbetalingsgrad';
import { Uttaksperiode } from '../../../types/Uttaksperiode';
import { beregnDagerTimer } from '../../../util/dateUtils';
import styles from './uttakDetaljer.less';
import UttakUtregning from './UttakUtregning';

const formatUtbetalingsgrader = (utbetalingsgrader: Utbetalingsgrad[]) =>
    utbetalingsgrader.map((utbetalingsgrad, index) => (
        <p className={styles.uttakDetaljer__data} key={index}>
            {`Arbeidsgiver ${index + 1}: ${utbetalingsgrad.utbetalingsgrad} %`}
        </p>
    ));

const getAvslagsetiketter = (uttaksgrad: number) => {
    const harUtilstrekkeligUttak = uttaksgrad < 20;
    const harUtilstrekkeligTaptArbeidstid = 100 < 20; // TODO

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

const formatAvkortingMotArbeid = (utbetalingsgrader: Utbetalingsgrad[]) => {
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
                    <p className={styles.uttakDetaljer__sum}>Søker inntektstap: 50 %</p>
                </div>
            ))}
        </div>
    );
};

const formatOppsummering = (søkerBerOmMaksimalt: number, uttaksgrad: number) => {
    return (
        <>
            {søkerBerOmMaksimalt && (
                <p className={styles.uttakDetaljer__data}>{`Søker ber om maksimalt: ${søkerBerOmMaksimalt} %`}</p>
            )}
            <p className={styles.uttakDetaljer__data}>{`Søker får: ${uttaksgrad} %`}</p>
        </>
    );
};

interface UttakDetaljerProps {
    uttak: Uttaksperiode;
}

const UttakDetaljer = ({ uttak }: UttakDetaljerProps): JSX.Element => {
    const { utbetalingsgrader, uttaksgrad, graderingMotTilsyn, søkerBerOmMaksimalt } = uttak;

    return (
        <div className={styles.uttakDetaljer}>
            {getAvslagsetiketter(uttaksgrad)}
            <div className={styles.uttakDetaljer__grid}>
                <UttakUtregning heading="Gradering mot tilsyn" highlight>
                    {formatGraderingMotTilsyn(graderingMotTilsyn)}
                </UttakUtregning>
                <UttakUtregning heading="Avkorting mot arbeid">
                    {formatAvkortingMotArbeid(utbetalingsgrader)}
                </UttakUtregning>
                <UttakUtregning heading="Utbetalingsgrad">{formatUtbetalingsgrader(utbetalingsgrader)}</UttakUtregning>
                <UttakUtregning heading="Oppsummering">
                    {formatOppsummering(søkerBerOmMaksimalt, uttaksgrad)}
                </UttakUtregning>
            </div>
        </div>
    );
};
export default UttakDetaljer;
