import React, { FC, useState } from 'react';
import './TimeUnit.scss';
import { cn } from '@bem-react/classname';

const cnTimeUnit = cn('TimeUnit');

interface TimeUnitProps {
    min?: number,
    h?: number
}

const TimeUnit: FC<TimeUnitProps> = ({ min, h }) => {
    const [ isSelected, setIsSelected ] = useState(false);

    const handleClick = () => {
        setIsSelected(!isSelected);
    };

    return (
        <div
            className={isSelected ? cnTimeUnit({ h, min, selected: true }) : cnTimeUnit({ h, min })}
            onClick={handleClick}
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