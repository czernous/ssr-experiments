import React from "react";
import { connect } from "react-redux";
import { decrement, increment } from "../../../redux/reducers/counter";

function About({ counter }: any) {
  return (
    <div>
      <h1>
        Hello from SSR
        {counter}
      </h1>
      <p />
    </div>
  );
}

const mapState = (state: any) => state;

const actionCreators = {
  increment,
  decrement,
};

export default connect(mapState, actionCreators)(About);
