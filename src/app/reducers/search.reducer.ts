import {Reducer} from "redux";
import {SearchActionTypes, SearchState} from "../types/search.types";
import {SEARCH_ERROR, SEARCH_REQUEST, SEARCH_SUCCESS} from "../constants/search.constants";


const INITIAL_STATE: SearchState = {
    results: [],
    loading: false,
    error: null
}

const searchReducer: Reducer = (state = INITIAL_STATE, action: SearchActionTypes) => {
    switch (action.type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                results: [],
                loading: true,
                error: null,
            }
        case SEARCH_SUCCESS:
            return {
                ...state,
                results: action.payload,
                loading: false,
                error: null,
            }
        case SEARCH_ERROR:
            return {
                ...state,
                results: [],
                error: action.payload,
                loading: false,
            }
        default:
            return state
    }
}

export default searchReducer
