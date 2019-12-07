import React, { FC, useState } from 'react';
import './Timeline.scss';
import TimeUnit from '../TimeUnit/TimeUnit'
import ShortcutMenu from '../ShortcutMenu/ShortcutMenu';
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
    const [ selectedHours, setSelectedHours ] = useState({start: 0, end: 0});
    const [ showShortcutMenu, setShowShortcutMenu ] = useState(false);
    const [ coordsForShortcutMenu, setCordsForShortcutMenu ] = useState({x: 0, y: 0});
    const [ coordsForTouch, setCoordsForTouch ] = useState({x: 0, y: 0});

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

    const checkIsTimelineHours = (el: HTMLElement) => {
        if (el.classList.contains('Timeline-Header_hours')) {
            return true;
        }
        return false;
    };

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        setShowShortcutMenu(false);
        const t = e.target as HTMLElement;

        if (checkIsTimeUnit(t) && !t.classList.contains('TimeUnit_outdated')) {
            t.classList.add('TimeUnit_selected');
            const currElId = Number(t.getAttribute('id'));
            setIsMouseDowned(true);
            setSelectedRange( {start: currElId, end: currElId} );
        } else if (checkIsTimelineHours(t)) {
            setIsMouseDowned(true);
            const time = t.classList.value.match(/(_h_).+/);
            const timeValue = time ? time[0].match(/\d+/) : '';
            const currTimeUnits = document.querySelectorAll(`.TimeUnit_h_${timeValue ? timeValue[0] : 'nothing'}:not(.TimeUnit_outdated)`);
            
            for (let i = 0; i < currTimeUnits.length; i++) {
                currTimeUnits[i].classList.add('TimeUnit_selected');
            }
            
            if (timeValue) {
                setSelectedHours({ start: Number(timeValue[0]), end: Number(timeValue[0]) });
            }
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

                    setCoordsForTouch({ x: e.nativeEvent.touches[0].clientX, y: e.nativeEvent.touches[0].clientY });
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
            } else if (checkIsTimelineHours(t)) {
                let time;
                if (e.nativeEvent instanceof TouchEvent) {
                    const currEl = document.elementFromPoint(e.nativeEvent.touches[0].clientX, e.nativeEvent.touches[0].clientY) as HTMLElement;
                    time = currEl.classList.value.match(/(_h_).+/);
                } else {
                    time = t.classList.value.match(/(_h_).+/);
                }
                
                const timeValue = time ? time[0].match(/\d+/) : '';
                
                if (timeValue) {
                    setSelectedHours({ ...selectedHours, end: Number(timeValue[0]) });
                }

                const classesWithActiveHours = [];
                let start, end;
                if (selectedHours.start < selectedHours.end) {
                    start = selectedHours.start;
                    end = selectedHours.end;
                } else {
                    start = selectedHours.end;
                    end = selectedHours.start;
                }

                for (let i = start; i <= end; i++) {
                    classesWithActiveHours.push(`TimeUnit_h_${i}`);
                }

                const timeUnitsWithActiveHours = classesWithActiveHours.join('|');
                const searchString = new RegExp(timeUnitsWithActiveHours);
                const timeUnits = document.querySelectorAll('.TimeUnit:not(.TimeUnit_outdated)');

                for (let i = 0; i < timeUnits.length; i++) {
                    if (~timeUnits[i].classList.value.search(searchString)) {
                        timeUnits[i].classList.add('TimeUnit_selected');
                    } else {
                        timeUnits[i].classList.remove('TimeUnit_selected');
                    }
                }
            }
        }
    };

    const handleMouseUp = (e: React.MouseEvent | React.TouchEvent) => {
        setIsMouseDowned(false);
        const activeTimeUnits = document.getElementsByClassName('TimeUnit_selected');
        if (activeTimeUnits.length) {
            setShowShortcutMenu(true);

            const timeline = document.getElementsByClassName('Timeline')[0];
            if (e.nativeEvent instanceof TouchEvent) {
                const x = coordsForTouch.x - timeline.getBoundingClientRect().left;
                const y = coordsForTouch.y - timeline.getBoundingClientRect().top;
                setCordsForShortcutMenu({x, y});
            } else {
                const x = e.nativeEvent.pageX - timeline.getBoundingClientRect().left;
                const y = e.nativeEvent.pageY - timeline.getBoundingClientRect().top;
                setCordsForShortcutMenu({x, y});
            }
        } else {
            setShowShortcutMenu(false);
        }
    };

    const makeGrid = () => {
        const timeUnits = [];

        if (isDesktop) {
            for (let i = 0; i < unitsPerDay; i++) {
                const h = i % 24;
                const min = Math.floor(i / 24) * timeUnitValueInMins;
                const isOutdated = now.getHours() > h || (now.getHours() === h && now.getMinutes() >= min + timeUnitValueInMins);

                if (i % 24 === 0) {
                    timeUnits.push(<div
                        key={`time-${i}`}
                        className={cnTimeline('Header', {minutes: true, min: min})}
                    >{min ? min : ''}</div>);
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
                const h = Math.floor(i / unitsPerHour);
                const min = i % unitsPerHour * timeUnitValueInMins;
                const isOutdated = now.getHours() > h || (now.getHours() === h && now.getMinutes() >= min + timeUnitValueInMins);

                if (i % unitsPerHour === 0) {
                    timeUnits.push(<div 
                        key={`hours-${i}`}
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
            for (let i = -1; i <= 23; i++) {
                const val = ~i ? i : '';
                hoursLine.push(<div
                    key={i}
                    className={cnTimeline('Header', {hours: true, h: val})}>{val}</div>);
            }
        }

        return hoursLine;
    };

    const makeMinutesLine = () => {
        const minutesLine = [];

        if (!isDesktop) {
            for (let i = -1; i < unitsPerHour; i++) {
                const val = ~i ? i * timeUnitValueInMins : '';
                minutesLine.push(<div
                    key={i}
                    className={cnTimeline('Header', {minutes: true, min: val})}>{val ? val : ''}</div>);
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
            <ShortcutMenu 
                visible={showShortcutMenu} 
                x={coordsForShortcutMenu.x} 
                y={coordsForShortcutMenu.y} 
            />
        </div>
    );
};

export default Timeline;