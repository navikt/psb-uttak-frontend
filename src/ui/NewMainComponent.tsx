import React from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import PageContainer from './components/page-container/PageContainer';
import UttaksperiodePage from './components/uttaksperiode-page/UttaksperiodePage';
import Uttaksperiode from '../types/Uttaksperiode';
import { hentUttaksperioder } from '../util/http';

interface NewMainComponentProps {
    aktivBehandlingUuid: string;
    uttaksperioderUrl: string;
}

const NewMainComponent = ({ aktivBehandlingUuid, uttaksperioderUrl }: NewMainComponentProps) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [uttaksperioder, setUttaksperioder] = React.useState([]);

    const responseHandler = ({ data }: AxiosResponse<Uttaksperiode[]>) => {
        setUttaksperioder(data);
        setIsLoading(false);
    };

    const errorHandler = ({ message }: AxiosError) => {
        setErrorMessage(message);
        setIsLoading(false);
    };

    const httpCanceler = React.useMemo(() => axios.CancelToken.source(), []);
    React.useEffect(() => {
        setIsLoading(false);
        setErrorMessage(null);

        hentUttaksperioder(`${uttaksperioderUrl}?behandlingUuid=${aktivBehandlingUuid}`, httpCanceler.token).then(
            responseHandler,
            errorHandler
        );

        return function cleanup() {
            httpCanceler.cancel();
        };
    }, [aktivBehandlingUuid]);

    return (
        <PageContainer
            isLoading={isLoading}
            errorMessage={errorMessage}
            contentRenderer={() => (
                <UttaksperiodePage uttaksperioder={uttaksperioder} aktivBehandlingUuid={aktivBehandlingUuid} />
            )}
        />
    );
};

export default NewMainComponent;
