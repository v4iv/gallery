import {FETCH_RESULTS_ERROR, FETCH_RESULTS_REQUEST, FETCH_RESULTS_SUCCESS} from "../constants/results.constants";
import {Photo} from "./gallery.types";

export interface ResultState {
    photoList: Photo[]
    page: string | number
    error: string | null | undefined
    loading: boolean
}

interface ResultsFetchRequestAction {
    type: typeof FETCH_RESULTS_REQUEST
}

interface ResultsFetchSuccessAction {
    type: typeof FETCH_RESULTS_SUCCESS
    payload: Photo[]
}

interface ResultsFetchErrorAction {
    type: typeof FETCH_RESULTS_ERROR
    payload: string
}

export type ResultActionTypes =
    | ResultsFetchRequestAction
    | ResultsFetchSuccessAction
    | ResultsFetchErrorAction
