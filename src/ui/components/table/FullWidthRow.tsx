import * as React from 'react';
import styles from './fullWidthRow.less';

interface FullWidthRowProps {
    children: React.ReactNode;
}

const FullWidthRow = ({ children }: FullWidthRowProps): JSX.Element => (
    <tr>
        <td className={styles.fullWidthRow__column} colSpan={6}>
            {children}
        </td>
    </tr>
);

export default FullWidthRow;
