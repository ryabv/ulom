import { Dispatch } from 'redux';
import { 
    GET_FULL_DATA_SUCCESS, 
    GET_FULL_DATA_FAILURE,
    PUT_FULL_DATA_SUCCESS,
    PUT_FULL_DATA_FAILURE,
    FullData
} from './fullData.types';


export const getFullDataSuccess = (data: Promise<FullData>) => ({
    type: GET_FULL_DATA_SUCCESS,
    payload: data
});

export const getFullDataFailure = () => ({
    type: GET_FULL_DATA_FAILURE
});

export const putFullDataSuccess = () => ({
    type: PUT_FULL_DATA_SUCCESS
});

export const putFullDataFailure = () => ({
    type: PUT_FULL_DATA_FAILURE
});


export const getFullDataAsync = () => {
    return (dispatch: Dispatch) => {
        fetch('http://localhost:3001?user=username&date=2019-12-26')
            .then(res => {
                if (res.status === 200) {
                    dispatch(getFullDataSuccess(res.json()));
                } else {
                    dispatch(getFullDataFailure());
                }
            })
            .catch(() => {
                dispatch(getFullDataFailure());
            });
    };
};

export const putFullDataAsync = (data: FullData) => {
    return (dispatch: Dispatch) => {
        fetch('http://localhost:3001?user=username&date=2019-12-26', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    dispatch(putFullDataSuccess());
                } else {
                    dispatch(putFullDataFailure());
                }
            })
            .catch(() => {
                dispatch(putFullDataFailure());
            });
    };
};