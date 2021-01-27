import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { Collapse } from 'react-collapse';
import uttaksperiodeMock from '../mock/uttaksperiodeMock';
import ChevronIcon from './components/icons/ChevronIcon';
import { TableColumn } from './components/table';
import FullWidthRow from './components/table/FullWidthRow';
import Table from './components/table/Table';
import TableRow from './components/table/TableRow';
import { prettifyDate } from '../util/dateUtils';
import styles from './main.less';

export const UtfallEnum = {
    INNVILGET: 'INNVILGET',
    AVSLÅTT: 'AVSLÅTT',
    UAVKLART: 'UAVKLART',
};

const periodevisning = (periode: string): string => {
    const [fom, tom] = periode.split('/');
    return `${prettifyDate(fom)} - ${prettifyDate(tom)}`;
};

const MainComponent = (): JSX.Element => {
    const [valgtPeriodeIndex, velgPeriodeIndex] = React.useState<number>();

    const velgPeriode = (index: number) => {
        if (valgtPeriodeIndex === index) {
            velgPeriodeIndex(null);
        } else {
            velgPeriodeIndex(index);
        }
    };
    const headers = ['Uttaksperiode', 'Inngangsvilkår', 'Pleiebehov', 'Parter', 'Søkers uttaksgrad'];
    return (
        <div>
            <Table
                suppliedHeaders={
                    <>
                        {headers.map((header) => (
                            <TableColumn key={header} className={styles.headerColumn}>
                                {header}
                            </TableColumn>
                        ))}
                        <TableColumn className={styles.headerColumn} />
                    </>
                }
            >
                {uttaksperiodeMock.map(({ periode, antallPersoner, mottaker, uttaksgrad, utfall }, index) => {
                    const erValgt = valgtPeriodeIndex === index;

                    return (
                        <>
                            <TableRow key={periode} utfall={utfall}>
                                <TableColumn>
                                    <Normaltekst>{periodevisning(periode)}</Normaltekst>
                                </TableColumn>
                                <TableColumn>{utfall}</TableColumn>
                                <TableColumn>{antallPersoner}</TableColumn>
                                <TableColumn>
                                    <>{mottaker}</>
                                </TableColumn>

                                <TableColumn>
                                    <>{`${uttaksgrad}% uttaksgrad`}</>
                                </TableColumn>
                                <TableColumn>
                                    <button
                                        onClick={() => velgPeriode(index)}
                                        type="button"
                                        className={`${styles.expandButton} ${
                                            erValgt && styles['expandButton--expanded']
                                        }`}
                                        aria-label={erValgt ? 'Lukk' : 'Åpne'}
                                        aria-expanded={erValgt}
                                    >
                                        <ChevronIcon />
                                    </button>
                                </TableColumn>
                            </TableRow>
                            <FullWidthRow>
                                <Collapse isOpened={erValgt}>
                                    <div className={styles.expanded}>
                                        <div className={styles.expanded__column}>
                                            <Element className={styles.expanded__heading}>Gradering mot tilsyn</Element>
                                            <div className={styles.expanded__content}>
                                                <p>100 % - 40 % tilsyn = 60 % pleiepenger </p>
                                                <p>Antall timer tilsynsordning?</p>
                                            </div>
                                        </div>
                                        <div className={styles.expanded__column}>
                                            <Element className={styles.expanded__heading}>Avkorting mot arbeid</Element>
                                            <div className={styles.expanded__content}>
                                                <p>Arbeidsgiver 1: jobber 27 %</p>
                                                <p>Arbeidsgiver 2: jobber 30 %</p>
                                                <p>100 % - 57 % arbeid = 43 % pleiepenger</p>
                                            </div>
                                        </div>
                                    </div>
                                </Collapse>
                            </FullWidthRow>
                        </>
                    );
                })}
            </Table>
        </div>
    );
};

export default MainComponent;
