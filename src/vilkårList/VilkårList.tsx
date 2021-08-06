import * as React from 'react';
import { Element } from 'nav-frontend-typografi';
import VilkårListItem from './VilkårListItem';
import styles from './vilkårList.less';
import Inngangsvilkår from '../types/Inngangsvilkår';
import vilkår from './Vilkår';
import Utfall from '../constants/Utfall';

interface VilkårListProps {
    inngangsvilkår: Inngangsvilkår;
}

const isVilkårOppfylt = (vilkårkode: string, inngangsvilkår: Inngangsvilkår) =>
    inngangsvilkår[vilkårkode] === Utfall.OPPFYLT;

const VilkårList = ({ inngangsvilkår }: VilkårListProps): JSX.Element => (
    <div className={styles.vilkårsliste}>
        <Element>Vilkår</Element>
        <ul>
            {vilkår.map(
                (v) =>
                    inngangsvilkår[v.kode] && (
                        <VilkårListItem
                            key={v.kode}
                            vilkår={v.name}
                            erOppfylt={isVilkårOppfylt(v.kode, inngangsvilkår)}
                        />
                    )
            )}
        </ul>
    </div>
);

export default VilkårList;
