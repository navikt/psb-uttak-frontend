import classNames from 'classnames/bind';
import { Element } from 'nav-frontend-typografi';
import * as React from 'react';
import { GreenCheckIcon } from '@navikt/k9-react-components';
import styles from './uttakUtregning.less';

const cx = classNames.bind(styles);

interface UttakUtregningProps {
    heading: string;
    children: React.ReactNode;
    highlight?: boolean;
}

const UttakUtregning = ({ heading, children, highlight }: UttakUtregningProps): JSX.Element => {
    const uttakUtregningCls = cx('uttakUtregning', {
        'uttakUtregning--highlighted': highlight,
    });
    return (
        <div className={uttakUtregningCls}>
            <Element className={styles.uttakUtregning__heading}>
                {highlight && <GreenCheckIcon size={19} />}
                {heading}
            </Element>
            <hr />
            {children}
        </div>
    );
};

export default UttakUtregning;
