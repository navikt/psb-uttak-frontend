import React from 'react';
import Tabs from 'nav-frontend-tabs';
import UttaksperiodeListe from '../uttaksperiode-liste/UttaksperiodeListe';
import { Uttaksperiode } from '../../../types/Uttaksperiode';

interface UttaksperiodePageProps {
    uttaksperioder: Uttaksperiode[];
    aktivBehandlingUuid: string;
}

const tabs = [{ label: 'Denne behandlingen' }, { label: 'Alle perioder' }];
const UttaksperiodePage = ({ uttaksperioder, aktivBehandlingUuid }: UttaksperiodePageProps) => {
    const [activeTab, setActiveTab] = React.useState(0);

    const erTilknyttetBehandlingen = ({ kildeBehandlingUUID }: Uttaksperiode) =>
        kildeBehandlingUUID === aktivBehandlingUuid;

    return (
        <div className="uttaksperiodePage">
            <Tabs kompakt tabs={tabs} onChange={(event, clickedIndex) => setActiveTab(clickedIndex)} />
            {activeTab === 0 && <UttaksperiodeListe uttaksperioder={uttaksperioder.filter(erTilknyttetBehandlingen)} />}
            {activeTab === 1 && <UttaksperiodeListe uttaksperioder={uttaksperioder} />}
        </div>
    );
};

export default UttaksperiodePage;
