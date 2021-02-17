import { HttpErrorHandler } from './HttpErrorHandler';

interface ContainerContract {
    endpoints: {
        hentUttaksperioder: string;
    };
    httpErrorHandler: HttpErrorHandler;
}

export default ContainerContract;
