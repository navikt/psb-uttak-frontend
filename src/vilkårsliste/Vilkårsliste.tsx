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

const erVilkårOppfylt = (vilkårkode: string, inngangsvilkår: Inngangsvilkår) => {
    return inngangsvilkår[vilkårkode] === Utfall.OPPFYLT;
};

const Vilkårsliste = ({ inngangsvilkår }: VilkårslisteProps): JSX.Element => (
    <div className={styles.vilkårsliste}>
        <Element>Vilkår</Element>
        <ul>
            {Vilkår.map(
                (vilkår) =>
                    inngangsvilkår[vilkår.kode] && (
                        <VilkårslisteItem
                            key={vilkår.kode}
                            vilkår={vilkår.name}
                            erOppfylt={erVilkårOppfylt(vilkår.kode, inngangsvilkår)}
                        />
                    )
            )}
        </ul>
    </div>
);

export default Vilkårsliste;
