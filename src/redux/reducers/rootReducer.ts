import { combineReducers } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import appDataReducer from "./app-data";

const rootReducer = combineReducers({
  counter: counterReducer,
  appData: appDataReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
