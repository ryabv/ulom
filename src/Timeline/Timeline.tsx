import React, { FC, useState } from 'react';
import './Timeline.scss';
import TimeUnit from '../TimeUnit/TimeUnit'
import { cn } from '@bem-react/classname';

const cnTimeline = cn('Timeline');

interface TimelineProps {
    timeUnitValueInMins: number
}

const Timeline: FC<TimelineProps> = ({ timeUnitValueInMins }) => {
    const unitsPerHour = 60 / timeUnitValueInMins;
    const unitsPerDay = 24 * unitsPerHour;
    const [ isDesktop, setIsDesktop ] = useState(document.body.clientWidth > 700);

    window.addEventListener('resize', () => {
        setIsDesktop(document.body.clientWidth > 700);
    });

    const makeGrid = () => {
        const timeUnits = [];

        if (isDesktop) {
            for (let i = 0; i < unitsPerDay; i++) {
                if (i % 24 === 0) {
                    timeUnits.push(<div className={cnTimeline('Header', {minutes: true})}>{i * timeUnitValueInMins / 24 + timeUnitValueInMins}</div>);
                }
    
                timeUnits.push(<TimeUnit key={i} />);
            }
        } else {
            for (let i = 0; i < unitsPerDay; i++) {
                if (i % unitsPerHour === 0) {
                    timeUnits.push(<div className={cnTimeline('Header', {hours: true})}>{i / unitsPerHour + 1}</div>);
                }
    
                timeUnits.push(<TimeUnit key={i} />);
            }
        }
        

        return timeUnits;
    };

    const makeHoursLine = () => {
        const hoursLine = [];

        if (isDesktop) {
            for (let i = 0; i <= 24; i++) {
                hoursLine.push(<div className={cnTimeline('Header', {hours: true})}>{i ? i : ''}</div>);
            }
        }

        return hoursLine;
    };

    const makeMinutesLine = () => {
        const minutesLine = [];

        if (!isDesktop) {
            for (let i = 0; i <= unitsPerHour; i++) {
                minutesLine.push(<div className={cnTimeline('Header', {minutes: true})}>{i ? i * timeUnitValueInMins : ''}</div>);
            }
        }

        return minutesLine;
    };

    return (
        <div className={cnTimeline()}>
            {isDesktop ? makeHoursLine() : makeMinutesLine()}
            {makeGrid()}
        </div>
    );
};

export default Timeline;