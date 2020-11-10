import renderers from './util/renderers';

(window as any).renderUttakApp = async (appId, data) => {
    const { renderAppInSuccessfulState } = renderers;
    renderAppInSuccessfulState(appId);
};
