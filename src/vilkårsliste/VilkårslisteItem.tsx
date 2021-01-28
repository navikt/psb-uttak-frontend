import * as React from 'react';
import GreenCheckIconFilled from '../ui/components/icons/GreenCheckIconFilled';
import RedCrossIconFilled from '../ui/components/icons/RedCrossIconFilled';
import styles from './vilkårslisteItem.less';

interface VilkårslisteItemProps {
    vilkår: string;
    erOppfylt: boolean;
}

const VilkårslisteItem = ({ vilkår, erOppfylt }: VilkårslisteItemProps): JSX.Element => (
    <li className={styles.item}>
        <div className={styles.item__text}>{`${vilkår}:`}</div>
        <div>
            {erOppfylt ? (
                <>
                    <GreenCheckIconFilled />
                    Oppfylt
                </>
            ) : (
                <>
                    <RedCrossIconFilled />
                    Ikke oppfylt
                </>
            )}
        </div>
    </li>
);

export default VilkårslisteItem;
