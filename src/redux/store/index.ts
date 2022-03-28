/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../reducers/rootReducer";

// eslint-disable-next-line import/prefer-default-export
export function createStore({ initialState }: any = {}) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
  });

  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./rootReducer", () => {
      // eslint-disable-next-line global-require
      const newRootReducer = require("./rootReducer").default;
      store.replaceReducer(newRootReducer);
    });
  }

  return store;
}
