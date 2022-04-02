/* eslint-disable no-underscore-dangle */
import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "../redux/store";

import App from "./app";

// eslint-disable-next-line no-var
declare var window: any;

const store = createStore(window.__STATE__);

delete window.__STATE__;

hydrateRoot(
  document.getElementById("root") as HTMLDivElement,
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
