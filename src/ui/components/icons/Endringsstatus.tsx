import React from 'react';
import { ContentWithTooltip } from '@navikt/k9-react-components';
import PillIcon from './PillIcon';
import EndringsstatusType from '../../../types/Endringsstatus';

function Endringsstatus({status}: {status: EndringsstatusType}): JSX.Element | null {
    if (status === 'NY') {
        return (
            <ContentWithTooltip tooltipText="Ny denne behandlingen">
                <PillIcon text="Ny" type="success" />
            </ContentWithTooltip>
        );
    }
    if (status === 'ENDRET') {
        return (
            <ContentWithTooltip tooltipText="Endret denne behandlingen">
                <PillIcon text="Endret" type="warning" />
            </ContentWithTooltip>
        );
    }
    if (status === 'UENDRET') {
        return (
            <ContentWithTooltip tooltipText="Uendret denne behandlingen">
                <PillIcon text="Uendret" type="info" />
            </ContentWithTooltip>
        );
    }

    return null;
}

export default Endringsstatus;