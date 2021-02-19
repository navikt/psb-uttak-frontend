import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import VilkårslisteItem from './VilkårslisteItem';
import styles from './vilkårsliste.less';
import Inngangsvilkår from '../types/Inngangsvilkår';
import Vilkår from './Vilkår';
import Utfall from '../constants/Utfall';

interface VilkårslisteProps {
    inngangsvilkår: Inngangsvilkår;
}

const erVilkårOppfylt = (vilkårKey: string, inngangsvilkår: Inngangsvilkår) => {
    return inngangsvilkår[vilkårKey] === Utfall.OPPFYLT;
};

const Vilkårsliste = ({ inngangsvilkår }: VilkårslisteProps): JSX.Element => (
    <>
        <Element>Vilkår</Element>
        <ul className={styles.vilkårsliste}>
            {Vilkår.map((vilkår) => (
                <VilkårslisteItem
                    key={vilkår.key}
                    vilkår={vilkår.name}
                    erOppfylt={erVilkårOppfylt(vilkår.key, inngangsvilkår)}
                />
            ))}
        </ul>
    </>
);

export default Vilkårsliste;
