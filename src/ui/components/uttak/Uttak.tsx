import classNames from 'classnames/bind';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { Collapse } from 'react-collapse';
import AnnenPart from '../../../constants/AnnenPart';
import Utfall from '../../../constants/Utfall';
import { Period } from '../../../types/Period';
import { Uttaksperiode } from '../../../types/Uttaksperiode';
import { prettifyDate } from '../../../util/dateUtils';
import Vilkårsliste from '../../../vilkårsliste/Vilkårsliste';
import ChevronIcon from '../icons/ChevronIcon';
import GreenCheckIconFilled from '../icons/GreenCheckIconFilled';
import OnePersonIconBlue from '../icons/OnePersonIconBlue';
import RedCrossIconFilled from '../icons/RedCrossIconFilled';
import TwoPersonsWithOneHighlightedIconBlue from '../icons/TwoPersonsWithOneHighlightedIconBlue';
import FullWidthRow from '../table/FullWidthRow';
import TableColumn from '../table/TableColumn';
import TableRow from '../table/TableRow';
import UttakDetaljer from '../uttak-detaljer/UttakDetaljer';
import styles from './uttak.less';

const cx = classNames.bind(styles);

const periodevisning = (periode: Period): string => {
    return `${prettifyDate(periode.fom)} - ${prettifyDate(periode.tom)}`;
};

interface UttakProps {
    uttak: Uttaksperiode;
    erValgt: boolean;
    velgPeriode: () => void;
}

const Uttak = ({ uttak, erValgt, velgPeriode }: UttakProps): JSX.Element => {
    const { periode, uttaksgrad, utfall, graderingMotTilsyn, inngangsvilkår } = uttak;
    const pleiebehov = graderingMotTilsyn && graderingMotTilsyn.pleiebehov;
    const harPleiebehov = pleiebehov && pleiebehov > 0;

    const uttakCls = cx({
        uttak__avslått: uttaksgrad === 0,
        uttak__innvilget: uttaksgrad > 0,
    });

    const harOppfyltAlleInngangsvilkår = Object.keys(inngangsvilkår).every(
        (key) => inngangsvilkår[key] === Utfall.OPPFYLT
    );

    return (
        <>
            <TableRow className={erValgt ? styles.uttak__expandedRow : ''}>
                <TableColumn>
                    <Normaltekst>{periodevisning(periode)}</Normaltekst>
                </TableColumn>
                <TableColumn>
                    {utfall === Utfall.OPPFYLT && <GreenCheckIconFilled />}
                    {utfall === Utfall.IKKE_OPPFYLT && <RedCrossIconFilled />}
                </TableColumn>
                <TableColumn>
                    <div className={styles.uttak__iconContainer}>
                        {harPleiebehov ? <GreenCheckIconFilled /> : <RedCrossIconFilled />}
                    </div>
                    {harPleiebehov && `${pleiebehov} %`}
                </TableColumn>
                <TableColumn>
                    {uttak.annenPart === AnnenPart.ALENE && <OnePersonIconBlue />}
                    {uttak.annenPart === AnnenPart.MED_ANDRE && <TwoPersonsWithOneHighlightedIconBlue />}
                </TableColumn>

                <TableColumn className={uttakCls}>{`${uttaksgrad} % uttaksgrad`}</TableColumn>
                <TableColumn>
                    <button
                        onClick={velgPeriode}
                        type="button"
                        className={`${styles.uttak__expandButton} ${
                            erValgt && styles['uttak__expandButton--expanded']
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
                        {harOppfyltAlleInngangsvilkår ? (
                            <UttakDetaljer uttak={uttak} />
                        ) : (
                            <Vilkårsliste inngangsvilkår={inngangsvilkår} />
                        )}
                    </div>
                </Collapse>
            </FullWidthRow>
        </>
    );
};
export default Uttak;
