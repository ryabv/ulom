import React, { FC } from 'react';
import './TimeUnit.scss';
import { cn } from '@bem-react/classname';

const cnTimeUnit = cn('TimeUnit');

interface TimeUnitProps {
    min: number,
    h: number,
    id: number,
    classes: string[],
    color?: string
}

const TimeUnit: FC<TimeUnitProps> = ({ min, h, id, classes, color = '#3ae93a' }) => {
    return (
        <div
            style={{background: color}}
            id={String(id)}
            className={`${cnTimeUnit({ h: `${h}_`, min })} ${ classes.join(' ') }`}
        >
            {/* <div className={cnTimeUnit('Side', {'back': true})}></div>
            <div className={cnTimeUnit('Side', {'left': true})}></div>
            <div className={cnTimeUnit('Side', {'right': true})}></div>
            <div className={cnTimeUnit('Side', {'top': true})}></div>
            <div className={cnTimeUnit('Side', {'bottom': true})}></div>
            <div className={cnTimeUnit('Side', {'front': true})}></div> */}
        </div>
    );
};

export default TimeUnit;