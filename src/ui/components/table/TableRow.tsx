import classnames from 'classnames/bind';
import React, { FunctionComponent, ReactNode } from 'react';
import styles from './tableRow.less';

const classNames = classnames.bind(styles);

interface OwnProps {
    isHeader?: boolean;
    children: ReactNode | ReactNode[];
    className?: string;
}

/**
 * TableRow
 *
 * Presentasjonskomponent. Tabellrad som brukes av komponenten Table.
 */
const TableRow: FunctionComponent<OwnProps> = ({ isHeader = false, children, className }) => {
    return (
        <tr
            className={classNames(className, {
                rowHeader: isHeader,
                rowContent: !isHeader,
            })}
        >
            {children}
        </tr>
    );
};

export default TableRow;
