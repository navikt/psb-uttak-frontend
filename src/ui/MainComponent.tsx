import React from 'react';
import ContainerContract from '../types/ContainerContract';
import lagUttaksperiodeliste from '../util/uttaksperioder';
import UttaksperiodeListe from './components/uttaksperiode-liste/UttaksperiodeListe';
import ContainerContext from './context/ContainerContext';
import Infostripe from './components/infostripe/Infostripe';

interface MainComponentProps {
    containerData: ContainerContract;
}

const MainComponent = ({ containerData }: MainComponentProps): JSX.Element => {
    const { uttaksperioder, aksjonspunktkoder } = containerData;
    const aksjonspunktkodeVentAnnenPSBSak = '9290';
    const harVentAnnenPSBSakAksjonspunkt = aksjonspunktkoder?.some(
        (aksjonspunktkode) => aksjonspunktkode === aksjonspunktkodeVentAnnenPSBSak
    );
    return (
        <ContainerContext.Provider value={containerData}>
            <Infostripe harVentAnnenPSBSakAksjonspunkt={harVentAnnenPSBSakAksjonspunkt} />
            {!harVentAnnenPSBSakAksjonspunkt && (
                <UttaksperiodeListe uttaksperioder={lagUttaksperiodeliste(uttaksperioder)} />
            )}
        </ContainerContext.Provider>
    );
};

export default MainComponent;
