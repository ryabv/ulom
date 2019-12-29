import { combineReducers } from 'redux';
import { fullDataReducer } from './fullData/fullData.reducer';

export default combineReducers({
    fullData: fullDataReducer
});