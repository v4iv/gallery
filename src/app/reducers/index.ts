import { combineReducers } from "redux"

const rootReducer = combineReducers({
  default: () => [],
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
