import React from 'react';
import { render } from 'react-dom';
import NewMainComponent from '../ui/NewMainComponent';

const renderAppInSuccessfulState = (appId: string) =>
    render(
        <NewMainComponent aktivBehandlingUuid="blabla" uttaksperioderUrl="blabla" />,
        document.getElementById(appId)
    );

export default {
    renderAppInSuccessfulState,
};
