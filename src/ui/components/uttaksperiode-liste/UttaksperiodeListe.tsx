import React from 'react';
import { Uttaksperiode } from '../../../types/Uttaksperiode';
import Table from '../table/Table';
import TableColumn from '../table/TableColumn';
import styles from './uttaksperiodeListe.less';
import Uttak from '../uttak/Uttak';

interface UttaksperiodeListeProps {
    uttaksperioder: Uttaksperiode[];
}

const headers = ['Uttaksperiode', 'Inngangsvilkår', 'Pleiebehov', 'Parter', 'Søkers uttaksgrad'];

const UttaksperiodeListe = (props: UttaksperiodeListeProps): JSX.Element => {
    const [valgtPeriodeIndex, velgPeriodeIndex] = React.useState<number>();
    const { uttaksperioder } = props;

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
                        {headers.map((header) => (
                            <TableColumn key={header} className={styles.headerColumn}>
                                {header}
                            </TableColumn>
                        ))}
                        <TableColumn className={styles.headerColumn} />
                    </>
                }
            >
                {uttaksperioder.map((uttak, index) => {
                    return (
                        <Uttak
                            key={index}
                            uttak={uttak}
                            erValgt={valgtPeriodeIndex === index}
                            velgPeriode={() => velgPeriode(index)}
                        />
                    );
                })}
            </Table>
        </div>
    );
};

export default UttaksperiodeListe;
