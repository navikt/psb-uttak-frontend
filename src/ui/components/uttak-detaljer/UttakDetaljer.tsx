import { EtikettAdvarsel } from 'nav-frontend-etiketter';
import * as React from 'react';
import { Uttaksperiode } from '../../../types/Uttaksperiode';
import styles from './uttakDetaljer.less';
import UttakUtregning from './UttakUtregning';
import Utbetalingsgrad from '../../../types/Utbetalingsgrad';

const formatUtbetalingsgrader = (utbetalingsgrader: Utbetalingsgrad[]) =>
    utbetalingsgrader.map((utbetalingsgrad) => (
        <p key={utbetalingsgrad.arbeidsforhold.organisasjonsnummer}>
            {`${utbetalingsgrad.arbeidsforhold.type}: ${utbetalingsgrad.utbetalingsgrad} %`}
        </p>
    ));

interface UttakDetaljerProps {
    uttak: Uttaksperiode;
}

const UttakDetaljer = ({ uttak }: UttakDetaljerProps): JSX.Element => {
    const { utbetalingsgrader } = uttak;
    return (
        <div className={styles.uttakDetaljer}>
            <EtikettAdvarsel className={styles.uttakDetaljer__etikett}>
                Årsak for avslag: Søker må ha minst 20 % tilgjengelig uttak.
            </EtikettAdvarsel>
            <EtikettAdvarsel className={styles.uttakDetaljer__etikett}>
                Årsak for avslag: Søker må ha minst 20 % tapt arbeidstid.
            </EtikettAdvarsel>
            <div className={styles.uttakDetaljer__grid}>
                <UttakUtregning heading="Gradering mot tilsyn">
                    <p>Data her...</p>
                </UttakUtregning>
                <UttakUtregning heading="Avkorting mot arbeid">
                    <p>Data her...</p>
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
