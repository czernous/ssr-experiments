import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers/rootReducer";

function About() {
  const count = useSelector((state: RootState) => state.counter.value);
  return (
    <div>
      <h1>Hello from SSR</h1>
      <p>count: {count}</p>
    </div>
  );
}

export default About;
