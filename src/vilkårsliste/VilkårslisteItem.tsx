import * as React from 'react';
import { GreenCheckIconFilled, RedCrossIconFilled } from '@navikt/k9-react-components';
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
