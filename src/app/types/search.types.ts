import {Photo} from "./gallery.types";
import {SEARCH_ERROR, SEARCH_REQUEST, SEARCH_SUCCESS} from "../constants/search.constants";

export interface PhotoResult {
    id: string
    owner: string
    secret: string
    server: string
    farm: number
    title: string | null
    ispublic: number
    isfriend: number
    isfamily: number
    url_sq: string
    height_sq: number
    width_sq: number
}

export interface SearchState {
    results: PhotoResult[]
    error: string | null | undefined
    loading: boolean
}

interface SearchRequestAction {
    type: typeof SEARCH_REQUEST
}

interface SearchSuccessAction {
    type: typeof SEARCH_SUCCESS
    payload: Photo[]
}

interface SearchErrorAction {
    type: typeof SEARCH_ERROR
    payload: string
}

export type SearchActionTypes =
    | SearchRequestAction
    | SearchSuccessAction
    | SearchErrorAction
