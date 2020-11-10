import React, { FunctionComponent, ReactElement } from 'react';
import TableRow from './TableRow';
import styles from './table.less';

interface OwnProps {
    children: ReactElement | ReactElement[];
    suppliedHeaders?: ReactElement;
}

/**
 * Table
 *
 * Presentasjonskomponent. Definerer en tabell med rader og kolonner.
 */
const Table: FunctionComponent<OwnProps> = ({ children, suppliedHeaders }) => (
    <table className={styles.table}>
        <thead>
            <TableRow isHeader>{suppliedHeaders}</TableRow>
        </thead>
        <tbody>
            {Array.isArray(children)
                ? React.Children.map(children, (child) => React.cloneElement(child))
                : React.cloneElement(children)}
        </tbody>
    </table>
);

export default Table;
