import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import React from 'react';
import ContainerContext from '../../context/ContainerContext';
import styles from './infostripe.less';

const Infostripe: React.FC = () => {
    const { aksjonspunktkoder } = React.useContext(ContainerContext);
    const aksjonspunktkodeVentAnnenPSBSak = '9290';
    const harVentAnnenPSBSakAksjonspunkt = aksjonspunktkoder?.some(
        (aksjonspunktkode) => aksjonspunktkode === aksjonspunktkodeVentAnnenPSBSak
    );

    if (!harVentAnnenPSBSakAksjonspunkt) {
        return null;
    }

    return (
        <div className={styles.infostripe}>
            <AlertStripeAdvarsel>
                Det er ikke mulig å behandle denne saken videre før andre saker, på samme barn og med åpen behandling,
                har kommet frem til uttaksteget og/eller har blitt besluttet.
            </AlertStripeAdvarsel>
        </div>
    );
};

export default Infostripe;
