import { 
    GET_FULL_DATA_SUCCESS, 
    GET_FULL_DATA_FAILURE,
    PUT_FULL_DATA_SUCCESS, 
    PUT_FULL_DATA_FAILURE,
    FullData,
    fullDataRequest
} from './fullData.types';

const initialState: FullData = {
    "settings": {
        "step_in_mins": 5
    },
    "cases_categories": [
        {
            "id": 1,
            "name": "work",
            "color": "maroon"
        }
    ],
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
    "time_units": [
        {
            "id": 1,
            "case_id": 0,
            "cat_id": 0,
            "time": "2019-12-15T00:00:00"
        }
    ]
};

export const fullDataReducer = (state = initialState, action: fullDataRequest) => {
    switch (action.type) {
        case GET_FULL_DATA_SUCCESS:
            return { ...state, info: action.payload };
        case GET_FULL_DATA_FAILURE:
        case PUT_FULL_DATA_SUCCESS:
        case PUT_FULL_DATA_FAILURE:
            return state;
        default:
            return state;
    }
};