import React from 'react';
import ContainerContract from '../types/ContainerContract';
import getUttaksperiodeList from '../util/uttaksperioder';
import UttaksperiodeList from './components/uttaksperiode-list/UttaksperiodeList';
import ContainerContext from './context/ContainerContext';

interface MainComponentProps {
    containerData: ContainerContract;
}

const MainComponent = ({ containerData }: MainComponentProps): JSX.Element => {
    const { uttaksperioder } = containerData;
    return (
        <ContainerContext.Provider value={containerData}>
            <UttaksperiodeList uttaksperioder={getUttaksperiodeList(uttaksperioder)} />
        </ContainerContext.Provider>
    );
};

export default MainComponent;
