/* eslint-disable no-shadow */
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { decrement, increment } from "../../../redux/reducers/counter";
import { RootState } from "../../../redux/reducers/rootReducer";

function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const data = useSelector((state: RootState) => state.appData.title);
  const dispatch = useDispatch();
  // dispatch(updateTitle({ title: "REACT SSR | HOME" }));
  // useEffect(() => {
  //   document.title = data;
  // }, []);
  return (
    <div>
      <noscript>no JS is enabled</noscript>
      <p>counter: {count}</p>
      <p>{data}</p>
      <button
        type='button'
        onClick={() => {
          console.log("increment");
          dispatch(increment());
        }}
      >
        increment
      </button>
      <button type='button' onClick={() => dispatch(decrement())}>
        decrement
      </button>
    </div>
  );
}

export default Home;
