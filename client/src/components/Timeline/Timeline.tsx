import React, { FC, useState, useEffect } from 'react';
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
    const [ TimeUn, setTimeUn ] = useState([]);

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

    const checkIsShortcutMenu = (el: HTMLElement) => {
        if (~el.classList.value.search('ShortcutMenu')) {
            return true;
        }
        return false;
    };

    const checkIsShortcutMenuItem = (el: HTMLElement) => {
        if (~el.classList.value.search('ShortcutMenu-Color')) {
            return true;
        }
        return false;
    };

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        const t = e.target as HTMLElement;

        if (checkIsTimeUnit(t) && !t.classList.contains('TimeUnit_outdated')) {
            setShowShortcutMenu(false);
            t.classList.add('TimeUnit_selected');
            const currElId = Number(t.getAttribute('id'));
            setIsMouseDowned(true);
            setSelectedRange( {start: currElId, end: currElId} );
        } else if (checkIsTimelineHours(t)) {
            setShowShortcutMenu(false);
            setIsMouseDowned(true);
            const time = t.classList.value.match(/(_h_).+/);
            const timeValue = time ? time[0].match(/\d+/) : '';
            const currTimeUnits = document.querySelectorAll(`.TimeUnit_h_${timeValue ? timeValue[0] : 'nothing'}_:not(.TimeUnit_outdated)`);
            
            for (let i = 0; i < currTimeUnits.length; i++) {
                currTimeUnits[i].classList.add('TimeUnit_selected');
            }
            
            if (timeValue) {
                setSelectedHours({ start: Number(timeValue[0]), end: Number(timeValue[0]) });
            }
        } else if (checkIsShortcutMenuItem(t)) {
            const colorClass = t.classList.value.match(/ShortcutMenu-Color_\w+/);
            const activeTimeUnits = document.getElementsByClassName('TimeUnit_selected');
            if (colorClass && activeTimeUnits.length) {
                const color = colorClass[0].match(/_\w+/);
                for (let i = 0; i < activeTimeUnits.length; i++) {
                    activeTimeUnits[i].classList.value = activeTimeUnits[i].classList.value.replace(/TimeUnit_case_\w+/g, '');
                    activeTimeUnits[i].classList.add(`TimeUnit_case${color}`);
                }
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
                    setCoordsForTouch({ x: e.nativeEvent.touches[0].clientX, y: e.nativeEvent.touches[0].clientY });
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
                    classesWithActiveHours.push(`TimeUnit_h_${i}_`);
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
            const timeline = document.getElementsByClassName('Timeline')[0];
            if (e.nativeEvent instanceof TouchEvent) {
                const x = coordsForTouch.x - timeline.getBoundingClientRect().left;
                const y = activeTimeUnits[0].getBoundingClientRect().top - timeline.getBoundingClientRect().top;
                setCordsForShortcutMenu({x, y});
                setShowShortcutMenu(true);
            } else {
                if (!checkIsShortcutMenu(e.nativeEvent.target as HTMLElement)) {
                    const x = Math.round(e.nativeEvent.pageX - timeline.getBoundingClientRect().left);
                    const y = Math.round(e.nativeEvent.pageY - timeline.getBoundingClientRect().top);
                    setCordsForShortcutMenu({x, y});
                    setShowShortcutMenu(true);
                }
            }
        } else {
            setShowShortcutMenu(false);
        }
    };


    useEffect(
        () => {
            const timeUnits: any = [];

            fetch('http://localhost:3001?user=username&date=2019-12-15')
            .then(res => {
                return res.json();
            })
            .then(data => {
                for(let id in data.time_units) {
                    let unit = data.time_units[id];

                    if (new Date(unit.time).getMinutes() === 0) {
                        timeUnits.push(<div
                            key={`time-${unit.id}`}
                            className={cnTimeline('Header', {hours: true, h: new Date(unit.time).getHours()})}
                        >{new Date(unit.time).getHours()}</div>);
                    }

                    const isOutdated = now > new Date(unit.time);
                    timeUnits.push(<TimeUnit
                        id={unit.id}
                        h={new Date(unit.time).getHours()}
                        min={new Date(unit.time).getMinutes()}
                        key={id}
                        classes={isOutdated ? ['TimeUnit_outdated'] : []}
                    />);
                }
            })
            .then(() => {
                setTimeUn(timeUnits);
            });
        }, [now]
    );
    
    const makeMinutesLine = () => {
        const minutesLine = [];

        for (let i = -1; i < unitsPerHour; i++) {
            const val = ~i ? i * timeUnitValueInMins : '';
            minutesLine.push(<div
                key={i}
                className={cnTimeline('Header', {minutes: true, min: val})}>{val ? val : ''}</div>);
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
            {makeMinutesLine()}
            {TimeUn}
            <ShortcutMenu 
                isMobile={!isDesktop}
                visible={showShortcutMenu} 
                x={coordsForShortcutMenu.x} 
                y={coordsForShortcutMenu.y} 
            />
        </div>
    );
};

export default Timeline;