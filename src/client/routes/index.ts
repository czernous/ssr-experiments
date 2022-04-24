// import loadable from "@loadable/component";
import loadable from "@loadable/component";
import React from "react";

const Home = React.lazy(
  () => import(/* webpackChunkName: "pages-Home" */ "../pages/Home")
);
const About = React.lazy(
  () => import(/* webpackChunkName: "pages-About" */ "../pages/About")
);

const Admin = loadable(
  () => import(/* webpackChunkName: "pages-Admin" */ "../pages/Admin"),
  { ssr: false }
);

export default [
  {
    path: "/",
    element: Home,
    exact: true,
    protected: false,
  },
  {
    path: "/about",
    element: About,
    exact: true,
    protected: false,
  },
  {
    path: "/admin",
    element: Admin,
    exact: true,
    protected: true,
  },
];
