import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Timeline from '../Timeline/Timeline';
import { getFullDataAsync, putFullDataAsync } from '../../store/fullData/fullData.actions';
import { FullData } from '../../store/fullData/fullData.types';

interface TimelineContainerProps {
    info: any,
    getFullDataAsync: () => void,
    putFullDataAsync: (info: FullData) => void
}

const TimelineContainer: FC<TimelineContainerProps> = ({ getFullDataAsync, putFullDataAsync, info }) => {
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
    
    return <Timeline timeUnitValueInMins={5} info={data} updateInfo={putFullDataAsync} />;
};

const mapStateToProps = (state: any) => {
    return {
        info: state.fullData.info
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getFullDataAsync: () => {dispatch(getFullDataAsync())},
        putFullDataAsync: (info: FullData) => {dispatch(putFullDataAsync(info))}
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TimelineContainer);