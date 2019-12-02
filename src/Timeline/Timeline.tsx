import React, { FC } from 'react';
import './Timeline.scss';
import TimeUnit from '../TimeUnit/TimeUnit'

const Timeline: FC = () => {
    return (
        <div className="Timeline">
            <TimeUnit />
        </div>
    );
};

export default Timeline;