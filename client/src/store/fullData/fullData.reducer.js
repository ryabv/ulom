import { GET_FULL_DATA_SUCCESS, GET_FULL_DATA_FAILURE } from './fullData.actions';

const initialState = {
    "settings": {
        "step_in_mins": 5
    },
    "cases_categories": {
        "1": {
            "id": 1,
            "name": "work",
            "color": "maroon"
        }
    },
    "cases": [
        {
            "id": 1,
            "cat_id": 1,
            "time": {
                "start": "2019-14-12T15:10:43",
                "end": "2019-14-12T16:00:00"
            },
            "desc": "Создание контракта для будущего сервера"
        }
    ],
    "time_units": {
        "1": {
            "id": 1,
            "case_id": 0,
            "cat_id": 0,
            "time": "2019-12-15T00:00:00"
        }
    }
};

export const fullDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FULL_DATA_SUCCESS:
            return { ...state, info: action.payload };
        case GET_FULL_DATA_FAILURE:
            return state;
        default:
            return state;
    }
};