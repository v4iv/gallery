import { combineReducers } from "redux"
import galleryReducer from "./gallery.reducer";
import searchReducer from "./search.reducer";

const rootReducer = combineReducers({
  gallery: galleryReducer,
  search: searchReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
