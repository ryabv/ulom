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
    const [ isMouseDowned, setIsMouseDowned ] = useState(false);
    const [ selectedRange, setSelectedRange ] = useState({start: 0, end: 0});
    const [ now, setNow ] = useState(new Date());

    const timeToRedraw = () => {
        const nextTimeToRedraw = Math.ceil(now.getMinutes() / timeUnitValueInMins) * timeUnitValueInMins;
        const minsDiff = nextTimeToRedraw - now.getMinutes();
        const minsToSecs = minsDiff * 60;
        const secsDiff = minsDiff ? minsToSecs - now.getSeconds() : timeUnitValueInMins * 60 - now.getSeconds();
        return secsDiff;
    };

    setTimeout(() => {
        setNow(new Date());
    }, 1000 * timeToRedraw());

    window.addEventListener('resize', () => {
        setIsDesktop(document.body.clientWidth > 700);
    });

    const checkIsTimeUnit = (el: HTMLElement) => {
        if (el.classList.contains('TimeUnit')) {
            return true;
        }
        return false;
    };

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        const t = e.target as HTMLElement;

        if (checkIsTimeUnit(t) && !t.classList.contains('TimeUnit_outdated')) {
            t.classList.add('TimeUnit_selected');
            const currElId = Number(t.getAttribute('id'));
            setIsMouseDowned(true);
            setSelectedRange( {start: currElId, end: currElId} );
        }
    };

    const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
        const t = e.target as HTMLElement;

        if (isMouseDowned) {
            if (checkIsTimeUnit(t)) {
                let endId = 0;
                if (e.nativeEvent instanceof TouchEvent) {
                    const currEl = document.elementFromPoint(e.nativeEvent.touches[0].clientX, e.nativeEvent.touches[0].clientY) as HTMLElement;
                    if (currEl && checkIsTimeUnit(currEl) && !currEl.classList.contains('TimeUnit_outdated')) {
                        endId = Number(currEl.getAttribute('id'));
                        setSelectedRange({ ...selectedRange, end: endId });
                    }
                } else {
                    if (!t.classList.contains('TimeUnit_outdated')) {
                        endId = Number(t.getAttribute('id'));
                        setSelectedRange({ ...selectedRange, end: endId });
                    }
                }                

                const timeUnits = document.getElementsByClassName('TimeUnit');

                for (let i = 0; i < timeUnits.length; i++) {
                    const currTimeUnitId = Number(timeUnits[i].getAttribute('id'));
                    if (selectedRange.start <= selectedRange.end) {
                        if (currTimeUnitId >= selectedRange.start && currTimeUnitId <= selectedRange.end) {
                            timeUnits[i].classList.add('TimeUnit_selected');
                        } else {
                            timeUnits[i].classList.remove('TimeUnit_selected');
                        }
                    } else {
                        if (currTimeUnitId >= selectedRange.end && currTimeUnitId <= selectedRange.start) {
                            timeUnits[i].classList.add('TimeUnit_selected');
                        } else {
                            timeUnits[i].classList.remove('TimeUnit_selected');
                        }
                    }
                    
                }
            }
        }
    };

    const handleMouseUp = () => {
        setIsMouseDowned(false);
    };

    const getActiveLine = (e: React.MouseEvent | React.TouchEvent) => {
        const t = e.target as HTMLElement;
        const time = t.classList.value.match(/(_h_|_min_).+/);

        if (time) {
            const currTimeUnits = document.querySelectorAll(`.TimeUnit${time[0]}:not(.TimeUnit_outdated)`);
            const currActiveTimeUnits = document.getElementsByClassName(`TimeUnit${time[0]} TimeUnit_selected`);
            
            if (currActiveTimeUnits.length === currTimeUnits.length) {
                for (let i = 0; i < currTimeUnits.length; i++) {
                    currTimeUnits[i].classList.toggle('TimeUnit_selected');
                }
            } else {
                for (let i = 0; i < currTimeUnits.length; i++) {
                    currTimeUnits[i].classList.add('TimeUnit_selected');                    
                }
            }
        }
    };

    const makeGrid = () => {
        const timeUnits = [];

        if (isDesktop) {
            for (let i = 0; i < unitsPerDay; i++) {
                const h = i % 24 + 1;
                const min = Math.floor(i / 24) * timeUnitValueInMins + timeUnitValueInMins;
                const isOutdated = now.getHours() > h || (now.getHours() === h && now.getMinutes() > min);

                if (i % 24 === 0) {
                    timeUnits.push(<div
                        key={`time-${i}`}
                        onClick={getActiveLine}
                        className={cnTimeline('Header', {minutes: true, min: min})}
                    >{min}</div>);
                }
    
                timeUnits.push(<TimeUnit
                    id={i * unitsPerHour % unitsPerDay + Math.floor(i * unitsPerHour / unitsPerDay)}
                    h={h}
                    min={min}
                    key={i}
                    classes={isOutdated ? ['TimeUnit_outdated'] : []}
                />);
            }
        } else {
            for (let i = 0; i < unitsPerDay; i++) {
                const h = Math.floor(i / unitsPerHour) + 1;
                const min = i % unitsPerHour * timeUnitValueInMins + timeUnitValueInMins;
                const isOutdated = now.getHours() > h || (now.getHours() === h && now.getMinutes() > min);

                if (i % unitsPerHour === 0) {
                    timeUnits.push(<div 
                        key={`hours-${i}`}
                        onClick={getActiveLine}
                        className={cnTimeline('Header', {hours: true, h: h})}>{h}</div>);
                }
    
                timeUnits.push(<TimeUnit 
                    id={i}
                    h={h}
                    min={min}
                    key={i}
                    classes={isOutdated ? ['TimeUnit_outdated'] : []}
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
                    key={i}
                    onClick={getActiveLine}
                    className={cnTimeline('Header', {minutes: true, min: val})}>{val}</div>);
            }
        }

        return minutesLine;
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            className={cnTimeline()}
        >
            {isDesktop ? makeHoursLine() : makeMinutesLine()}
            {makeGrid()}
        </div>
    );
};

export default Timeline;