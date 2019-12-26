import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Timeline from '../Timeline/Timeline';
import { getFullDataAsync } from '../../store/fullData/fullData.actions';

interface TimelineContainerProps {
    info: any,
    getFullDataAsync: () => void
}

const TimelineContainer: FC<TimelineContainerProps> = ({ getFullDataAsync, info }) => {
    let [data, setData] = useState(info);


    useEffect(
        () => getFullDataAsync(),
        []
    );

    if (info) {
        info.then((res: any) => {
            setData(res);
        });
    }
    
    return <Timeline timeUnitValueInMins={5} info={data} />;
};

const mapStateToProps = (state: any) => {
    return {
        info: state.fullData.info
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getFullDataAsync: () => {dispatch(getFullDataAsync())}
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimelineContainer);