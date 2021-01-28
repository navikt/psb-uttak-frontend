import * as React from 'react';
import uttaksperiodeMock from '../mock/uttaksperiodeMock';
import TableColumn from './components/table/TableColumn';
import Table from './components/table/Table';
import Uttak from './components/uttak/Uttak';
import styles from './main.less';

export const UtfallEnum = {
    INNVILGET: 'INNVILGET',
    AVSLÅTT: 'AVSLÅTT',
    UAVKLART: 'UAVKLART',
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
                {uttaksperiodeMock.map((uttak, index) => {
                    return (
                        <Uttak
                            key={uttak.periode}
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

export default MainComponent;
