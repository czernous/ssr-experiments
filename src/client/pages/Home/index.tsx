/* eslint-disable no-shadow */
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment } from "../../../redux/reducers/counter";
import { RootState } from "../../../redux/reducers/rootReducer";

function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <p>counter: {count}</p>
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
