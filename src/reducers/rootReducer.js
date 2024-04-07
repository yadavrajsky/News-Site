// Import your individual reducer files
import { combineReducers } from "@reduxjs/toolkit";
import articlesReducer from "./newsSlice";
// Combine your reducers into a root reducer
export const rootReducer = combineReducers({
  articles: articlesReducer,
  // Add more reducers as needed
});
export default rootReducer;
