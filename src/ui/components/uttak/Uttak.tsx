import classNames from 'classnames/bind';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { Collapse } from 'react-collapse';
import AnnenPart from '../../../constants/AnnenPart';
import Årsaker from '../../../constants/Årsaker';
import { Period } from '../../../types/Period';
import { Uttaksperiode } from '../../../types/Uttaksperiode';
import { prettifyDate } from '../../../util/dateUtils';
import { harÅrsak } from '../../../util/årsakUtils';
import Vilkårsliste from '../../../vilkårsliste/Vilkårsliste';
import ContainerContext from '../../context/ContainerContext';
import ContentWithTooltip from '../content-with-tooltip/ContentWithTooltip';
import ChevronIcon from '../icons/ChevronIcon';
import EditedBySaksbehandlerIcon from '../icons/EditedBySaksbehandlerIcon';
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
    const { aktivBehandlingUuid } = React.useContext(ContainerContext);
    const { periode, uttaksgrad, inngangsvilkår, pleiebehov, årsaker, kildeBehandlingUUID } = uttak;
    const harUtenomPleiebehovÅrsak = harÅrsak(årsaker, Årsaker.UTENOM_PLEIEBEHOV);
    const harPleiebehov = !harUtenomPleiebehovÅrsak && pleiebehov && pleiebehov > 0;

    const uttakGradIndikatorCls = cx('uttak__indikator', {
        uttak__indikator__avslått: uttaksgrad === 0,
        // 'uttak__indikator__avslått--delvis': uttaksgrad === 0,
        uttak__indikator__innvilget: uttaksgrad > 0,
        // 'uttak__indikator__innvilget--delvis': uttaksgrad > 0,
    });

    const harOppfyltAlleInngangsvilkår = !harÅrsak(årsaker, Årsaker.INNGANGSVILKÅR_IKKE_OPPFYLT);
    const erNyEllerEndretIAktivBehandling = aktivBehandlingUuid === kildeBehandlingUUID;

    return (
        <>
            <TableRow className={erValgt ? styles.uttak__expandedRow : ''} onClick={velgPeriode}>
                <TableColumn>
                    <Normaltekst>{periodevisning(periode)}</Normaltekst>
                </TableColumn>
                <TableColumn>
                    {harOppfyltAlleInngangsvilkår ? <GreenCheckIconFilled /> : <RedCrossIconFilled />}
                </TableColumn>
                <TableColumn>
                    <div className={styles.uttak__iconContainer}>
                        {harPleiebehov ? <GreenCheckIconFilled /> : <RedCrossIconFilled />}
                    </div>
                    {harPleiebehov ? `${pleiebehov} %` : null}
                </TableColumn>
                <TableColumn>
                    {uttak.annenPart === AnnenPart.ALENE && (
                        <ContentWithTooltip tooltipText="Søker">
                            <OnePersonIconBlue />
                        </ContentWithTooltip>
                    )}
                    {uttak.annenPart === AnnenPart.MED_ANDRE && (
                        <ContentWithTooltip tooltipText="Søker/Annen part">
                            <TwoPersonsWithOneHighlightedIconBlue />
                        </ContentWithTooltip>
                    )}
                </TableColumn>

                <TableColumn className={styles.uttak__uttaksgrad}>
                    <p className={styles.uttak__uttaksgrad__tekst}>{`${uttaksgrad} %`}</p>
                    <div className={uttakGradIndikatorCls} />
                </TableColumn>
                <TableColumn>
                    <div className={styles.uttak__lastColumn}>
                        {erNyEllerEndretIAktivBehandling && (
                            <div className={styles.uttak__behandlerIcon}>
                                <ContentWithTooltip tooltipText="Ny/endret denne behandlingen">
                                    <EditedBySaksbehandlerIcon />
                                </ContentWithTooltip>
                            </div>
                        )}
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
                    </div>
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
