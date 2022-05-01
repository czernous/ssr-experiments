/* eslint-disable react/no-unstable-nested-components */
import React, { startTransition, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, Route, Routes, useLocation } from "react-router-dom";
import { updateTitle } from "../redux/reducers/app-data";
import { RootState } from "../redux/reducers/rootReducer";

import Html from "./components/Html";
import routes from "./routes";

// function renderInitialState(props: any) {
//   const innerHtml = `window.__STATE__ = ${JSON.stringify(props.appData)}`;
//   return (
//     <script
//       nonce='appData123'
//       dangerouslySetInnerHTML={{ __html: innerHtml }}
//     />
//   );

// }

function App({ ...props }: any) {
  // dispatch(updateTitle(d.title));
  const data = useSelector((state: RootState) => state.appData.title);
  const dispatch = useDispatch();
  const location = useLocation();
  const route = `REACT SSR | ${location.pathname}`;

  useEffect(() => {
    dispatch(updateTitle({ title: route }));
    document.querySelector("title")!.innerText = data;
  }, [data]);

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
      <Routes>
        {routes.map(({ ...routeProps }, idx) => {
          function C({ ...data }: any) {
            return <routeProps.element />;
          }
          // eslint-disable-next-line react/no-array-index-key
          return (
            <Route
              key={idx}
              path={routeProps.path}
              element={<C data={props} />}
            />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
