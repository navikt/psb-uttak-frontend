import { EtikettAdvarsel } from 'nav-frontend-etiketter';
import * as React from 'react';
import { Uttaksperiode } from '../../../types/Uttaksperiode';
import styles from './uttakDetaljer.less';
import UttakUtregning from './UttakUtregning';
import Utbetalingsgrad from '../../../types/Utbetalingsgrad';
import GraderingMotTilsyn from '../../../types/GraderingMotTilsyn';
import { Element } from 'nav-frontend-typografi';
import { beregnDagerTimer } from '../../../util/dateUtils';

const formatUtbetalingsgrader = (utbetalingsgrader: Utbetalingsgrad[]) =>
    utbetalingsgrader.map((utbetalingsgrad) => (
        <p key={utbetalingsgrad.arbeidsforhold.organisasjonsnummer}>
            {`${utbetalingsgrad.arbeidsforhold.type}: ${utbetalingsgrad.utbetalingsgrad} %`}
        </p>
    ));

const getAvslagsetiketter = (uttaksgrad: number) => {
    const harUtilstrekkeligUttak = uttaksgrad < 20;
    const harUtilstrekkeligTaptArbeidstid = 1 < 20; // TODO

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
            <p className={styles.uttakDetaljer__data}>{`Pleiebehov: ${pleiebehov}%`}</p>
            <p className={styles.uttakDetaljer__data}>{`- Etablert tilsyn: ${etablertTilsyn}%`}</p>
            <p className={styles.uttakDetaljer__data}>{`- Andre søkeres tilsyn: ${andreSøkeresTilsyn}%`}</p>
            <hr />
            <p>{`= ${tilgjengeligForSøker}% tilgjengelig for søker`}</p>
        </div>
    );
};

const formatAvkortingMotArbeid = (utbetalingsgrader: Utbetalingsgrad[]) => {
    return (
        <div className={styles.uttakDetaljer__avkortingMotArbeid}>
            {utbetalingsgrader.map((utbetalingsgrad, index) => (
                <div>
                    <Element className={styles.uttakDetaljer__avkortingMotArbeid__heading}>
                        {`Arbeidsgiver ${index + 1}`}
                    </Element>
                    <p className={styles.uttakDetaljer__data}>
                        {`Normal arbeidstid: ${beregnDagerTimer(utbetalingsgrad.normalArbeidstid)} timer`}
                    </p>
                    <p className={styles.uttakDetaljer__data}>
                        {`Faktisk arbeidstid: ${beregnDagerTimer(utbetalingsgrad.faktiskArbeidstid)} timer`}
                    </p>
                    <p className={styles.uttakDetaljer__avkortingMotArbeid__inntektstap}>Søker inntektstap: 50%</p>
                </div>
            ))}
        </div>
    );
};

interface UttakDetaljerProps {
    uttak: Uttaksperiode;
}

const UttakDetaljer = ({ uttak }: UttakDetaljerProps): JSX.Element => {
    const { utbetalingsgrader, uttaksgrad, graderingMotTilsyn } = uttak;

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
                    <p>Data her...</p>
                </UttakUtregning>
            </div>
        </div>
    );
};
export default UttakDetaljer;
