import {Reducer} from "redux"
import {GalleryActionTypes, GalleryState} from "../types/gallery.types";
import {FETCH_GALLERY_ERROR, FETCH_GALLERY_REQUEST, FETCH_GALLERY_SUCCESS} from "../constants/gallery.constants";

const INITIAL_STATE: GalleryState = {
    photoList: [],
    page: 1,
    error: null,
    loading: false,
}

const galleryReducer: Reducer = (state = INITIAL_STATE, action: GalleryActionTypes) => {
    switch (action.type) {
        case FETCH_GALLERY_REQUEST:
            return {
                ...state,
                photoList: [...state.photoList],
                loading: true,
                error: null,
            }
        case FETCH_GALLERY_SUCCESS:
            return {
                ...state,
                photoList: [...state.photoList, ...action.payload],
                page: state.page + 1,
                loading: false,
                error: null,
            }
        case FETCH_GALLERY_ERROR:
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

export default galleryReducer
