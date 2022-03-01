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
import { harÅrsak } from '../../../util/årsakUtils';
import Vilkårsliste from '../../../vilkårsliste/Vilkårsliste';
import Endringsstatus from '../icons/Endringsstatus';
import FullWidthRow from '../table/FullWidthRow';
import TableColumn from '../table/TableColumn';
import TableRow from '../table/TableRow';
import UttakDetaljer from '../uttak-detaljer/UttakDetaljer';
import styles from './uttak.less';
import AvvikIMType from '../../../constants/AvvikIMType';

const cx = classNames.bind(styles);

interface UttakProps {
    uttak: Uttaksperiode;
    erValgt: boolean;
    velgPeriode: () => void;
    skalViseAvvik: boolean;
}

const Uttak = ({ uttak, erValgt, velgPeriode, skalViseAvvik}: UttakProps): JSX.Element => {
    const { periode, uttaksgrad, inngangsvilkår, pleiebehov, årsaker, endringsstatus } = uttak;
    const harUtenomPleiebehovÅrsak = harÅrsak(årsaker, Årsaker.UTENOM_PLEIEBEHOV);
    const harPleiebehov = !harUtenomPleiebehovÅrsak && pleiebehov && pleiebehov > 0;

    const uttakGradIndikatorCls = cx('uttak__indikator', {
        uttak__indikator__avslått: uttaksgrad === 0,
        uttak__indikator__innvilget: uttaksgrad > 0,
        'uttak__indikator__innvilget--delvis': årsaker.some((årsak) => årsak === Årsaker.GRADERT_MOT_TILSYN),
    });

    const harOppfyltAlleInngangsvilkår = !harÅrsak(årsaker, Årsaker.INNGANGSVILKÅR_IKKE_OPPFYLT);

    return (
        <>
            <TableRow className={erValgt ? styles.uttak__expandedRow : ''} onClick={velgPeriode}>
                <TableColumn>
                    <Normaltekst>{periode.prettifyPeriod()}</Normaltekst>
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
                            <OnePersonIconGray />
                        </ContentWithTooltip>
                    )}
                    {uttak.annenPart === AnnenPart.MED_ANDRE && (
                        <ContentWithTooltip tooltipText="Søker/Annen part">
                            <TwoPersonsWithOneHighlightedIconGray />
                        </ContentWithTooltip>
                    )}
                </TableColumn>

                {skalViseAvvik && <TableColumn className={styles.uttak__avvik}>
                    {
                        uttak.avvikImSøknad &&
                        (uttak.avvikImSøknad === AvvikIMType.SØKNAD_UTEN_MATCHENDE_IM || uttak.avvikImSøknad === AvvikIMType.IM_REFUSJONSKRAV_TRUMFER_SØKNAD) &&
                        <Normaltekst>
                            {uttak.avvikImSøknad === AvvikIMType.SØKNAD_UTEN_MATCHENDE_IM
                                ? 'Søknad uten matchende inntektsmelding'
                                : 'Inntektsmeldingens refusjonskrav trumfer søknaden'}
                        </Normaltekst>
                    }
                </TableColumn>}

                <TableColumn className={styles.uttak__uttaksgrad}>
                    <p className={styles.uttak__uttaksgrad__tekst}>{`${uttaksgrad} %`}</p>
                    <div className={uttakGradIndikatorCls} />
                </TableColumn>

                <TableColumn>
                    <div className={styles.uttak__lastColumn}>
                        <div className={styles.uttak__behandlerIcon}>
                            <Endringsstatus status={endringsstatus} />
                        </div>
                        <button
                            onClick={velgPeriode}
                            type="button"
                            className={`${styles.uttak__expandButton} ${
                                erValgt && styles['uttak__expandButton--expanded']
                            }`}
                            aria-label={erValgt ? 'Lukk' : 'Åpne'}
                            aria-expanded={erValgt}
                        >
                            <ChevronIconBlack />
                        </button>
                    </div>
                </TableColumn>
            </TableRow>
            <FullWidthRow colSpan={skalViseAvvik ? 7 : 6}>
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
