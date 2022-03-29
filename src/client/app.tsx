/* eslint-disable react/no-unstable-nested-components */
import loadable from "@loadable/component";
import React from "react";
import { Link, Outlet, Route, Router, Routes } from "react-router-dom";
import routes from "./routes";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
      <Routes>
        {routes.map(({ ...routeProps }, idx) => {
          function C() {
            return <routeProps.element />;
          }
          // eslint-disable-next-line react/no-array-index-key
          return <Route key={idx} path={routeProps.path} element={<C />} />;
        })}
      </Routes>
    </>
  );
}

export default App;
