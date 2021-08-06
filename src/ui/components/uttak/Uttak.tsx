import {
    ChevronIconBlack,
    ContentWithTooltip,
    GreenCheckIconFilled,
    OnePersonIconGray,
    RedCrossIconFilled,
    TwoPersonsWithOneHighlightedIconGray,
} from '@navikt/k9-react-components';
import classNames from 'classnames/bind';
import { Normaltekst } from 'nav-frontend-typografi';
import * as React from 'react';
import { Collapse } from 'react-collapse';
import AnnenPart from '../../../constants/AnnenPart';
import Årsaker from '../../../constants/Årsaker';
import { Uttaksperiode } from '../../../types/Uttaksperiode';
import { hasÅrsak } from '../../../util/årsakUtils';
import VilkårList from '../../../vilkårList/VilkårList';
import ContainerContext from '../../context/ContainerContext';
import NewIcon from '../icons/NewIcon';
import FullWidthRow from '../table/FullWidthRow';
import TableColumn from '../table/TableColumn';
import TableRow from '../table/TableRow';
import UttakDetails from '../uttak-detaljer/UttakDetails';
import styles from './uttak.less';

const cx = classNames.bind(styles);

interface UttakProps {
    uttak: Uttaksperiode;
    isSelected: boolean;
    selectPeriod: () => void;
}

const Uttak = ({ uttak, isSelected, selectPeriod }: UttakProps): JSX.Element => {
    const { aktivBehandlingUuid } = React.useContext(ContainerContext);
    const { periode, uttaksgrad, inngangsvilkår, pleiebehov, årsaker, kildeBehandlingUUID } = uttak;
    const hasUtenomPleiebehovÅrsak = hasÅrsak(årsaker, Årsaker.UTENOM_PLEIEBEHOV);
    const hasPleiebehov = !hasUtenomPleiebehovÅrsak && pleiebehov && pleiebehov > 0;

    const uttakGradIndikatorCls = cx('uttak__indikator', {
        uttak__indikator__avslått: uttaksgrad === 0,
        uttak__indikator__innvilget: uttaksgrad > 0,
        'uttak__indikator__innvilget--delvis': årsaker.some((årsak) => årsak === Årsaker.GRADERT_MOT_TILSYN),
    });

    const hasOppfyltAlleInngangsvilkår = !hasÅrsak(årsaker, Årsaker.INNGANGSVILKÅR_IKKE_OPPFYLT);
    const isNyEllerEndretIAktivBehandling = aktivBehandlingUuid === kildeBehandlingUUID;

    return (
        <>
            <TableRow className={isSelected ? styles.uttak__expandedRow : ''} onClick={selectPeriod}>
                <TableColumn>
                    <Normaltekst>{periode.prettifyPeriod()}</Normaltekst>
                </TableColumn>
                <TableColumn>
                    {hasOppfyltAlleInngangsvilkår ? <GreenCheckIconFilled /> : <RedCrossIconFilled />}
                </TableColumn>
                <TableColumn>
                    <div className={styles.uttak__iconContainer}>
                        {hasPleiebehov ? <GreenCheckIconFilled /> : <RedCrossIconFilled />}
                    </div>
                    {hasPleiebehov ? `${pleiebehov} %` : null}
                </TableColumn>
                <TableColumn>
                    {uttak.annenPart === AnnenPart.ALENE && (
                        <ContentWithTooltip tooltipText="Søker">
                            <OnePersonIconGray />
                        </ContentWithTooltip>
                    )}
                    {uttak.annenPart === AnnenPart.MED_ANDRE && (
                        <ContentWithTooltip tooltipText="Søker/Annen part">
                            <TwoPersonsWithOneHighlightedIconGray />
                        </ContentWithTooltip>
                    )}
                </TableColumn>

                <TableColumn className={styles.uttak__uttaksgrad}>
                    <p className={styles.uttak__uttaksgrad__tekst}>{`${uttaksgrad} %`}</p>
                    <div className={uttakGradIndikatorCls} />
                </TableColumn>
                <TableColumn>
                    <div className={styles.uttak__lastColumn}>
                        {isNyEllerEndretIAktivBehandling && (
                            <div className={styles.uttak__behandlerIcon}>
                                <ContentWithTooltip tooltipText="Ny/endret denne behandlingen">
                                    <NewIcon />
                                </ContentWithTooltip>
                            </div>
                        )}
                        <button
                            onClick={selectPeriod}
                            type="button"
                            className={`${styles.uttak__expandButton} ${
                                isSelected && styles['uttak__expandButton--expanded']
                            }`}
                            aria-label={isSelected ? 'Lukk' : 'Åpne'}
                            aria-expanded={isSelected}
                        >
                            <ChevronIconBlack />
                        </button>
                    </div>
                </TableColumn>
            </TableRow>
            <FullWidthRow>
                <Collapse isOpened={isSelected}>
                    <div className={styles.expanded}>
                        {hasOppfyltAlleInngangsvilkår ? (
                            <UttakDetails uttak={uttak} />
                        ) : (
                            <VilkårList inngangsvilkår={inngangsvilkår} />
                        )}
                    </div>
                </Collapse>
            </FullWidthRow>
        </>
    );
};
export default Uttak;
