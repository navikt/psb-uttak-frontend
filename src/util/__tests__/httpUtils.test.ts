import axios from 'axios';
import { get } from '../httpUtils';
import * as responseHelpers from '../responseHelpers';

jest.mock('axios');
const axiosMock = axios as jest.Mocked<typeof axios>;

describe('httpUtils', () => {
    const mockedErrorHandler = () => null;

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => null);
    });

    describe('get', () => {
        const goodResponseMock = { data: 'mockedData' };
        const badRequestResponseMock = { response: { status: 400, headers: {} } };

        it('should return the data-property from the response when the promise resolved', async () => {
            axiosMock.get.mockImplementation(() => Promise.resolve(goodResponseMock));
            const data = await get('', () => null);
            expect(data).toEqual(goodResponseMock.data);
        });

        it('should console.error the error when the promise is rejected', async () => {
            axiosMock.get.mockImplementation(() => Promise.reject(badRequestResponseMock));
            const error = await get('', () => null);
            expect(console.error).toHaveBeenCalledWith(error);
        });

        it('should call function triggering the provided httpErrorHandler when required', async () => {
            const httpErrorHandlerCaller = jest.spyOn(responseHelpers, 'handleErrorExternally');
            const checkerFn = jest.spyOn(responseHelpers, 'httpErrorShouldBeHandledExternally');
            checkerFn.mockReturnValueOnce(true);

            axiosMock.get.mockImplementation(() => Promise.reject(badRequestResponseMock));

            const error = await get('', mockedErrorHandler);
            expect(httpErrorHandlerCaller).toHaveBeenCalledWith(error as any, mockedErrorHandler);
            httpErrorHandlerCaller.mockReset();
        });

        it('should avoid calling function triggering httpErrorHandler when unneccessary', async () => {
            const httpErrorHandlerCaller = jest.spyOn(responseHelpers, 'handleErrorExternally');
            const checkerFn = jest.spyOn(responseHelpers, 'httpErrorShouldBeHandledExternally');
            checkerFn.mockReturnValueOnce(false);

            axiosMock.get.mockImplementation(() => Promise.reject(badRequestResponseMock));

            await get('', mockedErrorHandler);
            expect(httpErrorHandlerCaller).not.toHaveBeenCalled();
            httpErrorHandlerCaller.mockReset();
        });
    });
});
