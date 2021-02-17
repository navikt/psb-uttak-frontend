import axios, { AxiosError } from 'axios';
import React from 'react';
import ContainerContract from '../types/ContainerContract';
import UttaksperioderResponse from '../types/UttaksperioderResponse';
import { get } from '../util/httpUtils';
import lagUttaksperiodeliste from '../util/uttaksperioder';
import PageContainer from './components/page-container/PageContainer';
import UttaksperiodePage from './components/uttaksperiode-page/UttaksperiodePage';
import ContainerContext from './context/ContainerContext';

interface NewMainComponentProps {
    containerData: ContainerContract;
}

const NewMainComponent = ({ containerData }: NewMainComponentProps) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [uttaksperioder, setUttaksperioder] = React.useState([]);
    const {
        endpoints: { hentUttaksperioder },
        httpErrorHandler,
    } = containerData;

    const responseHandler = (data: UttaksperioderResponse) => {
        setUttaksperioder(lagUttaksperiodeliste(data));
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

        get(`${hentUttaksperioder}`, httpErrorHandler, { cancelToken: httpCanceler.token }).then(
            responseHandler,
            errorHandler
        );

        return function cleanup() {
            httpCanceler.cancel();
        };
    }, []);

    return (
        <ContainerContext.Provider value={containerData}>
            <PageContainer
                isLoading={isLoading}
                errorMessage={errorMessage}
                contentRenderer={() => <UttaksperiodePage uttaksperioder={uttaksperioder} />}
            />
        </ContainerContext.Provider>
    );
};

export default NewMainComponent;
