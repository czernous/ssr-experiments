import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "../client/reducers";

declare var window: any;

// Create Redux store with state injected by the server
export const store = createStore(reducers, {...window.__PRELOADED_STATE__}, applyMiddleware(thunk))