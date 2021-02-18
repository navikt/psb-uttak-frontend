import React from 'react';
import ContainerContract from '../types/ContainerContract';
import lagUttaksperiodeliste from '../util/uttaksperioder';
import UttaksperiodePage from './components/uttaksperiode-page/UttaksperiodePage';

interface MainComponentProps {
    containerData: ContainerContract;
}

const MainComponent = ({ containerData: { uttaksperioder } }: MainComponentProps): JSX.Element => (
    <UttaksperiodePage uttaksperioder={lagUttaksperiodeliste(uttaksperioder)} />
);

export default MainComponent;
