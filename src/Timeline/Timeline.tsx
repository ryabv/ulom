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

    const getActiveLine = (e: any) => {
        const time = e.target.classList.value.match(/(_h_|_min_).+/)[0];
        const currTimeUnits = document.getElementsByClassName(`TimeUnit${time}`);
        const currActiveTimeUnits = document.getElementsByClassName(`TimeUnit${time} TimeUnit_selected`);
        
        if (currActiveTimeUnits.length === currTimeUnits.length) {
            for (let i = 0; i < currTimeUnits.length; i++) {
                currTimeUnits[i].classList.toggle('TimeUnit_selected');
            }
        } else {
            for (let i = 0; i < currTimeUnits.length; i++) {
                currTimeUnits[i].classList.add('TimeUnit_selected');
            }
        }
    };

    const makeGrid = () => {
        const timeUnits = [];

        if (isDesktop) {
            for (let i = 0; i < unitsPerDay; i++) {
                const val = Math.floor(i / 24) * timeUnitValueInMins + timeUnitValueInMins;
                if (i % 24 === 0) {
                    timeUnits.push(<div
                        key={`time-${i}`}
                        onClick={getActiveLine}
                        className={cnTimeline('Header', {minutes: true, min: val})}
                    >{val}</div>);
                }
    
                timeUnits.push(<TimeUnit
                    h={i % 24 + 1}
                    min={val}
                    key={i} 
                />);
            }
        } else {
            for (let i = 0; i < unitsPerDay; i++) {
                const val = Math.floor(i / unitsPerHour) + 1;
                if (i % unitsPerHour === 0) {
                    timeUnits.push(<div 
                        onClick={getActiveLine}
                        className={cnTimeline('Header', {hours: true, h: val})}>{val}</div>);
                }
    
                timeUnits.push(<TimeUnit 
                    h={val}
                    min={i % unitsPerHour * timeUnitValueInMins + timeUnitValueInMins}
                    key={i} 
                />);
            }
        }
        

        return timeUnits;
    };

    const makeHoursLine = () => {
        const hoursLine = [];

        if (isDesktop) {
            for (let i = 0; i <= 24; i++) {
                const val = i ? i : '';
                hoursLine.push(<div
                    key={i}
                    onClick={getActiveLine}
                    className={cnTimeline('Header', {hours: true, h: val})}>{val}</div>);
            }
        }

        return hoursLine;
    };

    const makeMinutesLine = () => {
        const minutesLine = [];

        if (!isDesktop) {
            for (let i = 0; i <= unitsPerHour; i++) {
                const val = i ? i * timeUnitValueInMins : '';
                minutesLine.push(<div
                    onClick={getActiveLine}
                    className={cnTimeline('Header', {minutes: true, min: val})}>{val}</div>);
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