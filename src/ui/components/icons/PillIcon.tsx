import * as React from 'react';
import styles from './PillIcon.less';

interface PillIconProps {
    text: string;
    type: 'success' | 'warning' | 'info';
}

const PillIcon = ({ text, type }: PillIconProps): JSX.Element => {
    const style = {
        success: styles['PillIcon--success'],
        warning: styles['PillIcon--warning'],
        info: styles['PillIcon--info'],
    };
    console.log(type)
    console.log(style[type])

    return <div className={style[type]}>{text}</div>;
};

export default PillIcon;