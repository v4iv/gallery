import { combineReducers } from "redux"
import galleryReducer from "./gallery.reducer";
import searchReducer from "./search.reducer";
import resultsReducer from "./results.reducer";

const rootReducer = combineReducers({
  gallery: galleryReducer,
  search: searchReducer,
  results: resultsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
