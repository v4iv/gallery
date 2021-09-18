import {Reducer} from "redux"
import {ResultActionTypes, ResultState} from "../types/results.types";
import {FETCH_RESULTS_ERROR, FETCH_RESULTS_REQUEST, FETCH_RESULTS_SUCCESS} from "../constants/results.constants";

const INITIAL_STATE: ResultState = {
    photoList: [],
    page: 1,
    error: null,
    loading: false,
}

const resultsReducer: Reducer = (state = INITIAL_STATE, action: ResultActionTypes) => {
    switch (action.type) {
        case FETCH_RESULTS_REQUEST:
            return {
                ...state,
                photoList: [...state.photoList],
                loading: true,
                error: null,
            }
        case FETCH_RESULTS_SUCCESS:
            return {
                ...state,
                photoList: [...state.photoList, ...action.payload],
                page: state.page + 1,
                loading: false,
                error: null,
            }
        case FETCH_RESULTS_ERROR:
            return {
                ...state,
                photoList: [...state.photoList],
                error: action.payload,
                loading: false,
            }
        default:
            return state
    }
}

export default resultsReducer
