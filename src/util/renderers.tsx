import React from 'react';
import { render } from 'react-dom';
import NewMainComponent from '../ui/NewMainComponent';
import MainComponent from '../ui/MainComponent';

const renderAppInSuccessfulState = (appId: string) =>
    render(
        <>
            <MainComponent />
            <NewMainComponent aktivBehandlingUuid="blabla" uttaksperioderUrl="blabla" />
        </>,
        document.getElementById(appId)
    );

export default {
    renderAppInSuccessfulState,
};
