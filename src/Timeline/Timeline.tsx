import React, { FC } from 'react';
import './Timeline.scss';
import TimeUnit from '../TimeUnit/TimeUnit'
import { cn } from '@bem-react/classname';

const cnTimeline = cn('Timeline');

const Timeline: FC = () => {
    const makeGrid = (timeUnitValueInMins: number) => {
        const unitsPerHour = 60 / timeUnitValueInMins;
        const unitsPerDay = 24 * unitsPerHour;
        const timeUnits = [];

        for (let i = 0; i < unitsPerDay; i++) {
            timeUnits.push(<TimeUnit key={i} />);
        }

        return timeUnits;
    };

    return (
        <div className={cnTimeline()}>
            {makeGrid(5)}
        </div>
    );
};

export default Timeline;