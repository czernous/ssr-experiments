// import loadable from "@loadable/component";
import React from "react";

const Home = React.lazy(
  () => import(/* webpackChunkName: "pages-Home" */ "../pages/Home")
);
const About = React.lazy(
  () => import(/* webpackChunkName: "pages-About" */ "../pages/About")
);

export default [
  {
    path: "/",
    element: Home,
    exact: true,
  },
  {
    path: "/about",
    element: About,
    exact: true,
  },
];
