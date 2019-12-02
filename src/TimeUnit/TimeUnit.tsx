import React, { FC } from 'react';
import './TimeUnit.scss';
import { cn } from '@bem-react/classname';

const cnTimeUnit = cn('TimeUnit');

const TimeUnit: FC = () => {
    return (
        <div className={cnTimeUnit()}>
            <div className={cnTimeUnit('Side', {'back': true})}></div>
            <div className={cnTimeUnit('Side', {'left': true})}></div>
            <div className={cnTimeUnit('Side', {'right': true})}></div>
            <div className={cnTimeUnit('Side', {'top': true})}></div>
            <div className={cnTimeUnit('Side', {'bottom': true})}></div>
            <div className={cnTimeUnit('Side', {'front': true})}></div>
        </div>
    );
};

export default TimeUnit;