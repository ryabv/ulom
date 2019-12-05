import React, { FC, useState } from 'react';
import './TimeUnit.scss';
import { cn } from '@bem-react/classname';

const cnTimeUnit = cn('TimeUnit');

interface TimeUnitProps {
    min: number,
    h: number,
    id: number
}

const TimeUnit: FC<TimeUnitProps> = ({ min, h, id }) => {
    const [ isSelected, setIsSelected ] = useState(false);

    const handleClick = () => {
        setIsSelected(!isSelected);
    };

    return (
        <div
            id={String(id)}
            className={cnTimeUnit({ h, min })}
            // onClick={handleClick}
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