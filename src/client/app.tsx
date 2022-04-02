/* eslint-disable react/no-unstable-nested-components */
import React, { Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
      </ul>
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          {routes.map(({ ...routeProps }, idx) => {
            function C() {
              return <routeProps.element />;
            }
            // eslint-disable-next-line react/no-array-index-key
            return <Route key={idx} path={routeProps.path} element={<C />} />;
          })}
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
