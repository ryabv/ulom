import { Action } from "redux";


export const GET_FULL_DATA_SUCCESS = 'GET_FULL_DATA_SUCCESS';
export const GET_FULL_DATA_FAILURE = 'GET_FULL_DATA_FAILURE';
export const PUT_FULL_DATA_FAILURE = 'PUT_FULL_DATA_FAILURE';
export const PUT_FULL_DATA_SUCCESS = 'PUT_FULL_DATA_SUCCESS';


export interface fullDataRequest extends Action {
    payload: FullData
}


export type FullData = {
    settings: Settings,
    cases: Case[],
    cases_categories: CaseCategory[],
    time_units: TimeUnit[]
};


export type Settings = {
    step_in_mins: number
};

export type Case = {
    id: number,
    cat_id: number,
    time: {
        start: string,
        end: string
    },
    desc: string
};

export type CaseCategory = {
    id: number,
    name: string,
    color: string
};

export type TimeUnit = {
    id: number,
    case_id: number,
    cat_id: number,
    time: string
};