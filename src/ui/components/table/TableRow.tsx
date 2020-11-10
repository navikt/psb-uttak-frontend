import React, { ReactNode, FunctionComponent } from 'react';
import classnames from 'classnames/bind';

import styles from './tableRow.less';
import { UtfallEnum } from '../../MainComponent';

const classNames = classnames.bind(styles);

interface OwnProps {
    isHeader?: boolean;
    children: ReactNode | ReactNode[];
    utfall?: string;
}

/**
 * TableRow
 *
 * Presentasjonskomponent. Tabellrad som brukes av komponenten Table.
 */
const TableRow: FunctionComponent<OwnProps> = ({ isHeader = false, children, utfall }) => {
    return (
        <tr
            className={classNames({
                rowHeader: isHeader,
                rowContent: !isHeader,
                border__success: utfall === UtfallEnum.INNVILGET,
                border__alert: utfall === UtfallEnum.AVSLÅTT,
            })}
        >
            {children}
        </tr>
    );
};

export default TableRow;
