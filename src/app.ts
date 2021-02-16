import renderers from './util/renderers';
import ContainerContract from './types/ContainerContract';

(window as any).renderUttakApp = async (appId: string, data: ContainerContract) => {
    const { renderAppInSuccessfulState } = renderers;
    renderAppInSuccessfulState(appId, data);
};
