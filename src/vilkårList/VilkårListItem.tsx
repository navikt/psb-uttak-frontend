import * as React from 'react';
import { GreenCheckIconFilled, RedCrossIconFilled } from '@navikt/k9-react-components';
import styles from './vilkårListItem.less';

interface VilkårListItemProps {
    vilkår: string;
    erOppfylt: boolean;
}

const VilkårListItem = ({ vilkår, erOppfylt }: VilkårListItemProps): JSX.Element => (
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

export default VilkårListItem;
