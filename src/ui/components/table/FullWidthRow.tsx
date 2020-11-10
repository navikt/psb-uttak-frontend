import * as React from 'react';
import styles from './fullWidthRow.less';

interface FullWidthRowProps {
    children: React.ReactNode;
}

const FullWidthRow = ({ children }: FullWidthRowProps): JSX.Element => (
    <tr>
        <td colSpan={6}>
            <div className={styles.fullWidthRow}>{children}</div>
        </td>
    </tr>
);

export default FullWidthRow;
