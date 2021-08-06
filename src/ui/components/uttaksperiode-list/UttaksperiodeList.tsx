import React from 'react';
import { Uttaksperiode } from '../../../types/Uttaksperiode';
import Table from '../table/Table';
import TableColumn from '../table/TableColumn';
import styles from './uttaksperiodeList.less';
import Uttak from '../uttak/Uttak';

interface UttaksperiodeListProps {
    uttaksperioder: Uttaksperiode[];
}

const headers = ['Uttaksperiode', 'Inngangsvilkår', 'Pleiebehov', 'Parter', 'Søkers uttaksgrad'];

const UttaksperiodeList = (props: UttaksperiodeListProps): JSX.Element => {
    const [currentPeriodIndex, selectPeriodIndex] = React.useState<number>();
    const { uttaksperioder } = props;

    const selectPeriod = (index: number) => {
        if (currentPeriodIndex === index) {
            selectPeriodIndex(null);
        } else {
            selectPeriodIndex(index);
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
                        isSelected={currentPeriodIndex === index}
                        selectPeriod={() => selectPeriod(index)}
                    />
                ))}
            </Table>
        </div>
    );
};

export default UttaksperiodeList;
