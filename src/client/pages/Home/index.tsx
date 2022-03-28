/* eslint-disable no-shadow */
import React from "react";
import { connect } from "react-redux";
import { decrement, increment } from "../../../redux/reducers/counter";

const actionCreators = {
  increment,
  decrement,
};

function Home({ counter, increment, decrement }: any) {
  return (
    <div>
      <p>counter: {counter}</p>
      <button type="button" onClick={() => increment()}>
        increment
      </button>
      <button type="button" onClick={() => decrement()}>
        decrement
      </button>
    </div>
  );
}

const mapState = (state: any) => state;

export default connect(mapState, actionCreators)(Home);
