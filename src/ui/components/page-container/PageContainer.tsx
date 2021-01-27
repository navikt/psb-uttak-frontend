import React from 'react';
import Spinner from 'nav-frontend-spinner';
import Alertstripe from 'nav-frontend-alertstriper';

interface PageContainerProps {
    isLoading: boolean;
    contentRenderer: () => JSX.Element;
    errorMessage?: string;
}

const PageContainer = ({ isLoading, contentRenderer, errorMessage }: PageContainerProps): JSX.Element => {
    if (isLoading) {
        return <Spinner />;
    }
    if (errorMessage) {
        return <Alertstripe type="feil">{errorMessage}</Alertstripe>;
    }
    return contentRenderer();
};

export default PageContainer;
