import { combineReducers } from "redux"
import galleryReducer from "./gallery.reducer";

const rootReducer = combineReducers({
  gallery: galleryReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
