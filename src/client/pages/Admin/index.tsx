/* eslint-disable no-underscore-dangle */
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/reducers/rootReducer";

function Admin() {
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <div>
      {/* @ts-ignore */}
      <h1>This is an admin page </h1>
      <p>count: {count}</p>
    </div>
  );
}

export default Admin;
