import classNames from 'classnames/bind';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { Collapse } from 'react-collapse';
import Parter from '../../../constants/Parter';
import Utfall from '../../../constants/Utfall';
import { Uttaksperiode } from '../../../types/Uttaksperiode';
import { prettifyDate } from '../../../util/dateUtils';
import Vilkårsliste from '../../../vilkårsliste/Vilkårsliste';
import ChevronIcon from '../icons/ChevronIcon';
import GreenCheckIconFilled from '../icons/GreenCheckIconFilled';
import OnePersonIconBlue from '../icons/OnePersonIconBlue';
import RedCrossIconFilled from '../icons/RedCrossIconFilled';
import FullWidthRow from '../table/FullWidthRow';
import TableColumn from '../table/TableColumn';
import TableRow from '../table/TableRow';
import styles from './uttak.less';
import { Period } from '../../../types/Period';

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
    const { periode, uttaksgrad, utfall } = uttak;
    const pleiebehov = '100%'; // TODO
    const mottaker = 'Søker'; // TODO
    const prosentPleiebehov = pleiebehov.match(/\d/g)?.join('');
    const harPleiebehov = +prosentPleiebehov > 0;

    const uttakCls = cx({
        uttak__avslått: uttaksgrad === 0,
        uttak__innvilget: uttaksgrad > 0,
    });
    const vilkårsliste = [
        { vilkår: 'Søknadsfrist', erOppfylt: true },
        { vilkår: 'Søkers alder', erOppfylt: true },
        { vilkår: 'Omsorgen for', erOppfylt: false },
        { vilkår: 'Barnets alder', erOppfylt: true },
        { vilkår: 'Sykdom', erOppfylt: true },
    ];
    return (
        <>
            <TableRow className={erValgt ? styles.uttak__expandedRow : ''}>
                <TableColumn>
                    <Normaltekst>{periodevisning(periode)}</Normaltekst>
                </TableColumn>
                <TableColumn>
                    {utfall === Utfall.INNVILGET && <GreenCheckIconFilled />}
                    {utfall === Utfall.AVSLÅTT && <RedCrossIconFilled />}
                </TableColumn>
                <TableColumn>
                    <div className={styles.uttak__iconContainer}>
                        {harPleiebehov ? <GreenCheckIconFilled /> : <RedCrossIconFilled />}
                    </div>
                    {pleiebehov}
                </TableColumn>
                <TableColumn>{mottaker === Parter.SØKER && <OnePersonIconBlue />}</TableColumn>

                <TableColumn className={uttakCls}>{`${uttaksgrad}% uttaksgrad`}</TableColumn>
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
                        <div className={styles.expanded__column}>
                            <Vilkårsliste vilkårsliste={vilkårsliste} />
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
};
export default Uttak;
