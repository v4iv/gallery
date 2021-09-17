import {FETCH_GALLERY_ERROR, FETCH_GALLERY_REQUEST, FETCH_GALLERY_SUCCESS} from "../constants/gallery.constants";

export interface Photo {
    id: string
    owner: string
    secret: string
    server: string
    farm: number
    title: string | null
    ispublic: number
    isfriend: number
    isfamily: number
    url_m: string
    height_m: number
    width_m: number
    url_l: string
    height_l: number
    width_l: number
    url_o: string
    height_o: number
    width_o: number
}

export interface GalleryState {
    photoList: Photo[]
    page: string | number
    error: string | null | undefined
    loading: boolean
}

interface GalleryFetchRequestAction {
    type: typeof FETCH_GALLERY_REQUEST
}

interface GalleryFetchSuccessAction {
    type: typeof FETCH_GALLERY_SUCCESS
    payload: Photo[]
}

interface GalleryFetchErrorAction {
    type: typeof FETCH_GALLERY_ERROR
    payload: string
}

export type GalleryActionTypes =
    | GalleryFetchRequestAction
    | GalleryFetchSuccessAction
    | GalleryFetchErrorAction
