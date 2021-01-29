import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import styles from './uttakUtregning.less';

interface UttakUtregningProps {
    heading: string;
    children: React.ReactNode;
}

const UttakUtregning = ({ heading, children }: UttakUtregningProps): JSX.Element => (
    <div className={styles.uttakUtregning}>
        <Element className={styles.uttakUtregning__heading}>{heading}</Element>
        {children}
    </div>
);

export default UttakUtregning;
