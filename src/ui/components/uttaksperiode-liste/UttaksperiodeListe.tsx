import React from 'react';
import { Uttaksperiode } from '../../../types/Uttaksperiode';
import Table from '../table/Table';
import TableColumn from '../table/TableColumn';
import styles from './uttaksperiodeListe.css';
import Uttak from '../uttak/Uttak';
import ContainerContext from '../../context/ContainerContext';

interface UttaksperiodeListeProps {
    uttaksperioder: Uttaksperiode[];
}

const UttaksperiodeListe = (props: UttaksperiodeListeProps): JSX.Element => {
    const [valgtPeriodeIndex, velgPeriodeIndex] = React.useState<number>();
    const { erFagytelsetypeLivetsSluttfase } = React.useContext(ContainerContext);
    const { uttaksperioder } = props;

    const headers = erFagytelsetypeLivetsSluttfase
        ? ['Uttaksperiode', 'Inngangsvilkår', 'Pleie i hjemmet', 'Pleiebehov', 'Parter', 'Søkers uttaksgrad']
        : ['Uttaksperiode', 'Inngangsvilkår', 'Pleiebehov', 'Parter', 'Søkers uttaksgrad'];

    const velgPeriode = (index: number) => {
        if (valgtPeriodeIndex === index) {
            velgPeriodeIndex(null);
        } else {
            velgPeriodeIndex(index);
        }
    };
    return (
        <div style={{ maxWidth: '961px' }}>
            <Table
                suppliedHeaders={
                    <>
                        {headers.map((header, index) => (
                            <TableColumn
                                key={header}
                                className={styles.headerColumn}
                                colSpan={headers.length - 1 === index ? 2 : 1}
                            >
                                {header}
                            </TableColumn>
                        ))}
                    </>
                }
            >
                {uttaksperioder.map((uttak, index) => (
                    <Uttak
                        key={uttak.periode.prettifyPeriod()}
                        uttak={uttak}
                        erValgt={valgtPeriodeIndex === index}
                        velgPeriode={() => velgPeriode(index)}
                    />
                ))}
            </Table>
        </div>
    );
};

export default UttaksperiodeListe;
