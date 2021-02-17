import { HttpErrorHandler } from './HttpErrorHandler';

interface ContainerContract {
    endpoints: {
        uttaksplan: string;
    };
    httpErrorHandler: HttpErrorHandler;
}

export default ContainerContract;
