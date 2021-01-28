import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import VilkårslisteItem from './VilkårslisteItem';
import styles from './vilkårsliste.less';

const Vilkårsliste = ({ vilkårsliste }) => (
    <>
        <Element>Vilkår</Element>
        <ul className={styles.vilkårsliste}>
            {vilkårsliste.map(({ vilkår, erOppfylt }) => (
                <VilkårslisteItem key={vilkår} vilkår={vilkår} erOppfylt={erOppfylt} />
            ))}
        </ul>
    </>
);

export default Vilkårsliste;
