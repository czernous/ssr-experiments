/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unstable-nested-components */
import React from "react";
// import { useDispatch, useSelector } from "react-redux";

import { Link, Route, Routes } from "react-router-dom";

// import { RootState } from "../redux/reducers/rootReducer";

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
  // const data = useSelector((state: RootState) => state.appData.title);
  // const dispatch = useDispatch();
  // const location = useLocation();

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
