import React from 'react';
import { Uttaksperiode } from '../../../types/Uttaksperiode';
import Table from '../table/Table';
import TableColumn from '../table/TableColumn';
import styles from './uttaksperiodeListe.less';
import Uttak from '../uttak/Uttak';
import AvvikIMType from '../../../constants/AvvikIMType';

interface UttaksperiodeListeProps {
    uttaksperioder: Uttaksperiode[];
}


const UttaksperiodeListe = (props: UttaksperiodeListeProps): JSX.Element => {
    const [valgtPeriodeIndex, velgPeriodeIndex] = React.useState<number>();
    const { uttaksperioder } = props;
    const skalViseAvvik = uttaksperioder.find(uttaksperiode => uttaksperiode.avvikImSøknad &&
        (uttaksperiode.avvikImSøknad === AvvikIMType.SØKNAD_UTEN_MATCHENDE_IM || uttaksperiode.avvikImSøknad === AvvikIMType.IM_REFUSJONSKRAV_TRUMFER_SØKNAD),
    );

    const headers = skalViseAvvik
        ? ['Uttaksperiode', 'Inngangsvilkår', 'Pleiebehov', 'Parter', 'Avvik', 'Søkers uttaksgrad']
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
                        skalViseAvvik={!!skalViseAvvik}
                    />
                ))}
            </Table>
        </div>
    );
};

export default UttaksperiodeListe;
